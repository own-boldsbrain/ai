import { openai } from '@ai-sdk/openai';
import { saveChat } from '@util/chat-store';
<<<<<<< HEAD
import { convertToModelMessages, streamText, UIMessage } from 'ai';
=======
import { appendResponseMessages, createIdGenerator, streamText } from 'ai';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017

export async function POST(req: Request) {
  const { messages, chatId }: { messages: UIMessage[]; chatId: string } =
    await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: convertToModelMessages(messages),
  });

  // consume the stream to ensure it runs to completion and triggers onFinish
  // even when the client response is aborted (e.g. when the browser tab is closed).
  // no await
  result.consumeStream({
    onError: error => {
      console.log('Error during background stream consumption: ', error); // optional error callback
    },
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: ({ messages }) => {
      saveChat({ chatId, messages });
    },
  });
}
