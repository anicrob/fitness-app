const Challenge = require('./Challenge');
const Exercise = require('./Exercise');
const User = require('./User');

// Challenge have many Exercises
Challenge.hasMany(Exercise, {
  foreignKey: 'challenge_id',
});

//User has many challenges (although user can only see their current one)
User.hasMany(Challenge, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//User has many exercises
User.hasMany(Exercise, {
  foreignKey: 'user_id',
});

module.exports = {
  Challenge,
  Exercise,
  User,
};

//challenge = post
//exercise = comments
