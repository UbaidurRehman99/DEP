// console.log("Script Loaded");
// $(document).ready(function () {
//   console.log("jQuery Loaded and Ready");
//     // Requesting Users from Database
//   function fetchUsers() {
//     $.ajax({
//       url: "http://localhost/BMS/api/blogs/read_blog.php",
//       method: "GET",
//       success: function (response) {

//         $("#loadTable").empty();
//         $.each(response.data, function (key, value) {
//           $("#loadTable").append(`
//             <tr>
//               <th scope="row">${value.blog_id}</th>
//               <td>${value.title}</td>
//               <td>${value.content}</td>
//               <td>${value.author_name}</td> 
//               <td>${value.created_at}</td>
//               <td>
//                 <button type="button" class="btn btn-success" data-edit-button data-blog_id="${value.blog_id}" data-bs-toggle="modal" data-bs-target="#updateModal">
//                   <i class="fas fa-edit"> Edit</i>
//                 </button>
//                 <button type="button" class="btn btn-danger" data-delete-button data-blog_id="${value.blog_id}" data-bs-toggle="modal" data-bs-target="#deleteModal">
//                   <i class="far fa-trash-alt"></i>
//                 </button>
//               </td>
//             </tr>
//             `);
//         });
//       },
//       error: function () {
//         showToast("Failed to load users", "error");
//       },
//     });
//   }
//     // Inserting Users in Database
//   function handleFormSubmission() {
//     let title = $("#title").val();
//     let content = $("#content").val();

//     if (title === "" || content === "") {
//       showToast("Please enter all the fields", "error");
//       return false;
//     }

//     $.ajax({
//       url: "http://localhost/BMS/api/blogs/create_blog.php",
//       method: "POST",
//       crossDomain: true,
//       data: JSON.stringify({
//         title: title,
//         content: content,
//       }),
//       success: function (response) {
//         if (response.status) {
//           showToast(response.message, "success");
//           $("#insertModal").modal("hide");
//           $("#insertForm")[0].reset();
//         } else {
//           showToast(response.message, "error");
//         }
//       },
//     });
//   }

//   fetchUsers();

// $("#insertForm").on("submit", function (e) {
//   e.preventDefault(); // Prevent default form submission
//   handleFormSubmission();
// });


//   // $("#insertForm").on("submit", function (e) {
//   //   e.preventDefault();
//   //   console.log('Form submitted');
//   //   handleFormSubmission();
//   // });

//   // Handle blog edit
//   $(document).on("click", "[data-edit-button]", function () {

//     let blog_id = $(this).data("blog_id");

//     $.ajax({
//       url: "http://localhost/BMS/api/blogs/edit_blog.php",
//       type: "GET",
//       data: { blog_id: blog_id },
//       success: function (response) {
//         if (response.status) {
//           $("#updatetitle").val(response.data.title);
//           $("#updatecontent").val(response.data.content);
//           $("#updateButton").data("blog_id", blog_id);
//           $("#updateModal").modal("show");
//         } else {
//           showToast(response.message, "error");
//         }
//       },
//     });
//   });

//   // Updating blog in Databse
//   $("#updateButton").on("click", function () {

//     let blogID = $(this).data("blog_id");
//     let title = $("#updatetitle").val();
//     let content = $("#updatecontent").val();

//     $.ajax({
//       url: "http://localhost/BMS/api/blogs/update_blog.php",
//       type: "POST",
//       data: JSON.stringify({
//         blog_id: blogID,
//         title: title,
//         content: content,
//       }),
//       success: function (response) {
//         if (response.status) {
//           showToast("User updated successfully", "success");
//           $("#updateModal").modal("hide");
//           fetchUsers(); 
//         } else {
//           showToast(response.message, "error");
//         }
//       },
//     });
//   });

//   // Deleting blog in Database
//   $(document).on('click', '[data-delete-button]', function() {
    
//     console.log('Delete button clicked');
//     let blogID = $(this).data('blog_id');
//     console.log('blogID:', blogID);
//     $("#delete-btn").data("blog_id", blogID);
    
//     $('#deleteModal').modal('show');
//   });
  
//   $("#delete-btn").on("click", function () {
//     let blogID = $(this).data("blog_id");
  
//     $.ajax({
//       url: "http://localhost/BMS/api/blogs/delete_blog.php",
//       type: "POST",
//       data: JSON.stringify({ blog_id: blogID }),
//       success: function (response) {
//         if (response.status) {
//           showToast("Blog deleted successfully", "success");
//           $("#deleteModal").modal("hide");
//           fetchUsers();
//         } else {
//           showToast(response.message, "error");
//         }
//       },
//     });
//   });

// // fetching blogs for homepage
//     function fetchSingleBlogs() { 

//       $.ajax({
//         url: "http://localhost/BMS/api/blogs/read_blog.php",
//         method: "GET",
//         success: function (response) {
    
//           $("#blog_div").empty();
    
