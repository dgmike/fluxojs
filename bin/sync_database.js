const dotEnvSafe = require('dotenv-safe');
const models = require('../models');

const env = dotEnvSafe.load().required;

models.configure(env).sync({ force: true });
