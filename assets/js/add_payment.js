//author sakib
document.querySelectorAll('[data-payment-type]').forEach(function (button) {
    button.addEventListener('click', function () {
        var paymentType = this.getAttribute('data-payment-type');
        showPaymentDetails(paymentType);
    });
});

function showPaymentDetails(paymentType) {
    document.getElementById('cardDetails').style.display = 'none';
    document.getElementById('bankDetails').style.display = 'none';
    document.getElementById('cashAppDetails').style.display = 'none';

    if (paymentType === 'card') {
        document.getElementById('cardDetails').style.display = 'block';
    } else if (paymentType === 'bank') {
        document.getElementById('bankDetails').style.display = 'block';
    } else if (paymentType === 'cashApp') {
        document.getElementById('cashAppDetails').style.display = 'block';
    }
}

function handlePayment() {
    document.getElementById('paymentForm').style.display = 'none';
    document.querySelector('.loading-indicator').style.display = 'block';

    // Simulate a delay for demonstration purposes
    setTimeout(function () {
        alert('Payment processed successfully!');
        window.location.href = 'confirmation.html';
    }, 3000);

    // Prevent form submission
    return false;
}

// bkash , nogad, rocket .

document.querySelectorAll('[data-cashapp-type]').forEach(function (button) {
    button.addEventListener('click', function () {
        var cashAppType = this.getAttribute('data-cashapp-type');
        showCashAppDetails(cashAppType);
    });
});

function showCashAppDetails(cashAppType) {
    // Hide all Cash App details
    document.getElementById('bkashUserNumber').style.display = 'none';
    document.getElementById('nogadUserNumber').style.display = 'none';
    document.getElementById('rocketUserNumber').style.display = 'none';

    // Show the relevant Cash App details based on the selected type
    if (cashAppType === 'bkash') {
        document.getElementById('bkashUserNumber').style.display = 'block';
    } else if (cashAppType === 'nogad') {
        document.getElementById('nogadUserNumber').style.display = 'block';
    } else if (cashAppType === 'rocket') {
        document.getElementById('rocketUserNumber').style.display = 'block';
    }
}