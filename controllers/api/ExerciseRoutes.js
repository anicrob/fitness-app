const router = require('express').Router();
const { User, Challenge, Exercise, UserExercise } = require('../../models');

router.get('/', async (req, res) => {
  try {
    // Get all exercises and JOIN with user data
    const exerciseData = await Exercise.findAll();
    // Serialize data
    const exercises = exerciseData.map(exercise =>
      exercise.get({ plain: true })
    );
    console.log('sending exercises>>>>>', exercises);
    // Pass serialized data and session flag into template
    res.json(exercises);
  } catch (err) {
    res.json(err);
  }
});

//get exercise info by filter:
// http://localhost:3001/api/exercises/filter?difficulty=intermediate&muscle=abdominals
router.get('/filter', async (req, res) => {
  const query = {};
  if (req.query.difficulty) {
    query.difficulty = req.query.difficulty;
  }
  if (req.query.muscle) {
    query.muscle = req.query.muscle;
  }
  if (req.query.type) {
    query.type = req.query.type;
  }
  try {
    const exerciseData = await Exercise.findAll({ where: query });

    const exercises = exerciseData.get({ plain: true });
    res.status(200).json(exercises);
  } catch (err) {
    res.status(400).json(err);
  }
});

//add exercise to user's profile
router.post('/:id', async (req, res) => {
  try {
    const alreadyAddedExercise = await UserExercise.findAll({
      where: {
        exercise_id: req.params.id,
        //change back to req.session.user_id once done testing
        user_id: req.session.user_id,
      },
      attributes: {
        exclude: ['user_id'],
      },
    });
    // alreadyAdded is an array, so to see if the user already added the exercise, check the length
    //if it was already added, the length will be 1
    if (alreadyAddedExercise.length > 0) {
      res.status(500).json(error);
      return;
    } else {
      //if the length is 0, it means it hasn't been added yet, so create the record
      try {
        const userExercise = await UserExercise.create({
          exercise_id: req.params.id,
          //change back to req.session.user_id once done testing
          user_id: req.session.user_id,
        });
        res.status(200).json(userExercise);
      } catch (err) {
        res.status(400).json(err);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteRecord = await UserExercise.findOne({
      where: {
        exercise_id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    const deleteRecordId = deleteRecord.id;
    const response = await UserExercise.destroy({
      where: { id: deleteRecordId },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
