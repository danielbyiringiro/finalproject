<?php

include "access_headers.php";
include "../settings/connection.php";
include "email_send.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    $name = $input['name'];
    $username = $input['username'];
    $email = $input['email'];
    $student_id = $input['student_id'];
    $major = $input['major'];
    $class = $input['class'];
    $password = $input['password'];
    $confirm_password = $input['confirm_password'];
    $code = rand(10000, 99999);

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO STUDENT (name, username, email, class, major, student_id, password, auth_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssisisi", $name, $username, $email, $student_id, $major, $class, $hashed_password, $code); // Execute the prepared statement with parameter binding

    if (!$stmt->execute()) 
    {
        echo json_encode(array('status' => 'error', 'message' => 'Error executing query' . $conn->error));
        exit;
    }
    else
    {
        $subject = 'Welcome to TheWell';
        $body = 'Hello ' . $name . ',<br><br>Thank you for signing up for TheWell. We are excited to have you on board.<br><br>To authenticate the validity of your email address, input the code below in the auth page of the application.<br><br>Code: ' . $code . '<br><br>Best,<br>TheWell Team';
        $result = send_email_to($email, $subject, $body);
        if ($result)
        {
            echo json_encode(array('status' => 'success'));
            exit;
        }
        else
        {
            echo json_encode(array('status' => 'error', 'message' => 'Email issues. Please try again later.'));
            exit;
        }
    }
}
