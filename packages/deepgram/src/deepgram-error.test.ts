import { safeParseJSON } from '@ai-sdk/provider-utils';
import { deepgramErrorDataSchema } from './deepgram-error';
<<<<<<< HEAD
import { describe, expect, it } from 'vitest';

describe('deepgramErrorDataSchema', () => {
  it('should parse Deepgram resource exhausted error', async () => {
=======

describe('deepgramErrorDataSchema', () => {
  it('should parse Deepgram resource exhausted error', () => {
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
    const error = `
{"error":{"message":"{\\n  \\"error\\": {\\n    \\"code\\": 429,\\n    \\"message\\": \\"Resource has been exhausted (e.g. check quota).\\",\\n    \\"status\\": \\"RESOURCE_EXHAUSTED\\"\\n  }\\n}\\n","code":429}}
`;

<<<<<<< HEAD
    const result = await safeParseJSON({
=======
    const result = safeParseJSON({
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
      text: error,
      schema: deepgramErrorDataSchema,
    });

    expect(result).toStrictEqual({
      success: true,
      value: {
        error: {
          message:
            '{\n  "error": {\n    "code": 429,\n    "message": "Resource has been exhausted (e.g. check quota).",\n    "status": "RESOURCE_EXHAUSTED"\n  }\n}\n',
          code: 429,
        },
      },
      rawValue: {
        error: {
          message:
            '{\n  "error": {\n    "code": 429,\n    "message": "Resource has been exhausted (e.g. check quota).",\n    "status": "RESOURCE_EXHAUSTED"\n  }\n}\n',
          code: 429,
        },
      },
    });
  });
});
