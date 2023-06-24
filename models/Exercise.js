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
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    muscle: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    equipment: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    difficulty: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: true,
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
