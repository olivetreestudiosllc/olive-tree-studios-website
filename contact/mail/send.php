<?php
// Use PHPMailer namespaces
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer classes
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';
require __DIR__ . '/phpmailer/src/Exception.php';

// Form is submitted via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Sanitize user input
    $first   = htmlspecialchars($_POST['first'] ?? '');
    $last    = htmlspecialchars($_POST['last'] ?? '');
    $email   = htmlspecialchars($_POST['email'] ?? '');
    $subject = htmlspecialchars($_POST['subject'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');

    // Build the email body
    $body  = "<h2>New Contact Form Submission</h2>";
    $body .= "<p><strong>First Name:</strong> $first</p>";
    $body .= "<p><strong>Last Name:</strong> $last</p>";
    $body .= "<p><strong>Email:</strong> $email</p>";
    $body .= "<p><strong>Subject:</strong> $subject</p>";
    $body .= "<p><strong>Message:</strong><br>" . nl2br($message) . "</p>";

    // Initialize PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Enable debug output
        $mail->SMTPDebug = 2;            // 0 = off, 1 = commands, 2 = commands + data
        $mail->Debugoutput = 'html';     // Output debug in HTML format

        // SMTP configuration
        $mail->isSMTP();
        $mail->Host       = 'webserver4.pebblehost.com'; // Your cPanel SMTP host
        $mail->SMTPAuth   = true;                        // Enable authentication
        $mail->Username   = 'contact@olivetreestudios.org'; // SMTP username
        $mail->Password   = 'U11RUPTnep4;';          // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;    // Use SSL
        $mail->Port       = 465;                           // SMTP port (SSL)

        // Sender & recipient
        $mail->setFrom('contact@olivetreestudios.org', 'Olive Tree Contact Form'); // From address
        $mail->addAddress('contact@olivetreestudios.org');                         // Recipient address
        $mail->addReplyTo($email, "$first $last");                                 // Reply goes to user

        // Email content
        $mail->isHTML(true);                     // Email format = HTML
        $mail->Subject = "Website Contact: $subject"; 
        $mail->Body    = $body;

        // Send the email
        $mail->send();

        // Redirect back with success
        header("Location: " . $_SERVER['HTTP_REFERER'] . "?success=1");
        exit;

    } catch (Exception $e) {
        // Debug info is printed because SMTPDebug=2
        header("Location: " . $_SERVER['HTTP_REFERER'] . "?success=0");
        exit;
    }
}
?>
