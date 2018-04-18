const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const static = require('koa-static');
const koaBody = require('koa-body');
const session = require('koa-session');

const models = require('./models');

const app = new Koa();
const router = new Router();

app.keys = (process.env.SECRET_KEYS || 'some secret key').split(',');

const SESSION_CONFIG = {
  key: 'fluxojs:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(koaBody());
app.use(views(`${__dirname}/views`, { extension: 'pug' }));
app.use(static(`${__dirname}/static`));
app.use(session(SESSION_CONFIG, app));

app.context.models = models;

router.get('root', '/', async (ctx) => {
  await ctx.render('index');
});

router.post('/login', async (ctx) => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;

  if (!email || !password) {
    ctx.status = 422;
    await ctx.render('index', { email, password, error: 'Login inválido' });
    return;
  }

  const valid = await ctx.models.user.valid(email, password);

  if (!valid) {
    ctx.status = 401;
    await ctx.render('index', { email, password, error: 'Login inválido' });
    return;
  }

  ctx.session.logged = true;
  ctx.session.email = email;
  ctx.redirect(router.url('root'));
});

app
  .use(router.routes())
  .use(router.allowedMethods());

if (!module.parent) {
  const port = process.env.PORT || '3000';

  app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
  });
}

module.exports = app;
