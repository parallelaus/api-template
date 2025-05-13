import { MessagesAnnotation } from '@langchain/langgraph'
import { BaseMessage, MessageType } from '@langchain/core/messages'
import { AIChat, AIChatMessage, AIChatMessageType } from '../../types/ai-chat'

function mapMessageType(type: MessageType): AIChatMessageType {
  switch (type) {
    case 'human':
      return 'human'
    case 'ai':
      return 'ai'
    case 'system':
      return 'system'
    default:
      throw new Error('Invalid message type')
  }
}

function messageToChatMessage(message: BaseMessage): AIChatMessage {
  return {
    id: message.id,
    type: mapMessageType(message.getType()),
    content: message.content as string,
  }
}

export class StateToChat {
  private threadId: string = ''
  private sentMessages: string[] = []

  constructor(thread_id: string) {
    this.threadId = thread_id
  }

  /**
   * Converts a state object to a chat object
   *
   * @param state The state object from the langchain graph
   * @returns The chat object
   */
  public stateToChat(state: typeof MessagesAnnotation.State): AIChat {
    return {
      id: this.threadId,
      messages: state.messages
        .map((message) => messageToChatMessage(message))
        .filter((message) => message.type !== 'system'),
    }
  }

  /**
   * Converts a stream of messages (streamMode: values) to a chat object by appending
   * each message to the chat object.
   *
   * If the message has already been appended, it is skipped.
   *
   * @param state The state object from the langchain graph
   * @returns The chat object
   */
  public streamValuesToChat(state: typeof MessagesAnnotation.State): AIChat {
    return {
      id: this.threadId,
      messages: state.messages
        .map((message) => {
          if (this.sentMessages.includes(message.id!)) {
            return null
          }

          const output = messageToChatMessage(message)
          this.sentMessages.push(message.id!)
          return output
        })
        .filter((message) => message !== null),
    }
  }
}

export function setStreamingHeaders(res: any) {
  // Set response buffers
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no') // Disable Nginx buffering if using Nginx
}
