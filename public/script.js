$(document).ready(function () {
    // Requesting Users from Database
  function fetchUsers() {
    $.ajax({
      url: "http://localhost:8080/DEP/task%201/CRUD%20API/api/read_user.php",
      method: "GET",
      success: function (response) {
        $("#loadTable").empty();
        $.each(response.data, function (key, value) {
          $("#loadTable").append(`
              <tr>
                <th scope="row">${value.id}</th>
                <td>${value.name}</td>
                <td>${value.email}</td>
                <td>${value.phone}</td>
                <td>
                  <button type="button" class="btn btn-success" data-edit-button data-user-id="${value.id}" data-bs-toggle="modal" data-bs-target="#updateModal">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button type="button" class="btn btn-danger" data-delete-button data-user-id="${value.id}" data-bs-toggle="modal" data-bs-target="#deleteModal">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            `);
        });
      },
      error: function () {
        showToast("Failed to load users", "error");
      },
    });
  }
    // Inserting Users in Database
  function handleFormSubmission() {
    let name = $("#name").val();
    let email = $("#email").val();
    let phone = $("#phone").val();

    if (name === "" || email === "" || phone === "") {
      showToast("Please enter all the fields", "error");
      return false;
    }

    $.ajax({
      url: "http://localhost:8080/DEP/task%201/CRUD%20API/api/create_user.php",
      method: "POST",
      crossDomain: true,
      data: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
      }),
      success: function (response) {
        if (response.status) {
          showToast(response.message, "success");
          $("#insertModal").modal("hide");
          $("#insertForm")[0].reset();
        } else {
          showToast(response.message, "error");
        }
      },
    });
  }

  fetchUsers();

  $("#insertBtn").click(function () {
    handleFormSubmission();
  });

  $("#insertModal").on("submit", function (e) {
    e.preventDefault();
    handleFormSubmission();
  });

  // Handle user edit
  $(document).on("click", "[data-edit-button]", function () {
    let userId = $(this).data("user-id");
    $.ajax({
      url: "http://localhost:8080/DEP/task%201/CRUD%20API/api/edit_user.php",
      type: "GET",
      data: { user_id: userId },
      success: function (response) {
        if (response.status) {
          $("#updateName").val(response.data.name);
          $("#updateEmail").val(response.data.email);
          $("#updatePhone").val(response.data.phone);
          $("#updateButton").data("user-id", userId);
          $("#updateModal").modal("show");
        } else {
          showToast(response.message, "error");
        }
      },
    });
  });

  // Updating User in Databse
  $("#updateButton").on("click", function () {
    let userId = $(this).data("user-id");
    let name = $("#updateName").val();
    let email = $("#updateEmail").val();
    let phone = $("#updatePhone").val();

    $.ajax({
      url: "http://localhost:8080/DEP/task%201/CRUD%20API/api/update_user.php",
      type: "POST",
      data: JSON.stringify({
        user_id: userId,
        name: name,
        email: email,
        phone: phone,
      }),
      success: function (response) {
        if (response.status) {
          showToast("User updated successfully", "success");
          $("#updateModal").modal("hide");
          fetchUsers(); 
        } else {
          showToast(response.message, "error");
        }
      },
    });
  });

  // Deleting User in Database
  $(document).on("click", "[data-delete-button]", function () {
    let userId = $(this).data("user-id");
    $("#delete-btn").data("user-id", userId);
    $("#deleteModal").modal("show");
  });

  $("#delete-btn").on("click", function () {
    let userId = $(this).data("user-id");

    $.ajax({
      url: "http://localhost:8080/DEP/task%201/CRUD%20API/api/delete_user.php",
      type: "POST",
      data: JSON.stringify({ user_id: userId }),
      success: function (response) {
        if (response.status) {
          showToast("User deleted successfully", "success");
          $("#deleteModal").modal("hide");
          fetchUsers();
        } else {
          showToast(response.message, "error");
        }
      },
    });
  });

  //used ChatGpt for this Show toast notification
  function showToast(message, type) {
    let icon = type === "success" ? "✔️" : "❌"; // Using Unicode for checkmark and cross
    let bgColor = type === "success" ? "#d4edda" : "#f8d7da"; // Green for success, red for error
    let textColor = type === "success" ? "#155724" : "#721c24"; // Dark green for success, dark red for error

    $("#toastBody").html(`
        <div class="alert alert-${type}" role="alert" style="background-color: ${bgColor}; color: ${textColor};">
          ${icon} ${message}
        </div>
      `);
    $("#toastNotification").toast("show");
  }
});
