// routes/pages/pageRoutes.js
const router = require('express').Router();
const isAuthenticated = require('../../middleware/isAuthenticated');
const {
  User,
  Exercise,
  Challenge,
  UserExercise,
  ExerciseChallenge,
} = require('../../models');

//render homepage and get all exercises w/ user data
router.get('/', isAuthenticated, async (req, res) => {
  try {
    // Get all exercises and JOIN with user data
    const exerciseData = await Exercise.findAll();
    // Serialize data so the template can read it
    const exercises = exerciseData.map(exercise =>
      exercise.get({ plain: true })
    );
    // Pass serialized data and session flag into template
    res.render('homepage', {
      exercises,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render profile page and send challenge, user, and exercise data
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Exercise, through: UserExercise }],
      attributes: {
        exclude: ['password'],
      },
    });
    const user = userData.get({ plain: true });

    const challengeData = await Challenge.findOne({
      where: {
        user_id: req.session.user_id,
        current: true,
      },
      include: [
        {
          model: Exercise,
          through: ExerciseChallenge,
        },
      ],
    });
    if (!challengeData) {
      // No challenge found
      console.log('No challenge found for the user');
      res.render('profile', {
        user,
        challenge: null,
        logged_in: req.session.logged_in,
      });
      return;
    }
    const challenge = challengeData.get({ plain: true });

    res.render('profile', {
      user,
      challenge,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//if not logged in, send to login page, or if already logged in, send to '/' route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//send to signup (register) page
router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('register');
});

module.exports = router;
