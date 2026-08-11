import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface UseEmailSubmissionResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  sendEmail: (data: {
    name: string;
    email: string;
    work: string;
  }) => Promise<void>;
}

export function useEmailSubmission(): UseEmailSubmissionResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendEmail = async (data: { name: string; email: string; work: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const { data: result, error: invokeError } = await supabase.functions.invoke("send-contact-email", {
        body: data,
      });

      if (invokeError || !result?.success) {
        throw new Error("Failed to send");
      }

      setSuccess(true);
    } catch (err) {
      console.error("send-contact-email error:", err);
      setError("Failed to send email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, sendEmail };
}
