<?php

include "access_headers.php";
include "../settings/connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    $job_title = $input['title'];
    $job_description = $input['description'];
    $job_location = $input['location'];
    $job_type = $input['jobType'];
    $job_salary = $input['salary'];
    $employer = $input['employerID'];
    $arrangement = $input['workArrangement'];

    $sql = "INSERT INTO JOB (TITLE, DESCRIPTION, LOCATION, TYPE, SALARY, USER_ID, ARRANGEMENT) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssisi", $job_title, $job_description, $job_location, $job_type, $job_salary, $employer, $arrangement); // Execute the prepared statement with parameter binding

    if (!$stmt->execute()) 
    {
        $response['status'] = 'error';
        $response['message'] = 'Error executing query' . $conn->error;
    }
    else
    {
        $response['status'] = 'success';
        $response['message'] = 'Job created successfully';
    }

    echo json_encode($response);
}