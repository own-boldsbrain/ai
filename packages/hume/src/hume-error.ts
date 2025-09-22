<<<<<<< HEAD
import { z } from 'zod/v4';
=======
import { z } from 'zod';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
import { createJsonErrorResponseHandler } from '@ai-sdk/provider-utils';

export const humeErrorDataSchema = z.object({
  error: z.object({
    message: z.string(),
    code: z.number(),
  }),
});

export type HumeErrorData = z.infer<typeof humeErrorDataSchema>;

export const humeFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: humeErrorDataSchema,
  errorToMessage: data => data.error.message,
});
