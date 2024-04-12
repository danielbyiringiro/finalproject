<?php

include "access_headers.php";
include "../settings/connection.php";

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute the SQL query to retrieve job applications
$sql = "SELECT * FROM APPLICATION";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    $applications = array();
    while ($row = $result->fetch_assoc()) {
        $applications[] = $row;
    }
    // Return JSON response with job applications
    echo json_encode($applications);
} else {
    // Return empty array if no applications found
    echo json_encode([]);
}

// Close connection
$conn->close();

?>
