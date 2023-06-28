const router = require('express').Router();
const challengeRoute = require('./ChallengeRoutes');
const exerciseRoute = require('./ExerciseRoutes');
const userRoutes = require('./UserRoutes');

router.use('/exercises', exerciseRoute);
router.use('/challenges', challengeRoute);
router.use('/users', userRoutes);

module.exports = router;
