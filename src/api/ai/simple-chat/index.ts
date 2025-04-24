import { RequestHandler, Router } from 'express'
import { simpleChat } from '../../../ai/simple-chat/simple-chat'
import { aiChat } from '../../../types/aiChat'

const chat: RequestHandler = async (req, res): Promise<any> => {
  // Parse the request body into an AIChat object
  // Using parse will throw an error if the request body is invalid
  // This is handled by the zodError middleware
  const chat = aiChat.parse(req.body)
  const result = await simpleChat(chat)
  res.json(result)
}

// Route Definition: /ai/simple-chat
const router = Router()

router.post('/', chat)

export default router
