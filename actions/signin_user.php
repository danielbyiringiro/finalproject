<?php

include "access_headers.php";
include "../settings/connection.php";

$response = array(); // Initialize an empty response array

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    $email = $input['email'];
    $password = $input['password'];

    $sql = "SELECT * FROM USER WHERE EMAIL = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email); // Execute the prepared statement with parameter binding

    if (!$stmt->execute()) 
    {
        $response['status'] = 'error';
        $response['message'] = 'Error executing query' . $conn->error;
    }
    else
    {
        $row = $stmt->get_result()->fetch_assoc();
        if ($row)
        {
            
            if (password_verify($password, $row['PASSWORD']))
            {
                $response['status'] = 'success';
                $response['user_data'] = $row;
            }
            else
            {
                $response['status'] = 'error';
                $response['message'] = 'Invalid password';
            }
        }
        else
        {
            $response['status'] = 'error';
            $response['message'] = 'Invalid email';
        }
    }
}

// Echo the final JSON response
echo json_encode($response);
