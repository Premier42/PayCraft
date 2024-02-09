document.getElementById("loginButton").addEventListener("click", performLogin);

function performLogin() {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("password").value;

    // Perform login logic here

    // Example: Display success message
    alert("Login successful");
}
// Get the form element
const signupForm = document.querySelector("#signup form");

// Add submit event listener
signupForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from submitting

  // Get input values
  const name = document.querySelector("#name").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirmPassword").value;
  const email = document.querySelector("#email").value;
  const nid = document.querySelector("#nid").value;
  const phoneNumber = document.querySelector("#phoneNumber").value;

  // Validate input values
  if (name.trim() === "") {
    // Display error message for name field
    document.querySelector(".input-field:nth-child(1) .error").innerHTML =
      "Please enter your name";
  } else {
    document.querySelector(".input-field:nth-child(1) .error").innerHTML = "";
  }

  if (password.trim() === "") {
    // Display error message for password field
    document.querySelector(".input-field:nth-child(2) .error").innerHTML =
      "Please create a password";
  } else if (confirmPassword.trim() === "") {
    // Display error message for confirmPassword field
    document.querySelector(".input-field:nth-child(3) .error").innerHTML =
      "Please confirm your password";
  } else if (password !== confirmPassword) {
    document.querySelector(".input-field:nth-child(3) .error").innerHTML =
      "Passwords do not match";
  } else {
    document.querySelector(".input-field:nth-child(2) .error").innerHTML = "";
    document.querySelector(".input-field:nth-child(3) .error").innerHTML = "";
  }

  if (email.trim() === "") {
    // Display error message for email field
    document.querySelector(".input-field:nth-child(4) .error").innerHTML =
      "Please enter your email";
  } else {
    document.querySelector(".input-field:nth-child(4) .error").innerHTML = "";
  }

  if (nid.trim() === "") {
    // Display error message for nid field
    document.querySelector(".input-field:nth-child(5) .error").innerHTML =
      "Please enter your NID";
  } else {
    document.querySelector(".input-field:nth-child(5) .error").innerHTML = "";
  }

  if (phoneNumber.trim() === "") {
    // Display error message for phoneNumber field
    document.querySelector(".input-field:nth-child(6) .error").innerHTML =
      "Please enter your phone number";
  } else {
    document.querySelector(".input-field:nth-child(6) .error").innerHTML = "";
  }
});