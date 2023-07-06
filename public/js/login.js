//login functionality
const loginFormHandler = async event => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (!username || !password) {
    displayError('Please enter a username and password.');
    return;
  }

  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    const errorMessage =
      errorMessages[response.status] ||
      'There has been an error, please try again.';
    displayError(errorMessage);
  }
};

const errorMessages = {
  401: 'Incorrect username or password.',
  500: 'Internal server error. Please try again later.',
};

const displayError = errMessage => {
  const errContainer = document.getElementById('err-container');
  errContainer.textContent = errMessage;
};

//event listener
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
