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
    },
  });

  // Model.associate = (sequelize) => {};

  Model.valid = async (username, password) => {
    const resource = await Model.findOne({
        email: username,
      });

    if (!resource) {
      return false;
    }

    return resource.password === password;
  }

  return Model;
};
