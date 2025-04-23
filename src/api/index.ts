/**
 * API Definition
 */
import express, { Router } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { Environment } from '../environment'

const router = Router()

// Respond to healthcheck
router.get('/health-check', function (_req, res) {
  res.send(Environment.server.status)
})

// Bind the /v1 API Endpoints
// router.use('/v1', v1)

// Disallow robots
router.use('/robots.txt', function (_req, res) {
  res.type('text/plain').send('User-Agent: *\nDisallow: /')
})

// Catch all other requests
router.all(/(.*)/, function (_req, res) {
  res.status(400).send('Invalid API Endpoint')
})

const api = express()

api.use(cors())
api.use(helmet())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))

api.use(router)
export default api
