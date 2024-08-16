console.log("Comments Handler Loaded");

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('blog_id');

    // hidden input field
    $('#comment-blog-id').val(blogId);

    // Load comments 
    function loadComments() {
        $.ajax({
            url: `http://localhost/BMS/api/comments/read.php?blog_id=${blogId}`,
            method: "GET",
            success: function(response) {
                if (response.status) {
                    $('#comments-container').empty();
                    response.data.forEach(comment => {
                        $('#comments-container').append(`
                            <div class="comment" data-comment-id="${comment.comment_id}">
                                <p><strong>${comment.username}:</strong> ${comment.content}</p>
                                <button class="btn btn-sm btn-danger btn-delete-comment" data-comment-id="${comment.comment_id}">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        `);
                    });

                    // event for delete 
                    $('.btn-delete-comment').on('click', function() {
                        let commentId = $(this).data('comment-id');
                        deleteComment(commentId);
                    });
                } else {
                    $('#comments-container').html('<p>No comments yet.</p>');
                }
            },
        });
    }

    function handleCommentSubmission() {
        // let name = $("#commenter-name").val();
        let text = $("#comment-text").val();

        $.ajax({
            url: "http://localhost/BMS/api/comments/create.php",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                blog_id: blogId,
                text: text
            }),
            success: function(response) {
                if (response.status) {
                    $("#comment-form")[0].reset();
                    loadComments();
                } 
            }
        });
    }

   
    function deleteComment(commentId) {
        $.ajax({
            url: "http://localhost/BMS/api/comments/delete.php",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ comment_id: commentId }),
            success: function(response) {
                if (response.status) {
                    loadComments();
                } 
            }
        });
    }

    $("#comment-form").on("submit", function(e) {
        e.preventDefault();
        handleCommentSubmission();
    });

    loadComments();

});
