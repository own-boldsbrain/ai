# AI SDK - Gladia Provider

<<<<<<< HEAD
The **[Gladia provider](https://ai-sdk.dev/providers/ai-sdk-providers/assemblyai)** for the [AI SDK](https://ai-sdk.dev/docs)
=======
The **[Gladia provider](https://sdk.vercel.ai/providers/ai-sdk-providers/assemblyai)** for the [AI SDK](https://sdk.vercel.ai/docs)
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
contains transcription model support for the Gladia transcription API.

## Setup

The Gladia provider is available in the `@ai-sdk/gladia` module. You can install it with

```bash
npm i @ai-sdk/gladia
```

## Provider Instance

You can import the default provider instance `gladia` from `@ai-sdk/gladia`:

```ts
import { gladia } from '@ai-sdk/gladia';
```

## Example

```ts
import { gladia } from '@ai-sdk/gladia';
import { experimental_transcribe as transcribe } from 'ai';

const { text } = await transcribe({
  model: gladia.transcription(),
  audio: new URL(
    'https://github.com/vercel/ai/raw/refs/heads/main/examples/ai-core/data/galileo.mp3',
  ),
});
```

## Documentation

<<<<<<< HEAD
Please check out the **[Gladia provider documentation](https://ai-sdk.dev/providers/ai-sdk-providers/gladia)** for more information.
=======
Please check out the **[Gladia provider documentation](https://sdk.vercel.ai/providers/ai-sdk-providers/gladia)** for more information.
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
