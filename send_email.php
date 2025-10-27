<?php
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'lib/Exception.php';
require 'lib/PHPMailer.php';
require 'lib/SMTP.php';


// 指定你的收件信箱，將此替換為你實際的信箱
$to_email = 'info@jhengfong-tw.com'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 獲取表單資料並進行安全過濾
    $senderName = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $senderPhone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
    $senderEmail = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $subject = filter_var($_POST['type'], FILTER_SANITIZE_STRING); // 這裡將「類型」作為主旨
    $messageContent = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    if (empty($senderName) || empty($senderEmail) || empty($subject) || empty($messageContent)) {
        echo json_encode(['success' => false, 'message' => '所有欄位都必須填寫。']);
        exit;
    }
    
    $mail = new PHPMailer(true); // 啟用例外處理

    try {
        // 設定 SMTP 伺服器
        $mail->isSMTP();
        $mail->Host       = 'smtp.jhengfong-tw.com';             // 你的 SMTP 伺服器 (例如: Gmail) -> 'smtp.gmail.com'
        $mail->SMTPAuth   = true;                         // 啟用 SMTP 驗證
        $mail->Username   = 'info@jhengfong-tw.com'; // 你的 SMTP 帳號
        $mail->Password   = 'your_smtp_app_password';       // 你的郵件密碼 / 應用程式密碼 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-------------------- 這裡要填
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;    // 使用 SSL/TLS 加密
        $mail->Port       = 465;                            // SSL
        $mail->CharSet    = 'UTF-8';                        // 確保中文字元正常顯示

        // 設定寄件人（你的郵箱，不是填寫人的）
        $mail->setFrom('info@jhengfong-tw.com', '網站聯絡表單');
        
        // 設定回覆地址為填寫人的郵箱給他
        $mail->addReplyTo($senderEmail, $senderName);

        // 新增收件人
        $mail->addAddress($to_email);

        // 設定郵件主旨和內容
        $mail->Subject = '來自網站的新訊息：' . $subject;
        $mail->Body    = "寄件人: " . $senderName . "\n"
                       . "寄件人郵箱: " . $senderEmail . "\n"
                       . "聯絡電話: " . $senderPhone . "\n"
                       . "產品類型: " . $subject . "\n\n"
                       . "留言內容:\n" . $messageContent;

        $mail->send();
        echo json_encode(['success' => true]);
        
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "郵件發送失敗。錯誤: {$mail->ErrorInfo}"]);
    }

} else {
    echo json_encode(['success' => false, 'message' => '無效的請求方式。']);
}
?>
