const nodemailer = require('nodemailer');

// Chỉ tạo transporter nếu đã cấu hình email
function createTransporter() {
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!user || !pass) {
    return null;
  }

  // Hỗ trợ Brevo SMTP (smtp-relay.brevo.com) và Gmail
  const host = process.env.MAIL_HOST || 'smtp-relay.brevo.com';
  const port = Number(process.env.MAIL_PORT || 587);

  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
  });
}

/**
 * Gửi email thông báo khi có yêu cầu báo giá mới
 * @param {object} quote - Thông tin yêu cầu báo giá
 */
async function sendQuoteNotification(quote) {
  const transporter = createTransporter();

  if (!transporter) {
    console.warn('[Mailer] Chưa cấu hình MAIL_USER / MAIL_PASS — bỏ qua gửi email.');
    return;
  }

  const to = process.env.MAIL_NOTIFY_TO || process.env.MAIL_USER;
  const siteUrl = process.env.SITE_URL || 'http://localhost:4000';

  const createdAt = new Date(quote.createdAt || Date.now()).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Yêu cầu báo giá mới</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f4;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a6b2f,#27ae60);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:0.5px;">
                🔔 Yêu cầu báo giá mới
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
                DBV Insurance — Hệ thống thông báo tự động
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;color:#333;font-size:16px;line-height:1.6;">
                Xin chào, bạn vừa nhận được một yêu cầu báo giá mới từ khách hàng. Vui lòng liên hệ lại sớm nhất có thể.
              </p>

              <!-- Info table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8f0e8;border-radius:8px;overflow:hidden;">
                <tr style="background:#f0f8f0;">
                  <td style="padding:12px 20px;font-size:13px;font-weight:700;color:#1a6b2f;text-transform:uppercase;letter-spacing:0.5px;width:40%;">
                    Loại bảo hiểm
                  </td>
                  <td style="padding:12px 20px;font-size:15px;font-weight:600;color:#1a1a1a;">
                    ${quote.insuranceTypeName || quote.insuranceTypeSlug}
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 20px;font-size:13px;font-weight:700;color:#1a6b2f;text-transform:uppercase;letter-spacing:0.5px;border-top:1px solid #e8f0e8;">
                    Biển số khu vực
                  </td>
                  <td style="padding:12px 20px;font-size:15px;font-weight:600;color:#1a1a1a;border-top:1px solid #e8f0e8;">
                    ${quote.licensePlateRegionName || quote.licensePlateRegionSlug}
                  </td>
                </tr>
                <tr style="background:#f0f8f0;">
                  <td style="padding:12px 20px;font-size:13px;font-weight:700;color:#1a6b2f;text-transform:uppercase;letter-spacing:0.5px;border-top:1px solid #e8f0e8;">
                    Số điện thoại
                  </td>
                  <td style="padding:12px 20px;font-size:15px;font-weight:700;color:#1a6b2f;border-top:1px solid #e8f0e8;">
                    <a href="tel:${quote.customerPhone}" style="color:#1a6b2f;text-decoration:none;">
                      📞 ${quote.customerPhone}
                    </a>
                  </td>
                </tr>
                ${quote.notes ? `
                <tr>
                  <td style="padding:12px 20px;font-size:13px;font-weight:700;color:#1a6b2f;text-transform:uppercase;letter-spacing:0.5px;border-top:1px solid #e8f0e8;">
                    Ghi chú
                  </td>
                  <td style="padding:12px 20px;font-size:15px;color:#555;border-top:1px solid #e8f0e8;">
                    ${quote.notes}
                  </td>
                </tr>
                ` : ''}
                <tr style="background:#f0f8f0;">
                  <td style="padding:12px 20px;font-size:13px;font-weight:700;color:#1a6b2f;text-transform:uppercase;letter-spacing:0.5px;border-top:1px solid #e8f0e8;">
                    Thời gian
                  </td>
                  <td style="padding:12px 20px;font-size:14px;color:#555;border-top:1px solid #e8f0e8;">
                    ${createdAt}
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 20px;font-size:13px;font-weight:700;color:#1a6b2f;text-transform:uppercase;letter-spacing:0.5px;border-top:1px solid #e8f0e8;">
                    Mã yêu cầu
                  </td>
                  <td style="padding:12px 20px;font-size:14px;color:#888;border-top:1px solid #e8f0e8;">
                    #${quote.id}
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <div style="text-align:center;margin-top:32px;">
                <a href="${siteUrl}/admin"
                   style="display:inline-block;background:linear-gradient(135deg,#1a6b2f,#27ae60);color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:700;letter-spacing:0.3px;">
                  Xem trong Admin Panel
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8faf8;padding:20px 40px;text-align:center;border-top:1px solid #e8f0e8;">
              <p style="margin:0;color:#999;font-size:12px;line-height:1.6;">
                Email này được gửi tự động từ hệ thống DBV Insurance.<br/>
                Vui lòng không trả lời email này.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  await transporter.sendMail({
    from: `"DBV Insurance" <${process.env.MAIL_USER}>`,
    to,
    subject: `[DBV] Yêu cầu báo giá mới — ${quote.insuranceTypeName} — SĐT: ${quote.customerPhone}`,
    html,
  });

  console.log(`[Mailer] Đã gửi email thông báo báo giá #${quote.id} tới ${to}`);
}

module.exports = { sendQuoteNotification };
