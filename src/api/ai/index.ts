/**
 * Defines API: /ai
 */
import { Router } from 'express'
import simpleChat from './simple-chat'
import { aiChatValidate } from '../middleware/ai-chat'

const router = Router()

// Validate AI Chat before passing it to AI chat functions
router.use(aiChatValidate)

router.use('/simple-chat', simpleChat)

export default router
