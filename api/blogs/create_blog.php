<?php
include_once('../../include/db_connect.php'); 
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
        
$data = json_decode(file_get_contents('php://input'), true);

if(isset($data['title']) && isset($data['content'])) {

    $title = trim($data['title']);
    $content = trim($data['content']);
}
    $user_id = 1;


$sql = "INSERT INTO blogs (user_id, title, content, created_at) VALUES (?,?,?,NOW())"; 
$query = $connection->prepare($sql);

$query->bind_param('iss', $user_id, $title, $content);

if($query->execute()) {
    echo json_encode(array('message' => 'User Inserted Successfully', 'status' => true));
} else {
    echo json_encode(array('message' => 'Database Failure', 'status' => false));
}

$query->close();

?>

