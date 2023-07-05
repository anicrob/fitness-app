const updateChallenge = async (id, completed) => {
  const body = {
    completed,
    current: false,
  };
  const response = await fetch(`/api/challenges/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
    return;
  }
};
const completeChallenge = async id => {
  await updateChallenge(id, 1);

  const updateProfile = await fetch('/api/users/numCompletedChallenges', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });

  if (updateProfile.ok) {
    document.location.replace('/profile');
  } else {
    alert(updateProfile.statusText);
  }
};
const giveUpChallenge = async id => {
  await updateChallenge(id, 0);
};
