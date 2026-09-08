import nodemailer from "nodemailer";
import { validateQuoteForm, type QuoteFormValues } from "@/lib/validation";
import { siteConfig } from "@/data/site-config";

export async function POST(request: Request) {
  let body: Partial<QuoteFormValues> & { website?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a hidden field real users never fill in. Bots that auto-fill every
  // field will trip this, and we silently pretend success so they don't retry.
  if (body.website) {
    return Response.json({ ok: true });
  }

  const values: QuoteFormValues = {
    name: body.name ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    projectType: body.projectType ?? "",
    location: body.location ?? "",
    budget: body.budget ?? "",
    message: body.message ?? "",
  };

  const errors = validateQuoteForm(values);
  if (Object.keys(errors).length > 0) {
    return Response.json({ message: "Please check the form and try again.", errors }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error(
      "[/api/quote] Email is not configured — missing SMTP_HOST, SMTP_PORT, SMTP_USER or SMTP_PASS env vars."
    );
    return Response.json(
      { message: "Email sending isn't configured on the server yet. Please call or email us directly." },
      { status: 500 }
    );
  }

  const toAddress = CONTACT_TO_EMAIL || siteConfig.email;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE ? SMTP_SECURE === "true" : Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const lines = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Project Type: ${values.projectType}`,
      `Project Location: ${values.location || "Not provided"}`,
      `Estimated Budget: ${values.budget || "Not provided"}`,
      "",
      "Message:",
      values.message,
    ];

    await transporter.sendMail({
      from: `"${siteConfig.name} Website" <${SMTP_USER}>`,
      to: toAddress,
      replyTo: values.email,
      subject: `New Quote Request — ${values.projectType}`,
      text: lines.join("\n"),
      html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${lines
        .join("\n")
        .replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char]!)}</pre>`,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[/api/quote] Failed to send email:", error);
    return Response.json(
      { message: "Something went wrong sending your request. Please call or email us directly." },
      { status: 500 }
    );
  }
}
