/**
 * Basic API sanity checks
 * API: /
 */
import request from 'supertest'
import api from '../../src/api'
import { Environment } from '../../src/environment'

beforeAll(async () => {})

afterAll(async () => {})

describe('API: /', () => {
  it('GET /health-check - returns OK', async () => {
    const res = await request(api).get('/health-check')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual(Environment.server.status)

    // Check that helmet is doing it's thing
    expect(res.headers['x-powered-by']).not.toBeDefined()
  })

  it('GET / - Invalid API Endpoint', async () => {
    const res = await request(api).get('/')
    expect(res.statusCode).toEqual(400)
    expect(res.text).toEqual('Invalid API Endpoint')
    expect(res.headers['x-powered-by']).not.toBeDefined()
  })

  it('GET /user - Invalid API Endpoint', async () => {
    const res = await request(api).get('/user')
    expect(res.statusCode).toEqual(400)
    expect(res.text).toEqual('Invalid API Endpoint')
    expect(res.headers['x-powered-by']).not.toBeDefined()
  })

  it('GET /v1 - invalid API endpoint', async () => {
    const res = await request(api).get('/v1')
    expect(res.statusCode).toEqual(400)
    expect(res.text).toEqual('Invalid API Endpoint')
    expect(res.headers['x-powered-by']).not.toBeDefined()
  })

  it('GET /v1/dskfjhsdkfj - invalid API endpoint', async () => {
    const res = await request(api).get('/v1/dskfjhsdkfj')
    expect(res.statusCode).toEqual(400)
    expect(res.text).toEqual('Invalid API Endpoint')
    expect(res.headers['x-powered-by']).not.toBeDefined()
  })
})
