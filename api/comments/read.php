<?php
include_once('../../include/db_connect.php');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['blog_id'])) {
        $blog_id = intval($_GET['blog_id']);

        // Prepare SQL query to fetch comments with user information
        $sql = "SELECT c.comment_id, c.blog_id, c.user_id, c.content, c.created_at, u.username
                FROM comments c
                LEFT JOIN users u ON c.user_id = u.user_id
                WHERE c.blog_id = ?";

        $query = $connection->prepare($sql);
        $query->bind_param('i', $blog_id);

        if (!$query->execute()) {
            echo json_encode(['status' => false, 'message' => 'Query execution failed']);
            exit;
        }

        $result = $query->get_result();
        $comments = $result->fetch_all(MYSQLI_ASSOC);

        $query->close();

        $response = [
            'status' => true,
            'data' => $comments
        ];
        echo json_encode($response);
    } else {
        echo json_encode(['status' => false, 'message' => 'Blog ID is required']);
    }
} else {
    echo json_encode(['status' => false, 'message' => 'Invalid request method']);
}

$connection->close();
?>