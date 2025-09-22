import {
<<<<<<< HEAD:packages/ai/src/types/transcription-model.ts
  TranscriptionModelV2,
  TranscriptionModelV2CallWarning,
=======
  TranscriptionModelV1,
  TranscriptionModelV1CallWarning,
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017:packages/ai/core/types/transcription-model.ts
} from '@ai-sdk/provider';

/**
Transcription model that is used by the AI SDK Core functions.
  */
<<<<<<< HEAD:packages/ai/src/types/transcription-model.ts
export type TranscriptionModel = TranscriptionModelV2;
=======
export type TranscriptionModel = TranscriptionModelV1;
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017:packages/ai/core/types/transcription-model.ts

/**
Warning from the model provider for this call. The call will proceed, but e.g.
some settings might not be supported, which can lead to suboptimal results.
  */
<<<<<<< HEAD:packages/ai/src/types/transcription-model.ts
export type TranscriptionWarning = TranscriptionModelV2CallWarning;
=======
export type TranscriptionWarning = TranscriptionModelV1CallWarning;
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017:packages/ai/core/types/transcription-model.ts
