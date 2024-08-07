<?php
include_once('../include/db_connect.php');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => false, 'message' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['user_id']) || empty($data['user_id'])) {
    echo json_encode(['status' => false, 'message' => 'User ID not provided']);
    exit;
}

$user_id = $data['user_id'];

$sql = "DELETE FROM users WHERE id = ?";
$query = $connection->prepare($sql);

if (!$query) {
    echo json_encode(['status' => false, 'message' => 'Statement preparation failed']);
    exit;
}

$query->bind_param('i', $user_id);

if ($query->execute()) {
    echo json_encode(['status' => true, 'message' => 'User deleted successfully']);
} else {
    echo json_encode(['status' => false, 'message' => 'Query execution failed']);
}

$query->close();
$connection->close();
?>
