const router = require('express').Router();
const sequelize = require('../../db/config');
const {
  User,
  Exercise,
  Challenge,
  UserExercise,
  ExerciseChallenge,
} = require('../../models');

//get user's info
router.get('/', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Exercise,
          through: UserExercise,
        },
        { model: Challenge },
      ],
      attributes: {
        exclude: ['password'],
      },
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create();

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//update user's details - for age, height and BMI only!
router.put('/update', async (req, res) => {
  try {
    const updatedUser = await User.update(...req.body, {
      where: {
        id: req.session.user_id,
      },
    });

    if (!updatedUser) {
      res.status(404).json({ message: 'No user was found' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});
//update numSaved exercises
router.put('/numSavedExercises', async (req, res) => {
  //find all of the exercises the user has saved
  try {
    const savedExercises = await UserExercise.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: {
        exclude: ['user_id'],
      },
    });

    //get the numSavedExercises from length of the savedExercises array
    const numSavedExercises = savedExercises.length;

    //if they have saved exercises, update the user's profile w/ the number of saved exercises
    if (numSavedExercises > 0) {
      try {
        const updatedUser = await User.update(
          { numSavedExercises },
          {
            where: {
              id: req.session.user_id,
            },
          }
        );

        if (!updatedUser) {
          res.status(404).json({ message: 'No user was found' });
          return;
        }

        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      //if they don't have saved exercises, update the user's profile w/ numSavedExercises = null,
      //so the handlebars if function will show message for user to save an exercise
      try {
        const updatedUser = await User.update(
          { numSavedExercises: null },
          {
            where: {
              id: req.session.user_id,
            },
          }
        );

        if (!updatedUser) {
          res.status(404).json({ message: 'No user was found' });
          return;
        }

        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//update numCompletedChallenges
router.put('/numCompletedChallenges', async (req, res) => {
  try {
    const completedChallenges = await Challenge.findAll({
      where: {
        user_id: req.session.user_id,
        completed: true,
      },
      attributes: {
        include: ['challenge_id'],
      },
    });
    const numCompletedChallenges = completedChallenges.length;
    if (numCompletedChallenges > 0) {
      try {
        const updatedUser = await User.update(
          { numCompletedChallenges },
          {
            where: {
              id: req.session.user_id,
            },
          }
        );

        if (!updatedUser) {
          res.status(404).json({ message: 'No user was found' });
          return;
        }

        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else return;
  } catch (err) {
    res.status(500).json(err);
  }
});

//login the user - this creates a new session
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//logout the user - this deletes the session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
