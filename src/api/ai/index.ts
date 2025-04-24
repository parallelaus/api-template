/**
 * Defines API: /ai
 */
import { Router } from 'express'
import simpleChat from './simple-chat'

const router = Router()

router.use('/simple-chat', simpleChat)

export default router
