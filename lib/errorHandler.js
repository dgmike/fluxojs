const HttpErrors = require('http-errors');

module.exports = {
  json(ctx, errors, code = 422) {
    const errorObj = {
      code,
      message: (new HttpErrors(code).message),
      errors,
    };

    ctx.status = code;
    ctx.type = 'json';
    ctx.body = JSON.stringify(errorObj);

    return ctx;
  },
};
