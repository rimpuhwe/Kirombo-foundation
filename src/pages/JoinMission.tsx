import { useState } from "react";
import { useEmailSubmission } from "@/hooks/useEmailSubmission";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { works } from "../../types/Work";
import { useTitle } from "@/hooks/useTitle";

export default function JoinMission() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [work, setWork] = useState("");
  const { loading, error, success, sendEmail } = useEmailSubmission();
  const [touched, setTouched] = useState(false);

  useTitle("Join the Mission - Abdallah Kiromba Foundation");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!validateEmail(email) || !name || !work) return;
    await sendEmail({ name, email, work });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-24 pb-12">
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {success ? (
            <>
              <div className="col-span-2 flex flex-col items-center justify-center">
                <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center">
                  Thank You for Joining the Mission!
                </h1>
                <p className="text-muted-foreground mb-4 text-center">
                  We’ve sent you an email with guidance on how you can support
                  the Abdallah Kiromba Foundation. Please check your inbox (and
                  spam folder) for details.
                </p>
                <div className="bg-muted/40 rounded p-4 text-foreground text-base mb-2 text-center">
                  <div className="italic">
                    “The most beloved deeds to Allah are those done
                    consistently, even if small.”
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  Be Part of a Lifelong Giving Journey
                </h1>
                <p className="text-muted-foreground mb-4">
                  Your willingness to stand with the Abdallah Kiromba Foundation
                  helps us continue uplifting orphans, supporting families, and
                  strengthening communities. Enter your details to receive
                  guidance on how you can take part in our ongoing efforts.
                </p>
                <div className="bg-muted/40 rounded p-4 text-foreground text-base mb-2">
                  <blockquote className="mb-2 italic">
                    You will never attain righteousness until you give from that which you love. 
                    And whatever you give — indeed, Allah is Knowing of it.
                  </blockquote>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  type="email"
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
                <Select value={work} onValueChange={setWork} required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select work to contribute" />
                  </SelectTrigger>
                  <SelectContent>
                    {works.map((w) => (
                      <SelectItem key={w.title} value={w.title}>
                        {w.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Join Us"}
                </Button>
                {error && (
                  <div className="text-red-500 text-center font-medium mt-2">
                    {error}
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    
  );
}
