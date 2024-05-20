const changePasswordForm = document.getElementById('change-password-form');

changePasswordForm.addEventListener('submit', async (event) => {
  alert("form")
  event.preventDefault(); // Prevent default form submission

  // Extract data from form elements
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Validate password requirements (enhance based on your needs)
  if (!validatePassword(newPassword)) {
    alert('New password does not meet requirements. Please include a combination of uppercase, lowercase, numbers, and symbols.');
    return;
  }

  if (newPassword !== confirmPassword) {
    alert('New password and confirmation password do not match.');
    return;
  }

  // Prepare data for POST request
  const data = {
    currentPassword,
    newPassword,
  };

  // Send POST request using Fetch API with credentials
  try {
    const response = await fetch('http://localhost:4000/api/v1/users/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    console.log('API Response:', response); // Log complete response object including status

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('Response Data:', responseData); // Log response data

    // Handle successful response
    if (responseData.success) {
      alert('Password changed successfully!');
      // Optionally, clear form fields or redirect to a success page
      // e.g., clear form fields:
      changePasswordForm.reset();
    } else {
      alert('Failed to change password: ' + responseData.message);
    }
  } catch (error) {
    console.error('Error changing password:', error);
    alert('An error occurred. Please try again later.');
  }
});

// Enhance with your password validation logic (replace with your specific criteria)
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()]/.test(password);
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
}
