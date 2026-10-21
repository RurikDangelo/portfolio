"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import type { Dicionario } from "@/content/site";
import { Icone } from "./icone";

// Fluxos de automação: abas escolhem o fluxo, e as etapas acendem em sequência enquanto
// a seção está na tela, como um pacote de dados percorrendo o caminho.
export function Automacoes({ t }: { t: Dicionario["automacoes"] }) {
  const [ativo, setAtivo] = useState(0);
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const visivel = useInView(ref, { amount: 0.35 });
  const reduzir = useReducedMotion();
  const fluxo = t.fluxos[ativo];
  // Com movimento reduzido, o fluxo aparece inteiro e parado.
  const passo = reduzir ? fluxo.passos.length - 1 : tick;

  useEffect(() => {
    if (reduzir || !visivel) return;
    const id = setInterval(() => setTick((p) => (p + 1) % (fluxo.passos.length + 1)), 1300);
    return () => clearInterval(id);
  }, [ativo, visivel, reduzir, fluxo.passos.length]);

  const escolher = (i: number) => {
    setAtivo(i);
    setTick(0);
  };

  return (
    <div ref={ref}>
      <div role="tablist" className="flex flex-wrap gap-2">
        {t.fluxos.map((f, i) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={ativo === i}
            onClick={() => escolher(i)}
            className={`h-10 rounded-full border px-4 text-sm font-medium transition-colors ${
              ativo === i ? "border-accent bg-accent text-accent-ink" : "border-line bg-elev text-muted hover:text-fg"
            }`}
          >
            {f.nome}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={fluxo.id}
          initial={reduzir ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 grid gap-6 lg:grid-cols-[1fr_2.2fr]"
        >
          <div className="grid gap-4 self-start">
            <div className="rounded-2xl border border-line bg-elev p-6">
              <p className="font-mono text-xs text-muted">{t.problema}</p>
              <p className="mt-2 text-lg leading-snug">{fluxo.problema}</p>
            </div>
            <div className="rounded-2xl border border-accent/40 bg-[radial-gradient(circle_at_0%_0%,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_70%)] bg-elev p-6">
              <p className="font-mono text-xs text-accent">{t.resultado}</p>
              <p className="mt-2 text-lg leading-snug">{fluxo.resultado}</p>
            </div>
          </div>

          <ol className="relative grid gap-3">
            {/* Trilho vertical que se enche conforme o fluxo avança. */}
            <span aria-hidden className="absolute bottom-6 left-[1.6rem] top-6 w-px bg-line" />
            <motion.span
              aria-hidden
              className="absolute left-[1.6rem] top-6 w-px origin-top bg-accent"
              style={{ bottom: "1.5rem" }}
              animate={{ scaleY: Math.min(passo, fluxo.passos.length - 1) / (fluxo.passos.length - 1) }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            {fluxo.passos.map((p, i) => {
              const aceso = i <= passo;
              const atual = i === passo;
              return (
                <li
                  key={p.titulo}
                  className={`relative flex items-start gap-4 rounded-2xl border p-4 transition-colors duration-500 ${
                    atual ? "border-accent bg-elev" : "border-line bg-elev/50"
                  }`}
                >
                  <span
                    className={`relative grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                      aceso ? "border-accent bg-accent text-accent-ink" : "border-line bg-bg text-muted"
                    }`}
                  >
                    <Icone nome={p.icone} size={20} />
                    {atual && !reduzir && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-accent"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.7, opacity: 0 }}
                        transition={{ duration: 1.1, repeat: Infinity }}
                      />
                    )}
                  </span>
                  <div>
                    <p className={`font-medium transition-colors ${aceso ? "text-fg" : "text-muted"}`}>{p.titulo}</p>
                    <p className="mt-1 text-sm text-muted">{p.texto}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
