import { groq } from '@ai-sdk/groq';
import { experimental_transcribe as transcribe } from 'ai';
import 'dotenv/config';
import { readFile } from 'fs/promises';

async function main() {
  const result = await transcribe({
    model: groq.transcription('whisper-large-v3-turbo'),
    audio: Buffer.from(await readFile('./data/galileo.mp3')).toString('base64'),
<<<<<<< HEAD
    providerOptions: {
      groq: {
        responseFormat: 'verbose_json',
      },
    },
=======
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
  });

  console.log('Text:', result.text);
  console.log('Duration:', result.durationInSeconds);
  console.log('Language:', result.language);
  console.log('Segments:', result.segments);
  console.log('Warnings:', result.warnings);
  console.log('Responses:', result.responses);
}

main().catch(console.error);
