const dotEnvSafe = require('dotenv-safe');

const env = dotEnvSafe.load().required;
const models = require('../models');

models.configure(env).sync({ force: true });
