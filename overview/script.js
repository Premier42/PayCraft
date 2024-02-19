document.addEventListener("DOMContentLoaded", function () {
    // Simulating logged-in user, replace it with actual logged-in user
    const loggedInUser = "Admin";
  
    fetch('user.json')
      .then(response => response.json())
      .then(data => {
        const userData = document.getElementById('userData');
        userData.innerHTML = '';
  
        data.forEach(user => {
          // Check if logged-in user is "Admin"
          if (loggedInUser === 'Admin') {
            // Display all employee details
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.nid}</td>
              <td>${user.phoneNumber}</td>
              <td>${user.email === 'admin@mod.com' ? '' : user.password}</td>
            `;
            userData.appendChild(row);
          } else if (user.email === loggedInUser) {
            // Display details of the logged-in user only
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.nid}</td>
              <td>${user.phoneNumber}</td>
              <td>${user.password}</td>
            `;
            userData.appendChild(row);
          }
        });
      })
      .catch(error => console.error('Error:', error));
  });
  