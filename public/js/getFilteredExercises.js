// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const difficulty = document.getElementById('difficulty').value;
  const muscle = document.getElementById('muscle').value;
  const type = document.getElementById('type').value;

  const url = `http://localhost:3001/api/exercises/filter?difficulty=${difficulty}&muscle=${muscle}&type=${type}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      clearSearchResults();

      renderSearchResults(data);
    })
    .catch(err => {
      console.error('There has been an error: ', err);
    });
}

function clearSearchResults() {
  const cardSection = document.querySelector('.card-section');
  cardSection.innerHTML = '';
}

function renderSearchResults(data) {
  const cardSection = document.querySelector('.card-section');

  if (data.length > 0) {
    const html = data
      .map(
        exercise => `
          <div class="home-card card pb-2 m-3">
            <header class="card-header is-flex is-align-items-center is-justify-content-space-between">
              <p class="is-size-5 has-text-weight-bold">${exercise.name}</p>
              <button class="button add-exercise-button" onclick="addExercise(${exercise.id})" data-exercise-id="${exercise.id}">Add</button>
            </header>
            <div class="card-content mb-0 mt-3 p-0">
              <table class="table">
                <tr>
                  <th>Exercise:</th>
                  <th>Muscle:</th>
                  <th>Difficulty:</th>
                </tr>
                <tbody>
                  <tr>
                    <td>${exercise.type}</td>
                    <td>${exercise.muscle}</td>
                    <td>${exercise.difficulty}</td>
                  </tr>
                </tbody>
              </table>
              <hr class="p-0 m-0">
              <div class="content px-5 my-5">
                <p class="subtitle has-text-weight-bold">Instructions:</p>
                <p>${exercise.instructions}</p>
              </div>
            </div>
          </div>
        `
      )
      .join('');

    cardSection.innerHTML = html;
  } else {
    const noExercisesMessage = document.createElement('p');
    noExercisesMessage.textContent =
      'No exercises have been found under that filter.';
    cardSection.innerHTML = '';
    cardSection.appendChild(noExercisesMessage);
  }
}

const form = document
  .querySelector('form')
  .addEventListener('submit', handleFormSubmit);
