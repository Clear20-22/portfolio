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
    title: "Cognify AI Powered Learning Platform",
    description:
      "AI-powered learning platform with personalized content generation using Google Gemini, interactive chat tutoring, adaptive exam generation, notes management, and learning progress tracking.",
    tech: [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "TailwindCSS",
      "Supabase",
      "Google Gemini AI",
      "Pydantic",
      "Uvicorn",
    ],
    github:
      "https://github.com/Clear20-22/Cognify-AI-Powered-Learning-Platform",
    live: "https://cognify-ai-powered-learning-platfor.vercel.app",
    span: "featured",
  },
  {
    title: "StockHub - Warehouse Management System",
    description:
      "Complete warehouse management system built with React, FastAPI, and SQLite featuring JWT authentication, role-based access (Admin/Employee/Customer), and comprehensive CRUD operations for users, goods, branches, and assignments.",
    tech: [
      "React",
      "Vite",
      "FastAPI",
      "SQLite",
      "SQLAlchemy",
      "JWT",
      "Passlib",
      "Pydantic",
      "Axios",
      "React Router",
      "TailwindCSS",
      "Framer Motion",
      "Python",
      "JavaScript",
    ],
    github: "https://github.com/Clear20-22/StockHub",
    live: "https://stock-hub-eight.vercel.app/",
    span: "featured",
  },
  {
  title: "VivaMed - Medical Education & Management Platform",
  description:
    "A comprehensive medical ecosystem featuring specialized portals for students, doctors, and administrators. It streamlines clinical learning with interactive dashboards, patient management tools, and a gamified achievement system, all wrapped in a modern, responsive interface.",
  tech: [
    "React",
    "TypeScript",
    "Java",
    "Vite",
    "Tailwind CSS",
    "Framer Motion",
    "shadcn/ui",
    "Lucide React",
    "React Router",
    "Axios",
    "Node.js",
    "PostCSS",
  ],
  github: "https://github.com/your-username/VivaMed",
  live: "https://vivamed-demo.vercel.app/", // Placeholder: replace with your actual deployment link
  span: "featured",
},
{
  title: "TypeForge - Interactive Typing Mastery Platform",
  description:
    "An interactive typing tutor designed to bridge the gap between learning and gamification. It features a curriculum of structured lessons, a real-time practice engine with an on-screen visual keyboard helper, and an arcade-style game mode to improve muscle memory and typing speed.",
  tech: [
    "React",
    "Vite",
    "Tailwind CSS",
    "React Router",
    "PostCSS",
    "JavaScript",
    "ESLint",
  ],
  github: "https://github.com/Clear20-22/TypeForge",
  live: "https://type-forge-one.vercel.app/",
  span: "featured",
},
{
  title: "DrugScript - Healthcare Management System",
  description:
    "A revolutionary mobile healthcare ecosystem that digitizes the medical journey. It features QR-based prescription management, an on-demand medicine delivery marketplace, and a real-time emergency ambulance tracking system, all supported by a community health forum and expert consultation modules.",
  tech: [
    "Flutter",
    "FastAPI",
    "Firebase",
    "Dart",
    "Python",
    "PostgreSQL",
    "GetX",
    "Google Maps SDK",
    "JWT",
    "Docker",
    "Lottie",
    "REST API",
  ],
  github: "https://github.com/Clear20-22/DrugScript",
  live: "https://drugscript-app.vercel.app/", // Replace with your actual link or Play Store URL
  span: "featured",
},
{
  title: "Scribble V2 - Real-time Multiplayer Socket Game",
  description:
    "A high-performance multiplayer drawing and guessing game built with Java 17 and JavaFX. It features a custom TCP-based messaging protocol, real-time stroke synchronization with late-joiner history, and a dedicated admin dashboard for monitoring live server metrics like RTT, throughput, and packet fan-out.",
  tech: [
    "Java 17",
    "JavaFX",
    "TCP Sockets",
    "Multi-threading",
    "Gradle",
    "Concurrent Data Structures",
    "Object Serialization",
    "Exponential Backoff",
  ],
  github: "https://github.com/Mim1726/scribble",
  live: "https://github.com/Mim1726/scribble/releases", // Usually desktop apps link to releases or a demo video
  span: "featured",
},
{
  title: "Tuition Helper - Offline-First Management App",
  description:
    "An architecture-focused Flutter application designed for tutors to manage students, schedules, and payments. Built with an offline-first philosophy using SQLite and Hive, it features a highly responsive design that adapts seamlessly across Mobile, Tablet, and Web platforms using the Provider pattern.",
  tech: [
    "Flutter",
    "Dart",
    "Provider",
    "SQLite",
    "Hive",
    "Firebase",
    "Clean Architecture",
    "Responsive Design",
    "Google Maps API",
    "Local Notifications",
  ],
  github: "https://github.com/Clear20-22/Tuition-Helper",
  live: "https://tuition-helper-web.vercel.app/", // Replace with your actual deployment
  span: "featured",
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

// ─── Problem Solving ────────────────────────────────────────

export interface ProblemSolvingStat {
  label: string;
  value: string;
  detail: string;
}

export interface PlatformProfile {
  platform: string;
  solved: number;
  handle: string;
  url: string;
}

export const PROBLEM_SOLVING_STATS: ProblemSolvingStat[] = [
  {
    label: "Total Problems Solved",
    value: "1500+",
    detail: "Across multiple online judges and competitive programming platforms.",
  },
  {
    label: "Contest Participation",
    value: "100+",
    detail: "Regular participation in rated contests and university coding battles.",
  },
  {
    label: "Strong Areas",
    value: "DSA + Graph",
    detail: "Confident with dynamic programming, graph theory, and greedy strategies.",
  },
];

export const PLATFORM_PROFILES: PlatformProfile[] = [
  {
    platform: "Codeforces",
    solved: 500,
    handle: "Clear23",
    url: "https://codeforces.com/profile/Clear23",
  },
  {
    platform: "LeetCode",
    solved: 500,
    handle: "Sojib",
    url: "https://leetcode.com/u/_Sojib_/",
  },
  {
    platform: "CodeChef",
    solved: 200,
    handle: "clear23",
    url: "https://www.codechef.com/users/clear23",
  },
  {
    platform: "HackerRank",
    solved: 150,
    handle: "sojib1472004",
    url: "https://www.hackerrank.com/profile/sojib1472004",
  },
  {
    platform: "Toph",
    solved: 60,
    handle: "Sojib23",
    url: "https://toph.co/u/Sojib23",
  },
  {
    platform: "CSES",
    solved: 160,
    handle: "sojib",
    url: "https://cses.fi/user/233698",
  },
  {
    platform: "AtCoder",
    solved: 100,
    handle: "Sojib2004",
    url: "https://atcoder.jp/users/Sojib2004",
  },
 {
    platform: "Virtual Judge",
    solved: 300,
    handle: "Sojib2004",
    url: "https://vjudge.net/user/Sojib2004",
  },
];

// ─── Achievements ───────────────────────────────────────────

export interface Achievement {
  title: string;
  period: string;
  description: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Top Performances in University Programming Contests",
    period: "2023 - Present",
    description:
      "Secured strong positions in multiple intra-university and inter-university contests through consistent algorithmic practice.",
  },
  {
    title: "Built and Shipped Multiple Full-Stack Projects",
    period: "2022 - Present",
    description:
      "Designed and deployed production-ready projects with modern frontend, backend APIs, and scalable architecture patterns.",
  },
  {
    title: "Active Open-Source and Peer Collaboration",
    period: "Ongoing",
    description:
      "Contributed to team projects, code reviews, and technical mentoring within student and developer communities.",
  },
];

// ─── Terminal Commands ───────────────────────────────────────

export const TERMINAL_COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  help      — show available commands",
    "  about     — who am I?",
    "  projects  — list featured projects",
    "  skills    — show skill overview",
    "  problem   — show problem solving snapshot",
    "  achievements — show key achievements",
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
  problem: [
    "Problem Solving Experience:",
    ...PROBLEM_SOLVING_STATS.map((item) => `  ${item.label.padEnd(24)} ${item.value}`),
    "",
    "Platforms:",
    ...PLATFORM_PROFILES.map(
      (p) => `  ${p.platform.padEnd(16)} ${`${p.solved}+`.padEnd(8)} (${p.handle})`,
    ),
  ],
  achievements: [
    "Achievements:",
    ...ACHIEVEMENTS.map((a, i) => `  ${i + 1}. ${a.title} (${a.period})`),
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
