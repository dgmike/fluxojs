const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello world!!!';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

if (!module.parent) {
  app.listen(3000);
}

module.exports = app;
