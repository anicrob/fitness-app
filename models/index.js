const Challenge = require('./Challenge');
const Exercise = require('./Exercise');
const User = require('./User');

User.hasMany(Challenge, {
  foreignKey: 'user_id',
});

Exercise.hasMany(Challenge, {
  foreignKey: 'exercise_id',
});

Exercise.hasMany(User, {
  foreignKey: 'exercise_id',
});

module.exports = {
  Challenge,
  Exercise,
  User,
};

//challenge = post
//exercise = comments
