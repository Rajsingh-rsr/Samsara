document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var emailError = document.getElementById('emailError');
    var password = document.getElementById('password').value;
    var passwordError = document.getElementById('passwordError');

    // Validate password
    if (password.length < 8) {
        passwordError.innerText = 'Password must be at least 8 characters';
        return;
    } else {
        passwordError.innerText = '';
    }

    try {
        const formData = { email, password };

        if (formData.email === 'admin@samsara.com') {
            const response = await fetch('http://localhost:4000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Ensure cookies are sent with the request
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json();
                console.log(error);
                throw new Error(error.message);
            }

            const data = await response.json();
            console.log('Form submitted successfully', data);
            window.location.href = '../../html/admin/admindashboard.html';
        } else {
            console.error('Invalid email');
            emailError.innerText = 'Invalid email';
        }
    } catch (error) {
        console.error('There was a problem with the form submission:', error.message);
    }
});

async function refreshAccessToken() {
    try {
        const response = await fetch('http://localhost:4000/api/v1/users/refresh-token', {
            method: 'POST',
            credentials: 'include' // Ensure cookies are sent with the request
        });
        const res = await response.json();

        if (response.ok) {
            const { accessToken, refreshToken } = res.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            console.log(res);
        } else {
            console.error('Error refreshing access token:', res.message);
        }
    } catch (error) {
        console.error('Error refreshing access token:', error.message);
    }
}

// Refresh the access token when the script loads
refreshAccessToken();
