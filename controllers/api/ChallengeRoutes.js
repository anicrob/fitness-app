const router = require('express').Router();
const withAuth = require('../../middleware/isAuthenticated');
const {
  User,
  Challenge,
  Exercise,
  UserExercise,
  ExerciseChallenge,
} = require('../../models');
const {
  generateRandomExercises,
  generateRandomNumbers,
} = require('../../utils');

router.get('/', async (req, res) => {
  try {
    // Get all exercises and JOIN with user data
    const challengeData = await Challenge.findAll({
      include: [{ model: Exercise, through: ExerciseChallenge }],
    });
    // Serialize data so the template can read it
    const challenge = challengeData.map(challenge =>
      challenge.get({ plain: true })
    );
    console.log('sending exercises>>>>>', challenge);
    // Pass serialized data and session flag into template
    res.json(challenge);
  } catch (err) {
    res.json(err);
  }
});

router.get('/ec', async (req, res) => {
  try {
    const ExerciseChallengeData = await ExerciseChallenge.findAll();
    res.json(ExerciseChallengeData);
  } catch (err) {
    res.json(err);
  }
});

//create a new challenge
router.post('/', async (req, res) => {
  try {
    //create new challenge
    const newChallenge = await Challenge.create({
      current: 1,
      completed: 0,
      user_id: req.session.user_id,
    });

    //get user's challenges
    const userExercises = await UserExercise.findAll({
      where: {
        user_id: req.session.user_id,
      },
      //exlude the user_id as we just want the exercise_id property
      attributes: {
        exclude: ['user_id'],
      },
    });

    //serialize data
    const exercises = userExercises.map(exercise =>
      exercise.get({ plain: true })
    );

    //just get the Id's value
    const exerciseIds = exercises.map(exercise => exercise.exercise_id);

    //if the user has at least 3 exercises,
    //create 3 exerciseChallenge records with new challenge id, randomly selected exercise, and randomly selected number
    if (exercises.length >= 3) {
      //const randomExercises = loop through exerciseIds and pick 3 random excercise Ids
      const randomExercises = await generateRandomExercises(exerciseIds);

      //const randomNumbers = pick 3 random numbers from 1 to 100
      const randomNumbers = await generateRandomNumbers();

      //declare empty array to store records to bulkCreate later
      const ExerciseChallengeRecords = [];

      //looping through both arrays,
      for (let i = 0; i < randomExercises.length; i++) {
        //create the record object
        let newChallengeExercise = {
          challenge_id: newChallenge.id,
          exercise_id: randomExercises[i],
          numExercises: randomNumbers[i],
        };
        //and store them in the array
        ExerciseChallengeRecords.push(newChallengeExercise);
      }

      //bulk create the records
      try {
        const ExerciseChallengesCreated = await ExerciseChallenge.bulkCreate(
          ExerciseChallengeRecords
        );
        res.status(200).json(ExerciseChallengesCreated);
      } catch (err) {
        res.status(400).json(err);
      }
      //if they don't have at least 3 exercises saved, let the user know they need to add more exercises
    } else {
      res.status(400).json({
        message:
          'Please save at least 3 exercises before creating a challenge!',
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//update challenge
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedChallenge = await Challenge.update(...req.body, {
      where: {
        id: req.params.id,
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
