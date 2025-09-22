import { NoObjectGeneratedError } from '@ai-sdk/provider';
import { safeParseJSON } from '@ai-sdk/provider-utils';
import { z } from 'zod';
import { TokenUsage, calculateTokenUsage } from '../generate-text/token-usage';
import { CallSettings } from '../prompt/call-settings';
import { convertToLanguageModelPrompt } from '../prompt/convert-to-language-model-prompt';
import { getValidatedPrompt } from '../prompt/get-validated-prompt';
import { prepareCallSettings } from '../prompt/prepare-call-settings';
import { Prompt } from '../prompt/prompt';
import { CallWarning, FinishReason, LanguageModel, LogProbs } from '../types';
import { convertZodToJSONSchema } from '../util/convert-zod-to-json-schema';
import { retryWithExponentialBackoff } from '../util/retry-with-exponential-backoff';
import { injectJsonSchemaIntoSystem } from './inject-json-schema-into-system';

/**
Generate a structured, typed object for a given prompt and schema using a language model.

This function does not stream the output. If you want to stream the output, use `streamObject` instead.

@param model - The language model to use.

@param schema - The schema of the object that the model should generate.
@param mode - The mode to use for object generation. Not all models support all modes. Defaults to 'auto'.

@param system - A system message that will be part of the prompt.
@param prompt - A simple text prompt. You can either use `prompt` or `messages` but not both.
@param messages - A list of messages. You can either use `prompt` or `messages` but not both.

@param maxTokens - Maximum number of tokens to generate.
@param temperature - Temperature setting. 
The value is passed through to the provider. The range depends on the provider and model.
It is recommended to set either `temperature` or `topP`, but not both.
@param topP - Nucleus sampling.
The value is passed through to the provider. The range depends on the provider and model.
It is recommended to set either `temperature` or `topP`, but not both.
@param presencePenalty - Presence penalty setting. 
It affects the likelihood of the model to repeat information that is already in the prompt.
The value is passed through to the provider. The range depends on the provider and model.
@param frequencyPenalty - Frequency penalty setting.
It affects the likelihood of the model to repeatedly use the same words or phrases.
The value is passed through to the provider. The range depends on the provider and model.
@param seed - The seed (integer) to use for random sampling.
If set and supported by the model, calls will generate deterministic results.

@param maxRetries - Maximum number of retries. Set to 0 to disable retries. Default: 2.
@param abortSignal - An optional abort signal that can be used to cancel the call.

@returns 
A result object that contains the generated object, the finish reason, the token usage, and additional information.
 */
