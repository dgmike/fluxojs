const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = {
  configure(env) {
    const sequelize = new Sequelize(env.DATABASE, {});

    fs.readdirSync(__dirname)
      .filter(f => f !== 'index.js' && f.match(/\.js$/))
      .map(f => f.replace(/\.js/, ''))
      .map((name) => {
        const file = path.join(__dirname, name);
        sequelize.import(file);

        return name;
      })
      .forEach((name) => {
        const model = sequelize.model(name);

        if (Object.hasOwnProperty.call(model, 'associate')) {
          model.associate(sequelize);
        }
      });

    return sequelize;
  },
};
