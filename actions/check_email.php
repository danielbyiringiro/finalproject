<?php

include "access_headers.php";
include "../settings/connection.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    // Decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    $email = $input['email'];

    $sql = "SELECT * FROM STUDENT WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email); // Execute the prepared statement with parameter binding

    if ($stmt ->execute())
    {
        $row = $stmt->get_result()->fetch_assoc();
        if ($row)
        {
            echo json_encode(array('status' => 'error'));
        }
        else
        {
            echo json_encode(array('status' => 'success'));
        }
    }
    else
    {
        echo json_encode(array('status' => 'error', 'message' => 'Error executing query'));
    }
}
?>
