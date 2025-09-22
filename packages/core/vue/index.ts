import {
  useChat as useChatVue,
  useCompletion as useCompletionVue,
} from '@ai-sdk/vue';

/**
 * @deprecated Use `useChat` from `@ai-sdk/vue` instead.
 */
export const useChat = useChatVue;

/**
 * @deprecated Use `useCompletion` from `@ai-sdk/vue` instead.
 */
export const useCompletion = useCompletionVue;

/**
 * @deprecated Use `@ai-sdk/vue` instead.
 */
export type {
  CreateMessage,
  Message,
  UseChatOptions,
  UseChatHelpers,
} from '@ai-sdk/vue';
