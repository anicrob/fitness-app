const router = require('express').Router();
const challengeRoute = require('./ChallengeRoutes');
const exerciseRoute = require('./ExerciseRoutes');
const userRoutes = require('./UserRoutes');

router.use('/exercise', exerciseRoute);
router.use('/challenge', challengeRoute);
router.use('/user', userRoutes);

module.exports = router;
