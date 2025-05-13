import simpleChatGraph from './graph'
import { prompt } from './nodes'
import { type AIChat } from '../../types/ai-chat'
import { MessagesAnnotation } from '@langchain/langgraph'
import { IterableReadableStream } from '@langchain/core/utils/stream'

/**
 * Handles a simple chat request (no memory, single question/answer)
 * @param chat The chat object
 * @returns The response from the LLM
 */
export async function simpleChat(
  chat: AIChat,
): Promise<typeof MessagesAnnotation.State> {
  // Get the prompt from the prompt template
  const messages = await prompt.invoke({
    user_input: chat.messages[0]!.content,
  })

  // Invoke the graph chain with the prompt
  return await simpleChatGraph.invoke(messages, {
    configurable: { thread_id: chat.id! },
  })
}

export async function simpleChatStream(
  chat: AIChat,
): Promise<IterableReadableStream<typeof MessagesAnnotation.State>> {
  // Get the prompt from the prompt template
  const messages = await prompt.invoke({
    user_input: chat.messages[0]!.content,
  })

  // Invoke the graph chain with the prompt
  return await simpleChatGraph.stream(messages, {
    configurable: { thread_id: chat.id! },
    streamMode: 'values',
  })
}
