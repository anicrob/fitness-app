//event listener on button
//get the id of that exercise
//get request to user to pull the exercises array
//remove the deleted id from the exercises array
//PUT request to user with new exercise array
//refresh page

const addDeleteBtn = document.getElementsByClassName(
  '.delete-challenge-button'
);
const deleteExercise = async id => {
  const response = await fetch(`/api/exercises/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }
  const updateProfile = await fetch('/api/users/numSavedExercises', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });

  if (updateProfile.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }
};
