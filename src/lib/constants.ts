// ─────────────────────────────────────────────────────────────
// Portfolio Data Layer — edit YOUR content here
// ─────────────────────────────────────────────────────────────

export const OWNER = {
  name: "Jubayer Ahmed Sojib",
  role: "Full-Stack Developer, Software Engineer",
  tagline: "I build fast, scalable digital products that turn ideas into real-world impact.",
  taglines: [
    "I build fast, scalable digital products that turn ideas into real-world impact.",
    "From concept to launch, I craft reliable software people love to use.",
    "Engineering clean code and thoughtful UX for startups and growing teams.",
    "I turn complex problems into simple, high-performance web experiences.",
  ],
  email: "jubayerahmedsojib23@gmail.com",
  resumeUrl: "#",
} as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Clear20-22", icon: "Github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jubayer-ahmed-sojib-462938331/",
    icon: "Linkedin",
  },
  { label: "Email", href: "mailto:jubayerahmedsojib23@gmail.com", icon: "Mail" },
] as const;

// ─── Projects ────────────────────────────────────────────────

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  span?: "col2" | "row2" | "featured"; // bento layout hints
}

export const PROJECTS: Project[] = [
  {
    title: "Neural Style Transfer",
    description:
      "Real-time artistic style transfer using deep convolutional networks with optimized inference pipeline.",
    tech: ["Python", "PyTorch", "FastAPI", "Docker"],
    github: "https://github.com/YOUR_GITHUB/neural-style",
    live: "https://neural-style.vercel.app",
    span: "featured",
  },
  {
    title: "DevFlow CLI",
    description:
      "Git workflow automation tool that streamlines branch management and CI/CD pipelines.",
    tech: ["Rust", "Tokio", "GitHub API"],
    github: "https://github.com/YOUR_GITHUB/devflow",
    span: "col2",
  },
  {
    title: "Quantum Circuit Sim",
    description:
      "Browser-based quantum computing simulator with drag-and-drop gate composition.",
    tech: ["TypeScript", "React", "WebGL", "Qiskit"],
    github: "https://github.com/YOUR_GITHUB/quantum-sim",
    live: "https://quantum-sim.vercel.app",
  },
  {
    title: "Mesh Network Chat",
    description:
      "Decentralised peer-to-peer messaging using WebRTC with end-to-end encryption.",
    tech: ["Go", "WebRTC", "Protobuf", "React"],
    github: "https://github.com/YOUR_GITHUB/mesh-chat",
  },
  {
    title: "CloudWatch Dashboard",
    description:
      "Real-time infrastructure monitoring dashboard with anomaly detection alerts.",
    tech: ["Next.js", "D3.js", "AWS SDK", "Prisma"],
    github: "https://github.com/YOUR_GITHUB/cloudwatch",
    live: "https://cloudwatch-dash.vercel.app",
    span: "col2",
  },
  {
    title: "LLM Playground",
    description:
      "Interactive sandbox for testing and comparing LLM outputs, with prompt versioning.",
    tech: ["TypeScript", "Next.js", "OpenAI API", "Redis"],
    github: "https://github.com/YOUR_GITHUB/llm-playground",
  },
];

// ─── Skills ──────────────────────────────────────────────────

export interface Skill {
  name: string;
  level: number; // 0-100
  category: "language" | "framework" | "tool" | "concept";
}

export const SKILLS: Skill[] = [
  // Languages
  { name: "TypeScript", level: 92, category: "language" },
  { name: "Python", level: 88, category: "language" },
  { name: "Rust", level: 72, category: "language" },
  { name: "Go", level: 68, category: "language" },
  { name: "C++", level: 75, category: "language" },

  // Frameworks
  { name: "React / Next.js", level: 95, category: "framework" },
  { name: "Node.js", level: 85, category: "framework" },
  { name: "FastAPI", level: 78, category: "framework" },
  { name: "Tailwind CSS", level: 90, category: "framework" },

  // Tools
  { name: "Docker", level: 82, category: "tool" },
  { name: "Git", level: 93, category: "tool" },
  { name: "AWS", level: 70, category: "tool" },
  { name: "Figma", level: 65, category: "tool" },

  // Concepts
  { name: "System Design", level: 80, category: "concept" },
  { name: "Data Structures", level: 90, category: "concept" },
  { name: "Machine Learning", level: 74, category: "concept" },
];

// ─── Terminal Commands ───────────────────────────────────────

export const TERMINAL_COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  help      — show available commands",
    "  about     — who am I?",
    "  projects  — list featured projects",
    "  skills    — show skill overview",
    "  contact   — how to reach me",
    "  resume    — open resume link",
    "  clear     — clear terminal",
    "  exit      — reset terminal to start",
  ],
  about: [
    `> ${OWNER.name}`,
    `  ${OWNER.role}`,
    "",
    "  " + OWNER.tagline,
    "",
    "  Passionate about open-source, creative coding, and",
    "  building tools that make developers' lives easier.",
  ],
  projects: PROJECTS.map(
    (p, i) => `  ${i + 1}. ${p.title} — ${p.tech.slice(0, 3).join(", ")}`,
  ),
  skills: [
    "Skill snapshot:",
    ...SKILLS.filter((s) => s.level >= 80).map(
      (s) => `  ${s.name.padEnd(18)} ${"█".repeat(Math.round(s.level / 10))}${"░".repeat(10 - Math.round(s.level / 10))} ${s.level}%`,
    ),
  ],
  contact: [
    "Get in touch:",
    `  Email    → ${OWNER.email}`,
    ...SOCIAL_LINKS.map((l) => `  ${l.label.padEnd(10)} → ${l.href}`),
  ],
  resume: [`Opening resume → ${OWNER.resumeUrl}`],
};

// ─── Category Colors ─────────────────────────────────────────

export const CATEGORY_COLORS: Record<Skill["category"], string> = {
  language: "from-cyan-500 to-blue-500",
  framework: "from-violet-500 to-purple-500",
  tool: "from-amber-500 to-orange-500",
  concept: "from-emerald-500 to-teal-500",
};
