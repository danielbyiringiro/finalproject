<?php

include "access_headers.php";
include "../settings/connection.php";

$response = array(); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    $email = $input['email'];
    $password = $input['password'];

    $sql = "SELECT * FROM STUDENT WHERE email = ?";
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

                // update user status to 1 indicating that the account is now validated

                $sql = "UPDATE STUDENT SET status = 1 WHERE email = ?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("s", $email); // Execute the prepared statement with parameter binding

                if (!$stmt->execute()) 
                {
                    $response['status'] = 'error';
                    $response['message'] = 'Error executing query' . $conn->error;
                }
                else
                {
                    $response['status'] = 'success';
                    $response['user_data'] = $row;
                }
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
