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
} = require('../../utils/helpers');

router.get('/', async (req, res) => {
  try {
    // Get all challenges and JOIN with exercise data
    const challengeData = await Challenge.findAll({
      include: [{ model: Exercise, through: ExerciseChallenge }],
    });
    // Serialize data so the template can read it
    const challenge = challengeData.map(challenge =>
      challenge.get({ plain: true })
    );
    console.log('sending challenges>>>>>', challenge);
    // Pass serialized data and session flag into template
    res.json(challenge);
  } catch (err) {
    res.json(err);
  }
});

//get exercise/challenge records
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
    //get user's exercises
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

    //just get the exercise_id value in an array
    const exerciseIds = exercises.map(exercise => exercise.exercise_id);

    //if the user has at least 3 exercises,
    //create 3 exerciseChallenge records with new challenge id, randomly selected exercise, and randomly selected number
    if (exercises.length >= 3) {
      //create new challenge
      const newChallengeData = await Challenge.create({
        current: 1,
        completed: 0,
        user_id: req.session.user_id,
      });
      const newChallenge = newChallengeData.get({ plain: true });
      //const randomExercises = loop through exerciseIds and pick 3 random excercise Ids
      const randomExercises = await generateRandomExercises(exerciseIds);
      console.log(randomExercises);
      //const randomNumbers = pick 3 random numbers from 1 to 100
      const randomNumbers = await generateRandomNumbers();
      console.log(randomNumbers);
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
        //and store them in the ExerciseChallengeRecords array
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
      res.status(400).json();
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//update challenge
router.put('/:id', async (req, res) => {
  try {
    const updatedChallenge = await Challenge.update(req.body, {
      where: {
        user_id: req.session.user_id,
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
