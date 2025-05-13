import { z } from 'zod'

export const aiChatMessageTypes = z.enum(['system', 'human', 'ai'])

export const aiChatMessage = z.object({
  id: z.string().optional(),
  type: aiChatMessageTypes.default('human'),
  content: z.string(),
})

export const aiChat = z.object({
  id: z.string().optional(),
  messages: z.array(aiChatMessage),
})

export type AIChatMessageType = z.infer<typeof aiChatMessageTypes>
export type AIChatMessage = z.infer<typeof aiChatMessage>
export type AIChat = z.infer<typeof aiChat>

// Add chat to the request object
declare global {
  namespace Express {
    interface Request {
      chat?: AIChat // The chat object added by our middleware
    }
  }
}
