document.addEventListener("DOMContentLoaded", function() {
    // Retrieve user's email from local storage
    const userEmail = localStorage.getItem("UserEmail");

    // Read company data from JSON
    fetch('../dataset/company.json')
        .then(response => response.json())
        .then(companies => {
            // Find the company where the user is an owner
            const userCompany = companies.find(company => company.employerEmail === userEmail);

            if (userCompany) {
                // Retrieve the list of employees
                const employees = userCompany.employees;

                // Read payment data from JSON
                fetch('../dataset/paymentData.json')
                    .then(response => response.json())
                    .then(paymentData => {
                        // Get the table body element
                        const tableBody = document.querySelector("#paymentTable tbody");

                        // Clear any existing rows
                        tableBody.innerHTML = '';

                        // Iterate through each employee and find their payment information
                        employees.forEach(employee => {
                            const paymentInfo = paymentData.find(payment => payment.employeeName === employee.name && payment.companyName === userCompany.companyName);

                            if (paymentInfo) {
                                // Create a new row for each employee
                                const row = tableBody.insertRow();
                                row.innerHTML = `
                                    <td>Paid</td>
                                    <td>${userCompany.companyEIN}</td>
                                    <td>${employee.name}</td>
                                    <td>$${paymentInfo.paymentPerHour.toFixed(2)}</td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                `;
                            }
                        });
                    })
                    .catch(error => console.error('Error fetching payment data:', error));
            }
        })
        .catch(error => console.error('Error fetching company data:', error));
});
