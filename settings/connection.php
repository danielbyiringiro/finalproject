<?php

$database_name = 'thewell';
$database_user = 'root';
$database_password = '';
$database_host = 'localhost';

$conn = new mysqli($database_host, $database_user, $database_password, $database_name);
if ($conn->connect_error) 
{
    die("Connection failed: " . $conn->connect_error);
}
