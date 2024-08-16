<?php
include_once('../../include/db_connect.php');   
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => false, 'message' => 'Invalid request method']);
    exit;
}
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['blog_id']) || empty($data['blog_id']) || !isset($data['title']) || !isset($data['content'])) {
    echo json_encode(['status' => false, 'message' => 'Incomplete data provided']);
    exit;
}
$blog_id = $data['blog_id'];
$title = $data['title'];
$content = $data['content'];

$sql = "UPDATE blogs SET title = ?, content = ? WHERE blog_id = ?";
$query = $connection->prepare($sql);
$query->bind_param('ssi', $title, $content, $blog_id);


if ($query->execute()) {
    echo json_encode(['status' => true, 'message' => 'User updated successfully']);
} else {
    echo json_encode(['status' => false, 'message' => 'Query execution failed']);
}

$query->close();
$connection->close();
?>
