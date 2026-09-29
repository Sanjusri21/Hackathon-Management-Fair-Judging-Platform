import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
}

interface DataToken {
  text: string;
  x: number;
  y: number;
  alpha: number;
  fadeSpeed: number;
  life: number;
}

interface DataLine {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number; // 0 for horizontal, 0.4 for diagonal
  alpha: number;
}

export const AnimatedBackground: React.FC = () => {
  const { currentView } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const isDashboardView = currentView !== 'landing' && currentView !== 'auth';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY, active: true });
    };

    const handleMouseLeave = () => {
      setMousePos((prev) => ({ ...prev, active: false }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Number of particles: 70 on landing, 35 inside dashboard for performance
    const particleCount = prefersReducedMotion
      ? 20
      : isDashboardView
      ? Math.min(40, Math.floor(width / 35))
      : Math.min(85, Math.floor(width / 20));

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.35),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.35),
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.2,
        alpha: Math.random() * 0.4 + 0.2,
      });
    }

    // Abstract data stream tokens
    const tokensList = ['01', '101', 'API', 'TX', 'DB', 'OK', 'SYNC', 'AUTH', 'HASH', 'P2P', 'Z3'];
    const activeTokens: DataToken[] = [];
    const maxTokens = isDashboardView ? 3 : 6;

    // Moving technical data lines
    const activeLines: DataLine[] = [];
    const maxLines = isDashboardView ? 2 : 5;

    let lastTokenTime = Date.now();
    let lastLineTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouseX = mousePos.x;
      const mouseY = mousePos.y;
      const mouseActive = mousePos.active;

      // 1. Draw connecting lines between particles + cursor interaction
      const connectDist = isDashboardView ? 110 : 135;
      const cursorDist = 140;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Slow organic drift
          p.x += p.vx;
          p.y += p.vy;

          // Bounce off bounds
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Subtle pull toward mouse if within radius
          if (mouseActive) {
            const dxM = mouseX - p.x;
            const dyM = mouseY - p.y;
            const distM = Math.sqrt(dxM * dxM + dyM * dyM);
            if (distM < cursorDist && distM > 5) {
              const force = (1 - distM / cursorDist) * 0.4;
              p.x += (dxM / distM) * force;
              p.y += (dyM / distM) * force;
            }
          }
        }

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDist) {
            const lineAlpha = (1 - dist / connectDist) * (isDashboardView ? 0.08 : 0.14);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw connection to cursor if close
        if (mouseActive) {
          const dxC = mouseX - p.x;
          const dyC = mouseY - p.y;
          const distC = Math.sqrt(dxC * dxC + dyC * dyC);
          if (distC < cursorDist) {
            const cursorLineAlpha = (1 - distC / cursorDist) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${cursorLineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${isDashboardView ? p.alpha * 0.7 : p.alpha})`;
        ctx.shadowColor = 'rgba(99, 102, 241, 0.4)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 2. Data Streams & Lines
      if (!prefersReducedMotion) {
        if (activeLines.length < maxLines && Date.now() - lastLineTime > 2200) {
          activeLines.push({
            x: -80,
            y: Math.random() * height,
            length: Math.random() * 45 + 25,
            speed: Math.random() * 1.5 + 0.8,
            angle: Math.random() > 0.6 ? 0.35 : 0,
            alpha: Math.random() * 0.25 + 0.1,
          });
          lastLineTime = Date.now();
        }

        for (let lIdx = activeLines.length - 1; lIdx >= 0; lIdx--) {
          const line = activeLines[lIdx];
          line.x += line.speed;
          if (line.angle !== 0) line.y += line.speed * line.angle;

          const grad = ctx.createLinearGradient(
            line.x - line.length,
            line.y,
            line.x,
            line.y + line.length * line.angle
          );
          grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
          grad.addColorStop(1, `rgba(6, 182, 212, ${line.alpha})`);

          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.moveTo(line.x - line.length, line.y);
          ctx.lineTo(line.x, line.y + line.length * line.angle);
          ctx.stroke();

          if (line.x > width + 100 || line.y > height + 100) {
            activeLines.splice(lIdx, 1);
          }
        }

        // 3. Abstract data fragments
        if (activeTokens.length < maxTokens && Date.now() - lastTokenTime > 2800) {
          activeTokens.push({
            text: tokensList[Math.floor(Math.random() * tokensList.length)],
            x: Math.random() * (width - 120) + 60,
            y: Math.random() * (height - 120) + 60,
            alpha: 0.01,
            fadeSpeed: 0.005,
            life: 0,
          });
          lastTokenTime = Date.now();
        }

        ctx.font = '9px "JetBrains Mono", monospace';
        for (let tIdx = activeTokens.length - 1; tIdx >= 0; tIdx--) {
          const tok = activeTokens[tIdx];
          tok.life += 1;

          if (tok.life < 40) {
            tok.alpha = Math.min(0.28, tok.alpha + tok.fadeSpeed);
          } else {
            tok.alpha -= tok.fadeSpeed;
          }

          ctx.fillStyle = `rgba(147, 197, 253, ${tok.alpha})`;
          ctx.fillText(tok.text, tok.x, tok.y);

          if (tok.alpha <= 0 && tok.life > 40) {
            activeTokens.splice(tIdx, 1);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isDashboardView]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Layer 1: Atmospheric Floating Gradient Orbs */}
      {/* Orb A: Top-Left to Center */}
      <div
        className={`absolute -top-32 -left-32 w-[680px] h-[680px] rounded-full bg-gradient-to-br from-indigo-900/25 via-violet-900/15 to-transparent blur-[120px] transition-opacity duration-1000 ${
          isDashboardView ? 'opacity-35' : 'opacity-60'
        } animate-pulse-subtle`}
      />

      {/* Orb B: Bottom-Right to Center */}
      <div
        className={`absolute -bottom-40 -right-32 w-[720px] h-[720px] rounded-full bg-gradient-to-tl from-blue-900/25 via-cyan-950/20 to-transparent blur-[130px] transition-opacity duration-1000 ${
          isDashboardView ? 'opacity-30' : 'opacity-55'
        }`}
      />

      {/* Orb C: Center Subtle Electric Glow */}
      <div
        className={`absolute top-1/4 left-1/3 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-violet-950/20 via-indigo-950/15 to-transparent blur-[140px] transition-opacity duration-1000 ${
          isDashboardView ? 'opacity-25' : 'opacity-40'
        }`}
      />

      {/* Cursor Follow Spotlight Glow */}
      {mousePos.active && (
        <div
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-transform duration-75 -translate-x-1/2 -translate-y-1/2 blur-[80px] opacity-20"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(6,182,212,0.1) 50%, transparent 70%)',
          }}
        />
      )}

      {/* Layer 4: Technical Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle Perspective Grid at bottom of hero on landing page */}
      {!isDashboardView && (
        <div className="absolute -bottom-20 left-0 right-0 h-[380px] perspective-grid-container pointer-events-none opacity-40 overflow-hidden">
          <div className="w-full h-[600px] perspective-grid-plane" />
        </div>
      )}

      {/* Layer 2 & 3: Particle Network & Data Streams Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
