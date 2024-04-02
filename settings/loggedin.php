<?php

if (isset($_SESSION['user_id']))
{
    $user_id = $_SESSION['user_id'];
    echo json_encode(array('status' => 'success', 'user_id' => $user_id));
}
else
{
    echo json_encode(array('status' => 'error'));
}