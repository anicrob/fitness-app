//give up/complete challenge
//event listeners for both buttons
//get the challenge id from the challenge button
//put request to challenge with completed: either true or false and current:false
//put request to user /numCompletedChallenges
//refresh page to remove the challenge from the page

const updateChallenge = async (id, completed) => {
    const response = await fetch(`/api/challenges/${id}`, {
      method: 'PUT',
      body: {
        completed,
        current: false,
      },
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // document.location.replace('/');
    } else {
      alert('This exercise has already been added!');
      return;
    }
  };
  const completeChallenge = async id => {
    await updateChallenge(id, true);
  
    const updateProfile = await fetch('/api/users/numCompletedChallenges', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (updateProfile.ok) {
      //document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  const giveUpChallenge = async id => {
    await updateChallenge(id, false);
  };