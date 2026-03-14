"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Mail, Send } from "lucide-react";
import { OWNER, SOCIAL_LINKS } from "@/lib/constants";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SubmitState =
  | { status: "idle"; message: string }
  | { status: "loading"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitState({
      status: "loading",
      message: "Sending your message...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Failed to send your message.");
      }

      setFormState(initialFormState);
      setSubmitState({
        status: "success",
        message: payload.message || "Message sent successfully.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send your message.";

      setSubmitState({
        status: "error",
        message,
      });
    }
  }

  return (
    <section id="contact" className="px-6 py-24" aria-label="Contact">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
          className="glass glow-purple relative overflow-hidden rounded-[2rem] p-8"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/80 to-transparent" />
          <p className="font-mono text-sm text-text-muted">{"// contact"}</p>
          <h2 className="mt-4 max-w-md text-3xl font-semibold text-white sm:text-4xl">
            Build something useful. Send the details and it lands straight in my inbox.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-text-secondary">
            Use the form to send project inquiries, freelance work, collaborations,
            or hiring conversations. Messages submitted here are forwarded directly
            to {" "}
            <a
              href={`mailto:${OWNER.email}`}
              className="text-accent-cyan transition-colors hover:text-white"
            >
              {OWNER.email}
            </a>
            .
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/4 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-cyan/10 text-accent-cyan">
                <Mail size={18} />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-text-muted">
                  Direct Email
                </p>
                <a
                  href={`mailto:${OWNER.email}`}
                  className="mt-1 block text-lg font-medium text-white transition-colors hover:text-accent-cyan"
                >
                  {OWNER.email}
                </a>
                <p className="mt-1 text-sm text-text-secondary">
                  Best for detailed project scopes and contract discussions.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-text-muted">
                Elsewhere
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {SOCIAL_LINKS.filter((link) => link.label !== "Email").map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary transition-all hover:border-accent-cyan/40 hover:text-accent-cyan"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="glass rounded-[2rem] p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.28em] text-text-muted">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  required
                  maxLength={80}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-text-muted transition-colors focus:border-accent-cyan"
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-mono text-xs uppercase tracking-[0.28em] text-text-muted">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  required
                  maxLength={120}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-text-muted transition-colors focus:border-accent-cyan"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block font-mono text-xs uppercase tracking-[0.28em] text-text-muted">
                Subject
              </span>
              <input
                type="text"
                name="subject"
                value={formState.subject}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    subject: event.target.value,
                  }))
                }
                required
                maxLength={140}
                placeholder="Project inquiry"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-text-muted transition-colors focus:border-accent-cyan"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-xs uppercase tracking-[0.28em] text-text-muted">
                Message
              </span>
              <textarea
                name="message"
                value={formState.message}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    message: event.target.value,
                  }))
                }
                required
                minLength={20}
                maxLength={2000}
                rows={7}
                placeholder="Tell me what you need, timeline, budget, and any links that matter."
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-text-muted transition-colors focus:border-accent-cyan"
              />
            </label>

            <div className="flex flex-col gap-4 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-h-6 text-sm">
                {submitState.status === "success" && (
                  <p className="flex items-center gap-2 text-accent-cyan">
                    <CheckCircle2 size={16} />
                    {submitState.message}
                  </p>
                )}
                {submitState.status === "error" && (
                  <p className="flex items-center gap-2 text-rose-300">
                    <AlertCircle size={16} />
                    {submitState.message}
                  </p>
                )}
                {submitState.status === "loading" && (
                  <p className="text-text-secondary">{submitState.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitState.status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple px-6 py-3 font-medium text-slate-950 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={16} />
                {submitState.status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}