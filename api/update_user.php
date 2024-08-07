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

if (!isset($data['user_id']) || empty($data['user_id']) || !isset($data['name']) || !isset($data['email']) || !isset($data['phone'])) {
    echo json_encode(['status' => false, 'message' => 'Incomplete data provided']);
    exit;
}
$user_id = $data['user_id'];
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];

$sql = "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?";
$query = $connection->prepare($sql);
$query->bind_param('sssi', $name, $email, $phone, $user_id);

if ($query->execute()) {
    echo json_encode(['status' => true, 'message' => 'User updated successfully']);
} else {
    echo json_encode(['status' => false, 'message' => 'Query execution failed']);
}

$query->close();
$connection->close();
?>
