import { app } from '../server'
import request from 'supertest'

describe('Author Routes', () => {
  it('should return all authors', () => {
    return request(app)
      .get('/api/author')
      .then((res) => expect(res.statusCode).toBe(200))
  })

  it('should error when delete the author', () => {
    return request(app)
      .delete('/api/author/7')
      .then((res) => (expect(res.text).toBe('error')))
  })
})