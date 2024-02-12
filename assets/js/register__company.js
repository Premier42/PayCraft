//author rimjhim
document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    var form = document.getElementById('employerForm');

    // Add submit event listener to the form
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Validate the form fields
        var employerName = document.getElementById('employerName').value.trim();
        var employerAddress = document.getElementById('employerAddress').value.trim();
        var companyName = document.getElementById('companyName').value.trim();
        var employerContact = document.getElementById('employerContact').value.trim();
        var employerEIN = document.getElementById('employerEIN').value.trim();

        // Check if any of the required fields are empty
        if (!employerName || !employerAddress || !companyName || !employerContact || !employerEIN) {
            alert('Please fill out all required fields.');
            return;
        }

        // Submit the form if all fields are filled
        form.submit();
    });
});
