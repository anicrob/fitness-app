const router = require('express').Router();
const { User, Challenge, Exercise, UserExercise } = require('../../models');

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
    res.json(exercises);
  } catch (err) {
    res.json(err);
  }
});

//get exercise info by filter:
router.get('/filter', async (req, res) => {
  const queryString = req.url.split('?').pop();
  //this would return 'difficulty=example&muscle=example&type=example'
  const splitQueryString = queryString.split('&');
  //this would return ['difficulty=example', 'muscle=example', 'type=example']
  const difficulty = splitQueryString[0].split('=').pop();
  const muscle = splitQueryString[1].split('=').pop();
  const type = splitQueryString[2].split('=').pop();
  const params = [difficulty, muscle, type];
  let finalParams = [];

  for (var i = 0; i < params.length; i++) {
    if (params[i]) {
      if ((i = 0)) {
        finalParams.push(`difficulty: ${params[i]}`);
      } else if ((i = 1)) {
        finalParams.push(`muscle: ${params[i]}`);
      } else if ((i = 2)) {
        finalParams.push(`type: ${params[i]}`);
      }
    } else {
      if ((i = 0)) {
        console.log(`difficulty filter is not present`);
      } else if ((i = 1)) {
        finalParams.push(`muscle filter is not present`);
      } else if ((i = 2)) {
        finalParams.push(`type filter is not present`);
      }
    }
  }
  console.log(...finalParams);
  try {
    const exerciseData = await Exercise.findAll({ where: { ...finalParams } });

    const exercises = exerciseData.get({ plain: true });
    res.status(200).json(exercises);
  } catch (err) {
    res.status(400).json(err);
  }
});

//how to handle if it already exists?
router.post('/:id', async (req, res) => {
  const alreadyAdded = await UserExercise.findAll({
    where: {
      exercise_id: req.params.id,
      user_id: '28437cca-2238-40e1-9b73-27bc0f581a9e',
    },
    attributes: {
      exclude: ['user_id'],
    },
  });
  //alreadyAdded is an array, so to see if it's empty, check the length
  if (alreadyAdded.length < 0) {
    res.status(400).json({ message: 'You have already added this exercise!' });
    return;
  } else {
    try {
      const userExercise = await UserExercise.create({
        exercise_id: req.params.id,
        user_id: '28437cca-2238-40e1-9b73-27bc0f581a9e',
      });
      res.status(200).json(userExercise);
    } catch (err) {
      res.status(400).json(err);
    }
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
    const deleteRecordId = userExercise.id;
    const response = await UserExercise.destroy({
      where: { id: deleteRecordId },
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
