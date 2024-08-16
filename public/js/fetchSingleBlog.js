console.log("Fetch Single Blog Loaded");

$(document).ready(function () {
    
    function fetchSingleBlogs() {
        $.ajax({
            url: "http://localhost/BMS/api/blogs/read_blog.php",
            method: "GET",
            success: function (response) {
                $("#blog_div").empty();
                $.each(response.data, function (key, value) {
                    $("#blog_div").append(`
                        <div class="col-md-4">
                            <article class="blog-post">
                                <div class="blog-post-content">
                                    <h2 class="blog-post-title">${value.title}</h2>
                                    <p>${value.content}</p>
                                    <a href="show.html?blog_id=${value.blog_id}" class="btn btn-read-more">Read More</a>
                                </div>
                            </article>
                        </div>
                    `);
                });
            },
        });
    }

    // Fetch single blogs
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('blog_id');

    $.ajax({
        url: `http://localhost/BMS/api/blogs/read_blog.php?blog_id=${blogId}`,
        method: "GET",
        success: function(response) {
            const blog = response.data;
            $('.blog-title').text(blog.title);
            $('.blog-content p').html(blog.content);
        },
    });

   
    fetchSingleBlogs();
});
