document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    var form = document.getElementById('employerForm');

    // Add submit event listener to the form
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Retrieve email from local storage
        var employerEmail = localStorage.getItem('UserEmail');

        // Get form elements
        var employerName = document.getElementById('employerName').value || '';
        var employerAddress = document.getElementById('employerAddress').value || '';
        var companyName = document.getElementById('companyName').value || '';
        var companyEIN = document.getElementById('employerEIN').value || '';
        var employerIndustry = document.getElementById('employerIndustry').value || '';
        var companySize = document.getElementById('employerSize').value || '';

        // Create data object
        var companyData = {
            "employerEmail": employerEmail,
            "employerName": employerName,
            "employerAddress": employerAddress,
            "companyName": companyName,
            "companyEIN": companyEIN,
            "employerIndustry": employerIndustry,
            "companySize": companySize,
            "employees": []
        };

        // Convert data object to JSON string
        var jsonData = JSON.stringify(companyData, null, 2);

        // Create a blob with the JSON data
        var blob = new Blob([jsonData], { type: 'application/json' });

        // Create a URL for the blob
        var url = URL.createObjectURL(blob);

        // Create a link element to trigger the download
        var link = document.createElement('a');
        link.href = url;
        link.download = 'company_data.json';

        // Trigger the download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    });
});
