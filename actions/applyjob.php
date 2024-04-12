<?php

include "access_headers.php";
include "../settings/connection.php";

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Extract data from the input
    $applicantId = $input['applicantId'];
    $jobId = $input['jobId'];
    $yearsOfExperience = $input['years'];
    $motivation = $input['motivation'];

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute the SQL query
    $stmt = $conn->prepare("INSERT INTO APPLICATION (APPLICANT_ID, JOB_ID, YEARS_OF_EXPERIENCE, MOTIVATION) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiis", $applicantId, $jobId, $yearsOfExperience, $motivation);

    if ($stmt->execute() === TRUE) {
        // Return success response
        echo json_encode(["status" => "success"]);
        http_response_code(200);
    } else {
        // Return error response
        echo json_encode(["status" => "error", "message" => "Failed to submit application"]);
        http_response_code(500);
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    // Return error response for unsupported HTTP method
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    http_response_code(405);
}
?>
