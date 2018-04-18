const supertest = require('supertest');
const sinon = require('sinon');
const assert = require('assert');
const app = require('../index');

const server = app.listen();

let request = supertest.agent(server).get('/').end(() => {});

describe('fluxojs', () => {
  beforeEach(() => { request = supertest.agent(server); });
  after(() => server.close());

  describe('GET /', () => {
    context('when user is NOT logged', () => {
      it('should respond with OK', (done) => {
        request
          .get('/')
          .expect(200)
          .end(done);
      });

      it('should render a form', (done) => {
        request
          .get('/')
          .expect(/<h1>FluxoJs<\/h1>/)
          .expect(/<form /)
          .expect(/ name="email"/)
          .expect(/ name="password"/)
          .end(done);
      });
    });

    context('when user is logged', () => {
      beforeEach(() => {
        stub = sinon.stub(app.context.models.user, 'valid');
        stub.returns(true);
      });

      afterEach(() => { stub.restore(); });

      it('should redirect to /dashboard', (done) => {
        request
          .post('/login')
          .send({ email: 'michael@dgmike.com.br', password: '1234' })
          .end((err) => {
            if (err) {
              return done(err);
            }

            request
              .get('/')
              .expect(302)
              .expect('Location', '/dashboard')
              .end(done);
          });
      });
    });
  });

  describe('POST /login', () => {
    it('should expect email field', (done) => {
      request
        .post('/login')
        .send({ email: '', password: '1234' })
        .expect(/Login inválido/)
        .expect(422, done);
    });

    it('should expect password field', (done) => {
      request
        .post('/login')
        .send({ email: 'michael@dgmike.com.br', password: '' })
        .expect(/Login inválido/)
        .expect(422, done);
    });

    it('should call user#valid method', (done) => {
      const stub = sinon.stub(app.context.models.user, 'valid');
      stub.returns(true);

      request
        .post('/login')
        .send({ email: 'michael@dgmike.com.br', password: '1234' })
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

      it('should create logged cookie', (done) => {
        request
          .post('/login')
          .send({ email: 'michael@dgmike.com.br', password: '1234' })
          .expect('set-cookie', /fluxojs:sess/)
          .end(done);
      });

      it('should redirect user', (done) => {
        request
          .post('/login')
          .send({ email: 'michael@dgmike.com.br', password: '1234' })
          .expect(302)
          .expect('Location', '/')
          .end(done);
      });
    });

    context('with wrong access', () => {
      let stub;

      beforeEach(() => {
        stub = sinon.stub(app.context.models.user, 'valid');
        stub.returns(false);
      });

      afterEach(() => { stub.restore(); });

      it('should not create logged cookie', (done) => {
        request
          .post('/login')
          .send({ email: 'michael@dgmike.com.br', password: '1234' })
          .expect((res) => {
              if (res.headers['set-cookie']) {
                throw new Error('"set-cookie" header exists in response');
              }
          })
          .end(done);
      });

      it('should not redirect user', (done) => {
        request
          .post('/login')
          .send({ email: 'michael@dgmike.com.br', password: '1234' })
          .expect(/Login inválido/)
          .expect(401)
          .end(done);
      });
    });
  });

  describe('GET /dashboard', () => {
    context('when user is NOT logged', () => {
      it('should redirect to homepage', (done) => {
        request
          .get('/dashboard')
          .expect(302)
          .expect('Location', '/')
          .end(done);
      });
    });

    context('when user is logged', () => {
      beforeEach((done) => {
        stub = sinon.stub(app.context.models.user, 'valid');
        stub.returns(true);

        request
          .post('/login')
          .send({ email: 'michael@dgmike.com.br', password: '1234' })
          .end(done);
      });

      afterEach(() => { stub.restore(); });

      it('should have logout link', (done) => {
        request
          .get('/dashboard')
          .expect(/href="\/logout"/)
          .end(done);
      });
    });
  });

  describe('GET /logout', () => {
    context('when user is NOT logged', () => {
      it('should redirect to homepage', (done) => {
        request
          .get('/logout')
          .expect(302)
          .expect('Location', '/')
          .end(done);
      });

      it.skip('should clear cookies', (done) => {
        request
          .get('/logout')
          .expect((res) => {
            if (res.headers['set-cookie']) {
              throw new Error('"set-cookie" header exists in response: ' + JSON.stringify(res.headers));
            }
          })
          .end(done);
      });
    });

    context('when user is logged', () => {
      beforeEach((done) => {
        stub = sinon.stub(app.context.models.user, 'valid');
        stub.returns(true);

        request
          .post('/login')
          .send({ email: 'michael@dgmike.com.br', password: '1234' })
          .end(done);
      });

      afterEach(() => { stub.restore(); });

      it('should redirect to root', (done) => {
        request
          .get('/logout')
          .expect('Location', '/')
          .expect(302)
          .end(done);
      });

      it.skip('should clear cookies', (done) => {
        request
          .get('/logout')
          .expect((res) => {
            if (res.headers['set-cookie']) {
              throw new Error('"set-cookie" header exists in response: ' + JSON.stringify(res.headers));
            }
          })
          .end(done);
      });
    });
  });
});
