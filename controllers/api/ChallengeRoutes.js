const router = require('express').Router();
const withAuth = require('../../middleware/isAuthenticated');
const { User, Challenge, Exercise } = require('../../models');

//create a new challenge
router.post('/', withAuth, async (req, res) => {
  try {
    const newChallenge = await Challenge.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newChallenge);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update challenge
router.put('/finish', withAuth, async (req, res) => {
  try {
    const updatedChallenge = await Challenge.update(...req.body, {
      where: {
        id: req.body.id,
      },
    });

    if (!updatedChallenge) {
      res.status(404).json({ message: 'No challenge found with this id!' });
      return;
    }

    res.status(200).json(updatedChallenge);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
