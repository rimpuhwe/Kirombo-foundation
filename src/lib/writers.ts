import { supabase } from "./supabase";

export interface Writer {
  id: string;
  name: string;
  email: string;
  role: "admin" | "writer";
  created_at: string;
}

export interface CreateWriterResult {
  writer: Writer;
  emailSent: boolean;
  /** Only present when the welcome email failed to send — share it with the writer manually. */
  password?: string;
}

export async function listWriters(): Promise<Writer[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, email, role, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[writers] Loading writers failed:", error);
    throw new Error("Loading writers failed. Please try again.");
  }
  return (data ?? []) as Writer[];
}

export async function createWriter(input: { name: string; email: string }): Promise<CreateWriterResult> {
  const { data, error } = await supabase.functions.invoke("create-writer", {
    body: input,
  });

  if (error) {
    // Supabase wraps non-2xx responses in a FunctionsHttpError; try to surface
    // the function's own error message rather than a generic network error.
    const context = (error as { context?: Response }).context;
    const detail = context ? await context.json().catch(() => null) : null;
    throw new Error(detail?.error || "Could not add writer. Please try again.");
  }

  if (!data?.success) {
    throw new Error(data?.error || "Could not add writer. Please try again.");
  }

  return { writer: data.writer, emailSent: data.emailSent, password: data.password };
}
