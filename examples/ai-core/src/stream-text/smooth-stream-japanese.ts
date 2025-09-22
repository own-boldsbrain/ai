import { simulateReadableStream, smoothStream, streamText } from 'ai';
<<<<<<< HEAD
import { MockLanguageModelV2 } from 'ai/test';

async function main() {
  const result = streamText({
    model: new MockLanguageModelV2({
      doStream: async () => ({
        stream: simulateReadableStream({
          chunks: [
            { type: 'text-start', id: '0' },
            { type: 'text-delta', id: '0', delta: 'こんにちは' },
            { type: 'text-delta', id: '0', delta: 'こんにちは' },
            { type: 'text-delta', id: '0', delta: 'こんにちは' },
            { type: 'text-delta', id: '0', delta: 'こんにちは' },
            { type: 'text-end', id: '0' },
=======
import { MockLanguageModelV1 } from 'ai/test';

async function main() {
  const result = streamText({
    model: new MockLanguageModelV1({
      doStream: async () => ({
        stream: simulateReadableStream({
          chunks: [
            { type: 'text-delta', textDelta: 'こんにちは' },
            { type: 'text-delta', textDelta: 'こんにちは' },
            { type: 'text-delta', textDelta: 'こんにちは' },
            { type: 'text-delta', textDelta: 'こんにちは' },
            { type: 'text-delta', textDelta: 'こんにちは' },
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
            {
              type: 'finish',
              finishReason: 'stop',
              logprobs: undefined,
<<<<<<< HEAD
              usage: {
                inputTokens: 3,
                outputTokens: 10,
                totalTokens: 13,
              },
=======
              usage: { completionTokens: 10, promptTokens: 3 },
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
            },
          ],
          chunkDelayInMs: 400,
        }),
<<<<<<< HEAD
=======
        rawCall: { rawPrompt: null, rawSettings: {} },
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
      }),
    }),

    prompt: 'Say hello in Japanese!',
    experimental_transform: smoothStream({
      chunking: /[\u3040-\u309F\u30A0-\u30FF]|\S+\s+/,
    }),
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }
}

main().catch(console.error);
