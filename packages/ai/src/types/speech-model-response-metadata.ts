export type SpeechModelResponseMetadata = {
  /**
Timestamp for the start of the generated response.
   */
  timestamp: Date;

  /**
The ID of the response model that was used to generate the response.
   */
  modelId: string;

  /**
Response headers.
   */
  headers?: Record<string, string>;
<<<<<<< HEAD:packages/ai/src/types/speech-model-response-metadata.ts

  /**
Response body.
   */
  body?: unknown;
=======
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017:packages/ai/core/types/speech-model-response-metadata.ts
};
