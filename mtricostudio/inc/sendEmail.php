<?php

// Replace this with your own email address
$siteOwnersEmail = 'info@mtricostudio.it';


if($_POST) {

    $name = trim(stripslashes($_POST['contactName']));
    $email = trim(stripslashes($_POST['contactEmail']));
    $subject = trim(stripslashes($_POST['contactSubject']));
    $contact_message = trim(stripslashes($_POST['contactMessage']));

    // Check Name
    if (strlen($name) < 2) {
        $error['name'] = "Inserire un nome valido.";
    }
    // Check Email
    if (!preg_match('/^[a-z0-9&\'\.\-_\+]+@[a-z0-9\-]+\.([a-z0-9\-]+\.)*+[a-z]{2}/is', $email)) {
        $error['email'] = "Inserire un indirizzo mail valido.";
    }
    // Check Message
    if (strlen($contact_message) < 15) {
        $error['message'] = "Inserire il messaggio, deve contenere almeno 15 caratteri";
    }
    // Subject
    if ($subject == '') { $subject = "Form dei contatti"; }


    // Set Message
    $message .= "<b>MITTENTE:</b><br />";
    $message .= "Nome: " . $name . "<br />";
    $message .= "E-mail: " . $email . "<br /> <br />";
    $message .= "<b>OGGETTO:</b><br />";
    $message .= $subject . "<br /> <br />";
    $message .= "<b>MESSAGGIO:</b><br />";
    $message .= $contact_message;

    // Set From: header
    $from =  $name . " <" . $email . ">";

    // Email Headers
    $headers = "From: " . $from . "\r\n";
    $headers .= "Reply-To: ". $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


    if (!$error) {

        ini_set("sendmail_from", $siteOwnersEmail); // for windows server
        $mail = mail($siteOwnersEmail, $subject, $message, $headers);

        if ($mail) { echo "OK"; }
        else { echo "Ops! Qualcosa è andato storto. Riprova"; }
        
    } # end if - no validation error

    else {

        $response = (isset($error['name'])) ? $error['name'] . "<br /> \n" : null;
        $response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : null;
        $response .= (isset($error['message'])) ? $error['message'] . "<br />" : null;
        
        echo $response;

    } # end if - there was a validation error

}

?>