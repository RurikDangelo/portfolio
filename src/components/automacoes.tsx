"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { Dicionario } from "@/content/site";
import { Icone } from "./icone";

// Exemplo compacto de fluxo: as etapas acendem em sequência enquanto a seção está na tela.
export function Automacoes({ t }: { t: Dicionario["automacoes"] }) {
  const [ativo, setAtivo] = useState(0);
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const visivel = useInView(ref, { amount: 0.4 });
  const reduzir = useReducedMotion();
  const fluxo = t.fluxos[ativo];
  // Com movimento reduzido, o fluxo aparece inteiro e parado.
  const passo = reduzir ? fluxo.passos.length - 1 : tick;

  useEffect(() => {
    if (reduzir || !visivel) return;
    const id = setInterval(() => setTick((p) => (p + 1) % (fluxo.passos.length + 1)), 1200);
    return () => clearInterval(id);
  }, [ativo, visivel, reduzir, fluxo.passos.length]);

  return (
    <div ref={ref} className="rounded-2xl border border-line bg-elev p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{t.titulo}</h3>
          <p className="mt-1 text-sm text-muted">{t.sub}</p>
        </div>
        <div role="tablist" className="inline-flex rounded-full border border-line bg-bg p-1">
          {t.fluxos.map((f, i) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={ativo === i}
              onClick={() => {
                setAtivo(i);
                setTick(0);
              }}
              className={`h-9 rounded-full px-4 text-sm font-medium transition-colors ${
                ativo === i ? "bg-accent text-accent-ink" : "text-muted hover:text-fg"
              }`}
            >
              {f.nome}
            </button>
          ))}
        </div>
      </div>

      <ol className="relative mt-8 grid gap-4 md:grid-cols-4">
        {/* Trilho horizontal que se enche conforme o fluxo avança (só do md para cima). */}
        <span aria-hidden className="absolute left-5 right-5 top-5 hidden h-px bg-line md:block" />
        <motion.span
          aria-hidden
          className="absolute left-5 right-5 top-5 hidden h-px origin-left bg-accent md:block"
          animate={{ scaleX: Math.min(passo, fluxo.passos.length - 1) / (fluxo.passos.length - 1) }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {fluxo.passos.map((p, i) => {
          const aceso = i <= passo;
          return (
            <li key={`${fluxo.id}-${p.titulo}`} className="relative flex gap-4 md:block">
              <span
                className={`relative grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                  aceso ? "border-accent bg-accent text-accent-ink" : "border-line bg-bg text-muted"
                }`}
              >
                <Icone nome={p.icone} size={20} />
                {i === passo && !reduzir && (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-accent"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.7, opacity: 0 }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                  />
                )}
              </span>
              <div className="md:mt-4">
                <p className={`font-medium transition-colors duration-500 ${aceso ? "text-fg" : "text-muted"}`}>{p.titulo}</p>
                <p className="mt-1 text-sm text-muted">{p.texto}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
