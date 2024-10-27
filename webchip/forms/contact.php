<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $mail_to = "info@webchip.it";
        
        $subject = trim($_POST["subject"]);
        $name = str_replace(array("\r","\n"),array(" "," ") , strip_tags(trim($_POST["name"])));
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
		$phone = trim($_POST["phone"]);
        $message = trim($_POST["message"]);
		
        if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR (!filter_var($phone, FILTER_SANITIZE_NUMBER_INT) AND !empty($phone)) OR empty($subject) OR empty($message)) {
            http_response_code(400);
            echo "Per favore completa tutti i campi correttamente e riprova.";
            exit;
        }
        
		if (isset($_POST['data-sharing-acceptance'])) {
			$content = "Nome e Cognome: $name\n";
			$content .= "E-mail: $email\n";
			$content .= "Telefono: $phone\n\n";
			$content .= "Oggetto: $subject\n";
			$content .= "Messaggio: $message\n";

			$headers = "Inviato da: $name <$email>";

			$success = mail($mail_to, $subject, $content, $headers);
			if ($success) {
				http_response_code(200);
				echo "Grazie! Il tuo messaggio è stato inviato con successo.";
			} else {
				http_response_code(500);
				echo "Oops! Qualcosa è andato storto, il tuo messaggio non è stato inviato.";
			}
		} else {
			http_response_code(400);
			echo "É necessario consentire il trattamento dei dati.";
		}
    } else {
        http_response_code(403);
        echo "Oops! Qualcosa è andato storto, il tuo messaggio non è stato inviato.";
    }
?>
