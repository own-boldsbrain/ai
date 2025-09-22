import { AISDKError } from '@ai-sdk/provider';
<<<<<<< HEAD:packages/ai/src/error/no-transcript-generated-error.ts
import { TranscriptionModelResponseMetadata } from '../types/transcription-model-response-metadata';
=======
import { TranscriptionModelResponseMetadata } from '../core/types/transcription-model-response-metadata';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017:packages/ai/errors/no-transcript-generated-error.ts

/**
Error that is thrown when no transcript was generated.
 */
export class NoTranscriptGeneratedError extends AISDKError {
  readonly responses: Array<TranscriptionModelResponseMetadata>;

  constructor(options: {
    responses: Array<TranscriptionModelResponseMetadata>;
  }) {
    super({
      name: 'AI_NoTranscriptGeneratedError',
      message: 'No transcript generated.',
    });

    this.responses = options.responses;
  }
}
