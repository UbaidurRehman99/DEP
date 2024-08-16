<?php
include_once('../../include/db_connect.php');  
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['blog_id'])) {
        $blog_id = $_GET['blog_id'];

        // Select the blog details and the author's username based on the blog_id
        $sql = "SELECT b.*, u.username AS author_name 
                FROM blogs b 
                JOIN users u ON b.user_id = u.user_id 
                WHERE b.blog_id = ?";
        $query = $connection->prepare($sql);
        $query->bind_param('i', $blog_id);

        if (!$query->execute()) {
            echo json_encode(['status' => false, 'message' => 'Query execution failed']);
            exit;
        }

        $result = $query->get_result();
        $blog = $result->fetch_assoc();
        $query->close();

        if ($blog) {
            $response = [
                'status' => true,
                'data' => $blog
            ];
        } else {
            $response = [
                'status' => false,
                'message' => 'Blog not found'
            ];
        }
        echo json_encode($response);

    } else {
        // Select all blog details and their corresponding authors
        $sql = "SELECT b.*, u.username AS author_name 
                FROM blogs b 
                JOIN users u ON b.user_id = u.user_id";
        $query = $connection->prepare($sql);      

        if (!$query->execute()) {
            echo json_encode(['status' => false, 'message' => 'Query execution failed']);
            exit;
        }

        $result = $query->get_result();
        $blogs = $result->fetch_all(MYSQLI_ASSOC);
        $query->close();

        $response = [
            'status' => true,
            'data' => $blogs
        ];
        echo json_encode($response);
    }
} else {
    echo json_encode(['status' => false, 'message' => 'Invalid request method']);
}

$connection->close();
?>
