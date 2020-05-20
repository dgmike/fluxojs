const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = {
  configure(env) {
    const sequelize = new Sequelize.Sequelize(env.DATABASE, {});

    fs.readdirSync(__dirname)
      .filter((f) => f !== 'index.js' && f.match(/\.js$/))
      .map((f) => f.replace(/\.js/, ''))
      .map((name) => {
        const file = path.join(__dirname, name);
        const modelCreator = require(file);
        modelCreator(sequelize, Sequelize.DataTypes)

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
