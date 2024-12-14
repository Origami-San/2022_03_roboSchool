<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "Тема письма";
$file = $_FILES['file'];

$c = true;
// Формирование самого письма
$title = "Заголовок письма";
foreach ($_POST as $key => $value) {
  if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
    $body .= "
    " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP(); // Используем SMTP
  $mail->CharSet = "UTF-8"; // Используем кодировку UTF-8
  $mail->SMTPAuth   = true; // Включаем авторизацию по SMTP

  // Настройки вашей почты
  $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
  $mail->Username   = ''; // Логин на почте
  $mail->Password   = ''; // Пароль приложения
  $mail->SMTPSecure = 'ssl'; // Протокол ssl
  $mail->Port       = 465; // Порт

  $mail->setFrom('mail@mail.ru', 'Заявка с вашего сайта'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('mail@mail.ru');
  $mail->addAddress(''); // Еще один получатель, если нужно

  // Прикрипление файлов к письму
  if (!empty($file['name'][0])) {
    for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
      $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
      $filename = $file['name'][$ct];
      if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
        $mail->addAttachment($uploadfile, $filename);
        $rfile[] = "Файл $filename прикреплён";
      } else {
        $rfile[] = "Не удалось прикрепить файл $filename";
      }
    }
  }

  // Отправка сообщения
  $mail->isHTML(true); // Преобразовывам письмо в HTML
  $mail->Subject = $title; // Тема письма
  $mail->Body = $body; // Наполнение письма

  $mail->send(); // Метод для отправки письма
} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
