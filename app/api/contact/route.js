import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactEmail } from "@/emails/contact-template";

export async function POST(request) {
  // 0. 环境变量校验
  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY environment variable");
    return NextResponse.json(
      { error: "Service configuration error" },
      { status: 500 },
    );
  }

  const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL;
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL;

  if (!FROM_EMAIL || !TO_EMAIL) {
    console.error("Missing CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL");
    return NextResponse.json(
      { error: "Service configuration error" },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // 1. 解析表单数据
    const { name, email, subject, message, company } =
      await request.json();

    // 2. 蜜罐检测（返回与成功相同的结构，不暴露检测信息）
    if (company) {
      return NextResponse.json({ ok: true, data: null });
    }

    // 3. 基本验证
    const trimmed = {
      name: name?.trim(),
      email: email?.trim(),
      subject: subject?.trim() || "New Contact Form Message",
      message: message?.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 4. 使用 React 模板渲染邮件（自带 XSS 安全）
    // 5. 调用 Resend 发送邮件（react 属性支持嵌入式模板）
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: trimmed.subject,
      react: ContactEmail(trimmed),
      reply_to: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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
