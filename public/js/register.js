//sign up functionality
const signupFormHandler = async event => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (!username || !password) {
    displayError('You must enter a username and password to register.');
    return;
  }

  if (password.length < 8) {
    displayError('Password needs to be least 8 characters long.');
    return;
  }

  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    const { err } = await response.json();
    displayError(err);
  }
};

const displayError = errMessage => {
  const errContainer = document.getElementById('err-container');
  errContainer.textContent = errMessage;
};

//event listener
document
  .querySelector('#registration-form')
  .addEventListener('submit', signupFormHandler);