export async function generateObject<T>({
  model,
  schema,
  mode,
  system,
  prompt,
  messages,
  maxRetries,
  abortSignal,
  ...settings
}: CallSettings &
  Prompt & {
    /**
The language model to use.
     */
    model: LanguageModel;

    /**
The schema of the object that the model should generate.
     */
    schema: z.Schema<T>;

    /**
The mode to use for object generation.

The Zod schema is converted in a JSON schema and used in one of the following ways

- 'auto': The provider will choose the best mode for the model.
- 'tool': A tool with the JSON schema as parameters is is provided and the provider is instructed to use it.
- 'json': The JSON schema and a instruction is injected into the prompt. If the provider supports JSON mode, it is enabled.
- 'grammar': The provider is instructed to converted the JSON schema into a provider specific grammar and use it to select the output tokens.

Please note that most providers do not support all modes.

Default and recommended: 'auto' (best mode for the model).
     */
    mode?: 'auto' | 'json' | 'tool' | 'grammar';
  }): Promise<GenerateObjectResult<T>> {
  const retry = retryWithExponentialBackoff({ maxRetries });
  const jsonSchema = convertZodToJSONSchema(schema);

  // use the default provider mode when the mode is set to 'auto' or unspecified
  if (mode === 'auto' || mode == null) {
    mode = model.defaultObjectGenerationMode;
  }

  let result: string;
  let finishReason: FinishReason;
  let usage: Parameters<typeof calculateTokenUsage>[0];
  let warnings: CallWarning[] | undefined;
  let rawResponse: { headers?: Record<string, string> } | undefined;
  let logprobs: LogProbs | undefined;

  switch (mode) {
    case 'json': {
      const validatedPrompt = getValidatedPrompt({
        system: injectJsonSchemaIntoSystem({ system, schema: jsonSchema }),
        prompt,
        messages,
      });

      const generateResult = await retry(() => {
        return model.doGenerate({
          mode: { type: 'object-json' },
          ...prepareCallSettings(settings),
          inputFormat: validatedPrompt.type,
          prompt: convertToLanguageModelPrompt(validatedPrompt),
          abortSignal,
        });
      });

      if (generateResult.text === undefined) {
        throw new NoObjectGeneratedError();
      }

      result = generateResult.text;
      finishReason = generateResult.finishReason;
      usage = generateResult.usage;
      warnings = generateResult.warnings;
      rawResponse = generateResult.rawResponse;
      logprobs = generateResult.logprobs;

      break;
    }

    case 'grammar': {
      const validatedPrompt = getValidatedPrompt({
        system: injectJsonSchemaIntoSystem({ system, schema: jsonSchema }),
        prompt,
        messages,
      });

      const generateResult = await retry(() =>
        model.doGenerate({
          mode: { type: 'object-grammar', schema: jsonSchema },
          ...prepareCallSettings(settings),
          inputFormat: validatedPrompt.type,
          prompt: convertToLanguageModelPrompt(validatedPrompt),
          abortSignal,
        }),
      );

      if (generateResult.text === undefined) {
        throw new NoObjectGeneratedError();
      }

      result = generateResult.text;
      finishReason = generateResult.finishReason;
      usage = generateResult.usage;
      warnings = generateResult.warnings;
      rawResponse = generateResult.rawResponse;
      logprobs = generateResult.logprobs;

      break;
    }

    case 'tool': {
      const validatedPrompt = getValidatedPrompt({
        system,
        prompt,
        messages,
      });

      const generateResult = await retry(() =>
        model.doGenerate({
          mode: {
            type: 'object-tool',
            tool: {
              type: 'function',
              name: 'json',
              description: 'Respond with a JSON object.',
              parameters: jsonSchema,
            },
          },
          ...prepareCallSettings(settings),
          inputFormat: validatedPrompt.type,
          prompt: convertToLanguageModelPrompt(validatedPrompt),
          abortSignal,
        }),
      );

      const functionArgs = generateResult.toolCalls?.[0]?.args;

      if (functionArgs === undefined) {
        throw new NoObjectGeneratedError();
      }

      result = functionArgs;
      finishReason = generateResult.finishReason;
      usage = generateResult.usage;
      warnings = generateResult.warnings;
      rawResponse = generateResult.rawResponse;
      logprobs = generateResult.logprobs;

      break;
    }

    case undefined: {
      throw new Error('Model does not have a default object generation mode.');
    }

    default: {
      const _exhaustiveCheck: never = mode;
      throw new Error(`Unsupported mode: ${_exhaustiveCheck}`);
    }
  }

  const parseResult = safeParseJSON({ text: result, schema });

  if (!parseResult.success) {
    throw parseResult.error;
  }

  return new GenerateObjectResult({
    object: parseResult.value,
    finishReason,
    usage: calculateTokenUsage(usage),
    warnings,
    rawResponse,
    logprobs,
  });
}

/**
The result of a `generateObject` call.
 */
export class GenerateObjectResult<T> {
  /**
The generated object (typed according to the schema).
   */
  readonly object: T;

  /**
The reason why the generation finished.
   */
  readonly finishReason: FinishReason;

  /**
The token usage of the generated text.
   */
  readonly usage: TokenUsage;

  /**
Warnings from the model provider (e.g. unsupported settings)
   */
  readonly warnings: CallWarning[] | undefined;

  /**
Optional raw response data.
   */
  rawResponse?: {
    /**
Response headers.
 */
    headers?: Record<string, string>;
  };

  /**
Logprobs for the completion. 
`undefined` if the mode does not support logprobs or if was not enabled
   */
  readonly logprobs: LogProbs | undefined;

  constructor(options: {
    object: T;
    finishReason: FinishReason;
    usage: TokenUsage;
    warnings: CallWarning[] | undefined;
    rawResponse?: {
      headers?: Record<string, string>;
    };
    logprobs: LogProbs | undefined;
  }) {
    this.object = options.object;
    this.finishReason = options.finishReason;
    this.usage = options.usage;
    this.warnings = options.warnings;
    this.rawResponse = options.rawResponse;
    this.logprobs = options.logprobs;
  }
}

/**
 * @deprecated Use `generateObject` instead.
 */
export const experimental_generateObject = generateObject;
