// Author: Rimjhim
document.addEventListener('DOMContentLoaded', function () {
    var paymentForm = document.getElementById('paymentForm');
    var paymentTableBody = document.querySelector('#paymentForm table tbody');
    var proceedToPayButton = document.querySelector('.btn-primary');

    // Retrieve user's email from local storage
    const userEmail = localStorage.getItem('UserEmail');

    // Read company data from JSON
    fetch('../dataset/company.json')
        .then(response => response.json())
        .then(companies => {
            const userCompany = companies.find(company => company.employerEmail === userEmail);

            if (userCompany) {
                const employees = userCompany.employees;

                // Read payment data from JSON
                fetch('../dataset/Payment_Data.json')
                    .then(response => response.json())
                    .then(paymentData => {
                        proceedToPayButton.addEventListener('click', function(event) {
                            event.preventDefault(); // Prevent default form submission behavior
                            calculateTotalPayment(paymentData);
                        });

                        populatePaymentTable(employees, paymentData);
                    })
                    .catch(error => console.error('Error fetching payment data:', error));
            }
        })
        .catch(error => console.error('Error fetching company data:', error));

    function populatePaymentTable(employees, paymentData) {
        employees.forEach(function (employee, index) {
            const paymentInfo = paymentData.find(payment => payment.employeeEmail === employee.email);

            if (paymentInfo) {
                const row = paymentTableBody.insertRow();
                row.innerHTML = `
                    <td><input type="checkbox" id="paymentStatus${index}" name="paymentStatus${index}"></td>
                    <td>${paymentInfo.uniqueId}</td>
                    <td>${employee.name}</td>
                    <td><input type="text" id="paymentPerHour${index}" name="paymentPerHour${index}" class="form-control" value="${paymentInfo.paymentPerHour.toFixed(2)}"></td>
                    <td><input type="text" id="hoursWorked${index}" name="hoursWorked${index}" class="form-control" value="${paymentInfo.hoursWorked || 0}"></td>
                    <td><input type="text" id="bonusOrDeduction${index}" name="bonusOrDeduction${index}" class="form-control bonusOrDeduction" value="${Math.abs(paymentInfo.bonus || paymentInfo.deduction || 0)}"></td>
                `;
            }
        });
    }

    function calculateTotalPayment(paymentData) {
        const tax = 0.1; // Example tax rate, replace with actual tax rate retrieval logic if needed

        let sum = 0;

        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
            if (checkbox.checked) {
                const paymentPerHourElement = document.getElementById(`paymentPerHour${index}`);
                if (paymentPerHourElement) {
                    const paymentPerHour = parseFloat(paymentPerHourElement.value);
                    sum += paymentPerHour;
                }
            }
        });

        const totalIncludingTax = sum * (1 + tax);

        const totalPaymentValueElement = document.getElementById('totalPaymentValue');
        if (totalPaymentValueElement) {
            totalPaymentValueElement.textContent = totalIncludingTax.toFixed(2);
        }

        const totalPaymentSection = document.getElementById('totalPaymentSection');
        if (totalPaymentSection) {
            totalPaymentSection.style.display = 'block';
        }

        const confirmButton = document.getElementById('confirmButton');
        if (confirmButton) {
            confirmButton.addEventListener('click', function() {
                window.location.href = 'overview.html'; // Redirect to overview.html
            });
        }
    }
});
