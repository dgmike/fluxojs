const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const static = require('koa-static');

const app = new Koa();
const router = new Router();

app.use(views(`${__dirname}/views`, { extension: 'pug' }));
app.use(static(`${__dirname}/static`));

router.get('/', async (ctx) => {
  await ctx.render('index');
});

router.post('/login', async (ctx) => {
  ctx.redirect('/');
});

app
  .use(router.routes())
  .use(router.allowedMethods());

if (!module.parent) {
  app.listen(3000);
}

module.exports = app;
