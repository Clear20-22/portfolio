"use client";

import { motion } from "framer-motion";
import { SKILLS, CATEGORY_COLORS } from "@/lib/constants";
import type { Skill } from "@/lib/constants";

const categories: Skill["category"][] = [
  "language",
  "framework",
  "tool",
  "concept",
];

const categoryLabels: Record<Skill["category"], string> = {
  language: "Languages",
  framework: "Frameworks",
  tool: "Tools & Platforms",
  concept: "Concepts",
};

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group"
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="font-mono text-xs text-text-muted">{skill.level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${CATEGORY_COLORS[skill.category]}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.06 + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24" aria-label="Skills">
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="mb-2 font-mono text-sm text-accent-cyan">
            {"// proficiency map"}
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Skills & Technologies
          </h2>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {categories.map((cat) => {
            const catSkills = SKILLS.filter((s) => s.category === cat);
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass rounded-2xl p-6"
              >
                {/* Category Header */}
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className={`h-3 w-3 rounded-full bg-gradient-to-r ${CATEGORY_COLORS[cat]}`}
                  />
                  <h3 className="text-lg font-semibold text-foreground">
                    {categoryLabels[cat]}
                  </h3>
                </div>

                {/* Skill Bars */}
                <div className="space-y-4">
                  {catSkills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
