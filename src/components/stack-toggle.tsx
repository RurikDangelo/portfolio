"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/content/site";

type Grupo = { grupo: Record<Locale, string>; itens: string[] };

// "Rápido" mostra tudo numa nuvem; "Detalhe" separa por área. A troca anima o layout.
export function StackToggle({ grupos, lang, rotulos }: { grupos: Grupo[]; lang: Locale; rotulos: { rapido: string; detalhe: string } }) {
  const [modo, setModo] = useState<"rapido" | "detalhe">("rapido");
  const reduzir = useReducedMotion();
  const t = reduzir ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 28 };

  return (
    <div>
      <div role="tablist" className="inline-flex rounded-full border border-line bg-elev p-1">
        {(["rapido", "detalhe"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={modo === m}
            onClick={() => setModo(m)}
            className="relative h-9 rounded-full px-4 text-sm font-medium"
          >
            {modo === m && <motion.span layoutId="aba-stack" transition={t} className="absolute inset-0 rounded-full bg-accent" />}
            <span className={`relative ${modo === m ? "text-accent-ink" : "text-muted"}`}>{rotulos[m]}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {modo === "rapido" ? (
          <motion.ul
            key="rapido"
            initial={reduzir ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {grupos.flatMap((g) => g.itens).map((item, i) => (
              <motion.li
                key={item}
                initial={reduzir ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.015, ...t }}
                className="rounded-full border border-line bg-elev px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            key="detalhe"
            initial={reduzir ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {grupos.map((g) => (
              <div key={g.grupo.pt} className="border-t border-line pt-4">
                <h3 className="font-mono text-xs text-accent">{g.grupo[lang]}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{g.itens.join(", ")}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
