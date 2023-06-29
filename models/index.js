const Challenge = require('./Challenge');
const Exercise = require('./Exercise');
const User = require('./User');
const userExercise = require('./UserExercise');
const exerciseChallenge = require('./ExerciseChallenge');

// Challenge have many Exercises
Challenge.belongsToMany(Exercise, {
  foreignKey: 'challenge_id',
  through: 'exercisechallenge',
});

// Exercise can be assigned to many Challenges
Exercise.belongsToMany(Challenge, {
  foreignKey: 'exercise_id',
  through: 'exercisechallenge',
});

//User has many challenges (although user can only see their current one)
User.hasMany(Challenge, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//challenge belongsTo User
Challenge.belongsTo(User, {
  foreignKey: 'user_id',
});

//User has many exercises
User.belongsToMany(Exercise, {
  foreignKey: 'user_id',
  through: 'userexercise',
});

//exercise can be saved to many users
Exercise.belongsToMany(User, {
  foreignKey: 'exercise_id',
  through: 'userexercise',
});

module.exports = {
  Challenge,
  Exercise,
  User,
  userExercise,
  exerciseChallenge,
};

//challenge = post
//exercise = comments
