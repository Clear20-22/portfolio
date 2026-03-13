"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalIcon, X } from "lucide-react";
import { TERMINAL_COMMANDS, OWNER } from "@/lib/constants";
import { fuzzyMatch } from "@/lib/utils";

const AVAILABLE_COMMANDS = Object.keys(TERMINAL_COMMANDS);

interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "system";
  content: string;
}

let lineId = 0;

const getInitialLines = (): TerminalLine[] => [
  {
    id: lineId++,
    type: "system",
    content: `Welcome to ${OWNER.name}'s terminal. Type "help" for commands.`,
  },
];

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>(getInitialLines());
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // ── Toggle (Ctrl+K) ─────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // ── Focus input when opened ──────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ── Auto-scroll ────────────────────────────────────────
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // ── Click outside to close ────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // ── Execute command ──────────────────────────────────────
  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const newLines: TerminalLine[] = [
        { id: lineId++, type: "input", content: `❯ ${cmd}` },
      ];

      if (!trimmed) {
        setLines((prev) => [...prev, ...newLines]);
        return;
      }

      // Save to history
      setHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
      setHistoryIdx(-1);

      // Clear
      if (trimmed === "clear") {
        setLines([
          { id: lineId++, type: "system", content: "Terminal cleared." },
        ]);
        return;
      }

      // Exit (Reset)
      if (trimmed === "exit") {
        setLines(getInitialLines());
        return;
      }

      // Resume
      if (trimmed === "resume") {
        // Open resume URL
        if (typeof window !== "undefined") {
          window.open(OWNER.resumeUrl, "_blank");
        }
        newLines.push({
          id: lineId++,
          type: "output",
          content: "Opening resume...",
        });
        setLines((prev) => [...prev, ...newLines]);
        return;
      }

      // Fuzzy match
      const matched = fuzzyMatch(trimmed, AVAILABLE_COMMANDS);

      if (matched && TERMINAL_COMMANDS[matched]) {
        if (matched !== trimmed) {
          newLines.push({
            id: lineId++,
            type: "system",
            content: `→ did you mean "${matched}"?`,
          });
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
    },
    [],
  );

  // ── Handle key presses ─────────────────────────────────
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
    <>
      {/* ── Mobile FAB ───────────────────────────────────── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="glass fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-accent-cyan md:hidden"
        aria-label="Toggle terminal"
      >
        <TerminalIcon size={20} />
      </button>

      {/* ── Terminal Panel ───────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-label="Developer terminal"
              aria-modal="true"
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-[5%] sm:top-[10%] left-1/2 z-[101] w-[95vw] max-w-4xl -translate-x-1/2 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a1a]/60 shadow-2xl backdrop-blur-3xl"
            >
              {/* Project Card Gradient Glow */}
              <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-purple/10" />

              {/* Title Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/5 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="h-3 w-3 rounded-full bg-red-500/80 transition-colors hover:bg-red-500"
                      aria-label="Close terminal"
                    />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-2 font-mono text-xs text-text-muted">
                    {OWNER.name.toLowerCase().replace(/\s/g, "")}@portfolio:~$
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1 text-text-muted transition-colors hover:text-foreground"
                  aria-label="Close terminal"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Output */}
              <div
                ref={scrollRef}
                className="relative z-10 h-[65vh] max-h-[600px] overflow-y-auto px-4 py-3 font-mono text-sm"
              >
                {lines.map((line) => (
                  <div
                    key={line.id}
                    className={`whitespace-pre-wrap leading-relaxed ${line.type === "input"
                      ? "text-accent-cyan"
                      : line.type === "error"
                        ? "text-accent-pink"
                        : line.type === "system"
                          ? "text-text-muted italic"
                          : "text-text-secondary"
                      }`}
                  >
                    {line.content}
                  </div>
                ))}

                {/* Input Line */}
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-accent-cyan">❯</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent text-foreground outline-none placeholder:text-text-muted"
                    placeholder="type a command..."
                    aria-label="Terminal input"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <span className="animate-blink text-accent-cyan">▊</span>
                </div>
              </div>

              {/* Footer */}
              <div className="relative z-10 border-t border-white/5 px-4 py-2 text-center font-mono text-xs text-text-muted">
                Press <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-foreground">Ctrl+K</kbd> to toggle &middot;{" "}
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-foreground">Esc</kbd> to close &middot;{" "}
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-foreground">↑↓</kbd> history
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
