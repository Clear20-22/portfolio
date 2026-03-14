"use client";

import { motion } from "framer-motion";
import { Award, Sparkles } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/constants";

export default function Achievements() {
  return (
    <section id="achievements" className="px-6 py-24" aria-label="Achievements">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-2 font-mono text-sm text-accent-purple">
            {"// achievements"}
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Milestones & Recognition
          </h2>
        </motion.div>

        <div className="grid gap-4">
          {ACHIEVEMENTS.map((item, index) => (
            <motion.article
              key={`${item.title}-${item.period}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass group rounded-2xl p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-accent-cyan">
                    <Award size={16} />
                    <p className="font-mono text-xs uppercase tracking-[0.16em]">
                      {item.period}
                    </p>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>

                <div className="self-start rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-text-muted transition-colors group-hover:text-accent-purple">
                  <span className="inline-flex items-center gap-1">
                    <Sparkles size={12} />
                    Highlight
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}