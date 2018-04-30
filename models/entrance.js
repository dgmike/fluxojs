module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('entrance', {
    year: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        min: 1000,
        max: 9999,
      },
    },
    month: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        min: 1,
        max: 12,
      },
    },
    day: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        min: 1,
        max: 31,
      },
    },
    estimate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    real: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['uncommited', 'commited'],
      allowNull: false,
    },
  });

  Model.associate = () => {
    sequelize.models.entrance.belongsTo(sequelize.models.user);
  };

  return Model;
};
