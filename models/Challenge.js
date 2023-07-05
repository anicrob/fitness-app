const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class Challenge extends Model {}

Challenge.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    current: {
      type: DataTypes.BOOLEAN,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'challenge',
  }
);

module.exports = Challenge;
