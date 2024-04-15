// for search form
document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.querySelector('#search-icon');
    const searchForm = document.querySelector('#search-form');
    const closeButton = document.querySelector('#close');
  
    // Show search form when search icon is clicked
    searchIcon.addEventListener("click", () => {
      searchForm.classList.add('active');
    });
  
    // Hide search form when close button is clicked
    closeButton.addEventListener("click", () => {
      searchForm.classList.remove('active');
    });
  });
  

// for suffling pictures the user want and dispay in big picture
document.addEventListener("DOMContentLoaded", function() {
    // Get references to the main image and clickable images
    const mainImage = document.getElementById("main-img");
    const clickableImages = document.querySelectorAll(".product-image-des img");
  
    // Loop through each clickable image to add click event listeners
    clickableImages.forEach(function(img) {
      img.addEventListener("click", function() {
        // Update the main image source with the clicked image source
        mainImage.src = this.src;
      });
    });
  });

//   for size button
document.addEventListener("DOMContentLoaded", function() {
    const sizeButtons = document.querySelectorAll(".size-btn");
  
    sizeButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        // Remove active class from all buttons
        sizeButtons.forEach(function(btn) {
          btn.classList.remove("active");
        });
        // Add active class to the clicked button
        this.classList.add("active");
      });
    });
  });
  

  