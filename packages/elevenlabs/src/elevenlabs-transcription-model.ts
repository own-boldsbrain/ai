import {
<<<<<<< HEAD
  TranscriptionModelV2,
  TranscriptionModelV2CallOptions,
  TranscriptionModelV2CallWarning,
=======
  TranscriptionModelV1,
  TranscriptionModelV1CallOptions,
  TranscriptionModelV1CallWarning,
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
} from '@ai-sdk/provider';
import {
  combineHeaders,
  convertBase64ToUint8Array,
  createJsonResponseHandler,
<<<<<<< HEAD
  mediaTypeToExtension,
  parseProviderOptions,
  postFormDataToApi,
} from '@ai-sdk/provider-utils';
import { z } from 'zod/v4';
import { ElevenLabsConfig } from './elevenlabs-config';
import { elevenlabsFailedResponseHandler } from './elevenlabs-error';
import { ElevenLabsTranscriptionModelId } from './elevenlabs-transcription-options';
=======
  parseProviderOptions,
  postFormDataToApi,
} from '@ai-sdk/provider-utils';
import { z } from 'zod';
import { ElevenLabsConfig } from './elevenlabs-config';
import { elevenlabsFailedResponseHandler } from './elevenlabs-error';
import { ElevenLabsTranscriptionModelId } from './elevenlabs-transcription-settings';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
import { ElevenLabsTranscriptionAPITypes } from './elevenlabs-api-types';

// https://elevenlabs.io/docs/api-reference/speech-to-text/convert
const elevenLabsProviderOptionsSchema = z.object({
  languageCode: z.string().nullish(),
  tagAudioEvents: z.boolean().nullish().default(true),
  numSpeakers: z.number().int().min(1).max(32).nullish(),
  timestampsGranularity: z
    .enum(['none', 'word', 'character'])
    .nullish()
    .default('word'),
  diarize: z.boolean().nullish().default(false),
<<<<<<< HEAD
  fileFormat: z.enum(['pcm_s16le_16', 'other']).nullish().default('other'),
=======
  file_format: z.enum(['pcm_s16le_16', 'other']).nullish().default('other'),
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
});

export type ElevenLabsTranscriptionCallOptions = z.infer<
  typeof elevenLabsProviderOptionsSchema
>;

interface ElevenLabsTranscriptionModelConfig extends ElevenLabsConfig {
  _internal?: {
    currentDate?: () => Date;
  };
}

<<<<<<< HEAD
export class ElevenLabsTranscriptionModel implements TranscriptionModelV2 {
  readonly specificationVersion = 'v2';
=======
export class ElevenLabsTranscriptionModel implements TranscriptionModelV1 {
  readonly specificationVersion = 'v1';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017

  get provider(): string {
    return this.config.provider;
  }

  constructor(
    readonly modelId: ElevenLabsTranscriptionModelId,
    private readonly config: ElevenLabsTranscriptionModelConfig,
  ) {}

<<<<<<< HEAD
  private async getArgs({
    audio,
    mediaType,
    providerOptions,
  }: Parameters<TranscriptionModelV2['doGenerate']>[0]) {
    const warnings: TranscriptionModelV2CallWarning[] = [];

    // Parse provider options
    const elevenlabsOptions = await parseProviderOptions({
=======
  private getArgs({
    audio,
    mediaType,
    providerOptions,
  }: Parameters<TranscriptionModelV1['doGenerate']>[0]) {
    const warnings: TranscriptionModelV1CallWarning[] = [];

    // Parse provider options
    const elevenlabsOptions = parseProviderOptions({
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
      provider: 'elevenlabs',
      providerOptions,
      schema: elevenLabsProviderOptionsSchema,
    });

    // Create form data with base fields
    const formData = new FormData();
    const blob =
      audio instanceof Uint8Array
        ? new Blob([audio])
        : new Blob([convertBase64ToUint8Array(audio)]);

    formData.append('model_id', this.modelId);
<<<<<<< HEAD
    const fileExtension = mediaTypeToExtension(mediaType);
    formData.append(
      'file',
      new File([blob], 'audio', { type: mediaType }),
      `audio.${fileExtension}`,
    );
=======
    formData.append('file', new File([blob], 'audio', { type: mediaType }));
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
    formData.append('diarize', 'true');

    // Add provider-specific options
    if (elevenlabsOptions) {
      const transcriptionModelOptions: ElevenLabsTranscriptionAPITypes = {
        language_code: elevenlabsOptions.languageCode ?? undefined,
        tag_audio_events: elevenlabsOptions.tagAudioEvents ?? undefined,
        num_speakers: elevenlabsOptions.numSpeakers ?? undefined,
        timestamps_granularity:
          elevenlabsOptions.timestampsGranularity ?? undefined,
<<<<<<< HEAD
        file_format: elevenlabsOptions.fileFormat ?? undefined,
=======
        file_format: elevenlabsOptions.file_format ?? undefined,
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
      };

      if (typeof elevenlabsOptions.diarize === 'boolean') {
        formData.append('diarize', String(elevenlabsOptions.diarize));
      }

      for (const key in transcriptionModelOptions) {
        const value =
          transcriptionModelOptions[
            key as keyof ElevenLabsTranscriptionAPITypes
          ];
        if (value !== undefined) {
          formData.append(key, String(value));
        }
      }
    }

    return {
      formData,
      warnings,
    };
  }

  async doGenerate(
<<<<<<< HEAD
    options: Parameters<TranscriptionModelV2['doGenerate']>[0],
  ): Promise<Awaited<ReturnType<TranscriptionModelV2['doGenerate']>>> {
    const currentDate = this.config._internal?.currentDate?.() ?? new Date();
    const { formData, warnings } = await this.getArgs(options);
=======
    options: Parameters<TranscriptionModelV1['doGenerate']>[0],
  ): Promise<Awaited<ReturnType<TranscriptionModelV1['doGenerate']>>> {
    const currentDate = this.config._internal?.currentDate?.() ?? new Date();
    const { formData, warnings } = this.getArgs(options);
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017

    const {
      value: response,
      responseHeaders,
      rawValue: rawResponse,
    } = await postFormDataToApi({
      url: this.config.url({
        path: '/v1/speech-to-text',
        modelId: this.modelId,
      }),
      headers: combineHeaders(this.config.headers(), options.headers),
      formData,
      failedResponseHandler: elevenlabsFailedResponseHandler,
      successfulResponseHandler: createJsonResponseHandler(
        elevenlabsTranscriptionResponseSchema,
      ),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch,
    });

    return {
      text: response.text,
      segments:
        response.words?.map(word => ({
          text: word.text,
          startSecond: word.start ?? 0,
          endSecond: word.end ?? 0,
        })) ?? [],
      language: response.language_code,
      durationInSeconds: response.words?.at(-1)?.end ?? undefined,
      warnings,
      response: {
        timestamp: currentDate,
        modelId: this.modelId,
        headers: responseHeaders,
        body: rawResponse,
      },
    };
  }
}

const elevenlabsTranscriptionResponseSchema = z.object({
  language_code: z.string(),
  language_probability: z.number(),
  text: z.string(),
  words: z
    .array(
      z.object({
        text: z.string(),
        type: z.enum(['word', 'spacing', 'audio_event']),
        start: z.number().nullish(),
        end: z.number().nullish(),
        speaker_id: z.string().nullish(),
        characters: z
          .array(
            z.object({
              text: z.string(),
              start: z.number().nullish(),
              end: z.number().nullish(),
            }),
          )
          .nullish(),
      }),
    )
    .nullish(),
});
