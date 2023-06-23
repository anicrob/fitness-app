// need to add router

const Challenge = require('./Challenge');
const Exercise = require('./Exercise');
const User = require('./User');

// Challenge have many Exercises
Challenge.hasMany(Exercise, {
  foreignKey: 'challenge_id',
});

// Exercise belongsTo Challenge
Exercise.belongsTo(Challenge, {
  foreignKey: 'challenge_id',
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

module.exports = {
  Challenge,
  Exercise,
  User,
};
