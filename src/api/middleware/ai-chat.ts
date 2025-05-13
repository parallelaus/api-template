import { v4 as uuid } from 'uuid'
import { aiChat } from '../../types/ai-chat'

export function aiChatValidate(req: any, _res: any, next: any) {
  // Parse the request body into an AIChat object
  // Using parse will throw an error if the request body is invalid
  // This is handled by the zodError middleware
  const chat = aiChat.parse(req.body)

  // If chat does not have an id, assign one
  if (!chat.id) {
    chat.id = uuid()
  }

  req.chat = chat

  next()
}
