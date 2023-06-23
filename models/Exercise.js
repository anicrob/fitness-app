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
    challenge_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'challenge',
        key: 'id',
        unique: false,
      },
      //other properties to add
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
