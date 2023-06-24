const sequelize = require('../db/config');
const { User, Exercise } = require('../models');
const fs = require('fs');
const path = require('path');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();
// const userSeeds = require('./users.json');

const muscle = [
  'abdominals',
  'abductors',
  'adductors',
  'biceps',
  'calves',
  'chest',
  'forearms',
  'glutes',
  'hamstrings',
  'lats',
  'lower_back',
  'middle_back',
  'neck',
  'quadriceps',
  'traps',
  // eslint-disable-next-line prettier/prettier
  'triceps',
];

// const seedUserTable = async () => {
//   await sequelize.sync({ force: true });

//   await User.bulkCreate(userSeeds, {
//     individualHooks: true,
//     returning: true,
//   });

//   process.exit(0);
// };
// console.log('========== User Table Successfully Seeded =============');

const seedExerciseTable = async () => {
  for (var i = 0; i < muscle.length; i++) {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/exercises?muscle=${muscle[i]}`,
      {
        headers: {
          'x-api-key': process.env.API_TOKEN,
        },
      }
    );
    const data = await response.json();
    console.log('should be exercises>>>>>>', data);
    fs.writeFile(
      path.join(__dirname, `${muscle[i]}.json`),
      JSON.stringify(data),
      err => console.log(err)
    );
    if (i == 15) {
      var done = true;
    }
  }
  console.log('========== Exercise files successfully created =============');
  if (done === true) {
    const abdominals = require('./abdominals.json');
    const abductors = require('./abductors.json');
    const adductors = require('./adductors.json');
    const biceps = require('./biceps.json');
    const calves = require('./calves.json');
    const chest = require('./chest.json');
    const forearms = require('./forearms.json');
    const glutes = require('./glutes.json');
    const hamstrings = require('./hamstrings.json');
    const lats = require('./lats.json');
    const lowerBack = require('./lower_back.json');
    const middleBack = require('./middle_back.json');
    const neck = require('./neck.json');
    const quadricepts = require('./quadriceps.json');
    const traps = require('./traps.json');
    // const triceps = require('./triceps.json');

    await sequelize.sync({ force: true });

    await Exercise.bulkCreate([
      abdominals,
      abductors,
      adductors,
      biceps,
      calves,
      chest,
      forearms,
      glutes,
      hamstrings,
      lats,
      lowerBack,
      middleBack,
      neck,
      quadricepts,
      traps,
      // triceps,
    ]);
    console.log('========== Exercise Table Successfully Seeded =============');

    process.exit(0);
  }
};

seedExerciseTable();
// seedUserTable();
