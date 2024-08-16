<?php
define('HOST', 'localhost');
define('NAME', 'dep_bms'); 
define('USER', 'root');
define('PASS', '');
$connection = mysqli_connect(HOST, USER, PASS, NAME);
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
