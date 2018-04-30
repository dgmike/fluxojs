const dotEnvSafe = require('dotenv-safe');
const models = require('../models');

const env = dotEnvSafe.load().required;

const sequelize = models.configure(env);

const seed = async () => {
  const user = await sequelize.models.user.create({
    email: 'michael@dgmike.com.br',
    password: '1234',
  });

  await user.createEntrance({
    year: 2018,
    month: 4,
    day: 30,
    status: 'uncommited',
    estimate: 432.2,
  });

  await user.createEntrance({
    year: 2018,
    month: 4,
    day: 18,
    status: 'commited',
    estimate: 233.4,
    real: 230
  });
};

seed();
