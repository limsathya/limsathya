import { NextResponse } from "next/server";
import { Resend } from "resend";

// 从环境变量读取配置
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL;

export async function POST(request) {
  try {
    // 1. 解析表单数据
    const { name, email, subject, message, company, locale } =
      await request.json();

    // 2. 蜜罐检测（如果 company 有值，说明是机器人）
    if (company) {
      // 直接返回成功，但实际不发邮件
      return NextResponse.json({ ok: true, message: "Honeypot triggered" });
    }

    // 3. 基本验证（前端已做，但后端也要做）
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 4. 构造邮件内容（支持多语言，可以从 locale 获取）
    const subjectLine = subject?.trim() || "New Contact Form Message";
    const htmlContent = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subjectLine}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr>
      <p><em>Sent via your website contact form.</em></p>
    `;

    // 5. 调用 Resend 发送邮件
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL, // 必须是你已验证的域名邮箱
      to: TO_EMAIL, // 你接收邮件的地址
      subject: subjectLine,
      html: htmlContent,
      reply_to: email, // 方便你直接回复访客
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 6. 成功返回
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
