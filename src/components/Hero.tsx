"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { OWNER, SOCIAL_LINKS } from "@/lib/constants";
import MacTerminal from "./MacTerminal";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Github,
  Linkedin,
  Mail,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  },
};

export default function Hero() {
  const taglines = useMemo(
    () => OWNER.taglines ?? [OWNER.tagline],
    [],
  );
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [typedTagline, setTypedTagline] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const activeTagline = taglines[taglineIndex];
    const atFullLength = typedTagline.length === activeTagline.length;
    const atStart = typedTagline.length === 0;

    if (!isDeleting && atFullLength) {
      const holdTimer = setTimeout(() => setIsDeleting(true), 1600);
      return () => clearTimeout(holdTimer);
    }

    if (isDeleting && atStart) {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
      return;
    }

    const speed = isDeleting ? 20 : 40;
    const timer = setTimeout(() => {
      setTypedTagline((prev) =>
        isDeleting
          ? activeTagline.slice(0, Math.max(prev.length - 1, 0))
          : activeTagline.slice(0, prev.length + 1),
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [typedTagline, isDeleting, taglineIndex, taglines]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-6"
      aria-label="Hero"
    >
      <div
        className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-12 lg:flex-row lg:items-center text-left"
      >
        {/* ── Left Content (Text) ───────────────────────── */}
        <motion.div
          className="flex w-full flex-col items-center text-center lg:items-start lg:w-1/2 lg:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Developer Name */}
          <motion.h1
            variants={fadeUp}
            className="hero-name mb-4 bg-linear-to-r from-white via-white/95 to-accent-cyan/80 bg-clip-text font-bold text-transparent"
          >
            {OWNER.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="mb-8 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            {typedTagline}
            <span
              className="ml-1 inline-block h-[1em] w-0.5 animate-blink bg-accent-cyan align-[-0.12em]"
              aria-hidden="true"
            />
          </motion.p>

          {/* Social Links */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = ICON_MAP[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-text-secondary backdrop-blur-sm transition-all duration-300 hover:border-accent-cyan/30 hover:bg-white/10 hover:text-accent-cyan hover:shadow-[0_0_20px_rgba(6,214,160,0.15)]"
                >
                  {Icon && <Icon size={20} />}
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── Right Content (Terminal) ────────────────────── */}
        <motion.div 
          className="w-full flex justify-center lg:w-1/2 lg:justify-end"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <MacTerminal />
        </motion.div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#projects" aria-label="Scroll to projects">
          <ChevronDown className="h-6 w-6 text-text-muted" />
        </a>
      </motion.div>
    </section>
  );
}
