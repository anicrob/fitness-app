const logout = async () => {
  const response = await fetch('/api/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    // Dedicated error page is not created yet, but due to rare chance of logout error
    // we should find a way to direct the user to an error page instead of displaying
    // it right to the page
    document.location.replace('/error');

    // const { message } = await response.json();
    // // eslint-disable-next-line no-undef
    // showAlert({ message, type: 'danger' });
  }
};

document.querySelector('#logout').addEventListener('click', logout);
