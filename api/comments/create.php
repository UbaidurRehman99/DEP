<?php
include_once('../../include/db_connect.php');   
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['blog_id']) && isset($data['text'])) {
        $blog_id = intval($data['blog_id']);
        $text = trim($data['text']);
        $user_id = 1; // i replace if i implent authuntication
        $created_at = date('Y-m-d H:i:s');

        $sql = "INSERT INTO comments (blog_id, user_id, content, created_at) VALUES (?, ?, ?, ?)";
        $query = $connection->prepare($sql);
        $query->bind_param('iiss', $blog_id, $user_id, $text, $created_at);

        if ($query->execute()) {
            echo json_encode(['status' => true, 'message' => 'Comment added successfully']);
        } else {
            echo json_encode(['status' => false, 'message' => 'Failed to add comment']);
        }

        $query->close();
    } else {
        echo json_encode(['status' => false, 'message' => 'Blog ID or other fields are missing']);
    }
} else {
    echo json_encode(['status' => false, 'message' => 'Invalid request method']);
}

$connection->close();
?>
