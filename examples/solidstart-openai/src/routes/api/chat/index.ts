import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';
import { APIEvent } from 'solid-start/api';

export const POST = async (event: APIEvent) => {
  try {
    const { messages } = await event.request.json();

    const result = await streamText({
      model: openai('gpt-4-turbo-preview'),
      messages,
    });

    return new StreamingTextResponse(result.toAIStream());
  } catch (error) {
    console.error(error);
    throw error;
  }
};
