//author rimjhim
document.addEventListener('DOMContentLoaded', function () {
    // Get the payment form, table body, and total including tax input field
    var paymentForm = document.getElementById('paymentForm');
    var paymentTableBody = document.querySelector('#paymentForm table tbody');
    var totalIncludingTaxInput = document.getElementById('totalIncludingTax');

    // Populate the payment table with data from JSON file
    fetch('paymentData.json')
        .then(response => response.json())
        .then(data => {
            populatePaymentTable(data);
            calculateTotalIncludingTax(data); // Calculate total including tax
        });

    function populatePaymentTable(data) {
        data.forEach(function (item, index) {
            var row = paymentTableBody.insertRow();
            row.innerHTML = `
                <td><input type="checkbox" id="paymentStatus${index + 1}" name="paymentStatus${index + 1}"></td>
                <td><input type="text" id="uniqueId${index + 1}" name="uniqueId${index + 1}" class="form-control" value="${item.uniqueId}" readonly></td>
                <td><input type="text" id="employeeName${index + 1}" name="employeeName${index + 1}" class="form-control" value="${item.employeeName}"></td>
                <td>$${item.paymentPerHour.toFixed(2)}</td>
                <td><input type="text" id="hoursWorked${index + 1}" name="hoursWorked${index + 1}" class="form-control" value="${item.hoursWorked}"></td>
                <td><input type="text" id="bonus${index + 1}" name="bonus${index + 1}" class="form-control" value="${item.bonus}"></td>
                <td><input type="text" id="deduction${index + 1}" name="deduction${index + 1}" class="form-control deduction" value="${item.deduction}"></td>
                <td class="total"><input type="text" id="totalPayment${index + 1}" name="totalPayment${index + 1}" class="form-control" value="${item.totalPayment.toFixed(2)}" readonly></td>
            `;
        });
    }

    // Event listener for checkbox click event remains unchanged

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
                uniqueId: row.cells[1].querySelector('input').value,
                employeeName: row.cells[2].querySelector('input').value,
                paymentPerHour: parseFloat(row.cells[3].textContent.replace('$', '')),
                hoursWorked: parseFloat(row.cells[4].querySelector('input').value),
                bonus: parseFloat(row.cells[5].querySelector('input').value),
                deduction: parseFloat(row.cells[6].querySelector('input').value),
                totalPayment: parseFloat(row.cells[7].querySelector('input').value)
            };
            payrollData.push(rowData);
        }

        // Process payroll data (e.g., send to server, calculate totals, etc.)
        console.log(payrollData);
    });

    // Add event listener to the payment form for calculating total payment
    paymentForm.addEventListener('input', function (event) {
        var target = event.target;
        if (target.matches('.form-control')) {
            calculateTotalPayment(target.closest('tr'));
            calculateTotalIncludingTax(data); // Recalculate total including tax
        }
    });

    function calculateTotalPayment(row) {
        var paymentPerHour = parseFloat(row.querySelector('[name^="paymentPerHour"]').value);
        var hoursWorked = parseFloat(row.querySelector('[name^="hoursWorked"]').value) || 0;
        var bonus = parseFloat(row.querySelector('[name^="bonus"]').value) || 0;
        var deduction = parseFloat(row.querySelector('[name^="deduction"]').value) || 0;

        var totalPayment = (hoursWorked * paymentPerHour) + bonus - deduction;

        row.querySelector('[name^="totalPayment"]').value = totalPayment.toFixed(2);
    }

    // Function to calculate total including tax
    function calculateTotalIncludingTax(data) {
        // Assuming tax rate is 10% (you can adjust this value accordingly)
        var taxRate = 0.1;

        // Calculate total payment
        var totalPayment = data.reduce(function(total, item) {
            return total + item.totalPayment;
        }, 0);

        // Calculate total including tax
        var totalIncludingTax = totalPayment * (1 + taxRate);

        // Update total including tax input field value
        totalIncludingTaxInput.value = totalIncludingTax.toFixed(2);
    }
});
