<<<<<<< HEAD
import {
  TranscriptionModelV2,
  ProviderV2,
  NoSuchModelError,
} from '@ai-sdk/provider';
import { FetchFunction, loadApiKey } from '@ai-sdk/provider-utils';
import { GladiaTranscriptionModel } from './gladia-transcription-model';

export interface GladiaProvider extends ProviderV2 {
=======
import { TranscriptionModelV1, ProviderV1 } from '@ai-sdk/provider';
import { FetchFunction, loadApiKey } from '@ai-sdk/provider-utils';
import { GladiaTranscriptionModel } from './gladia-transcription-model';

export interface GladiaProvider extends Pick<ProviderV1, 'transcriptionModel'> {
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
  (): {
    transcription: GladiaTranscriptionModel;
  };

  /**
Creates a model for transcription.
   */
<<<<<<< HEAD
  transcription(): TranscriptionModelV2;
=======
  transcription(): TranscriptionModelV1;
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
}

export interface GladiaProviderSettings {
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
Create a Gladia provider instance.
 */
export function createGladia(
  options: GladiaProviderSettings = {},
): GladiaProvider {
  const getHeaders = () => ({
    'x-gladia-key': loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: 'GLADIA_API_KEY',
      description: 'Gladia',
    }),
    ...options.headers,
  });

  const createTranscriptionModel = () =>
    new GladiaTranscriptionModel('default', {
      provider: `gladia.transcription`,
      url: ({ path }) => `https://api.gladia.io${path}`,
      headers: getHeaders,
      fetch: options.fetch,
    });

  const provider = function () {
    return {
      transcription: createTranscriptionModel(),
    };
  };

  provider.transcription = createTranscriptionModel;
  provider.transcriptionModel = createTranscriptionModel;

<<<<<<< HEAD
  // Required ProviderV2 methods that are not supported
  provider.languageModel = () => {
    throw new NoSuchModelError({
      modelId: 'unknown',
      modelType: 'languageModel',
      message: 'Gladia does not provide language models',
    });
  };

  provider.textEmbeddingModel = () => {
    throw new NoSuchModelError({
      modelId: 'unknown',
      modelType: 'textEmbeddingModel',
      message: 'Gladia does not provide text embedding models',
    });
  };

  provider.imageModel = () => {
    throw new NoSuchModelError({
      modelId: 'unknown',
      modelType: 'imageModel',
      message: 'Gladia does not provide image models',
    });
  };

=======
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
  return provider as GladiaProvider;
}

/**
Default Gladia provider instance.
 */
export const gladia = createGladia();
