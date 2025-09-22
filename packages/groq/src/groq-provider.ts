import {
  LanguageModelV2,
  NoSuchModelError,
<<<<<<< HEAD
  ProviderV2,
  TranscriptionModelV2,
=======
  ProviderV1,
  TranscriptionModelV1,
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
} from '@ai-sdk/provider';
import {
  FetchFunction,
  loadApiKey,
  withoutTrailingSlash,
} from '@ai-sdk/provider-utils';
import { GroqChatLanguageModel } from './groq-chat-language-model';
<<<<<<< HEAD
import { GroqChatModelId } from './groq-chat-options';
import { GroqTranscriptionModelId } from './groq-transcription-options';
=======
import { GroqChatModelId, GroqChatSettings } from './groq-chat-settings';
import { GroqTranscriptionModelId } from './groq-transcription-settings';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
import { GroqTranscriptionModel } from './groq-transcription-model';

import { groqTools } from './groq-tools';
export interface GroqProvider extends ProviderV2 {
  /**
Creates a model for text generation.
*/
  (modelId: GroqChatModelId): LanguageModelV2;

  /**
Creates an Groq chat model for text generation.
   */
<<<<<<< HEAD
  languageModel(modelId: GroqChatModelId): LanguageModelV2;
=======
  languageModel(
    modelId: GroqChatModelId,
    settings?: GroqChatSettings,
  ): LanguageModelV1;
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017

  /**
Creates a model for transcription.
   */
<<<<<<< HEAD
  transcription(modelId: GroqTranscriptionModelId): TranscriptionModelV2;

  /**
   * Tools provided by Groq.
   */
  tools: typeof groqTools;
=======
  transcription(modelId: GroqTranscriptionModelId): TranscriptionModelV1;
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
}

export interface GroqProviderSettings {
  /**
Base URL for the Groq API calls.
     */
  baseURL?: string;

  /**
API key for authenticating requests.
     */
  apiKey?: string;

  /**
Custom headers to include in the requests.
     */
  headers?: Record<string, string>;

  /**
Custom fetch implementation. You can use it as a middleware to intercept requests,
or to provide a custom fetch implementation for e.g. testing.
    */
  fetch?: FetchFunction;
}

/**
Create an Groq provider instance.
 */
export function createGroq(options: GroqProviderSettings = {}): GroqProvider {
  const baseURL =
    withoutTrailingSlash(options.baseURL) ?? 'https://api.groq.com/openai/v1';

  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: 'GROQ_API_KEY',
      description: 'Groq',
    })}`,
    ...options.headers,
  });

  const createChatModel = (modelId: GroqChatModelId) =>
    new GroqChatLanguageModel(modelId, {
      provider: 'groq.chat',
      url: ({ path }) => `${baseURL}${path}`,
      headers: getHeaders,
      fetch: options.fetch,
    });

  const createLanguageModel = (modelId: GroqChatModelId) => {
    if (new.target) {
      throw new Error(
        'The Groq model function cannot be called with the new keyword.',
      );
    }

    return createChatModel(modelId);
  };

  const createTranscriptionModel = (modelId: GroqTranscriptionModelId) => {
    return new GroqTranscriptionModel(modelId, {
      provider: 'groq.transcription',
      url: ({ path }) => `${baseURL}${path}`,
      headers: getHeaders,
      fetch: options.fetch,
    });
  };

<<<<<<< HEAD
  const provider = function (modelId: GroqChatModelId) {
    return createLanguageModel(modelId);
=======
  const provider = function (
    modelId: GroqChatModelId,
    settings?: GroqChatSettings,
  ) {
    return createLanguageModel(modelId, settings);
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
  };

  provider.languageModel = createLanguageModel;
  provider.chat = createChatModel;

  provider.textEmbeddingModel = (modelId: string) => {
    throw new NoSuchModelError({ modelId, modelType: 'textEmbeddingModel' });
  };
<<<<<<< HEAD
  provider.imageModel = (modelId: string) => {
    throw new NoSuchModelError({ modelId, modelType: 'imageModel' });
  };
  provider.transcription = createTranscriptionModel;
  provider.transcriptionModel = createTranscriptionModel;

  provider.tools = groqTools;
=======
  provider.transcription = createTranscriptionModel;
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017

  return provider;
}

/**
Default Groq provider instance.
 */
export const groq = createGroq();
