const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

let logoutTimer;
let messageTimeout;

const resetTimers = () => {
  clearTimeout(logoutTimer);
  clearTimeout(messageTimeout);
  // starts a logout timer for 15 mins
  logoutTimer = setTimeout(() => {
    // logs the user out after 15 mins has elapsed
    logout();
  }, 900000);

  // renders an alert to handlebars when there is 30 seconds left of session time.
  messageTimeout = setTimeout(() => {
    document.querySelector('#sessionTimeoutMessage').textContent = 'Your session will expire in 30 seconds.';
  }, 870000);
};
// sets variable to clear message when the event listener is triggered
const clearMessage = () => {
  clearTimeout(messageTimeout);
  document.querySelector('#sessionTimeoutMessage').textContent = '';
};
// logout params 
document.querySelector('#logout').addEventListener('click', () => {
  clearTimeout(logoutTimer);
  clearTimeout(messageTimeout);
  resetTimers();
  clearMessage();
});

// event listeners to reset the timers when either listener is triggered
document.addEventListener('click', () => {
  resetTimers();
  clearMessage();
  setTimeout(() => {
    document.querySelector('#sessionTimeoutMessage').textContent = 'Your session will expire in 30 seconds.';
  }, 870000);
});
document.addEventListener('keypress', () => {
  resetTimers();
  clearMessage();
  setTimeout(() => {
    document.querySelector('#sessionTimeoutMessage').textContent = 'Your session will expire in 30 seconds.';
  }, 870000);
});

resetTimers();
