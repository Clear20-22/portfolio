"use client";

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
            className="mb-4 bg-gradient-to-r from-white via-white/90 to-text-secondary bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl lg:text-8xl"
          >
            {OWNER.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="mb-8 max-w-xl text-lg leading-relaxed text-text-secondary"
          >
            {OWNER.tagline}
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
