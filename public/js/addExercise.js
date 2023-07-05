const addExerciseBtn = document.getElementsByClassName('.add-exercise-button');
const addExercise = async id => {
  const response = await fetch(`/api/exercises/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
  } else {
    alert('This exercise has already been added!');
    return;
  }
  const updateProfile = await fetch('/api/users/numSavedExercises', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });

  if (updateProfile.ok) {
  } else {
    alert(response.statusText);
  }
};
