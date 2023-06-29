const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class UserExercise extends Model {}

UserExercise.init(
  {
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: 'user',
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
    modelName: 'userexercise',
  }
);

module.exports = UserExercise;
