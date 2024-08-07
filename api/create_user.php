<?php include_once('../include/db_connect.php');
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
        
$data = json_decode(file_get_contents('php://input'), true);

if(isset($data['name']) && isset($data['email']) && isset($data['phone'])) {

    $name = trim($data['name']);
    $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
    $phone = $data['phone'];
    
    if (!$email) {
        echo json_encode(['status' => false, 'message' => 'Invalid email format']);
        exit;
    }
}

$sql = "INSERT INTO users (name, email, phone) VALUES (?,?,?)";
$query = $connection->prepare($sql);

if ($query === false) {
    echo json_encode(['status' => false, 'message' => 'Query preparation failed']);
    exit;
}

$query->bind_param('sss', $name, $email, $phone);

if($query->execute()) {
    echo json_encode(array('message' => 'User Inserted Successfully', 'status' => true));
} else {
    echo json_encode(array('message' => 'Database Failure', 'status' => false));
}

$query->close();

?>

