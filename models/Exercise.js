const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');
const { removeUnderscore } = require('../utils/helpers');

class Exercise extends Model {
  // removeUnderscore(property) {
  //   try {
  //     if (property.includes('_')) {
  //       const words = property.split('_');
  //       const wordsWithSpaces = words.join(' ');
  //       return wordsWithSpaces;
  //     } else {
  //       return property;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}

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
  },
  // {
  //   hooks: {
  //     async beforeCreate(newExerciseData) {
  //       if (
  //         newExerciseData.type.includes('_') ||
  //         newExerciseData.muscle.includes('_') ||
  //         newExerciseData.equipment.includes('_')
  //       ) {
  //         newUserData.type = await removeUnderscore(newExerciseData.type);
  //         newUserData.muscle = await removeUnderscore(newExerciseData.muscle);
  //         newUserData.equipment = await removeUnderscore(
  //           newExerciseData.equipmment
  //         );
  //         return newExerciseData;
  //       } else {
  //         return newExerciseData;
  //       }
  //     },
  //   },
  // },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'exercise',
  }
);

module.exports = Exercise;
