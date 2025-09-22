<<<<<<< HEAD
import { z } from 'zod/v4';
=======
import { z } from 'zod';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
import { createJsonErrorResponseHandler } from '@ai-sdk/provider-utils';

export const elevenlabsErrorDataSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.number(),
  }),
});

export type ElevenLabsErrorData = z.infer<typeof elevenlabsErrorDataSchema>;

export const elevenlabsFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: elevenlabsErrorDataSchema,
  errorToMessage: data => data.error.message,
});
