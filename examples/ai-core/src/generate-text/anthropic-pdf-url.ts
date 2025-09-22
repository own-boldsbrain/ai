import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import 'dotenv/config';

async function main() {
  const result = await generateText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'What is an embedding model according to this document?',
          },
          {
            type: 'file',
            data: new URL(
              'https://github.com/vercel/ai/blob/main/examples/ai-core/data/ai.pdf?raw=true',
            ),
<<<<<<< HEAD
            mediaType: 'application/pdf',
=======
            mimeType: 'application/pdf',
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
          },
        ],
      },
    ],
  });

  console.log(result.text);
}

main().catch(console.error);
