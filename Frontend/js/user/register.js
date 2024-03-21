document.addEventListener('DOMContentLoaded', function() {
    // Select the form and attach a submit event listener
    var registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting normally
            
            // Validate form fields
            var fullname = document.getElementById('fullname').value.trim();
            var email = document.getElementById('email').value.trim();
            var password = document.getElementById('password').value.trim();
            var phone = document.getElementById('phone').value.trim();
            var address = document.getElementById('address').value.trim();

            // Clear any previous error messages
            clearErrorMessages();

            // Validation for Full Name
            if (fullname.length < 2) {
                displayErrorMessage('fullname', 'Full Name must be at least 2 characters long.');
                return;
            }

            // Validation for Email
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                displayErrorMessage('email', 'Invalid Email Address.');
                return;
            }

            // Validation for Password
            if (password.length < 6) {
                displayErrorMessage('password', 'Password must be at least 6 characters long.');
                return;
            }

            // Validation for Phone Number
            var phoneRegex = /^[0-9]+$/;
            if (!phoneRegex.test(phone)) {
                displayErrorMessage('phone', 'Phone Number must contain only digits.');
                return;
            }

            // Validation for Address
            if (address.length < 3) {
                displayErrorMessage('address', 'Address must be at least 3 characters long.');
                return;
            }

            // Prepare data for POST request
            var formData = {
                fullName: fullname,
                email: email,
                password: password,
                phone: phone,
                address: address
            };
            console.log(formData);

            // Send data to API endpoint
            fetch('https://newtest-production-f50e.up.railway.app/api/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(function(response) {
                if (!response.ok) {
                    console.log(response)
                    console.log(response.message)
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                // Handle successful registration
                console.log('Signup successful:', data);
                alert('Signup successful');
            })
            .catch(function(error) {
                // Handle errors
                console.error('There was a problem with the registration:', error);
                alert('Signup failed. Please try again later.');
            });
        });
    } else {
        console.error("Error: Could not find the registerForm element.");
    }

    // Function to display error message
    function displayErrorMessage(fieldId, message) {
        var field = document.getElementById(fieldId);
        var errorMessageId = fieldId + '-error';
        var errorMessageElement = document.getElementById(errorMessageId);

        if (!errorMessageElement) {
            errorMessageElement = document.createElement('span');
            errorMessageElement.id = errorMessageId;
            errorMessageElement.classList.add('error-message');
            field.parentNode.insertBefore(errorMessageElement, field.nextSibling);
        }

        errorMessageElement.textContent = message;
    }

    // Function to clear all error messages
    function clearErrorMessages() {
        var errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(errorMessage) {
            errorMessage.textContent = '';
        });
    }
});