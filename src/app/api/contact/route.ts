import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// --- Rate Limiter (In-Memory IP sliding window) ---
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 submissions per 15 min per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Periodically clean expired records if map gets too large
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// --- Sanitization & Escaping Helper to prevent HTML Injection ---
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- Email Validation Regex ---
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    // 1. IP Extraction for Rate Limiting & Security Logging
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // 2. Check Rate Limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "Too many requests. For security, please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 3. Parse JSON Body
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    const { name, email, service, message, website } = body;

    // 4. Honeypot Anti-Bot Trap:
    // If the hidden 'website' field is populated, a bot submitted the form.
    // Return a fake success so bot does not learn to bypass it, but do NOT send email.
    if (website && typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Your inquiry has been received.",
      });
    }

    // 5. Strict Input Validation
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Please provide a valid name (2 - 100 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim()) || email.length > 150) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanService = typeof service === "string" && service.trim().length > 0
      ? service.trim().slice(0, 100)
      : "General Inquiry";

    if (!message || typeof message !== "string" || message.trim().length < 5 || message.length > 5000) {
      return NextResponse.json(
        { error: "Please provide a project description (5 - 5,000 characters)." },
        { status: 400 }
      );
    }

    const sanitizedName = escapeHtml(name.trim());
    const sanitizedEmail = escapeHtml(email.trim());
    const sanitizedService = escapeHtml(cleanService);
    const sanitizedMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

    // 6. Email Configuration & Transporter Setup
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpSecure = process.env.SMTP_SECURE !== "false";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const isConfigured =
      receiverEmail &&
      smtpUser &&
      smtpPass &&
      smtpHost &&
      !smtpPass.includes("PASTE_YOUR_");

    if (!isConfigured) {
      console.warn(
        "[Contact API Notice]: SMTP credentials in .env.local are pending setup."
      );
      console.log("--- Freelance Project Inquiry (Simulated Delivery) ---", {
        Name: sanitizedName,
        Email: sanitizedEmail,
        Service: sanitizedService,
        Message: sanitizedMessage,
        SubmittedAt: new Date().toISOString(),
        ClientIP: ip,
      });

      return NextResponse.json({
        success: true,
        message: "Inquiry received! (Live email will be delivered once SMTP_PASS is set in .env.local)",
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 7. Render Premium Dark-Themed HTML Email
    const htmlEmail = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b0d; color: #f1f1f1; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #141418; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #1c1c24 0%, #0c0c10 100%); padding: 32px 24px; border-bottom: 2px solid #c22026; text-align: left; }
          .badge { display: inline-block; background: #c22026; color: #fff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 10px; border-radius: 4px; margin-bottom: 12px; }
          .title { font-size: 22px; font-weight: 700; color: #ffffff; margin: 0; text-transform: uppercase; letter-spacing: 1px; }
          .content { padding: 32px 24px; }
          .field-group { margin-bottom: 22px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #a1a1aa; margin-bottom: 6px; font-weight: 600; }
          .value { font-size: 15px; color: #fafafa; background: #1c1c24; border: 1px solid rgba(255,255,255,0.06); padding: 12px 16px; border-radius: 8px; line-height: 1.5; }
          .message-box { min-height: 100px; }
          .reply-btn { display: inline-block; background: #c22026; color: #ffffff !important; text-decoration: none; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 14px 28px; border-radius: 8px; margin-top: 16px; text-align: center; }
          .footer { padding: 20px 24px; background: #0e0e12; border-top: 1px solid rgba(255,255,255,0.06); font-size: 11px; color: #71717a; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">New Freelance Inquiry</span>
            <h1 class="title">Project Inquiry Received</h1>
          </div>
          <div class="content">
            <div class="field-group">
              <div class="label">Client Name</div>
              <div class="value">${sanitizedName}</div>
            </div>
            <div class="field-group">
              <div class="label">Client Email</div>
              <div class="value">
                <a href="mailto:${sanitizedEmail}" style="color: #ff4d58; text-decoration: none;">${sanitizedEmail}</a>
              </div>
            </div>
            <div class="field-group">
              <div class="label">Requested Service</div>
              <div class="value">${sanitizedService}</div>
            </div>
            <div class="field-group">
              <div class="label">Project Details & Goals</div>
              <div class="value message-box">${sanitizedMessage}</div>
            </div>
            <div style="text-align: center; margin-top: 28px;">
              <a href="mailto:${sanitizedEmail}?subject=Re: Freelance Inquiry - ${encodeURIComponent(cleanService)}" class="reply-btn">Reply to ${sanitizedName} &rarr;</a>
            </div>
          </div>
          <div class="footer">
            Submitted via Portfolio Contact Portal &bull; ${new Date().toUTCString()} &bull; IP: ${ip}
          </div>
        </div>
      </body>
      </html>
    `;

    // 8. Send Email
    await transporter.sendMail({
      from: `"Portfolio Freelance Portal" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email.trim(),
      subject: `⚡ [Freelance Inquiry] ${cleanService} from ${name.trim()}`,
      text: `New Freelance Project Inquiry:\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nService: ${cleanService}\n\nProject Details:\n${message.trim()}\n\n---\nSent from Portfolio Website (${new Date().toUTCString()})`,
      html: htmlEmail,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your inquiry has been sent successfully. I will get back to you shortly.",
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("[Contact API Error]:", errorMessage);
    return NextResponse.json(
      {
        error: "Failed to send message due to a server error. Please try again or email directly.",
      },
      { status: 500 }
    );
  }
}
