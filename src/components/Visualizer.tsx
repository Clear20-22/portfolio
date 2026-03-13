"use client";

import { useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";

// ─── Particle Constellation System (CSR only) ──────────────
function VisualizerInner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<InstanceType<typeof import("p5").default> | null>(null);

  const sketch = useCallback((p: InstanceType<typeof import("p5").default>) => {
    // ── Config ──
    const PARTICLE_COUNT = 140;
    const CONNECTION_DIST = 120;
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
    const MOUSE_RADIUS = 160;
    const MOUSE_REPEL_FORCE = 0.25;
    const MAX_SPEED = 0.6;
    const NOISE_FORCE = 0.12;
    const GRID_CELL = CONNECTION_DIST; // spatial hash cell size

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      hue: number;
      size: number;
      noiseOffX: number;
      noiseOffY: number;
    }

    let particles: Particle[] = [];
    let mouseSmooth = { x: -1000, y: -1000 };

    // ── Spatial hash for O(n) connection checks ──
    const getCell = (x: number, y: number) =>
      `${Math.floor(x / GRID_CELL)},${Math.floor(y / GRID_CELL)}`;

    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent(containerRef.current!);
      canvas.style("display", "block");
      p.colorMode(p.HSB, 360, 100, 100, 100);

      particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-0.3, 0.3),
        vy: p.random(-0.3, 0.3),
        hue: p.random(170, 280), // cyan → violet
        size: p.random(3.5, 6),
        noiseOffX: i * 100,
        noiseOffY: i * 100 + 5000,
      }));
    };

    p.draw = () => {
      // ── Background with subtle gradient ──
      p.clear();

      // Smooth mouse tracking
      if (p.mouseX > 0 && p.mouseY > 0) {
        mouseSmooth.x = p.lerp(mouseSmooth.x, p.mouseX, 0.08);
        mouseSmooth.y = p.lerp(mouseSmooth.y, p.mouseY, 0.08);
      }

      const time = p.frameCount * 0.003;

      // ── Build spatial hash ──
      const grid: Record<string, number[]> = {};
      for (let i = 0; i < particles.length; i++) {
        const cell = getCell(particles[i].x, particles[i].y);
        if (!grid[cell]) grid[cell] = [];
        grid[cell].push(i);
      }

      // ── Update particles ──
      for (const pt of particles) {
        // Perlin noise-based attractor force (creates natural clustering)
        const nx = p.noise(pt.noiseOffX + time, pt.y * 0.002) - 0.5;
        const ny = p.noise(pt.noiseOffY + time, pt.x * 0.002) - 0.5;
        pt.vx += nx * NOISE_FORCE;
        pt.vy += ny * NOISE_FORCE;

        // Mouse repulsion — particles gently spread away from cursor
        const dmx = pt.x - mouseSmooth.x;
        const dmy = pt.y - mouseSmooth.y;
        const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
        if (mouseDist < MOUSE_RADIUS && mouseDist > 1) {
          const force = (1 - mouseDist / MOUSE_RADIUS) * MOUSE_REPEL_FORCE;
          pt.vx += (dmx / mouseDist) * force;
          pt.vy += (dmy / mouseDist) * force;
        }

        // Damping
        pt.vx *= 0.97;
        pt.vy *= 0.97;

        // Clamp speed
        const speed = Math.sqrt(pt.vx * pt.vx + pt.vy * pt.vy);
        if (speed > MAX_SPEED) {
          pt.vx = (pt.vx / speed) * MAX_SPEED;
          pt.vy = (pt.vy / speed) * MAX_SPEED;
        }

        pt.x += pt.vx;
        pt.y += pt.vy;

        // Wrap edges
        if (pt.x < -10) pt.x = p.width + 10;
        if (pt.x > p.width + 10) pt.x = -10;
        if (pt.y < -10) pt.y = p.height + 10;
        if (pt.y > p.height + 10) pt.y = -10;
      }

      // ── Draw connections (spatial hash lookup) ──
      const drawn = new Set<string>();
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const cx = Math.floor(a.x / GRID_CELL);
        const cy = Math.floor(a.y / GRID_CELL);

        // Check 3x3 neighborhood
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const neighbors = grid[`${cx + dx},${cy + dy}`];
            if (!neighbors) continue;

            for (const j of neighbors) {
              if (j <= i) continue; // avoid duplicate pairs
              const key = `${i}-${j}`;
              if (drawn.has(key)) continue;

              const b = particles[j];
              const ddx = a.x - b.x;
              const ddy = a.y - b.y;
              const distSq = ddx * ddx + ddy * ddy;

              if (distSq < CONNECTION_DIST_SQ) {
                const dist = Math.sqrt(distSq);
                // Increased line visibility: max alpha up from 25 to 60, slower falloff
                const alpha = Math.pow(1 - dist / CONNECTION_DIST, 1.5) * 60;
                const hue = (a.hue + b.hue) / 2;

                p.stroke(hue, 50, 90, alpha);
                p.strokeWeight(1.2); // Thicker line
                p.line(a.x, a.y, b.x, b.y);
                drawn.add(key);
              }
            }
          }
        }
      }

      // ── Draw particles ──
      p.noStroke();
      for (const pt of particles) {
        // Outer glow
        const glowAlpha = 6 + Math.sin(p.frameCount * 0.02 + pt.hue) * 3;
        p.fill(pt.hue, 50, 90, glowAlpha);
        p.circle(pt.x, pt.y, pt.size * 3.5);

        // Core dot
        p.fill(pt.hue, 40, 95, 55);
        p.circle(pt.x, pt.y, pt.size);
      }
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Skip on reduced-motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // Dynamic import of p5 — avoids SSR issues
    import("p5").then((p5Module) => {
      if (cancelled || !containerRef.current) return;
      const P5 = p5Module.default;
      p5InstanceRef.current = new P5(sketch);
    });

    return () => {
      cancelled = true;
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [sketch]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse at 20% 20%, rgba(124,92,252,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(6,214,160,0.06) 0%, transparent 50%), linear-gradient(180deg, #060618 0%, #030308 100%)",
      }}
    />
  );
}

// ─── Dynamic wrapper — SSR-safe ────────────────────────────
const Visualizer = dynamic(() => Promise.resolve(VisualizerInner), {
  ssr: false,
  loading: () => (
    <div
      className="fixed inset-0 -z-10"
      aria-hidden="true"
      style={{
        background:
          "linear-gradient(180deg, #060618 0%, #030308 100%)",
      }}
    />
  ),
});

export default Visualizer;
