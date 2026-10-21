"use client";

import { useEffect, useRef } from "react";

// Campo de neurônios do hero: pontos à deriva, ligados quando próximos, puxados pelo cursor.
// Desenha direto no canvas (fora do React), pausa fora da tela e congela com movimento reduzido.
export function NeuralField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduzir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cor = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    let tinta = cor();
    const tema = new MutationObserver(() => (tinta = cor()));
    tema.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let w = 0, h = 0, dpr = 1;
    type P = { x: number; y: number; vx: number; vy: number };
    let pontos: P[] = [];
    const mouse = { x: -9999, y: -9999 };

    const medir = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const qtd = Math.round(Math.min(110, (w * h) / 9000));
      pontos = Array.from({ length: qtd }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const desenhar = () => {
      ctx.clearRect(0, 0, w, h);
      const alcance = 130;
      for (const p of pontos) {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const d = Math.hypot(dx, dy);
        if (d < 180) {
          p.vx += (dx / d) * 0.02;
          p.vy += (dy / d) * 0.02;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      ctx.strokeStyle = tinta;
      for (let i = 0; i < pontos.length; i++) {
        for (let j = i + 1; j < pontos.length; j++) {
          const a = pontos[i], b = pontos[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < alcance) {
            ctx.globalAlpha = (1 - d / alcance) * 0.35;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = tinta;
      for (const p of pontos) {
        const perto = Math.hypot(mouse.x - p.x, mouse.y - p.y) < 120;
        ctx.globalAlpha = perto ? 1 : 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, perto ? 2.4 : 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let rodando = false;
    const loop = () => {
      desenhar();
      raf = requestAnimationFrame(loop);
    };
    const visivel = new IntersectionObserver(([e]) => {
      if (reduzir) return;
      if (e.isIntersecting && !rodando) {
        rodando = true;
        loop();
      } else if (!e.isIntersecting && rodando) {
        rodando = false;
        cancelAnimationFrame(raf);
      }
    });

    const mover = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const sair = () => {
      mouse.x = mouse.y = -9999;
    };
    const redimensionar = new ResizeObserver(() => {
      medir();
      desenhar();
    });

    medir();
    desenhar();
    redimensionar.observe(canvas);
    visivel.observe(canvas);
    window.addEventListener("pointermove", mover, { passive: true });
    document.addEventListener("pointerleave", sair);
    return () => {
      cancelAnimationFrame(raf);
      tema.disconnect();
      visivel.disconnect();
      redimensionar.disconnect();
      window.removeEventListener("pointermove", mover);
      document.removeEventListener("pointerleave", sair);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
