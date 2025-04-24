/**
 * Nodes defines the components of the chat graph
 */
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { MessagesAnnotation } from '@langchain/langgraph'
import { ChatOpenAI } from '@langchain/openai'

// Define LLM
const llm = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
})

// Define prompt
export const prompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    'You talk like a pirate. Answer all questions to the best of your ability.',
  ],
  ['user', '{user_input}'],
])

export async function callModel(
  state: typeof MessagesAnnotation.State,
): Promise<typeof MessagesAnnotation.State> {
  const response = await llm.invoke(state.messages)
  // Append the messages to the state
  return { messages: [response] }
}
