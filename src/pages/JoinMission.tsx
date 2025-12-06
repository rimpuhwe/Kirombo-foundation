import { useState } from "react";
import { useEmailSubmission } from "@/hooks/useEmailSubmission";

export default function JoinMission() {
  const [email, setEmail] = useState("");
  const { loading, error, success, sendEmail } = useEmailSubmission();
  const [touched, setTouched] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!validateEmail(email)) return;
    await sendEmail(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-primary mb-2">
          Be Part of a Lifelong Giving Journey
        </h1>
        <p className="text-center text-muted-foreground mb-4">
          Your willingness to stand with the Abdallah Kiromba Foundation helps
          us continue uplifting orphans, supporting families, and strengthening
          communities. Enter your email to receive guidance on how you can take
          part in our ongoing efforts.
        </p>
        <div className="bg-muted/40 rounded p-4 text-center text-foreground text-base mb-2">
          <div className="mb-2 italic">
            “And whatever good you send forward for yourselves, you will find it
            with Allah — Qur’an 2:110”
          </div>
          <div className="italic">
            “The most beloved deeds to Allah are those done consistently, even
            if small.”
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full border border-border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            required
          />
          {touched && !validateEmail(email) && (
            <div className="text-red-500 text-sm">
              Please enter a valid email address.
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-2 rounded hover:bg-primary/90 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Join Us"}
          </button>
        </form>
        {success && (
          <div className="text-green-600 text-center font-medium mt-2">
            Please check your email for the next step.
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center font-medium mt-2">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
