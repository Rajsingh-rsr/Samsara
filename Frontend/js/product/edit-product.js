document.addEventListener('DOMContentLoaded', function() {
    var imageInputs = document.querySelectorAll('.file-uploader');
    imageInputs.forEach(function(input) {
        input.disabled = true;
    });
});

// Function to toggle edit mode for product name
function toggleProductNameEdit() {
    var productNameField = document.getElementById('product-name');
    if (productNameField.readOnly) {
        productNameField.readOnly = false;
        productNameField.focus();
    } else {
        productNameField.readOnly = true;
    }
}

// Function to toggle edit mode for description
function toggleDescriptionEdit() {
    var descriptionField = document.getElementById('description');
    if (descriptionField.readOnly) {
        descriptionField.readOnly = false;
        descriptionField.focus();
    } else {
        descriptionField.readOnly = true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var categoryField = document.getElementById('category');
    categoryField.disabled = true;
});

document.addEventListener('DOMContentLoaded', function() {
    var sizeOptions = document.querySelectorAll('input[name="size"]');
    sizeOptions.forEach(function(option) {
        option.disabled = true;
    });
    
    var colorOptions = document.querySelectorAll('input[name="color"]');
    colorOptions.forEach(function(option) {
        option.disabled = true;
    });
});