//           $.each(response.data, function (key, value) {
//             $("#blog_div").append(`
//                <div class="col-md-4">
//                 <article class="blog-post">
//               <div class="blog-post-content">
//                 <h2 class="blog-post-title">${value.title}</h2>
//                 <p>${value.content}</p>
//                 <a href="show.html?blog_id=${value.blog_id}" class="btn btn-read-more">Read More</a>
//               </div>
//                 </article>
//                 </div>
//             `);
//           });
//         },
//         error: function () {
//           showToast("Failed to load blogs", "error");
//         }
//       });
//     }
    
//     fetchSingleBlogs();

//     // comments section
//     $(document).ready(function() {
//       const urlParams = new URLSearchParams(window.location.search);
//       const blogId = urlParams.get('blog_id');
  
//       // Set the blogId in the hidden input field
//       $('#comment-blog-id').val(blogId);
//       console.log(blogId);
  
//       // Fetch and display the blog details
//       $.ajax({
//           url: `http://localhost/BMS/api/blogs/read_blog.php?blog_id=${blogId}`,
//           method: "GET",
//           success: function(response) {
//               const blog = response.data;
//               $('.blog-title').text(blog.title);
//               $('.blog-content p').html(blog.content);
//           },
//           error: function() {
//               showToast("Failed to load blog", "error");
//           }
//       });
  
//       // Function to load comments for the blog
//       function loadComments() {
//         $.ajax({
//             url: `http://localhost/BMS/api/comments/read.php?blog_id=${blogId}`, 
//             method: "GET",
//             success: function(response) {
//                 console.log(response); // Debugging response
//                 if (response.status) {
//                     $('#comments-container').empty();
//                     response.data.forEach(comment => {
//                         $('#comments-container').append(`
//                             <div class="comment" data-comment-id="${comment.comment_id}">
//                                 <p><strong>${comment.username}:</strong> ${comment.content}</p>
//                                 <button class="btn btn-sm btn-danger btn-delete-comment" data-comment-id="${comment.comment_id}">
//                                     <i class="fas fa-trash"></i> Delete
//                                 </button>
//                             </div>
//                         `);
//                     });
    
//                     // Attach event listener for delete buttons
//                     $('.btn-delete-comment').on('click', function() {
//                         let commentId = $(this).data('comment-id');
//                         deleteComment(commentId);
//                     });
//                 } else {
//                     $('#comments-container').html('<p>No comments yet.</p>');
//                 }
//             },
//             error: function() {
//                 showToast("Failed to load comments", "error");
//             }
//         });
//     }
    
//       // Function to handle comment submission
//       function handleCommentSubmission() {
//           let blogId = $("#comment-blog-id").val();
//           let name = $("#commenter-name").val();
//           let text = $("#comment-text").val();
  
//           if (name === "" || text === "") {
//               showToast("Please enter all the fields", "error");
//               return false;
//           }
  
//           $.ajax({
//               url: "http://localhost/BMS/api/comments/create.php",
//               method: "POST",
//               contentType: "application/json",
//               data: JSON.stringify({
//                   blog_id: blogId,
//                   name: name,
//                   text: text
//               }),
//               success: function(response) {
//                   if (response.status) {
//                       showToast(response.message, "success");
//                       $("#comment-form")[0].reset();
//                       loadComments(); // Reload comments after adding a new one
//                   } else {
//                       showToast(response.message, "error");
//                   }
//               },
//               error: function() {
//                   showToast("Failed to submit comment", "error");
//               }
//           });
//       }
  
//       // Handle form submission
//       $("#comment-form").on("submit", function(e) {
//           e.preventDefault();
//           handleCommentSubmission();
//       });
  
//       // Load comments when the page loads
//       loadComments();
//   });

//   function deleteComment(commentId) {
//     if (confirm("Are you sure you want to delete this comment?")) {
//         $.ajax({
//             url: "http://localhost/BMS/api/comments/delete.php",
//             method: "DELETE",
//             contentType: "application/json",
//             data: JSON.stringify({ comment_id: commentId }),
//             success: function(response) {
//                 if (response.status) {
//                     showToast(response.message, "success");
//                     // Remove the comment from the DOM
//                     $(`div[data-comment-id="${commentId}"]`).remove();
//                 } else {
//                     showToast(response.message, "error");
//                 }
//             },
//             error: function() {
//                 showToast("Failed to delete comment", "error");
//             }
//         });
//     }
// }

  

//   //used ChatGpt for this Show toast notification
//   function showToast(message, type) {
//     let icon = type === "success" ? "✔️" : "❌"; // Using Unicode for checkmark and cross
//     let bgColor = type === "success" ? "#d4edda" : "#f8d7da"; // Green for success, red for error
//     let textColor = type === "success" ? "#155724" : "#721c24"; // Dark green for success, dark red for error

//     $("#toastBody").html(`
//         <div class="alert alert-${type}" role="alert" style="background-color: ${bgColor}; color: ${textColor};">
//           ${icon} ${message}
//         </div>
//       `);
//     $("#toastNotification").toast("show");
//   }
// });
