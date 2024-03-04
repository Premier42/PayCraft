$(document).ready(function () {
    // Click event handlers for navigation links
    $(".create-company-link").click(function (e) {
      e.preventDefault();
      toggleForms("#createCompanyForm");
    });

    $(".add-employee-link").click(function (e) {
      e.preventDefault();
      toggleForms("#addEmployeeForm");
    });

    $(".company-details").click(function (e) {
      e.preventDefault();
      toggleForms("#employeeDetails");
    });

    $(".history-link").click(function (e) {
      e.preventDefault();
      toggleForms("#paymentHistory");
    });

    function toggleForms(formId) {
      // Hide all sections before toggling the selected one
      $(".table-container, .form-container").hide();
      // Toggle the selected section
      $(formId).toggle().find('input').val('');
      if (formId === "#paymentHistory" && $(formId).is(":visible")) {
        fetchPaymentHistory();
      } else if (formId === "#employeeDetails" && $(formId).is(":visible")) {
        fetchEmployeeDetails();
      } else {
        $("#paymentHistory tbody").empty();
        $("#employeeTable tbody").empty();
      }
    }

    function fetchPaymentHistory() {
      var paymentData = [
        { serialNo: 1, transactionNumber: "TRN12345", date: "2024-03-01", amount: 100 },
        { serialNo: 2, transactionNumber: "TRN67890", date: "2024-03-05", amount: 150 },
        { serialNo: 3, transactionNumber: "TRN24680", date: "2024-03-10", amount: 200 }
      ];

      var paymentHistoryTable = $("#paymentHistory tbody");
      paymentHistoryTable.empty(); // Clear previous data
      paymentData.forEach(function (payment) {
        var row = "<tr>" +
          "<td>" + payment.serialNo + "</td>" +
          "<td>" + payment.transactionNumber + "</td>" +
          "<td>" + payment.date + "</td>" +
          "<td>" + payment.amount + "</td>" +
          "</tr>";
        paymentHistoryTable.append(row);
      });
    }

    function fetchEmployeeDetails() {
      $.getJSON("employee.json", function (data) {
        var employeeTable = $("#employeeTable tbody");
        employeeTable.empty(); // Clear previous data
        data.forEach(function (employee) {
          var row = "<tr>" +
            "<td>" + employee.employeename + "</td>" +
            "<td>" + employee.employeeID + "</td>" +
            "<td>" + employee.department + "</td>" +
            "<td>" + employee.position + "</td>" +
            "<td>" + employee.employeeStatus + "</td>" +
            "</tr>";
          employeeTable.append(row);
        });
      });
    }
  });