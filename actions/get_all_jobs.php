<?php
include "access_headers.php";
include "../settings/connection.php";

// Fetch all jobs from the database
$sql = "SELECT * FROM JOB";
$result = $conn->query($sql);

// Convert the result into an associative array
$jobs = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $jobs[] = $row;
    }
}

// Return the jobs data as JSON
echo json_encode($jobs);
?>
