const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class Exercise extends Model {}

Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    muscle: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    equipment: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    difficulty: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    instructions: {
      type: DataTypes.STRING(3500),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
        unique: false,
      },
    },
    challenge_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'challenge',
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
    modelName: 'exercise',
  }
);

module.exports = Exercise;
