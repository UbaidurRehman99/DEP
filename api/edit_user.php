<?php
include_once('../include/db_connect.php'); 

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['status' => false, 'message' => 'Invalid request method']);
    exit;
}

$user_id = $_GET['user_id'];

$sql = "SELECT * FROM users WHERE id = ?";
$query = $connection->prepare($sql);

if (!$query) {
    echo json_encode(['status' => false, 'message' => 'Statement preparation failed']);
    exit;
}

$query->bind_param('i', $user_id);

if (!$query->execute()) {
    echo json_encode(['status' => false, 'message' => 'Query execution failed']);
    exit;
}

$result = $query->get_result();
$user = $result->fetch_assoc();

$response = [
    'status' => true,
    'data' => $user
];

echo json_encode($response);

$query->close();
$connection->close();
?>
