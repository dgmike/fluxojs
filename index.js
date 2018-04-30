const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');
const session = require('koa-session');
const dotEnvSafe = require('dotenv-safe');
const models = require('./models');
const morgan = require('koa-morgan');
const errorHandler = require('./lib/errorHandler');

const env = dotEnvSafe.load().required;

const app = new Koa();

const router = new Router();

app.keys = (env.SECRET_KEYS || 'some secret key').split(',');

const SESSION_CONFIG = {
  key: 'fluxojs:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || "session") maxAge in ms (default is 1 days) */
  /** "session" will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every
                      response. The expiration is reset to the original maxAge, resetting
                      the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can
                    always keep user logged in. (default is false) */
};

app.use(koaBody());
app.use(views(`${__dirname}/views`, { extension: 'pug' }));
app.use(koaStatic(`${__dirname}/static`));
app.use(session(SESSION_CONFIG, app));
app.use(morgan('combined'));

app.context.models = models.configure(env).models;

router.get('root', '/', async (ctx) => {
  if (ctx.session.logged) {
    ctx.redirect(router.url('dashboard'));
    return;
  }
  await ctx.render('index');
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;

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

router.get('dashboard', '/dashboard', async (ctx) => {
  if (!ctx.session.logged) {
    return ctx.redirect(router.url('root'));
  }

  return ctx.render('dashboard', { router });
});

router.get('logout', '/logout', async (ctx) => {
  ctx.session = null;
  ctx.redirect(router.url('root'));
});

/**
 * API
 */

const middlewareIsLogged = (ctx, next) => {
  if (!ctx.session.logged) {
    return ctx.throw(401);
  }

  return next();
};

const errorFieldCheck = (opts) => {
  if (!(opts.value || '').match(opts.regexp)) {
    return errorHandler.json(
      opts.ctx,
      [
        {
          path: `/${opts.field}`,
          message: `${opts.field} field is empty or invalid`,
        },
      ],
    );
  }
  return false;
};

const validateMonthYear = (ctx, next) => {
  const { year, month } = ctx.query;

  let error;

  error = errorFieldCheck({
    ctx,
    field: 'year',
    value: year,
    regex: /^[1-9]\d{3}$/,
  });

  if (error) {
    return error;
  }

  error = errorFieldCheck({
    ctx,
    field: 'month',
    value: month,
    regex: /^(\0?\d|1[12])$/,
  });

  if (error) {
    return error;
  }

  return next();
};

router.get('api.entrances.fetch', '/api/entrances', middlewareIsLogged, validateMonthYear, async (ctx) => {
  const { year, month } = ctx.query;

  const entrances = await ctx.models.entrance.findAll({
    attributes: ['id', 'year', 'month', 'day', 'real', 'estimate', 'status'],
    where: {
      year,
      month,
      '$user.email$': ctx.session.email,
    },
    include: [
      {
        model: ctx.models.user,
        attributes: [],
      },
    ],
  });

  ctx.body = { entrances };
  return ctx;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

/* istanbul ignore if */
if (!module.parent) {
  const port = env.PORT || '3000';

  app.listen(port, () => {
    process.stdout.write(`Running on http://localhost:${port}\n`);
  });
}

module.exports = app;
