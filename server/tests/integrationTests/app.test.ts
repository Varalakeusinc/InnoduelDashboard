import request from 'supertest'
import app from '../../app'

jest.mock('../../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}))

describe('Integration Tests for the Root Endpoint', () => {
  describe('GET /', () => {
    let response: request.Response

    beforeAll(async () => {
      response = await request(app).get('/')
    })

    it('should return content-type as JSON or HTML', () => {
      expect(response.header['content-type']).toMatch(/(html|json)/)
    })
  })
})
