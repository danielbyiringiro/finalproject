<?php

// Load environment variables
require_once '../settings/env.php';
require_once '../settings/connection.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

function send_email_to($email, $subject, $body)
{
    // Configure PHPMailer
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = getenv('GMAIL_USERNAME');
    $mail->Password = getenv('GMAIL_PASSWORD');
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Set email parameters
    $mail->setFrom(getenv('GMAIL_USERNAME'), 'TheWell');
    $mail->addAddress($email);
    $mail->Subject = $subject;
    $mail->isHTML(true);
    $mail->Body = $body;

    // Send email and return boolean status
    try 
    {
        $mail->send();
        return true;
    } 
    catch (Exception $e) 
    {
        error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}\n", 3, 'file.log');
        return false;
    }
}
?>
