"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";

const GLIFOS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/";

// Título que "decodifica" ao entrar na tela: o texto real vai ao DOM desde o SSR
// (SEO e leitor de tela), e a animação só reescreve o textContent do span.
export function Scramble({ texto, className, as: Tag = "h2" }: { texto: string; className?: string; as?: "h1" | "h2" | "h3" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { once: true, amount: 0.6 });
  const reduzir = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !visto || reduzir) return;
    const duracao = 900;
    const inicio = performance.now();
    let raf = 0;
    const passo = (agora: number) => {
      const p = Math.min(1, (agora - inicio) / duracao);
      const fixos = Math.floor(p * texto.length);
      let saida = texto.slice(0, fixos);
      for (let i = fixos; i < texto.length; i++) {
        saida += texto[i] === " " ? " " : GLIFOS[(Math.random() * GLIFOS.length) | 0];
      }
      el.textContent = saida;
      if (p < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => {
      cancelAnimationFrame(raf);
      el.textContent = texto;
    };
  }, [visto, reduzir, texto]);

  return (
    <Tag className={className} aria-label={texto}>
      <span ref={ref} aria-hidden>
        {texto}
      </span>
    </Tag>
  );
}
