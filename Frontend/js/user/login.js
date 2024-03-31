document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Validate email
  var email = document.getElementById('email').value;
  var emailError = document.getElementById('emailError');

  if (!validateEmail(email)) {
    emailError.innerText = 'Invalid email format';
    return;
  } else {
    emailError.innerText = '';
  }

  // Validate password (optional)
  var password = document.getElementById('password').value;
  var passwordError = document.getElementById('passwordError');

  if (password.length < 8) {
    passwordError.innerText = 'Password must be at least 8 characters';
    return;
  } else {
    passwordError.innerText = '';
  }

  // Prepare data for POST request
  var formData = {
    email: email,
    password: password,
  };

  console.log(formData);

  try {
    const response = await fetch('http://localhost:4000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    });

    if (!response.ok) {

      const error = await response.json();
      console.log(error)
      throw new Error(error.message);
    }

    const data = await response.json();
    console.log('Form submitted successfully', data);
  } catch (error) {

    if (error.message.includes('Unexpected token')) {
      console.error('Server returned an invalid response:', error);

    } else {
      console.error('There was a problem with the form submission:', error.message);
    }
  }
});

// Function to validate email format
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}



async function refreshAccessToken() {
  try {
      const response = await fetch('http://localhost:4000/api/v1/users/refresh-token', {
          method: 'POST',
          credentials: 'include', // Ensure cookies are sent with the request
      });
      const res = await response.json();

      if (response.ok) {

        const { accessToken, refreshToken } = res.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken)

        console.log(res);
        

      } else {
          console.error('Error refreshing access token:', data.message);
      }
  } catch (error) {
      console.error('Error refreshing access token:', error.message);
  }
}

refreshAccessToken();
