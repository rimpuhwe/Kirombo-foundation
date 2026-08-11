import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Check, Loader2, UserPlus, Mail } from "lucide-react";
import { toast } from "sonner";
import { createWriter, listWriters, type Writer } from "@/lib/writers";

function initialsOf(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";
}

const WritersManager: React.FC = () => {
  const [writers, setWriters] = useState<Writer[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [fallbackPassword, setFallbackPassword] = useState<{ email: string; password: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const refetch = async () => {
    setLoading(true);
    try {
      setWriters(await listWriters());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load writers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    setSubmitting(true);
    try {
      const result = await createWriter({ name: form.name.trim(), email: form.email.trim() });
      if (result.emailSent) {
        toast.success(`Writer added — credentials emailed to ${result.writer.email}`);
      } else if (result.password) {
        toast.warning("Writer added, but the welcome email could not be sent");
        setFallbackPassword({ email: result.writer.email, password: result.password });
      }
      setForm({ name: "", email: "" });
      setAddOpen(false);
      refetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add writer");
    } finally {
      setSubmitting(false);
    }
  };

  const copyFallbackPassword = async () => {
    if (!fallbackPassword) return;
    try {
      await navigator.clipboard.writeText(fallbackPassword.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy password");
    }
  };

  return (
    <div className="space-y-6">
      {/* Fallback password dialog — only shown if the welcome email failed to send */}
      <Dialog open={!!fallbackPassword} onOpenChange={(open) => !open && setFallbackPassword(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share these credentials manually</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The welcome email to <strong>{fallbackPassword?.email}</strong> could not be sent. This password will
            not be shown again — copy it and share it with them securely.
          </p>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 font-mono text-sm">
            <span className="flex-1 break-all">{fallbackPassword?.password}</span>
            <button
              type="button"
              onClick={copyFallbackPassword}
              className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
              title="Copy password"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Done</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add writer dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a writer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A strong password will be generated automatically and emailed to them along with a link to sign in.
            </p>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="writer@example.com"
                className="mt-1"
                required
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={submitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Add writer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Writers</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Admins and writers who can manage Press Room articles
          </p>
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <UserPlus className="w-4 h-4 mr-2" /> Add writer
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          {writers.map((writer) => (
            <div key={writer.id} className="flex items-center gap-4 p-4">
              <Avatar>
                <AvatarFallback className="bg-primary text-white">{initialsOf(writer.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">{writer.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 shrink-0" /> {writer.email}
                </p>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  writer.role === "admin"
                    ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200"
                    : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                }`}
              >
                {writer.role === "admin" ? "Admin" : "Writer"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WritersManager;
