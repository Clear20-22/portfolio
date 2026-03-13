"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { OWNER, TERMINAL_COMMANDS } from "@/lib/constants";
import { fuzzyMatch } from "@/lib/utils";

const AVAILABLE_COMMANDS = Object.keys(TERMINAL_COMMANDS);

interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "system";
  content: string;
}

let lineId = 0;

// Generate fresh initial lines for the MacTerminal
const getInitialLines = (): TerminalLine[] => [
  { id: lineId++, type: "input", content: "❯ whoami" },
  { id: lineId++, type: "output", content: OWNER.name },
  { id: lineId++, type: "input", content: "❯ role" },
  { id: lineId++, type: "output", content: OWNER.role },
  { id: lineId++, type: "input", content: "❯ status" },
  { id: lineId++, type: "output", content: "Available for opportunities" },
];

export default function MacTerminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>(getInitialLines());
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Execute command
  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [
      { id: lineId++, type: "input", content: `❯ ${cmd}` },
    ];

    if (!trimmed) {
      setLines((prev) => [...prev, ...newLines]);
      return;
    }

    setHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
    setHistoryIdx(-1);

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    if (trimmed === "exit") {
      setLines(getInitialLines());
      return;
    }

    if (trimmed === "resume") {
      if (typeof window !== "undefined") {
        window.open(OWNER.resumeUrl, "_blank");
      }
      newLines.push({ id: lineId++, type: "output", content: "Opening resume..." });
      setLines((prev) => [...prev, ...newLines]);
      return;
    }

    const matched = fuzzyMatch(trimmed, AVAILABLE_COMMANDS);

    if (matched && TERMINAL_COMMANDS[matched]) {
      if (matched !== trimmed) {
        newLines.push({ id: lineId++, type: "system", content: `→ did you mean "${matched}"?` });
      }
      for (const line of TERMINAL_COMMANDS[matched]) {
        newLines.push({ id: lineId++, type: "output", content: line });
      }
    } else {
      newLines.push({
        id: lineId++,
        type: "error",
        content: `Command not found: "${cmd}". Type "help" for available commands.`,
      });
    }

    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0, 0, 0.2, 1] as const }}
      className="w-full max-w-xl lg:max-w-2xl"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a1a]/50 shadow-2xl shadow-black/50 backdrop-blur-3xl">
          {/* Project Card Gradient Glow */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-purple/10" />

          {/* ── Title Bar ─────────────────────────────────── */}
          <div className="relative z-10 flex items-center gap-3 border-b border-white/[0.04] bg-white/[0.02] px-4 py-3">
            {/* Traffic lights */}
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
            </div>

            {/* Profile pic + name in title bar */}
            <div className="ml-2 flex flex-1 items-center justify-center gap-3 pr-6">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 shadow-[0_0_12px_rgba(6,214,160,0.25)]">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-mono text-xs text-text-secondary">
                {OWNER.name.toLowerCase().replace(/\s+/g, "")}@portfolio
              </span>
            </div>
          </div>

          {/* ── Terminal Body ──────────────────────────────── */}
          <div
            ref={scrollRef}
            className="relative z-10 flex h-[400px] flex-col overflow-y-auto px-5 py-5 font-mono text-sm leading-relaxed"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line) => (
              <div
                key={line.id}
                className={`mb-2 whitespace-pre-wrap leading-relaxed ${
                  line.type === "input"
                    ? "text-foreground"
                    : line.type === "error"
                      ? "text-accent-pink"
                      : line.type === "system"
                        ? "text-text-muted italic"
                        : "bg-gradient-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent"
                }`}
              >
                {line.content}
              </div>
            ))}

            {/* Interactive Input Line */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-accent-cyan">❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-foreground outline-none placeholder:text-text-muted/50"
                placeholder="type a command..."
                aria-label="Terminal input"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="animate-blink text-accent-cyan">▊</span>
            </div>
          </div>

          {/* ── Footer Instructions ────────────────────────── */}
          <div className="relative z-10 border-t border-white/5 px-4 py-2 text-center font-mono text-xs text-text-muted">
            <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-foreground">Ctrl+K</kbd> full terminal &middot;{" "}
            <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-foreground">↑↓</kbd> history &middot;{" "}
            <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-foreground">exit</kbd> reset
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
