<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$mail_to = "info@webchip.it";

        $subject = trim($_POST["subject"]);
        $name = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["name"])));
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
		$phone = trim($_POST["phone"]);
        $message = trim($_POST["message"]);


		$content = "Nome e Cognome: $name\n";
		$content .= "E-mail: $email\n";
		$content .= "Telefono: $phone\n\n";
		$content .= "Oggetto: $subject\n";
		$content .= "Messaggio: $message\n";

		$headers =  'MIME-Version: 1.0' . "\r\n"; 
		$headers .= "From: $name <$email>" . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 
		
		$success = mail($mail_to, $subject, $content, $headers);
		if ($success) {
			http_response_code(200);
			echo '{"result": "sent", "message": "Grazie! Il tuo messaggio è stato inviato con successo."}';
		} else {
			http_response_code(500);
			echo '{"result": "not sent", "message": "Il tuo messaggio non è stato inviato a causa di un errore sconosciuto."}';
		}
    }
?>