const supertest = require('supertest');
const sinon = require('sinon');
const assert = require('assert');
const app = require('../index');

const server = app.listen();
const request = supertest.agent(server);

describe('fluxojs', () => {
  after(() => server.close());

  describe('GET /', () => {
    it('should respond with OK', (done) => {
      request
        .get('/')
        .expect(200)
        .expect(/<h1>FluxoJs<\/h1>/)
        .expect(/<form/)
        .expect(/name="email"/)
        .expect(/name="password"/)
        .end(done);
    });
  });

  describe('POST /login', () => {
    it('should expect email field', (done) => {
      request
        .post('/login')
        .field('email', '')
        .field('password', '1234')
        .expect(422, done);
    });

    it('should expect password field', (done) => {
      request
        .post('/login')
        .field('email', 'michael@dgmike.com')
        .field('password', '')
        .expect(422, done);
    });

    it('should redirect to root', (done) => {
      request
        .post('/login')
        .field('email', 'michael@dgmike.com')
        .field('password', '1234')
        .expect(302)
        .expect('Location', '/', done);
    });

    it('should call user#valid method', (done) => {
      const stub = sinon.stub(app.context.models.user, 'valid');
      stub.returns(true);

      request
        .post('/login')
        .field('email', 'michael@dgmike.com')
        .field('password', '1234')
        .end(() => {
          assert(stub.calledOnce);
          stub.restore();
          done();
        })
    });

    context('with right access', () => {
      let stub;

      before(() => {
        stub = sinon.stub(app.context.models.user, 'valid');
        stub.returns(true);
      });

      after(() => { stub.restore(); });

      it('should create logged cookie');
      it('should redirect user');
    });

    context('with wrong access', () => {
      let stub;

      before(() => {
        stub = sinon.stub(app.context.models.user, 'valid');
        stub.returns(false);
      });

      after(() => { stub.restore(); });

      it('should not create logged cookie');
      it('should redirect user');
    });
  });
});
