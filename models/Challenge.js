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
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'exercise',
        key: 'id',
        unique: false,
      },
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
