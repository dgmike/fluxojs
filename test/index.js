const supertest = require('supertest');
const app = require('../index');

const server = app.listen();
const request = supertest.agent(server);

describe('fluxojs', () => {
  after(() => server.close());

  describe('GET /', () => {
    it('sould respond with OK', (done) => {
      request
        .get('/')
        .expect(200)
        .expect(/<h1>FluxoJs<\/h1>/)
        .end(done);
    });
  });
});
