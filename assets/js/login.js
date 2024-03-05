// author shinzuu

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('../dataset/user.json')
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.email === email);
            if (!user) {
                alert('Email not found. Please create an account instead.');
            } else {
                if (user.password === password) {
                    alert('Login successful.');
                    localStorage.setItem('UserEmail', email); // Save email to local storage
                    window.location.href = 'overview.html';
                } else {
                    alert('Incorrect password. Please try again.');
                }
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('An error occurred. Please try again later.');
        });
});
