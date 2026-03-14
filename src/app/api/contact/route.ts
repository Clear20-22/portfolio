import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { OWNER } from "@/lib/constants";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = normalizeField(body.name);
    const email = normalizeField(body.email);
    const subject = normalizeField(body.subject);
    const message = normalizeField(body.message);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    if (message.length < 20) {
      return NextResponse.json(
        { message: "Message must be at least 20 characters." },
        { status: 400 },
      );
    }

    const smtpHost = getRequiredEnv("SMTP_HOST");
    const smtpPort = Number.parseInt(getRequiredEnv("SMTP_PORT"), 10);
    const smtpUser = getRequiredEnv("SMTP_USER");
    const smtpPass = getRequiredEnv("SMTP_PASS");
    const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
    const toEmail = process.env.CONTACT_TO_EMAIL || OWNER.email;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedSubject = escapeHtml(subject);
    const escapedMessage = escapeHtml(message).replaceAll("\n", "<br />");

    await transporter.sendMail({
      from: `Portfolio Contact <${fromEmail}>`,
      to: toEmail,
      replyTo: `${name} <${email}>`,
      subject: `[Portfolio] ${subject}`,
      text: [
        "NEW CONTACT MESSAGE",
        "-------------------",
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        `Received: ${new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="margin:0;padding:24px;background:#f3f6fb;font-family:Arial,sans-serif;color:#0f172a;">
          <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
            New contact message: ${escapedSubject}
          </div>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;border-collapse:collapse;">
            <tr>
              <td style="padding:0;">
                <div style="background:linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%);padding:22px 24px;border-radius:18px 18px 0 0;">
                  <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#dbeafe;font-weight:700;">Portfolio Inbox</p>
                  <h1 style="margin:0;font-size:22px;line-height:1.35;color:#ffffff;">New Contact Submission</h1>
                </div>

                <div style="background:#ffffff;border:1px solid #dbe4f0;border-top:none;border-radius:0 0 18px 18px;padding:24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:16px;">
                    <tr>
                      <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                        <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;font-weight:700;">From</p>
                        <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;">${escapedName}</p>
                        <p style="margin:4px 0 0;font-size:13px;color:#334155;">${escapedEmail}</p>
                      </td>
                    </tr>
                  </table>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:16px;">
                    <tr>
                      <td style="padding:10px 12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                        <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;font-weight:700;">Subject</p>
                        <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;">${escapedSubject}</p>
                      </td>
                    </tr>
                  </table>

                  <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#64748b;font-weight:700;">Message</p>
                  <div style="padding:14px 16px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;font-size:14px;line-height:1.7;color:#1e293b;">
                    ${escapedMessage}
                  </div>

                  <p style="margin:16px 0 0;font-size:12px;color:#64748b;">
                    Received from your portfolio contact form.
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({
      message: "Message sent. I will get it in my inbox.",
    });
  } catch (error) {
    console.error("Contact form submission failed", error);

    return NextResponse.json(
      {
        message:
          "Message could not be sent right now. Check SMTP configuration and try again.",
      },
      { status: 500 },
    );
  }
}