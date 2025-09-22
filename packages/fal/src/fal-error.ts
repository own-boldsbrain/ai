<<<<<<< HEAD
import { z } from 'zod/v4';
=======
import { z } from 'zod';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
import { createJsonErrorResponseHandler } from '@ai-sdk/provider-utils';

export const falErrorDataSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.number(),
  }),
});

export type FalErrorData = z.infer<typeof falErrorDataSchema>;

export const falFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: falErrorDataSchema,
  errorToMessage: data => data.error.message,
});
