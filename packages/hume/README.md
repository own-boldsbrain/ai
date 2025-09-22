# AI SDK - Hume Provider

<<<<<<< HEAD
The **[Hume provider](https://ai-sdk.dev/providers/ai-sdk-providers/hume)** for the [AI SDK](https://ai-sdk.dev/docs)
=======
The **[Hume provider](https://sdk.vercel.ai/providers/ai-sdk-providers/hume)** for the [AI SDK](https://sdk.vercel.ai/docs)
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
contains support for the Hume API.

## Setup

The Hume provider is available in the `@ai-sdk/hume` module. You can install it with

```bash
npm i @ai-sdk/hume
```

## Provider Instance

<<<<<<< HEAD
You can import the default provider instance `hume` from `@ai-sdk/hume`:
=======
You can import the default provider instance `lmnt` from `@ai-sdk/lmnt`:
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017

```ts
import { hume } from '@ai-sdk/hume';
```

## Example

```ts
import { hume } from '@ai-sdk/hume';
import { experimental_generateSpeech as generateSpeech } from 'ai';

const result = await generateSpeech({
  model: hume.speech('aurora'),
  text: 'Hello, world!',
});
```

## Documentation

<<<<<<< HEAD
Please check out the **[Hume provider documentation](https://ai-sdk.dev/providers/ai-sdk-providers/hume)** for more information.
=======
Please check out the **[Hume provider documentation](https://sdk.vercel.ai/providers/ai-sdk-providers/hume)** for more information.
>>>>>>> 7206b1f58a6c3fc6d4442999569e2679c28e9017
