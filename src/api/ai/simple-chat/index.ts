import { RequestHandler, Router } from 'express'
import {
  simpleChat,
  simpleChatStream,
} from '../../../ai/simple-chat/simple-chat'
import { StateToChat } from '../../../api/utils/output-state'
import { setStreamingHeaders } from '../../../api/utils/output-state'

const chat: RequestHandler = async (req, res): Promise<any> => {
  // Invoke the simple chat function
  // req.chat is guaranteed to be defined here, otherwise middleware would have thrown an error
  const stateToChat = new StateToChat(req.chat!.id!)
  res.json(stateToChat.stateToChat(await simpleChat(req.chat!)))
}

const chatStream: RequestHandler = async (req, res): Promise<any> => {
  // Invoke the simple chat function
  // req.chat is guaranteed to be defined here, otherwise middleware would have thrown an error
  // Set the response headers
  setStreamingHeaders(res)

  const stream = await simpleChatStream(req.chat!)
  const stateToChat = new StateToChat(req.chat!.id!)

  for await (const chunk of stream) {
    res.write(`${JSON.stringify(stateToChat.streamValuesToChat(chunk))}\n`)
  }

  return res.end()
}

// Route Definition: /ai/simple-chat
const router = Router()

router.post('/', chat)
router.post('/stream', chatStream)

export default router
