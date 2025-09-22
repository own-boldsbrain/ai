import { AISDKError } from '@ai-sdk/provider';
<<<<<<< HEAD:packages/ai/src/error/no-speech-generated-error.ts
import { SpeechModelResponseMetadata } from '../types/speech-model-response-metadata';
=======
import { SpeechModelResponseMetadata } from '../core/types/speech-model-response-metadata';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017:packages/ai/errors/no-speech-generated-error.ts

/**
Error that is thrown when no speech audio was generated.
 */
export class NoSpeechGeneratedError extends AISDKError {
  readonly responses: Array<SpeechModelResponseMetadata>;

  constructor(options: { responses: Array<SpeechModelResponseMetadata> }) {
    super({
      name: 'AI_NoSpeechGeneratedError',
      message: 'No speech audio generated.',
    });

    this.responses = options.responses;
  }
}
