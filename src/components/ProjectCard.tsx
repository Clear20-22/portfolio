"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-accent-cyan/20"
      data-hover
    >
      {/* Gradient Glow — visible on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-accent-cyan/10 via-transparent to-accent-purple/10" />
      </div>

      <div className="relative z-10">
        {/* Header Row */}
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-accent-cyan">
            {project.title}
          </h3>
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="rounded-lg p-2 text-text-muted transition-colors hover:text-accent-cyan"
            >
              <Github size={16} />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="rounded-lg p-2 text-text-muted transition-colors hover:text-accent-cyan"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-text-secondary transition-colors group-hover:text-accent-cyan/80"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
