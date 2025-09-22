<<<<<<< HEAD
import { z } from 'zod/v4';
=======
import { z } from 'zod';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
import { createJsonErrorResponseHandler } from '@ai-sdk/provider-utils';

export const deepgramErrorDataSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.number(),
  }),
});

export type DeepgramErrorData = z.infer<typeof deepgramErrorDataSchema>;

export const deepgramFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: deepgramErrorDataSchema,
  errorToMessage: data => data.error.message,
});
