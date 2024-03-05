document.addEventListener('DOMContentLoaded', function () {
    // Retrieve email from local storage
    var userEmail = localStorage.getItem('UserEmail');

    // Get the form element
    var form = document.getElementById('employerForm');
    var employerNameInput = document.getElementById('employerName');
    var employerEmailInput = document.getElementById('employerEmail'); // Declare and initialize employerEmailInput

    // Make sure employerEmailInput is defined before using it
    if (!employerEmailInput) {
        console.error("Employer email input not found.");
        return; // Exit the function early if input is not found
    }

    // Find user data by email
    fetch('../dataset/user.json')
        .then(response => response.json())
        .then(users => {
            var user = users.find(user => user.email === userEmail);
            if (user) {
                // Fill in employer name and email fields
                employerNameInput.value = user.name;
                employerEmailInput.value = user.email;
                
                // Make employer name and email fields uneditable
                employerNameInput.setAttribute('readonly', true);
                employerEmailInput.setAttribute('readonly', true);
            } else {
                alert('User data not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('An error occurred while fetching user data.');
        });

    // Add submit event listener to the form
    form.addEventListener('submit', function (event) {
        // Your form submission logic goes here
    });
});
