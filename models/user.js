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

  Model.valid = (username, password) => {
    return username === 'michael@dgmike.com.br' && password === '1234';
  };

  return Model;
};
