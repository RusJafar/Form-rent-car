<?php

if(!$_POST) exit;

// Email address verification, do not edit.
//function isEmail($email) {
	//return(preg_match("/^[-_.[:alnum:]]+@((([[:alnum:]]|[[:alnum:]][[:alnum:]-]*[[:alnum:]])\.)+(ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$/i",$email));
	//return 1;
//}

if (!defined("PHP_EOL")) define("PHP_EOL", "\r\n");



// productF, breedF,stationQ,arrangementF, keepF,feedingF,distributionF,staffF,automaticF
/*
if(trim($name) == '') {
	echo '<div class="error_message">Нужно ввести Ваше имя.</div>';
	exit();
} else if(trim($email) == '') {
	echo '<div class="error_message">Надо ввести правильный email адрес.</div>';
	exit();
} else if(trim($phone) == '') {
	echo '<div class="error_message">Надо ввести правильный номер телефона.</div>';
	exit();
} else if(!is_numeric($phone)) {
	echo '<div class="error_message">Номер телефона должен содержать только цифры.</div>';
	exit();
} else if(!isEmail($email)) {
	echo '<div class="error_message">Вы ввели неправильный e-mail, попробуйте снова.</div>';
	exit();
} else if(trim($comments) == '') {
	echo '<div class="error_message">Введите Ваше сообщение.</div>';
	exit();
} 
*/

$name     = $_POST['name']; 
//echo 'name '.$name;
$email  = $_POST['contact'];
//echo 'email '.$email;
$datetime    = $_POST['datetime'];
//echo 'datetime '.$datetime;
$passenger  = $_POST['passenger'];
//echo 'passenger '.$passenger;
$masege = $_POST['masege'];
//echo 'masege '.$masege;		   /* Сообщение */
$inp  = $_POST['inp']; 		
//echo 'inp '.$inp;   /*  Время аренды */
$price    = $_POST['price']; 
//echo 'price '.$price;		   /*  Стоймость аренды  */
$rent_car  = $_POST['rent_car']; 
//echo 'rent_car '.$rent_car;   	   /* Размер земельных и пастбищных угодий */

/* if(get_magic_quotes_gpc()) {
	$comments = stripslashes($comments);
} */


// Configuration option.
// Enter the email address that you want to emails to be sent to.
// Example $address = "joe.doe@yourdomain.com";


$address = "yor@mail.com";


$e_subject = 'Клиент ' . $name . '.';

// Configuration option.
// You can change this if you feel that you need to.
// Developers, you may wish to add more fields to the form, in which case you must be sure to add them here.
$e_body = "Заказчик: $name";
$e_contact = "\r\nДанные для связи: $email";
$e_passenger = "\r\nКоличество пассажиров: $passenger";
$e_datetime = "\r\nДата трансфера: $datetime" . PHP_EOL;
$e_masege = " \r\nСообщение: $masege" ;
$e_inp = "\r\nНаправление трансфера: $inp";
$e_price = "\r\nСтоймость трансфера от: $price" . PHP_EOL;
$e_rent_car = "\r\nАвтомобиль для трансфера: $rent_car";

$msg = wordwrap( $e_body . $e_contact . $e_passenger . $e_datetime . $e_rent_car . $e_inp . $e_price .  $e_masege );

$headers = "From: $email" . PHP_EOL;
$headers .= "Reply-To: $email" . PHP_EOL;
$headers .= "MIME-Version: 1.0" . PHP_EOL;
$headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

if(mail($address, $e_subject, $msg, $headers)) {

	// Email has sent successfully, echo a success page.

	echo "<body style='background: #2196f31c;'>";
	echo "<div id='success_page' style='text-align: center;'>";
	echo "<h1 style='color: #2563c3; font-size: 3.5em; padding-top: 5%;'>Спасибо, Ваше сообщение отправлено!</h1>";
	echo "<img src='../img/funny_bus.png' class='fin_image' style='width: 40%;'/>";
	echo "<p style='font-size:2.5em;'>Мы свяжемся с Вами в ближайшее время!</p>";
	echo "<a href='../index.html'><span style='width: 33%; height: 7rem; background: #2563c3; border-radius: 90px 24px; border: 1px solid #ddd; display: inline-block; vertical-align: middle; text-align: center; color: white;'><p style='font-size: 2em;'>На главную</p></span></a>";
	echo "</div>";
	echo "</body>";

} else {

	//echo 'ОШИБКА Все поля нужно заполнить';
	echo "<body style='background: #2196f31c;'>";
	echo "<div style='text-align: center; background: #2196f31c;' id='success_page'>";
	echo "<h1 style='color: #2563c3; font-size: 4em;'>ОШИБКА!</h1>";
	echo "<p><strong>Сообщение не отправлено!</strong></p>";
	echo "</div>";
	echo "</body>";

	
	

}