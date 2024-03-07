document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('UserEmail');

    // Load user data from JSON file
    fetch('/dataset/user.json')
        .then(response => response.json())
        .then(userData => {
            const user = userData.find(user => user.email === userEmail);
            if (user) {
                const state = user.state;
                if (state === 0) {  // for when setup is needed
                    document.getElementById('setup').style.display = 'block';
                    document.getElementById('employer').style.display = 'none';
                    document.getElementById('employee').style.display = 'none';
                } else if (state === 1) {  // for when employer
                    document.getElementById('setup').style.display = 'none';
                    document.getElementById('employer').style.display = 'block';
                    document.getElementById('employee').style.display = 'none';
                    document.getElementById('logoutContainer').style.display = 'block';
                    document.getElementById('addPaymentOptionContainer').style.display = 'block';

                    // Fetch company information from company.json
                    fetch('/dataset/company.json')
                        .then(response => response.json())
                        .then(companyData => {
                            // Find the company owned by the current user
                            const company = companyData.find(company => company.employerEmail === userEmail);
                            if (company) {
                                // Populate company information card
                                const companyInfoCard = document.querySelector('#companyInfo');
                                companyInfoCard.innerHTML = `
                                    <p><strong>Company Name:</strong> ${company.companyName}</p>
                                    <p><strong>Company Size:</strong> ${company.companySize}</p>
                                    <p><strong>Company EIN:</strong> ${company.companyEIN}</p>
                                    <p><strong>Company Industry:</strong> ${company.employerIndustry}</p>
                                `;

                                // Populate employee list
                                const employeeList = document.querySelector('#employeeList');
                                company.employees.forEach(employee => {
                                    const li = document.createElement('li');
                                    li.textContent = `${employee.name} - ${employee.email}`;
                                    employeeList.appendChild(li);
                                });
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching company data:', error);
                        });

                    // Fetch transaction data from transaction.json
                    fetch('/dataset/transaction.json')
                        .then(response => response.json())
                        .then(transactionData => {
                            // Filter transactions for the current company owner
                            const ownerTransactions = transactionData.filter(transaction => transaction.from === userEmail);
                            
                            // Populate the dynamic table with transaction data
                            const transactionTableBody = document.querySelector('#transactionTableBody');
                            ownerTransactions.forEach(transaction => {
                                const row = `
                                    <tr>
                                        <td>${transaction.transactionId}</td>
                                        <td>${transaction.amount}</td>
                                        <td>${transaction.date}</td>
                                        <td>${transaction.to}</td>
                                    </tr>
                                `;
                                transactionTableBody.innerHTML += row;
                            });
                        })
                        .catch(error => {
                            console.error('Error fetching transaction data:', error);
                        });

                } else {  // for when employee
                    document.getElementById('setup').style.display = 'none';
                    document.getElementById('employer').style.display = 'none';
                    document.getElementById('employee').style.display = 'block';
                    document.getElementById('logoutContainer').style.display = 'block';
                    document.getElementById('addPaymentOptionContainer').style.display = 'block';

                    // Populate employee information card
                    const employeeInfoCard = document.querySelector('#employee .card-body');
                    employeeInfoCard.innerHTML = `
                        <h5 class="card-title">${user.name}</h5>
                        <p class="card-text">Email: ${user.email}</p>
                        <p class="card-text">Phone Number: ${user.phoneNumber}</p>
                    `;

                    // Load transaction data from JSON file
                    fetch('/dataset/transaction.json')
                        .then(response => response.json())
                        .then(transactionData => {
                            // Filter transactions for the current employee
                            const employeeTransactions = transactionData.filter(transaction => transaction.to === userEmail);

                            // Populate the dynamic table with transaction data
                            const transactionTableBody = document.querySelector('#employee tbody');
                            employeeTransactions.forEach(transaction => {
                                const row = `
                                    <tr>
                                        <td>${transaction.transactionId}</td>
                                        <td>${transaction.amount}</td>
                                        <td>${transaction.date}</td>
                                        <td>${transaction.from}</td>
                                    </tr>
                                `;
                                transactionTableBody.innerHTML += row;
                            });
                        })
                        .catch(error => {
                            console.error('Error fetching transaction data:', error);
                        });
                }
            } else {
                console.log('User not found');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });

    // Button listeners
    const joinButton = document.getElementById('joinButton');
    const createButton = document.getElementById('createButton');
    const addEmployeeButton = document.getElementById('addEmployeeButton');
    const makePaymentButton = document.getElementById('makePaymentButton');
    const logoutButton = document.getElementById('logoutButton');
    const addPaymentOptionButton = document.getElementById('addPaymentOptionButton');

    joinButton.addEventListener('click', function() {
        //updateUserState(userEmail, 2); // Update user state to 2 , needs a server to do this
        window.location.href = './overview.html';
    });

    createButton.addEventListener('click', function() {
        window.location.href = 'registerCompany.html';
    });

    addEmployeeButton.addEventListener('click', function() {
        // Redirect to add employee page
        window.location.href = 'registerEmployee.html';
    });

    makePaymentButton.addEventListener('click', function() {
        // Redirect to make payment page
        window.location.href = 'Payment_Table.html';
    });

    logoutButton.addEventListener('click', function() {
        // Clear local storage
        localStorage.removeItem('UserEmail');
        // Redirect to index.html
        window.location.href = '../index.html';
    });

    addPaymentOptionButton.addEventListener('click', function() {
        // Redirect to add payment option page
        window.location.href = 'addPayment.html';
    });
});
