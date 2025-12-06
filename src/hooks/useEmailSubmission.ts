import { useState } from "react";
import emailjs from "@emailjs/browser";

interface UseEmailSubmissionResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  sendEmail: (userEmail: string) => Promise<void>;
}

export function useEmailSubmission(): UseEmailSubmissionResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendEmail = async (userEmail: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      console.log("EmailJS config:", {
        service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        email: userEmail,
      });
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          email: userEmail,
          from_email: "abdallahkirombafoundation@gmail.com",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      console.log("EmailJS result:", result);
      setSuccess(true);
    } catch (err: any) {
      console.error("EmailJS error:", err);
      setError("Failed to send email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, sendEmail };
}
