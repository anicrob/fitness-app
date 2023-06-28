// routes/pages/pageRoutes.js
const router = require('express').Router();
const withAuth = require('../../middleware/auth');
const { User, Exercise, Challenge } = require('../../models');

//render homepage and get all exercises w/ user data
router.get('/', async (req, res) => {
  try {
    // Get all exercises and JOIN with user data
    const exerciseData = await Exercise.findAll();
    // Serialize data so the template can read it
    const exercises = exerciseData.map(exercise =>
      exercise.get({ plain: true })
    );
    console.log('sending exercises>>>>>', exercises);
    // Pass serialized data and session flag into template
    res.render('homepage', {
      ...exercises,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render profile page and send challenge, user, and exercise data
router.get('/profile', async (req, res) => {
  try {
    const challengeData = await Challenge.findOne({
      where: {
        user_id: req.session.logged_in,
        current: true,
      },
      include: [
        {
          model: Exercise,
        },
      ],
    });

    const challenge = challengeData.get({ plain: true });

    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Exercise,
        },
      ],
    });

    const user = userData.get({ plain: true });

    console.log('challenge & user + exercise data>>>', challenge, user);
    res.status(200).json(user);
    res.render('profile', {
      challenge,
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//if not logged in, send to login page, or if already logged in, send to '/dashboard' route
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
