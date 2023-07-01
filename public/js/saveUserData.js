// Update user health details
const updateUserProfile = async () => {
  const age = document.getElementById('user-age').value.trim();
  const height = document.getElementById('user-height').value.trim();
  const weight = document.getElementById('user-weight').value.trim();
  const BMI = document.getElementById('user-BMI').value.trim();
  const userId = document.querySelector('#save-user-health-details').dataset
    .userId;

  const userData = {
    age,
    height,
    weight,
    BMI,
  };

  // Message to display update status
  const displayMessage = message => {
    const resultContainer = document.getElementById('result-container');
    resultContainer.textContent = message;
  };

  try {
    const response = await fetch(`/api/users/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      displayMessage('Your profile has been successfully updated');
    } else {
      const { message } = await response.json();
      displayMessage(`Failed to update profile: ${message}`);
    }
  } catch (err) {
    displayMessage(
      'There was an error updating your profile. Please try again later.'
    );
  }
};

document
  .querySelector('#save-user-health-details')
  .addEventListener('click', updateUserProfile);
