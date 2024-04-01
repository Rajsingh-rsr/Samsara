// Fetch current user information and populate input fields
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:4000/api/v1/users/getCurrentUser', {
            method: 'GET', // Change method to GET
            headers: {
                'Content-Type': 'application/json',
                // Add any authentication headers if needed
            }
        });
        if (response.ok) {
            const userData = await response.json();
            document.getElementById('fullname').value = userData.fullname;
            document.getElementById('email').value = userData.email;
            document.getElementById('contact').value = userData.contact;
            document.getElementById('address').value = userData.address;

            // Remove the username heading and set the full name
            const usernameHeading = document.querySelector('.user-name h2');
            usernameHeading.textContent = userData.fullname;
        } else {
            console.error('Failed to fetch current user data');
        }
    } catch (error) {
        console.error('Error fetching current user data:', error);
    }
});

// Function to handle file input change event
function handleFileInputChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgSrc = e.target.result;
            document.querySelector('.avatar').src = imgSrc;
        };
        reader.readAsDataURL(file);
    }
}

// Add event listener to file input
document.getElementById('avatar-upload').addEventListener('change', handleFileInputChange);
// Function to disable all input fields
function disableInputFields() {
    document.querySelectorAll('.setting-item input').forEach(input => {
        input.disabled = true;
    });
}

// Function to disable input fields that were not edited
function disableInputFields() {
    document.querySelectorAll('.setting-item input').forEach(input => {
        if (!input.dataset.edited) {
            input.disabled = true;
        }
    });
}

// Enable editing of input fields when edit button is clicked
// Enable editing of input fields when edit button is clicked
document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
        const parentSettingItem = event.target.closest('.setting-item');
        const inputField = parentSettingItem.querySelector('input[type="text"]');
        inputField.disabled = false;
    });
});

// Mark input field as edited when user types in it
document.querySelectorAll('.setting-item input').forEach(input => {
    input.addEventListener('input', () => {
        input.dataset.edited = true;
    });
});

// Save changes to user information
document.getElementById('save-changes-btn').addEventListener('click', async () => {
    try {
        const data = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            contact: document.getElementById('contact').value,
            address: document.getElementById('address').value
        };
        const response = await fetch('http://localhost:4000/api/v1/users/updateAccountDetails', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Add any authentication headers if needed
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            console.log('User information updated successfully');
            // Disable input fields after saving changes
            disableInputFields();
        } else {
            console.error('Failed to update user information');
        }
    } catch (error) {
        console.error('Error updating user information:', error);
    }
});

// Function to disable input fields that were not edited
function disableInputFields() {
    document.querySelectorAll('.setting-item input').forEach(input => {
        if (!input.dataset.edited) {
            input.disabled = true;
        }
    });
}

// Disable input fields initially
disableInputFields();




// Save changes to user information
document.getElementById('save-changes-btn').addEventListener('click', async () => {
    try {
        const data = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            contact: document.getElementById('contact').value,
            address: document.getElementById('Address').value
        };
        const response = await fetch('http://localhost:4000/api/v1/users/updateAccountDetails', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Add any authentication headers if needed
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            console.log('User information updated successfully');
        } else {
            console.error('Failed to update user information');
        }
    } catch (error) {
        console.error('Error updating user information:', error);
    }
});
