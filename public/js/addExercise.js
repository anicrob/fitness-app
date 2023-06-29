//event listener for the add button on exercises
//pull the exercise id attribute from the button
//GET user request -> save the current exercise_id values in an array
//push the new id into the array
//how to deal with duplicates? if(array.contains(newId))? then push into array?
//PUT user request -> body of request with the exercise_id:(values of all exercises array/variable)
//figure out how to get a count of items in that array
//PUT request to user to have the numSavedExercises updated
const addExercise = async ({ exerciseName }) => {
  const response = await fetch('/api/exercise', {
    method: 'POST',
    body: JSON.stringify({ exerciseName }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
  } else {
    const { message } = await response.json();
    // eslint-disable-next-line no-undef
    showAlert({ target: 'login-alert', message, type: 'danger' });
  }
};
