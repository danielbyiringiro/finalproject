<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type'); // Allow Content-Type header

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight requests
    header('Access-Control-Allow-Methods: POST'); // Allow POST method
    header('Access-Control-Max-Age: 86400'); // Cache preflight response for 24 hours
    exit;
}

header('Content-Type: application/json');