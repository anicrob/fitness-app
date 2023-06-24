const loginFormHandler = async event => {
  event.preventDefault();

  // Grabbing user inputs
  const emailInput = document.querySelector('#email').value.trim();
  const passwordInput = document.querySelector('#password').value.trim();

  // The container doesn't exist yet, but this is for displaying a message to the user
  // letting them know that the required fields were not entered to login
  const errContainer = document.querySelector('#loginErr');

  // Checks if fields are empty
  if (!emailInput) {
    showErr('You must enter the email associated with your account.', errContainer);
    return;
  }

  if (!passwordInput) {
    showErr('You must enter in the password to your account.', errContainer);
    return;
  }

  // Will send the request once the required fields are entered
  if (emailInput && passwordInput) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // const { message } = await response.json();
      // eslint-disable-next-line no-undef
      // showAlert({ target: 'login-alert', message, type: 'danger' });

      // Generic error message, I might still need to find a better way to handle
      // the an error in this case, as it could be server side or due to 
      showErr('An error has occured during login. Please try again and make sure your credientials are correct.', errContainer);
    }
  }
};

// Updating container to list the field(s) that is mising
const showErr = (message, errContainer) => {
  errContainer.textContent += message + ' ';
}

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
