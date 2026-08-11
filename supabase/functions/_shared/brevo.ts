export function escapeHtml(value: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (c) => map[c]);
}

interface SendBrevoEmailInput {
  apiKey: string;
  senderName: string;
  senderEmail: string;
  to: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  replyTo?: { email: string; name?: string };
}

/** Sends a transactional email via Brevo's HTTP API. Returns true on success. */
export async function sendBrevoEmail(input: SendBrevoEmailInput): Promise<boolean> {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": input.apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: input.senderName, email: input.senderEmail },
        to: [input.to],
        replyTo: input.replyTo,
        subject: input.subject,
        htmlContent: input.htmlContent,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[brevo] Send failed:", response.status, detail);
    }
    return response.ok;
  } catch (err) {
    console.error("[brevo] Send threw:", err);
    return false;
  }
}
