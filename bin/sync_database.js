const dotEnvSafe = require('dotenv-safe');
const models = require('../models');

const env = dotEnvSafe.config().required;

models.configure(env).sync({ force: true });
