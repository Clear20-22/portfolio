"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import ProjectCard from "./ProjectCard";

export default function BentoGrid() {
  return (
    <section id="projects" className="px-6 py-24" aria-label="Projects">
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
            {"// featured work"}
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Projects
          </h2>
        </motion.div>

        {/* Uniform project grid for clean row/column alignment */}
        <div className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
