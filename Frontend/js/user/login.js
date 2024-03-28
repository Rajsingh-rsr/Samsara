document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

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

    fetch('http://localhost:4000/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle success response
            console.log('Form submitted successfully', data);
        })
        .catch(error => {
            // Handle error
            console.error('There was a problem with the form submission:', error);
        });
})
// Function to validate email format
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}





