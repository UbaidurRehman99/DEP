<?php
include_once('../include/db_connect.php'); 
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
   
    $sql = "SELECT * FROM users";
    $query = $connection->prepare($sql);       

    if (!$query->execute()) {
        echo json_encode(['status' => false, 'message' => 'Query execution failed']);
        exit;
    }
    $result = $query->get_result();
    $users = $result->fetch_all(MYSQLI_ASSOC);
    $query->close();
    // print_r($users);
    
    $response = [
        'status' => true,
        'data' => $users
    ];
    echo json_encode($response);
} else {
    echo json_encode(['status' => false, 'message' => 'Invalid request method']);
}
$connection->close();
?>
