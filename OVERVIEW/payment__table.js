document.addEventListener('DOMContentLoaded', function () {
    // Get the payment form and table body
    var paymentForm = document.getElementById('paymentForm');
    var paymentTableBody = document.querySelector('#paymentForm table tbody');

    // Load JSON data containing IDs and payment per hour values
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Populate the payment table with data from the JSON file
            populatePaymentTable(data);
        });

    function populatePaymentTable(data) {
        data.forEach((item, index) => {
            var row = paymentTableBody.insertRow();
            row.innerHTML = `
                <td><input type="checkbox" id="paymentStatus${index + 1}" name="paymentStatus${index + 1}"></td>
                <td><input type="text" id="uniqueId${index + 1}" name="uniqueId${index + 1}" class="form-control" value="${item.id}" readonly></td>
                <td><input type="text" id="employeeName${index + 1}" name="employeeName${index + 1}" class="form-control" placeholder="Employee Name"></td>
                <td>$${item.paymentPerHour.toFixed(2)}</td>
                <td><input type="text" id="hoursWorked${index + 1}" name="hoursWorked${index + 1}" class="form-control" placeholder="Hours Worked"></td>
                <td><input type="text" id="bonus${index + 1}" name="bonus${index + 1}" class="form-control" placeholder="Bonus"></td>
                <td><input type="text" id="deduction${index + 1}" name="deduction${index + 1}" class="form-control deduction" placeholder="Deduction"></td>
                <td class="total"><input type="text" id="totalPayment${index + 1}" name="totalPayment${index + 1}" class="form-control" placeholder="Total Payment" readonly></td>
            `;
        });
    }

    // Event listener for checkbox click event
    paymentTableBody.addEventListener('click', function (event) {
        var target = event.target;
        if (target.type === 'checkbox') {
            var isChecked = target.checked;
            var row = target.closest('tr');
            var paymentStatusCell = row.cells[0];
            if (isChecked) {
                paymentStatusCell.innerHTML = '<i class="bi bi-check-circle"></i>'; // Replace with your check mark icon or text
            } else {
                paymentStatusCell.innerHTML = ''; // Clear the content if checkbox is unchecked
            }
        }
    });

    // Add event listener to the payment form for submitting payment
    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the number of rows in the table
        var numRows = paymentTableBody.rows.length;

        // Loop through each row and collect data
        var payrollData = [];
        for (var i = 0; i < numRows; i++) {
            var row = paymentTableBody.rows[i];
            var rowData = {
                uniqueId: row.cells[0].querySelector('input').value,
                employeeName: row.cells[1].querySelector('input').value,
                basePayment: parseFloat(row.cells[2].textContent.replace('$', '')),
                hoursWorked: parseFloat(row.cells[3].querySelector('input').value),
                bonus: parseFloat(row.cells[4].querySelector('input').value),
                deduction: parseFloat(row.cells[5].querySelector('input').value)
            };
            rowData.totalPayment = calculateTotalPayment(rowData);
            payrollData.push(rowData);
        }

        // Process payroll data (e.g., send to server, calculate totals, etc.)
        console.log(payrollData);
    });

    

    // Add event listener to add new row button
    var addRowButton = document.getElementById('addRowButton');
    addRowButton.addEventListener('click', function () {
        // Create a new row
        var newRow = paymentTableBody.insertRow();

        // Insert cells into the new row
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);

        // Set the innerHTML of each cell with input fields
        cell1.innerHTML = '<input type="text" class="form-control" placeholder="ID">';
        cell2.innerHTML = '<input type="text" class="form-control" placeholder="Employee Name">';
        cell3.innerHTML = '$15.00'; // Base payment
        cell4.innerHTML = '<input type="text" class="form-control" placeholder="Hours Worked">';
        cell5.innerHTML = '<input type="text" class="form-control" placeholder="Bonus">';
        cell6.innerHTML = '<input type="text" class="form-control deduction" placeholder="Deduction">';
        cell7.innerHTML = ''; // Total payment will be calculated

        // Update the placeholder of total payment cell
        cell7.innerHTML = 'To be calculated';
    });


    // Add event listener to the payment form for calculating total payment
    paymentForm.addEventListener('input', function (event) {
        var target = event.target;
        if (target.matches('.form-control')) {
            calculateTotalPayment(target);
        }
    });

    function calculateTotalPayment(inputField) {
        var row = inputField.closest('tr');
        var hoursWorked = parseFloat(row.querySelector('[name^="hoursWorked"]').value) || 0;
        var paymentPerHour = parseFloat(row.querySelector('[name^="uniqueId"]').value) || 0;
        var bonus = parseFloat(row.querySelector('[name^="bonus"]').value) || 0;
        var deduction = parseFloat(row.querySelector('[name^="deduction"]').value) || 0;

        var totalPayment = (hoursWorked * paymentPerHour) + bonus - deduction;

        row.querySelector('[name^="totalPayment"]').value = totalPayment.toFixed(2);
    }
});
