const generateRandomExercises = async exercises => {
  //declare variable to hold 3 random exercises
  const randomExercises = [];
  for (var i = 0; i < 3; i++) {
    // get random index value
    const randomIndex = Math.floor(Math.random() * exercises.length);

    // get random item
    const randomlySelectedExercise = exercises[randomIndex];

    //push into array
    randomExercises.push(randomlySelectedExercise);
  }
  //return the array with all 3 randomly selected exercises
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
  //return the array with all 3 randomly selected numbers
  return randomNums;
};

const removeUnderscore = async string => {
  if (string.includes('_')) {
    const words = await string.split('_');
    const wordsWithSpaces = await words.join(' ');
    return wordsWithSpaces;
  }
};

module.exports = {
  generateRandomExercises,
  generateRandomNumbers,
  removeUnderscore,
};
