import { safeParseJSON } from '@ai-sdk/provider-utils';
import { lmntErrorDataSchema } from './lmnt-error';
<<<<<<< HEAD
import { describe, it, expect } from 'vitest';

describe('lmntErrorDataSchema', () => {
  it('should parse LMNT resource exhausted error', async () => {
=======

describe('lmntErrorDataSchema', () => {
  it('should parse LMNT resource exhausted error', () => {
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
      schema: lmntErrorDataSchema,
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
