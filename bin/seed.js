const dotEnvSafe = require('dotenv-safe');
const moment = require('moment');
const Chance = require('chance');
const models = require('../models');

const env = dotEnvSafe.load().required;

const sequelize = models.configure(env);

const seed = async () => {
  const user = await sequelize.model('user').create({
    email: 'michael@dgmike.com.br',
    password: '1234',
  });

  const chance = Chance();
  const year = moment().year();

  const entrances = Array(200).fill(true).map(() => {
    const month = chance.month({ raw: true });
    const day = chance.integer({ min: 1, max: month.days });
    const description = chance.sentence();
    const status = chance.pickone(['commited', 'uncommited']);
    const estimate = chance.floating({ fixed: 2, min: -1000, max: 1000 });
    const real = chance.pickone([
      null,
      chance.floating({ fixed: 2, min: estimate - 100, max: estimate + 100 }),
    ]);

    return {
      year,
      month: parseInt(month.numeric, 10),
      day,
      description,
      status,
      estimate,
      real,
      userId: user.id,
    };
  });

  await sequelize.model('entrance').bulkCreate(entrances);
};

seed();
