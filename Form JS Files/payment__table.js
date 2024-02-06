document.addEventListener('DOMContentLoaded', function () {
    // Get the payment form
    var paymentForm = document.getElementById('paymentForm');
    // Get the transaction history table
    var transactionHistoryTable = document.getElementById('transactionHistory');

    // Add event listener to the payment form for submitting payment
    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        var paymentStatus = document.getElementById('paymentStatus');
        paymentStatus.textContent = 'Payment submitted successfully.';

        // Show the transaction history table
        transactionHistoryTable.style.display = 'table';
    });
});
