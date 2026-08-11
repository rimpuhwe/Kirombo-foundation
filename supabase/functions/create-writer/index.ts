// Admin-only Edge Function: creates a new writer account.
//
// Verifies the caller is signed in and has role='admin' in `profiles`,
// generates a strong random password, creates the Supabase Auth user via
// the service-role admin API, inserts their `profiles` row, and emails them
// their credentials via Brevo with a CTA to /admin/login.
//
// Deploy: supabase functions deploy create-writer
// Secrets required (supabase secrets set ...): BREVO_API_KEY
// Optional secrets: BREVO_SENDER_EMAIL, BREVO_SENDER_NAME, SITE_URL
// (SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY are provided
// automatically by the Supabase platform — no need to set them.)

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { jsonResponse, isValidEmail } from "../_shared/response.ts";
import { sendBrevoEmail, escapeHtml } from "../_shared/brevo.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const BREVO_SENDER_EMAIL = Deno.env.get("BREVO_SENDER_EMAIL") ?? "no-reply@abdallahkirombafoundation.org";
const BREVO_SENDER_NAME = Deno.env.get("BREVO_SENDER_NAME") ?? "Abdallah Kiromba Foundation";
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://www.abdallahkirombafoundation.org";

function generatePassword(length = 16): string {
  const secureRandom = () => crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
  // Ambiguous characters (0/O, 1/l/I) excluded so a manually-relayed password is unambiguous.
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "23456789";
  const symbols = "!@#$%^&*-_=+";
  const all = lower + upper + digits + symbols;
  const pick = (charset: string) => charset[Math.floor(secureRandom() * charset.length)];

  const chars = [pick(lower), pick(upper), pick(digits), pick(symbols)];
  while (chars.length < length) chars.push(pick(all));
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(secureRandom() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

function welcomeEmailHtml({ name, email, password }: { name: string; email: string; password: string }): string {
  const loginUrl = `${SITE_URL}/admin/login`;
  return `
  <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; color: #1f2937;">
    <div style="background: linear-gradient(135deg,#0f766e,#134e4a); padding: 32px 24px; border-radius: 12px 12px 0 0; text-align:center;">
      <h1 style="color:#fff; margin:0; font-size:20px;">Abdallah Kiromba Foundation</h1>
    </div>
    <div style="border:1px solid #e5e7eb; border-top:none; border-radius:0 0 12px 12px; padding:32px 24px;">
      <p>Hi ${escapeHtml(name)},</p>
      <p>You've been added as a <strong>writer</strong> for the Abdallah Kiromba Foundation Press Room admin portal. You can sign in to write, edit, and publish articles.</p>
      <table style="width:100%; border-collapse:collapse; margin:20px 0;">
        <tr><td style="padding:8px 0; color:#6b7280;">Email</td><td style="padding:8px 0; font-weight:600;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:8px 0; color:#6b7280;">Temporary password</td><td style="padding:8px 0; font-weight:600; font-family:monospace;">${escapeHtml(password)}</td></tr>
      </table>
      <p style="text-align:center; margin:28px 0;">
        <a href="${loginUrl}" style="background:#0f766e; color:#fff; text-decoration:none; padding:12px 28px; border-radius:8px; font-weight:600; display:inline-block;">Sign in to the Admin Portal</a>
      </p>
      <p style="font-size:13px; color:#6b7280;">For security, please sign in and change this password as soon as possible (Admin → Settings → Change Password).</p>
    </div>
  </div>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return jsonResponse({ error: "Unauthorized" }, 401);

    // Client scoped to the caller's own JWT, used only to identify who's calling.
    const callerClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userError,
    } = await callerClient.auth.getUser();
    if (userError || !user) return jsonResponse({ error: "Unauthorized" }, 401);

    // Service-role client for privileged operations (bypasses RLS).
    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: callerProfile } = await adminClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (callerProfile?.role !== "admin") {
      return jsonResponse({ error: "Only admins can add writers" }, 403);
    }

    const body = await req.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!name) return jsonResponse({ error: "Name is required" }, 400);
    if (!isValidEmail(email)) return jsonResponse({ error: "A valid email is required" }, 400);

    const password = generatePassword();

    const { data: created, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError || !created?.user) {
      const alreadyExists = createError?.message?.toLowerCase().includes("already");
      return jsonResponse(
        { error: alreadyExists ? "A user with this email already exists" : "Could not create the writer account" },
        409
      );
    }

    const { error: profileError } = await adminClient.from("profiles").insert({
      id: created.user.id,
      name,
      email,
      role: "writer",
    });

    if (profileError) {
      // Don't leave an orphaned auth user with no profile behind.
      await adminClient.auth.admin.deleteUser(created.user.id);
      console.error("[create-writer] Profile insert failed:", profileError);
      return jsonResponse({ error: "Could not finish setting up the writer account" }, 500);
    }

    let emailSent = false;
    if (BREVO_API_KEY) {
      emailSent = await sendBrevoEmail({
        apiKey: BREVO_API_KEY,
        senderName: BREVO_SENDER_NAME,
        senderEmail: BREVO_SENDER_EMAIL,
        to: { email, name },
        subject: "You've been added as a writer — Abdallah Kiromba Foundation",
        htmlContent: welcomeEmailHtml({ name, email, password }),
      });
    } else {
      console.error("[create-writer] BREVO_API_KEY is not configured — skipping welcome email");
    }

    return jsonResponse({
      success: true,
      writer: { id: created.user.id, name, email, role: "writer" },
      emailSent,
      // Only ever returned when we couldn't email it — the admin needs some
      // way to hand it to the writer. Never included otherwise.
      password: emailSent ? undefined : password,
    });
  } catch (err) {
    console.error("[create-writer] Unexpected error:", err);
    return jsonResponse({ error: "Something went wrong. Please try again." }, 500);
  }
});
