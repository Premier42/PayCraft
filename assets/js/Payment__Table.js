// Author: Rimjhim
document.addEventListener('DOMContentLoaded', function () {
    var paymentForm = document.getElementById('paymentForm');
    var paymentTableBody = document.querySelector('#paymentForm table tbody');
    var proceedToPayButton = document.querySelector('.btn-primary');

    var companyName = localStorage.getItem('xyz'); // Retrieve company name from local storage

    fetch('../dataset/Payment_Data.json')
        .then(response => response.json())
        .then(data => {
            var employeesUnderCompany = data.filter(item => item.companyName === companyName);
            populatePaymentTable(employeesUnderCompany);
        });

        proceedToPayButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission behavior
            calculateTotalPayment();
    });

    function populatePaymentTable(data) {
        data.forEach(function (item, index) {
            var row = paymentTableBody.insertRow();
            row.innerHTML = `
                <td><input type="checkbox" id="paymentStatus${index + 1}" name="paymentStatus${index + 1}"></td>
                <td>${item.uniqueId}</td>
                <td>${item.employeeName}</td>
                <td><input type="text" id="paymentPerHour${index + 1}" name="paymentPerHour${index + 1}" class="form-control" value="${item.paymentPerHour.toFixed(2)}"></td>
                <td><input type="text" id="hoursWorked${index + 1}" name="hoursWorked${index + 1}" class="form-control" value="${item.hoursWorked}"></td>
                <td><input type="text" id="bonusOrDeduction${index + 1}" name="bonusOrDeduction${index + 1}" class="form-control bonusOrDeduction" value="${Math.abs(item.bonus || item.deduction || 0)}"></td>
            `;
        });
    }

    function calculateTotalPayment() {
        fetch('../dataset/Company.json')
            .then(response => response.json())
            .then(companyData => {
                //  Retrieve tax value from local storage
                const tax = parseFloat(localStorage.getItem('tax'));
    
                // Check if tax value is valid
                if (isNaN(tax)) {
                    throw new Error('Tax information is missing or invalid.');
                }
    
                // Initialize sum variable
                let sum = 0;
    
                //  Iterate through each row of the payment table
                document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
                    if (checkbox.checked) {
                        const paymentPerHour = parseFloat(document.getElementById(`paymentPerHour${index + 1}`).value);
                        const hoursWorked = parseFloat(document.getElementById(`hoursWorked${index + 1}`).value);
                        const bonus = parseFloat(document.getElementById(`bonusOrDeduction${index + 1}`).value);
    
                        // Calculate payment for this row and add to sum
                        sum += (hoursWorked * paymentPerHour) + bonus;
                    }
                });
    
                // Calculate total payment including tax
                const totalIncludingTax = sum * (1 + tax); // Calculate total including tax
    
                // Update total payment value in the HTML
                const totalPaymentValueElement = document.getElementById('totalPaymentValue');
                totalPaymentValueElement.textContent = totalIncludingTax.toFixed(2);
    
                // Show the total payment section
                const totalPaymentSection = document.getElementById('totalPaymentSection');
                totalPaymentSection.style.display = 'block';
    
                //  Handle click event for the "Confirm" button
                const confirmButton = document.getElementById('confirmButton');
                confirmButton.addEventListener('click', function() {
                    // Redirect to overview.html
                    window.location.href = 'overview.html';
                });
            })
            .catch(error => {
                console.error('Error fetching company data:', error);
                window.alert('Error calculating total payment: ' + error.message);
            });
    }
});
