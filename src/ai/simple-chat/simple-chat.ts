import { MessageContent } from '@langchain/core/messages'
import simpleChatGraph from './graph'
import { prompt } from './nodes'
import { type AIChat } from '../../types/aiChat'

export async function simpleChat(chat: AIChat): Promise<MessageContent> {
  // Get the prompt from the prompt template
  const messages = await prompt.invoke({
    user_input: chat.messages[0]!.request,
  })

  // Invoke the graph chain with the prompt
  const result = await simpleChatGraph.invoke(messages)

  // Return the last message in the response
  if (
    !result.messages ||
    result.messages.length === 0 ||
    result.messages[result.messages.length - 1]!.getType() !== 'ai'
  ) {
    throw new Error('No response from LLM')
  }
  return result.messages[result.messages.length - 1]!.content
}
