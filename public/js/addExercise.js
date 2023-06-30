//event listener for the add button on exercises
//pull the exercise id attribute from the button
//figure out how to get a count of items in that array
//PUT request to user to have the numSavedExercises updated

const addExerciseBtn = document.getElementsByClassName('.add-exercise-button');
const addExercise = async id => {
  console.log(addExerciseBtn);

  console.log(id);
  const response = await fetch(`/api/exercises/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // document.location.replace('/');
  } else {
    alert(response.statusText);
    return;
  }
};
