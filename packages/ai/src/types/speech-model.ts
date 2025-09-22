<<<<<<< HEAD:packages/ai/src/types/speech-model.ts
import { SpeechModelV2, SpeechModelV2CallWarning } from '@ai-sdk/provider';
=======
import { SpeechModelV1, SpeechModelV1CallWarning } from '@ai-sdk/provider';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017:packages/ai/core/types/speech-model.ts

/**
Speech model that is used by the AI SDK Core functions.
  */
<<<<<<< HEAD:packages/ai/src/types/speech-model.ts
export type SpeechModel = SpeechModelV2;
=======
export type SpeechModel = SpeechModelV1;
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017:packages/ai/core/types/speech-model.ts

/**
Warning from the model provider for this call. The call will proceed, but e.g.
some settings might not be supported, which can lead to suboptimal results.
  */
<<<<<<< HEAD:packages/ai/src/types/speech-model.ts
export type SpeechWarning = SpeechModelV2CallWarning;
=======
export type SpeechWarning = SpeechModelV1CallWarning;
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017:packages/ai/core/types/speech-model.ts
