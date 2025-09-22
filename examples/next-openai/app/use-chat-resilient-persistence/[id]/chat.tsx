'use client';

<<<<<<< HEAD
import ChatInput from '@/component/chat-input';
import { UIMessage, useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
=======
import { Message, useChat } from '@ai-sdk/react';
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
import { createIdGenerator } from 'ai';

export default function Chat({
  id,
  initialMessages,
<<<<<<< HEAD
}: { id?: string | undefined; initialMessages?: UIMessage[] } = {}) {
  const { sendMessage, status, messages, stop } = useChat({
    id,
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: '/api/use-chat-resilient-persistence',
    }),
    generateId: createIdGenerator({ prefix: 'msgc', size: 16 }), // id format for client-side messages
  });
=======
}: { id?: string | undefined; initialMessages?: Message[] } = {}) {
  const { input, status, handleInputChange, handleSubmit, messages, stop } =
    useChat({
      api: '/api/use-chat-resilient-persistence',
      id, // use the provided chatId
      initialMessages, // initial messages if provided
      sendExtraMessageFields: true, // send id and createdAt for each message
      generateId: createIdGenerator({ prefix: 'msgc', size: 16 }), // id format for client-side messages
    });
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.parts
            .map(part => (part.type === 'text' ? part.text : ''))
            .join('')}
        </div>
      ))}

<<<<<<< HEAD
      <ChatInput
        status={status}
        stop={stop}
        onSubmit={text => sendMessage({ text })}
      />
=======
      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          disabled={status !== 'ready'}
        />
        {status === 'streaming' && (
          <button
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            type="submit"
            onClick={stop}
          >
            Stop
          </button>
        )}
      </form>
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
    </div>
  );
}
