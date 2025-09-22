# AI SDK - ElevenLabs Provider

<<<<<<< HEAD
The **[ElevenLabs provider](https://ai-sdk.dev/providers/ai-sdk-providers/elevenlabs)** for the [AI SDK](https://ai-sdk.dev/docs)
=======
The **[ElevenLabs provider](https://sdk.vercel.ai/providers/ai-sdk-providers/elevenlabs)** for the [AI SDK](https://sdk.vercel.ai/docs)
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
contains language model support for the ElevenLabs chat and completion APIs and embedding model support for the ElevenLabs embeddings API.

## Setup

The ElevenLabs provider is available in the `@ai-sdk/elevenlabs` module. You can install it with

```bash
npm i @ai-sdk/elevenlabs
```

## Provider Instance

You can import the default provider instance `elevenlabs` from `@ai-sdk/elevenlabs`:

```ts
import { elevenlabs } from '@ai-sdk/elevenlabs';
```

## Example

```ts
import { elevenlabs } from '@ai-sdk/elevenlabs';
import { experimental_transcribe as transcribe } from 'ai';

const { text } = await transcribe({
  model: elevenlabs.transcription('scribe_v1'),
  audio: new URL(
    'https://github.com/vercel/ai/raw/refs/heads/main/examples/ai-core/data/galileo.mp3',
  ),
});
```

## Documentation

<<<<<<< HEAD
Please check out the **[ElevenLabs provider documentation](https://ai-sdk.dev/providers/ai-sdk-providers/elevenlabs)** for more information.
=======
Please check out the **[ElevenLabs provider documentation](https://sdk.vercel.ai/providers/ai-sdk-providers/elevenlabs)** for more information.
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
