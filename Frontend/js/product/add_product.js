// upload image
function upload(index) {
    const  fileUploadInputs = document.querySelectorAll('.file-uploader');
    
    // Check if the index is valid
    if (index < 0 || index >= fileUploadInputs.length) {
        return alert('Invalid file uploader index!');
    }

    const fileUploadInput = fileUploadInputs[index];

    // Check if a file has been selected
    if (!fileUploadInput.files || fileUploadInput.files.length === 0) {
        return alert('No file selected!');
    }

    // Using index [0] to take the first file from the array
    const image = fileUploadInput.files[0];
    console.log(image)

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
    };

    fileReader.readAsDataURL(image);
}


//selecting the option
document.addEventListener("DOMContentLoaded", function () {
    const sizeLabels = document.querySelectorAll('.size-label');

    sizeLabels.forEach(function (label) {
        label.addEventListener('click', function () {
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

// Example of fetching and posting form data
document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission

    const cateName = document.getElementById('category').value
    const Psize = document.querySelector('.size-options input[name="size"]:checked').value;
    
    
    const category = `{ "name": cateName, "color": "black", "size": Psize }`

    const imageInputs = [
        document.getElementById('image0'),
        document.getElementById('image1'),
        document.getElementById('image2'),
        document.getElementById('image3')
    ];

    const imageArray = [];


    imageInputs.forEach((input, index) => {
        if (input.files.length > 0) {
            imageArray.push(`image${index + 1}`, input.files[0]);
        }
    });

    // const token = localStorage.getItem('accessToken')

    // console.log("token", localStorage.getItem('accessToken'))
    
    const formData = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('description').value,
        brand: document.getElementById('brand-name').value,
        price: document.getElementById('price').value,
        category: category,
        productImage: imageArray[0],
        supportImage: imageArray,
        stock: document.getElementById('stock').value
    };
    console.log(formData);
    // upload(formData);


    await fetch('http://localhost:4000/api/v1/product/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(formData)
    })
        .then(function (response) {
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // Handle successful registration
            console.log('Product added successfully:', data);
            alert('Product added successfully');
        })
        .catch(function (error) {
            // Handle errors
            console.error('There was a problem adding the product:', error);
            alert('Product addition failed. Please try again later.');
        });
});