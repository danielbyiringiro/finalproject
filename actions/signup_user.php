<?php

include "access_headers.php";
include "../settings/connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    $name = $input['name'];
    $email = $input['email'];
    $password = $input['password'];
    $confirm_password = $input['confirm_password'];
    $role = $input['role'];

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO USER (name, email, password, role) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $name, $email, $hashed_password, $role); // Execute the prepared statement with parameter binding

    if (!$stmt->execute()) 
    {
        echo json_encode(array('status' => 'error', 'message' => 'Error executing query' . $conn->error));
        exit;
    }
    else
    {
        echo json_encode(array('status' => 'success'));
        exit;
    }
}
