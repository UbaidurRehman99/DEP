<?php
require_once('../config.php');
$connection = mysqli_connect(HOST, USER, PASS, NAME);
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
