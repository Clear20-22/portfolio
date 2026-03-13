import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely — handles conflicts (e.g. `p-2` + `p-4` → `p-4`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Fuzzy-match a user command against known command names.
 * Returns the closest match or null if nothing is close enough.
 */
export function fuzzyMatch(
  input: string,
  commands: string[],
): string | null {
  const lower = input.toLowerCase().trim();
  if (!lower) return null;

  // Exact match first
  if (commands.includes(lower)) return lower;

  // Prefix match
  const prefixMatch = commands.find((c) => c.startsWith(lower));
  if (prefixMatch) return prefixMatch;

  // Levenshtein distance-based match (threshold ≤ 2)
  let best: string | null = null;
  let bestDist = Infinity;

  for (const cmd of commands) {
    const d = levenshtein(lower, cmd);
    if (d < bestDist) {
      bestDist = d;
      best = cmd;
    }
  }

  return bestDist <= 2 ? best : null;
}

/** Simple Levenshtein distance */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0),
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
}
