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
export function error(error: any, _req: any, res: any, _next: any) {
  if (Environment.server.node_env === 'development') {
    console.error(error)
    res.status(500).send(error)
  }

  // Catch all error response
  // TBD: Notify developers
  res
    .status(500)
    .send(
      'Internal Server Error: Staff have been notified of the problem, please try again later.',
    )
}
