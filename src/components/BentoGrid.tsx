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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <div
              key={project.title}
              className={
                project.span === "featured"
                  ? "sm:col-span-2 lg:col-span-2"
                  : project.span === "col2"
                    ? "sm:col-span-2 lg:col-span-1"
                    : ""
              }
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
