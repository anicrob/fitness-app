const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class ExerciseChallenge extends Model {}

ExerciseChallenge.init(
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
    },
    exercise_id: {
      type: DataTypes.INTEGER,
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
    modelName: 'exercisechallenge',
  }
);

module.exports = ExerciseChallenge;
