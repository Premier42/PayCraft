//author rimjhim
document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    var form = document.getElementById('employeeDetailsForm');

    // Add submit event listener to the form
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Validate the form fields
        var employeeID = document.getElementById('employeeID').value.trim();
        var address = document.getElementById('address').value.trim();
        var department = document.getElementById('department').value.trim();
        var position = document.getElementById('position').value.trim();
        var dateStarted = document.getElementById('dateStarted').value.trim();
        var supervisorName = document.getElementById('supervisorName').value.trim();
        var workingHours = document.getElementById('workingHours').value.trim();

        // Check if any of the required fields are empty
        if (!employeeID || !address || !department || !position || !dateStarted || !supervisorName || !workingHours) {
            alert('Please fill out all required fields.');
            return;
        }

        // Submit the form if all fields are filled
        form.submit();
    });
});
