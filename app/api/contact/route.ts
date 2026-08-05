import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  projectType: z.string().trim().max(80).optional().default("Not specified"),
  message: z.string().trim().min(10).max(2000),
  company: z.string().trim().max(200).optional().default(""),
});

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();

  if (attempts.size > 1000) {
    for (const [key, value] of attempts) {
      if (value.resetAt <= now) attempts.delete(key);
    }
  }

  const entry = attempts.get(ip);

  if (!entry || entry.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  attempts.set(ip, entry);
  return entry.count > MAX_REQUESTS;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "The request body is not valid JSON." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Please check your name, email and message, then try again." },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return NextResponse.json({ success: true, message: "Message received." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      {
        success: false,
        fallback: "mailto",
        message: "Open a prefilled email to continue.",
      },
      { status: 503 },
    );
  }

  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const { name, email, projectType, message } = parsed.data;
  const subjectName = name.replace(/[\r\n]+/g, " ");
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeProjectType = escapeHtml(projectType || "Not specified");
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry from ${subjectName}`,
        text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
            <h2>New portfolio enquiry</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Project type:</strong> ${safeProjectType}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email provider returned ${response.status}.`);
    }

    return NextResponse.json({
      success: true,
      message: "Thanks — your message has been delivered. I will reply as soon as possible.",
    });
  } catch (error) {
    console.error("Contact delivery failed", error);
    return NextResponse.json(
      {
        success: false,
        message: "The email provider could not deliver this message. Please use the direct email link.",
      },
      { status: 502 },
    );
  }
}
