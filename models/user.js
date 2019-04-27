/* use 'esversion: 6' */

const bcrypt = require('bcrypt');

async function validateUserPassword(username, password) {
  const resource = await this.findOne({
    attributes: ['id', 'password'],
    where: {
      email: username,
    },
  });

  if (!resource) {
    return false;
  }

  return bcrypt.compare(password, resource.password);
}

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const max = 8;
        const min = 5;
        const saltRounds = parseInt((Math.random() * (max - min)) + min, 10);

        const encryptedValue = bcrypt.hashSync(value, saltRounds);
        this.setDataValue('password', encryptedValue);
      },
    },
  });

  Model.associate = () => {
    sequelize.models.user.hasMany(sequelize.models.entrance);
  };

  Model.valid = validateUserPassword.bind(Model);

  return Model;
};
