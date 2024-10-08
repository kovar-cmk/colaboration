<?php

// Capture form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone']; // Assuming you added a phone number field
$subject = $_POST['subject'];
$message = $_POST['message'];

// Replace with your email address
$recipient = "bassetben85@gmail.com"; 

// Email content
$body = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n"; // If you added a phone number field
$body .= "Subject: $subject\n";
$body .= "Message: $message";

// Send email using PHP mail function
if (mail($recipient, $subject, $body)) {
  echo "Email sent successfully!";
} else {
  echo "There was an error sending the email.";
}