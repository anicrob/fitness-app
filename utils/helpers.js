const generateRandomExercises = async exercises => {
  //declare variable to hold 3 random exercises
  const randomExercises = [];

  // get random exercise
  const randomlySelectedExercise1 =
    exercises[Math.floor(Math.random() * exercises.length)];

  //add exercise to randomExercises array
  randomExercises.push(randomlySelectedExercise1);

  //remove the first selected item from the original array
  const secondExercisesArray = exercises.filter(
    exercise => exercise !== randomlySelectedExercise1
  );

  //select a random exercise from the new array
  const randomlySelectedExercise2 =
    secondExercisesArray[
      Math.floor(Math.random() * secondExercisesArray.length)
    ];

  //add exercise to randomExercises array
  randomExercises.push(randomlySelectedExercise2);

  //remove that second selected item from the second array
  const thirdExercisesArray = secondExercisesArray.filter(
    exercise => exercise !== randomlySelectedExercise2
  );

  //select a random exercise from the new array
  const randomlySelectedExercise3 =
    thirdExercisesArray[Math.floor(Math.random() * thirdExercisesArray.length)];

  //add exercise to randomExercises array
  randomExercises.push(randomlySelectedExercise3);

  //return the final array with 3 random, unique exercises
  return randomExercises;
};

const generateRandomNumbers = async () => {
  randomNums = [];
  for (var i = 0; i < 3; i++) {
    //get a random number between 1 and 100
    const randomlySelectedNum = Math.floor(Math.random() * 100) + 1;

    //push into array
    randomNums.push(randomlySelectedNum);
  }
  return randomNums;
};

const removeUnderscore = async string => {
  try {
    if (string.includes('_')) {
      const words = await string.split('_');
      const wordsWithSpaces = await words.join(' ');
      return wordsWithSpaces;
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  generateRandomExercises,
  generateRandomNumbers,
  removeUnderscore,
};
