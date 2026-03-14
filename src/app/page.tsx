"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Heart, Linkedin, Mail } from "lucide-react";
import Visualizer from "@/components/Visualizer";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Skills from "@/components/Skills";
import ProblemSolving from "@/components/ProblemSolving";
import Achievements from "@/components/Achievements";
import ContactSection from "@/components/ContactSection";
import Terminal from "@/components/Terminal";
import Cursor from "@/components/Cursor";
import { OWNER, SOCIAL_LINKS } from "@/lib/constants";

const sectionFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const FOOTER_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Github,
  Linkedin,
  Mail,
};

export default function Home() {
  return (
    <>
      {/* Generative Background — fixed, behind everything */}
      <Visualizer />

      {/* Custom Cursor */}
      <Cursor />

      {/* Developer Terminal (Ctrl+K) */}
      <Terminal />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Divider */}
        <div className="mx-auto h-px max-w-4xl bg-linear-to-r from-transparent via-border-glass to-transparent" />

        {/* Projects Bento Grid */}
        <motion.div {...sectionFade}>
          <BentoGrid />
        </motion.div>

        {/* Divider */}
        <div className="mx-auto h-px max-w-4xl bg-linear-to-r from-transparent via-border-glass to-transparent" />

        {/* Skills Section */}
        <motion.div {...sectionFade}>
          <Skills />
        </motion.div>

        {/* Divider */}
        <div className="mx-auto h-px max-w-4xl bg-linear-to-r from-transparent via-border-glass to-transparent" />

        {/* Problem Solving Experience */}
        <motion.div {...sectionFade}>
          <ProblemSolving />
        </motion.div>

        {/* Divider */}
        <div className="mx-auto h-px max-w-4xl bg-linear-to-r from-transparent via-border-glass to-transparent" />

        {/* Achievements */}
        <motion.div {...sectionFade}>
          <Achievements />
        </motion.div>

        {/* Divider */}
        <div className="mx-auto h-px max-w-4xl bg-linear-to-r from-transparent via-border-glass to-transparent" />

        {/* Contact Section */}
        <motion.div {...sectionFade}>
          <ContactSection />
        </motion.div>

        {/* Divider */}
        <div className="mx-auto h-px max-w-4xl bg-linear-to-r from-transparent via-border-glass to-transparent" />

        {/* Footer */}
        <footer className="px-6 pb-14 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass relative mx-auto max-w-6xl overflow-hidden rounded-4xl border border-white/12 p-8 sm:p-10"
          >
            <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-accent-cyan/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-24 h-64 w-64 rounded-full bg-accent-purple/15 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-muted">
                  {"// Let's build something useful"}
                </p>
                <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  Open to freelance work, product roles, and serious collaborations.
                </h2>
                <a
                  href={`mailto:${OWNER.email}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent-cyan to-accent-purple px-6 py-3 font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
                  aria-label="Send email"
                >
                  Message Me
                  <ArrowUpRight size={16} />
                </a>

                <div className="mt-8 flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = ICON_MAP[link.icon];

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-text-secondary transition-all hover:border-accent-cyan/40 hover:text-accent-cyan"
                        aria-label={link.label}
                      >
                        {Icon && <Icon size={14} />}
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:items-end lg:text-right">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-text-muted">
                    Navigation
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 lg:justify-end">
                    {FOOTER_LINKS.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-text-secondary transition-colors hover:border-accent-purple/50 hover:text-white"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Direct Inbox</p>
                  <a
                    href={`mailto:${OWNER.email}`}
                    className="mt-1 block text-sm font-medium text-white transition-colors hover:text-accent-cyan"
                  >
                    {OWNER.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="relative mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-text-muted">
              <p>&copy; {new Date().getFullYear()} {OWNER.name}. All rights reserved.</p>
              <div className="flex items-center gap-1">
                <span>Built with</span>
                <Heart size={12} className="text-accent-pink" aria-hidden="true" />
                <span>Next.js, TypeScript & Framer Motion</span>
              </div>
            </div>
          </motion.div>
        </footer>
      </main>
    </>
  );
}
