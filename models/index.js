const Challenge = require('./Challenge');
const Exercise = require('./Exercise');
const User = require('./User');

User.hasMany(Challenge, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Challenge.belongsTo(User, {
  foreignKey: 'user_id',
});

Challenge.hasMany(Exercise, {
  foreignKey: 'exercise_id',
});

Exercise.belongsTo(Challenge, {
  foreignKey: 'exercise_id',
});

User.hasMany(Exercise, {
  foreignKey: 'exercise_id',
});

Exercise.belongsTo(User, {
  foreignKey: 'exercise_id',
});

module.exports = {
  Challenge,
  Exercise,
  User,
};

//challenge = post
//exercise = comments
