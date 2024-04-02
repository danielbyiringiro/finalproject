<?php

// Allow requests from all origins (not recommended for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type'); // Allow Content-Type header

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') 
{
    // Handle preflight requests
    header('Access-Control-Allow-Methods: POST'); // Allow POST method
    header('Access-Control-Max-Age: 86400'); // Cache preflight response for 24 hours
    exit;
}

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    $_POST = json_decode(file_get_contents('php://input'), true);

    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $role = $_POST['role'];

    // Process the form data and send a response
    echo json_encode(array('status' => 'success', 'user_id' => 1));
}
