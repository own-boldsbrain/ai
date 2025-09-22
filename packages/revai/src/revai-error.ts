<<<<<<< HEAD
import { z } from 'zod/v4';
=======
import { z } from 'zod';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
import { createJsonErrorResponseHandler } from '@ai-sdk/provider-utils';

export const revaiErrorDataSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.number(),
  }),
});

export type RevaiErrorData = z.infer<typeof revaiErrorDataSchema>;

export const revaiFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: revaiErrorDataSchema,
  errorToMessage: data => data.error.message,
});
