// author shinzuu
const jsonFilePath = '/dataset/user.json';

// sign up script
document.getElementById("signupForm").addEventListener("submit", function(event){
    event.preventDefault(); // Prevents the form from submitting normally
    
    // Get form data
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const email = document.getElementById("email").value;
    const nid = document.getElementById("nid").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    
    // Check if password and confirm password match
    if (password !== confirmPassword) {
        alert("Password and confirm password do not match.");
        return;
    }

    // Read existing users from localStorage
    let users = localStorage.getItem('users');
    users = users ? JSON.parse(users) : [];

    // Check if email already exists
    const existingEmails = users.map(user => user.email);
    if (existingEmails.includes(email)) {
        alert("Account already exists with this email. Please log in instead.");
        return;
    }

    // Add new user data
    const newUser = {
        name: name,
        password: password,
        email: email,
        nid: nid,
        phoneNumber: phoneNumber
    };
    users.push(newUser);

    // Save updated users back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Trigger download of the updated JSON file
    downloadUsersJson(users);

    alert("Account created successfully!");
    localStorage.setItem('UserEmail', email); // Save email to local storage
    window.location.href = 'overview.html';
});

function downloadUsersJson(users) {
    // Trigger download of the updated JSON file
    const blob = new Blob([JSON.stringify(users)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user.json'; // Set the desired filename
    a.style.display = 'none'; // Hide the link
    document.body.appendChild(a);

    // Simulate a click on the link to trigger the download
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
    a.remove();
}
