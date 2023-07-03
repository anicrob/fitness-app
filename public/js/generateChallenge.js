//POST a challenge to create a new one
const createChallenge = async () => {
  const response = await fetch('/api/challenges', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  //if successful
  if (response.ok) {
    //refresh page
    document.location.replace('/profile');
  } else {
    const { message } = await response.json();
    alert(message);
    return;
  }
};
//event listener for generate challenge button
const generateChallengeBtn = document
  .querySelector('#generate-challenge-btn')
  .addEventListener('click', createChallenge);
