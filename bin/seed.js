const dotEnvSafe = require('dotenv-safe');
const models = require('../models');

const env = dotEnvSafe.load().required;

const sequelize = models.configure(env);

const seed = async () => {
  await sequelize.models.user.create({
    email: 'michael@dgmike.com.br',
    password: '1234',
  });
};

seed();
