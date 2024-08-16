<?php
include_once('../../include/db_connect.php'); 
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

$data = json_decode(file_get_contents('php://input'), true);

if(isset($data['comment_id'])) {
    $id = intval($data['comment_id']);

    $sql = "DELETE FROM comments WHERE comment_id = ?";
    $query = $connection->prepare($sql);

    $query->bind_param('i', $id);

    if($query->execute()) {
        echo json_encode(array('message' => 'Comment Deleted Successfully', 'status' => true));
    } else {
        echo json_encode(array('message' => 'Database Failure', 'status' => false));
    }

    $query->close();
} else {
    echo json_encode(array('message' => 'Incomplete Data', 'status' => false));
}
?>
