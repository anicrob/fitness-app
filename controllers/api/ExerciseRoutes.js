const router = require('express').Router();
const { User, Challenge, Exercise } = require('../../models');

//get exercise info by filter:
router.get('/exercise', async (req, res) => {
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

//get exercise data by id - not sure if we need this
// router.get('/exercise:id', async (req, res) => {

// });

module.exports = router;
