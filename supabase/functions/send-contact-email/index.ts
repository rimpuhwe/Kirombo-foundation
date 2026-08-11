// Public Edge Function: sends the "Join the Mission" form submission to the
// Foundation's inbox via Brevo, replacing the previous EmailJS integration
// (EmailJS's public key had to live in the frontend bundle; Brevo's API key
// must not, so this now runs server-side).
//
// Deploy: supabase functions deploy send-contact-email
// Secrets required (supabase secrets set ...): BREVO_API_KEY
// Optional secrets: BREVO_SENDER_EMAIL, BREVO_SENDER_NAME, CONTACT_RECIPIENT_EMAIL

import { corsHeaders } from "../_shared/cors.ts";
import { jsonResponse, isValidEmail } from "../_shared/response.ts";
import { sendBrevoEmail, escapeHtml } from "../_shared/brevo.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const BREVO_SENDER_EMAIL = Deno.env.get("BREVO_SENDER_EMAIL") ?? "no-reply@abdallahkirombafoundation.org";
const BREVO_SENDER_NAME = Deno.env.get("BREVO_SENDER_NAME") ?? "Abdallah Kiromba Foundation";
const CONTACT_RECIPIENT_EMAIL = Deno.env.get("CONTACT_RECIPIENT_EMAIL") ?? "abdallahkirombafoundation@gmail.com";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  if (!BREVO_API_KEY) {
    console.error("[send-contact-email] BREVO_API_KEY is not configured");
    return jsonResponse({ error: "Email is not configured. Please try again later." }, 500);
  }

  try {
    const body = await req.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const work = typeof body?.work === "string" ? body.work.trim() : "";

    if (!name || !work) return jsonResponse({ error: "Name and area of interest are required" }, 400);
    if (!isValidEmail(email)) return jsonResponse({ error: "A valid email is required" }, 400);

    const sent = await sendBrevoEmail({
      apiKey: BREVO_API_KEY,
      senderName: BREVO_SENDER_NAME,
      senderEmail: BREVO_SENDER_EMAIL,
      to: { email: CONTACT_RECIPIENT_EMAIL },
      replyTo: { email, name },
      subject: `New "Join the Mission" submission — ${work}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; color:#1f2937;">
          <h2>New Join the Mission submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Interested in:</strong> ${escapeHtml(work)}</p>
        </div>`,
    });

    if (!sent) {
      return jsonResponse({ error: "Failed to send your message. Please try again later." }, 502);
    }

    return jsonResponse({ success: true });
  } catch (err) {
    console.error("[send-contact-email] Unexpected error:", err);
    return jsonResponse({ error: "Something went wrong. Please try again later." }, 500);
  }
});
