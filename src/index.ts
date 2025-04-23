import api from './api'
import { Environment } from './environment'

// // Start API Service
api.listen(Environment.server.port, () => {
  console.info(`API Server started`)
  console.info(`  Port: ${Environment.server.port}`)
  console.info(`  Server Environment: ${Environment.server.node_env}`)
  console.info(`  Server Mode: ${Environment.server.mode}`)
})
