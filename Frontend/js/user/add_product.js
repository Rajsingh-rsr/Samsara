
// upload image
function upload(index) {
    const fileUploadInput = document.querySelectorAll('.file-uploader')[index];

    // Check if a file has been selected
    if (fileUploadInput.files.length === 0) {
        return alert('No file selected!');
    }

    // Using index [0] to take the first file from the array
    const image = fileUploadInput.files[0];

    // Check if the file selected is not an image file
    if (!image.type.includes('image')) {
        return alert('Only images are allowed!');
    }

    // Check if size (in bytes) exceeds 10 MB
    if (image.size > 10000000) {
        return alert('Maximum upload size is 10MB!');
    }

    const fileReader = new FileReader();

    fileReader.onload = (fileReaderEvent) => {
        const imageContainer = document.querySelectorAll('.image-container')[index];
        const uploadIcon = document.querySelectorAll('.upload-icon')[index];

        imageContainer.style.backgroundImage = `url(${fileReaderEvent.target.result})`;
        uploadIcon.style.opacity = 0; // Hide the upload icon after successful upload
        imageContainer.style.backgroundSize = 'cover'; // Ensure the image perfectly fits within the container
    }

    fileReader.readAsDataURL(image);
}

//selecting the option
document.addEventListener("DOMContentLoaded", function() {
    const sizeLabels = document.querySelectorAll('.size-label');

    sizeLabels.forEach(function(label) {
        label.addEventListener('click', function() {
            const inputId = this.getAttribute('for');
            const input = document.getElementById(inputId);
            input.checked = true;

            // Uncheck previously checked size labels
            const prevChecked = document.querySelector('.size-label.checked');
            if (prevChecked && prevChecked !== this) {
                prevChecked.classList.remove('checked');
            }

            // Mark the clicked size label as checked
            this.classList.add('checked');
        });
    });
});


fetch('https://newtest-production-f50e.up.railway.app/api/v1/users/add_product', {
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

