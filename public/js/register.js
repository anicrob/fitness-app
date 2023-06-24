const registrationHandler = async event => {
  event.preventDefault();

  // Grabbing user inputs
  const firstNameInput = document.querySelector('#firstName').value.trim();
  const lastNameInput = document.querySelector('#lastName').value.trim();
  const emailInput = document.querySelector('#email').value.trim();
  const passwordInput = document.querySelector('#password').value.trim();
  const usernameInput = document.querySelector('#username').value.trim();

  // Container doesnt exist yet, but will be a deticated space to display error
  // messages
  const errContainer = document.querySelector('#registrationErr');

  // Clearing out the previous error each time a new submit happens
  errContainer.textContent = '';

  // Checks to make sure required fields are entered
  if (!firstNameInput) {
    showErr('You must enter a first name.', errContainer);
    return;
  }

  if (!lastNameInput) {
    showErr('You must enter a last name.', errContainer);
    return;
  }

  if (!emailInput || !isValidEmail(emailInput)) {
    showErr('You must enter a valid email.', errContainer);
    return;
  }

  // I still need to create a check for password requirements, also need to implement
  // logic to hash the password before it gets sent into the db
  if (!passwordInput) {
    showErr('You must enter a valid password.', errContainer);
    return;
  }

  if (!usernameInput) {
    showErr('You must enter a username.', errContainer);
    return;
  }

  // If all fields are entered, the request will be made and user info will be
  // sent to db
  if (email && password && firstName && lastName && username) {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        password: passwordInput,
        username: usernameInput,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // const { message } = await response.json();
      // eslint-disable-next-line no-undef
            // showAlert({
      //   target: 'registration-alert',
      //   message: errMessage,
      //   type: 'danger',
      // });

      showErr('An error has occurred during registration. Please try again.', errContainer);
    }
  }
};

// Updating errContainer to display the field(s) that is missing
const showErr = (message, errContainer) => {
  errContainer.textContent += message + ' ';
}

// Regex to check for valid email format
const isValidEmail = email => {
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailFormat.test(email);
}

document
  .querySelector('.registration-form')
  .addEventListener('submit', registrationHandler);
