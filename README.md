# 專案

專案名稱：正峰印刷整合服務 (Jhengfong_SOLUTION)
作者：yves 
版本：v1.0.0  
更新日期：2025-10-28

---

## 專案結構

```
project-root/
├── fonts/                    # 字型資源
│   └── CustomFont.ttf
│
├── images/                   # 網站圖片資源
│   ├── items/                # 分類子資料夾（建議依主題或頁面分）
│   ├── P1/
│   ├── P2/
│   └── ..
├── lib/                      # 外部 PHP 函式庫（PHPMailer）
│   ├── Exception.php
│   ├── PHPMailer.php
│   └── SMTP.php
│
├── apple-touch-icon.png
├── favicon.png               # 網站標籤圖示
├── favicon-16x16.png
├── favicon-32x32.png
│
├── consumables.html          # 頁面：耗材介紹（中文版）
├── consumables_en.html       # 頁面：耗材介紹（英文版）
├── consumables-style.css     # 頁面樣式
├── consumables-script.js     # 頁面 JavaScript
│
├── service.html              # 頁面：服務內容（中文版）
├── service_en.html           # 頁面：服務內容（英文版）
├── service-style.css         # 頁面樣式
├── service-script.js         # 頁面 JavaScript
├── service.json              # 服務資料（中文版 JSON）
├── service_en.json           # 服務資料（英文版 JSON）
│
├── index.html                # 首頁（中文版）
├── index_en.html             # 首頁（英文版）
│
├── send_email.php            # PHP 寄信端點（表單提交使用）
│
├── script.js                 # 首頁 JavaScript（返回頂部、動畫、通用功能）
├── style.css                 # 首頁樣式（深色主題、字型、版面）
│
├── README.md                 # 專案說明文件（版本、使用方式、部署指引）
│
└── service.json / service_en.json # 服務內容資料（JSON格式）

```

## 本地與測試

### 使用 VS Code + Live Server

1. 安裝 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 擴充套件  
2. 在專案根目錄點右鍵 → 「Open with Live Server」  

---

## EmailJS（寄信表單）
1. send_email.php: 
   此檔案為網站表單的後端寄信 API。
   前端透過 fetch() 或 <form action="send_mail.php"> 將表單送出後，PHP 會：
   - 驗證使用者輸入；
   - 使用 PHPMailer 經 SMTP 發送 Email；
   - 回傳 JSON 格式的結果（成功或失敗）。

2. 目前的寄信流程:
   - 前端表單送出（可用 <form> 或 JS fetch()）
   - 傳到 send_mail.php
   - send_mail.php 使用 PHPMailer → 連線 SMTP → 寄出郵件
   - 回傳 JSON 給前端（顯示成功或失敗訊息）

3. send_email.php 使用者設定
   $to_email = 'info@jhengfong-tw.com';  // 實際收件信箱

   $mail->Host       = 'smtp.jhengfong-tw.com';  // 你的郵件伺服器
   $mail->Username   = 'info@jhengfong-tw.com';  // 寄信帳號
   $mail->Password   = 'your_smtp_app_password'; // 你的郵件密碼或應用程式密碼 <<<<<<<<<<<<<< 需要改這裡 >>>>>>>>>>>>>>

---