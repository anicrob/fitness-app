const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class ExerciseChallenge extends Model {}

ExerciseChallenge.init(
  {
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
      },
    },
    numExercises: {
      type: DataTypes.INTEGER,
      unique: false,
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
