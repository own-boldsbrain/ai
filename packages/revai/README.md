# AI SDK - Rev.ai Provider

<<<<<<< HEAD
The **[Rev.ai provider](https://ai-sdk.dev/providers/ai-sdk-providers/revai)** for the [AI SDK](https://ai-sdk.dev/docs)
=======
The **[Rev.ai provider](https://sdk.vercel.ai/providers/ai-sdk-providers/revai)** for the [AI SDK](https://sdk.vercel.ai/docs)
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
contains language model support for the Rev.ai transcription API.

## Setup

The Rev.ai provider is available in the `@ai-sdk/revai` module. You can install it with

```bash
npm i @ai-sdk/revai
```

## Provider Instance

You can import the default provider instance `revai` from `@ai-sdk/revai`:

```ts
import { revai } from '@ai-sdk/revai';
```

## Example

```ts
import { revai } from '@ai-sdk/revai';
import { experimental_transcribe as transcribe } from 'ai';

const { text } = await transcribe({
  model: revai.transcription('machine'),
  audio: new URL(
    'https://github.com/vercel/ai/raw/refs/heads/main/examples/ai-core/data/galileo.mp3',
  ),
});
```

## Documentation

<<<<<<< HEAD
Please check out the **[Rev.ai provider documentation](https://ai-sdk.dev/providers/ai-sdk-providers/revai)** for more information.
=======
Please check out the **[Rev.ai provider documentation](https://sdk.vercel.ai/providers/ai-sdk-providers/revai)** for more information.
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
