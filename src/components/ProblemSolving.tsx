"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Binary, Trophy } from "lucide-react";
import {
  PLATFORM_PROFILES,
  PROBLEM_SOLVING_STATS,
} from "@/lib/constants";

export default function ProblemSolving() {
  const [sortAsc, setSortAsc] = useState(false);
  return (
    <section
      id="problem-solving"
      className="px-6 py-24"
      aria-label="Problem solving experience"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-2 font-mono text-sm text-accent-cyan">
            {"// problem solving experience"}
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Competitive Programming Journey
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {PROBLEM_SOLVING_STATS.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:border-accent-cyan/20"
              >
                {/* Gradient Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-accent-cyan/10 via-transparent to-accent-purple/10" />
                </div>
                <p className="relative z-10 font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                  {item.label}
                </p>
                <p className="relative z-10 mt-2 text-2xl font-bold text-white">{item.value}</p>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-text-secondary">{item.detail}</p>
              </motion.article>
            ))}
          </div>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-accent-cyan/20"
          >
            {/* Gradient Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-accent-cyan/10 via-transparent to-accent-purple/10" />
            </div>

            <div className="relative z-10 mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-accent-purple/15 p-2 text-accent-purple">
                <Binary size={18} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Platform Snapshot</h3>
              <button
                onClick={() => setSortAsc((prev) => !prev)}
                title={sortAsc ? "Sort: Low → High" : "Sort: High → Low"}
                className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-text-secondary transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan"
              >
                {sortAsc ? <ArrowUp size={13} /> : <ArrowDown size={13} />}
                Solve Count
              </button>
            </div>

            <div className="relative z-10 max-h-80 space-y-3 overflow-y-auto pr-1">
              {[...PLATFORM_PROFILES]
                .sort((a, b) => sortAsc ? a.solved - b.solved : b.solved - a.solved)
                .map((profile) => (
                <a
                  key={profile.platform}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-white/8 bg-white/4 px-4 py-3 transition-colors hover:border-accent-cyan/35"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{profile.platform}</p>
                    <p className="text-xs text-text-secondary">Handle: {profile.handle}</p>
                  </div>
                  <div className="flex items-center gap-2 text-accent-cyan">
                    <Trophy size={14} />
                    <span className="text-sm font-semibold">{profile.solved}+</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}