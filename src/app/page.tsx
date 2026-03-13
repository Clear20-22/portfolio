"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Visualizer from "@/components/Visualizer";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Skills from "@/components/Skills";
import Terminal from "@/components/Terminal";
import Cursor from "@/components/Cursor";
import { OWNER } from "@/lib/constants";

const sectionFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
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
        <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-border-glass to-transparent" />

        {/* Projects Bento Grid */}
        <motion.div {...sectionFade}>
          <BentoGrid />
        </motion.div>

        {/* Divider */}
        <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-border-glass to-transparent" />

        {/* Skills Section */}
        <motion.div {...sectionFade}>
          <Skills />
        </motion.div>

        {/* Divider */}
        <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-border-glass to-transparent" />

        {/* Footer */}
        <footer className="px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 font-mono text-sm text-text-muted">
              {"// let's connect"}
            </p>
            <a
              href={`mailto:${OWNER.email}`}
              className="inline-block bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-2xl font-bold text-transparent transition-opacity hover:opacity-80 sm:text-3xl"
              aria-label="Send email"
            >
              {OWNER.email}
            </a>
            <div className="mt-8 flex items-center justify-center gap-1 text-xs text-text-muted">
              <span>Built with</span>
              <Heart size={12} className="text-accent-pink" aria-hidden="true" />
              <span>
                using Next.js, TypeScript & Framer Motion
              </span>
            </div>
            <p className="mt-2 font-mono text-xs text-text-muted">
              &copy; {new Date().getFullYear()} {OWNER.name}
            </p>
          </motion.div>
        </footer>
      </main>
    </>
  );
}
