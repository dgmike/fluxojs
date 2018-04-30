const bcrypt = require('bcrypt');

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
        const max = 15;
        const min = 5;
        const saltRounds = parseInt((Math.random() * (max - min)) + min, 10);

        const encryptedValue = bcrypt.hashSync(value, saltRounds);
        this.setDataValue('password', encryptedValue);
      },
    },
  });

  Model.associate = (sequelize) => {
    sequelize.models.user.hasMany(sequelize.models.entrance);
  };

  Model.valid = async (username, password) => {
    const resource = await Model.findOne({
      attributes: ['id', 'password'],
      where: {
        email: username,
      },
    });

    if (!resource) {
      return false;
    }

    return bcrypt.compareSync(password, resource.password);
  };

  return Model;
};
