<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer library
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';
require __DIR__ . '/phpmailer/src/Exception.php';

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Sanitize form input
    $first   = htmlspecialchars($_POST['first'] ?? '');
    $last    = htmlspecialchars($_POST['last'] ?? '');
    $email   = htmlspecialchars($_POST['email'] ?? '');
    $subject = htmlspecialchars($_POST['subject'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');

    // Build email body
    $body  = "<h2>New Contact Form Submission</h2>";
    $body .= "<p><strong>First Name:</strong> $first</p>";
    $body .= "<p><strong>Last Name:</strong> $last</p>";
    $body .= "<p><strong>Email:</strong> $email</p>";
    $body .= "<p><strong>Subject:</strong> $subject</p>";
    $body .= "<p><strong>Message:</strong><br>" . nl2br($message) . "</p>";

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // SMTP settings for cPanel mail
        $mail->isSMTP();
        $mail->Host       = 'mail.olivetreestudios.org'; // Your cPanel mail server
        $mail->SMTPAuth   = true;
        $mail->Username   = 'contact@olivetreestudios.org'; // cPanel email
        $mail->Password   = 'YOUR_EMAIL_PASSWORD';         // cPanel email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  // SSL
        $mail->Port       = 465;                          

        // Sender and recipient
        $mail->setFrom('contact@olivetreestudios.org', 'Olive Tree Contact Form');
        $mail->addAddress('contact@olivetreestudios.org'); // Where you want to receive submissions
        $mail->addReplyTo($email, "$first $last");          // Replies go to the user

        // Content
        $mail->isHTML(true);
        $mail->Subject = "Website Contact: $subject";
        $mail->Body    = $body;

        // Send email
        $mail->send();

        // Redirect with success
        header("Location: " . $_SERVER['HTTP_REFERER'] . "?success=1");
        exit;

    } catch (Exception $e) {
        // Optional: enable debug mode temporarily if needed
        // echo "Mailer Error: {$mail->ErrorInfo}";
        header("Location: " . $_SERVER['HTTP_REFERER'] . "?success=0");
        exit;
    }
}
?>
