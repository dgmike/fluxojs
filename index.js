const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const static = require('koa-static');
const koaBody = require('koa-body');

const models = require('./models');

const app = new Koa();
const router = new Router();

app.use(koaBody({ multipart: true }));
app.use(views(`${__dirname}/views`, { extension: 'pug' }));
app.use(static(`${__dirname}/static`));

app.context.models = models;

router.get('root', '/', async (ctx) => {
  await ctx.render('index');
});

router.post('/login', async (ctx) => {
  const email = ctx.request.body.fields.email;
  const password = ctx.request.body.fields.password;

  if (!email || !password) {
    ctx.status = 422;
    return;
  }

  const valid = await ctx.models.user.valid(email, password);

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
