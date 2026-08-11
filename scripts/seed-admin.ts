/**
 * One-off script: creates the first admin account (Supabase Auth user +
 * `profiles` row with role='admin').
 *
 * Credentials are intentionally NOT hardcoded here — they're passed as
 * environment variables on the command line so the password never ends up
 * committed to the repository or written to disk.
 *
 * Required env vars:
 *   SUPABASE_URL               - your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY  - service role key (Project Settings → API).
 *                                 Never commit this or use it in the frontend.
 *   SEED_ADMIN_EMAIL           - the admin's login email
 *   SEED_ADMIN_PASSWORD        - the admin's login password
 * Optional:
 *   SEED_ADMIN_NAME            - defaults to "Foundation Admin"
 *
 * Usage (nothing touches disk — pass the values inline):
 *   SUPABASE_URL="https://xxxx.supabase.co" \
 *   SUPABASE_SERVICE_ROLE_KEY="..." \
 *   SEED_ADMIN_EMAIL="abdallahkiromba@gmail.com" \
 *   SEED_ADMIN_PASSWORD="..." \
 *   npx tsx scripts/seed-admin.ts
 *
 * Change the password after first login (Admin → Settings → Change Password).
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SEED_ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const SEED_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;
const SEED_ADMIN_NAME = process.env.SEED_ADMIN_NAME || "Foundation Admin";

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !SEED_ADMIN_EMAIL || !SEED_ADMIN_PASSWORD) {
  console.error(
    "Missing required env vars. Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SEED_ADMIN_EMAIL, and SEED_ADMIN_PASSWORD."
  );
  process.exit(1);
}

if (SEED_ADMIN_PASSWORD.length < 12) {
  console.error("SEED_ADMIN_PASSWORD should be at least 12 characters.");
  process.exit(1);
}

async function main() {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email: SEED_ADMIN_EMAIL,
    password: SEED_ADMIN_PASSWORD,
    email_confirm: true,
  });

  if (createError || !created.user) {
    console.error("Failed to create admin auth user:", createError?.message ?? createError);
    process.exit(1);
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: created.user.id,
    name: SEED_ADMIN_NAME,
    email: SEED_ADMIN_EMAIL,
    role: "admin",
  });

  if (profileError) {
    console.error("Auth user created, but inserting the profile row failed:", profileError.message);
    console.error(`You can finish manually in the SQL editor:\n` +
      `insert into public.profiles (id, name, email, role) values ('${created.user.id}', '${SEED_ADMIN_NAME}', '${SEED_ADMIN_EMAIL}', 'admin');`);
    process.exit(1);
  }

  console.log(`Admin account created for ${SEED_ADMIN_EMAIL}. They can now sign in at /admin/login.`);
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
