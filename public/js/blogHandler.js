console.log("Blogs Handler Loaded");

$(document).ready(function () {
    function fetchUsers() {
        $.ajax({
            url: "http://localhost/BMS/api/blogs/read_blog.php",
            method: "GET",
            success: function (response) {
                $("#loadTable").empty();
                $.each(response.data, function (index, value) {
                    console.log(value);
                    $("#loadTable").append(`
                        <tr>
                          <th scope="row">${value.blog_id}</th>
                          <td>${value.title}</td>
                          <td>${value.content}</td>
                          <td>${value.author_name}</td>
                          <td>${value.created_at}</td>
                          <td>
                            <button type="button" class="btn btn-success" data-edit-button data-blog_id="${value.blog_id}" data-bs-toggle="modal" data-bs-target="#updateModal">
                              <i class="fas fa-edit"> Edit</i>
                            </button>
                            <button type="button" class="btn btn-danger" data-delete-button data-blog_id="${value.blog_id}" data-bs-toggle="modal" data-bs-target="#deleteModal">
                              <i class="far fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                    `);
                });
            },
            error: function () {
                showToast("Failed to load blogs", "error");
            }
        });
    }

    fetchUsers();

    // Handle form submission for creating new blog
    function handleFormSubmission() {
        let title = $("#title").val();
        let content = $("#content").val();

        if (title === "" || content === "") {
            showToast("Please enter all the fields", "error");
            return false;
        }

        $.ajax({
            url: "http://localhost/BMS/api/blogs/create_blog.php",
            method: "POST",
            crossDomain: true,
            data: JSON.stringify({ title: title, content: content }),
            success: function (response) {
                if (response.status) {
                    showToast(response.message, "success");
                    $("#insertModal").modal("hide");
                    $("#insertForm")[0].reset();
                    fetchUsers();
                } else {
                    showToast(response.message, "error");
                }
            }
        });
    }

    // Handle blog edit
    function handleEditButtonClick(blog_id) {
        $.ajax({
            url: "http://localhost/BMS/api/blogs/edit_blog.php",
            type: "GET",
            data: { blog_id: blog_id },
            success: function (response) {
                if (response.status) {
                    $("#updatetitle").val(response.data.title);
                    $("#updatecontent").val(response.data.content);
                    $("#updateButton").data("blog_id", blog_id);
                    $("#updateModal").modal("show");
                } else {
                    showToast(response.message, "error");
                }
            }
        });
    }

    // Updating blog in Database
    function handleUpdateButtonClick(blogID) {
        let title = $("#updatetitle").val();
        let content = $("#updatecontent").val();

        $.ajax({
            url: "http://localhost/BMS/api/blogs/update_blog.php",
            type: "POST",
            data: JSON.stringify({ blog_id: blogID, title: title, content: content }),
            success: function (response) {
                if (response.status) {
                    showToast("Blog updated successfully", "success");
                    $("#updateModal").modal("hide");
                    fetchUsers();
                } else {
                    showToast(response.message, "error");
                }
            }
        });
    }

    // Handle blog delete
    function handleDeleteButtonClick(blogID) {
        $("#delete-btn").data("blog_id", blogID);
        $('#deleteModal').modal('show');
    }

    // Confirm blog deletion
    function handleDeleteConfirmClick(blogID) {
        $.ajax({
            url: "http://localhost/BMS/api/blogs/delete_blog.php",
            type: "POST",
            data: JSON.stringify({ blog_id: blogID }),
            success: function (response) {
                if (response.status) {
                    showToast("Blog deleted successfully", "success");
                    $("#deleteModal").modal("hide");
                    fetchUsers();
                } else {
                    showToast(response.message, "error");
                }
            }
        });
    }

    // event handlers all adjust in one place for better understading 
    $("#insertForm").on("submit", function (e) {
        e.preventDefault();
        handleFormSubmission();
    });

    $(document).on("click", "[data-edit-button]", function () {
        handleEditButtonClick($(this).data("blog_id"));
    });

    $("#updateButton").on("click", function () {
        handleUpdateButtonClick($(this).data("blog_id"));
    });

    $(document).on('click', '[data-delete-button]', function() {
        handleDeleteButtonClick($(this).data('blog_id'));
    });

    $("#delete-btn").on("click", function () {
        handleDeleteConfirmClick($(this).data("blog_id"));
    });

    fetchUsers();

    
//   //used ChatGpt for this Show toast notification
var toastElement = document.getElementById('toastNotification');
var toastInstance = new bootstrap.Toast(toastElement);

function showToast(message, type) {
    let icon = type === "success" ? "✔️" : "❌";
    let bgColor = type === "success" ? "#d4edda" : "#f8d7da";
    let textColor = type === "success" ? "#155724" : "#721c24";

    $("#toastBody").html(`
        <div class="alert alert-${type}" role="alert" style="background-color: ${bgColor}; color: ${textColor};">
          ${icon} ${message}
        </div>
    `);

    toastInstance.show();
}

});
