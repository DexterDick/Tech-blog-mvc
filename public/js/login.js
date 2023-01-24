const loginFormHandler = async (event) => {
  // stops default behavor or form
  event.preventDefault();
  const userName = document.querySelector('#user-name').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (userName && password) {
    // Send post request to Api
    const response = await fetch('api/users/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
