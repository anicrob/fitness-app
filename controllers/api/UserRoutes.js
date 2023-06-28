const router = require('express').Router();
const { User, Exercise, Challenge } = require('../../models');

//get user's info
router.get('/info', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Exercise,
        },
      ],
    });
    const user = userData.get({ plain: true });
    res.status(200).json(...user);
  } catch (err) {
    res.status(400).json(err);
  }
});

//create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//update user's details (EXERCISES)
router.put('update', async (req, res) => {
  try {
    const updatedUser = await User.update(...req.body, {
      where: {
        id: req.session.user_id,
      },
    });

    if (!updatedUser) {
      res.status(404).json({ message: 'No change was found' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
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
