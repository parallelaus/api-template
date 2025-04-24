import { ZodError } from 'zod'
import { Environment } from '../../environment'

/**
 * Catch app error handling.
 *
 * This should never be called as each API endpoint should handle all
 * potential errors, this is just a catch-all for any errors that slip through
 *
 * @param error
 *
 * @param _req
 * @param _res
 * @param next
 */
export function zodError(error: any, _req: any, res: any, next: any) {
  if (error instanceof ZodError) {
    if (Environment.server.node_env === 'development') {
      res.status(400).send(error)
    } else {
      res
        .status(400)
        .send(
          'Request body validation failed. Please check structure of body data.',
        )
    }
  } else {
    next(error)
  }
}
