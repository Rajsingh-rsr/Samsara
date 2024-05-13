
    document.addEventListener("DOMContentLoaded", function() {
        // Predefined admin credentials
        const adminEmail = "adminsamsara@gmail.com";
        const adminPassword = "admin123";

        // Form submission event listener
        const loginForm = document.getElementById("loginForm");
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission

            // Get user input
            const emailInput = document.getElementById("email").value;
            const passwordInput = document.getElementById("password").value;

            // Check if email and password match admin credentials
            if (emailInput === adminEmail && passwordInput === adminPassword) {
                // Redirect to admin dashboard or perform other actions
                window.location.href = "../../html/admin/admindashboard.html";
            } else {
                // Display error message for invalid credentials
                document.getElementById("emailError").textContent = "";
                document.getElementById("passwordError").textContent = "Invalid email or password";
            }
        });
    });
