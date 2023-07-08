const addExerciseBtn = document.getElementsByClassName('.add-exercise-button');
const addExercise = async id => {
  const response = await fetch(`/api/exercises/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    showModal('<h2>Exercise added!</h2>');
  } else {
    showModal('<h2>This exercise has already been added!</h2>');
    return;
  }
  const updateProfile = await fetch('/api/users/numSavedExercises', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });

  if (updateProfile.ok) {
  } else {
    showModal(`${response.statusText}`);
  }
};
