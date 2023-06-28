//logout functionality
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
};
//event listener
document.querySelector('.logout').addEventListener('click', logout);
