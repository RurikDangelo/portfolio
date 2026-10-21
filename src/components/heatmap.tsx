"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import type { Dia } from "@/lib/github";

const NIVEIS = [
  "var(--heat-0)",
  "color-mix(in oklch, var(--accent) 30%, var(--heat-0))",
  "color-mix(in oklch, var(--accent) 55%, var(--heat-0))",
  "color-mix(in oklch, var(--accent) 80%, var(--heat-0))",
  "var(--accent)",
];

// Mapa de contribuições: as semanas acendem da esquerda para a direita ao entrar na tela.
export function Heatmap({ dias, rotulos, lang }: { dias: Dia[]; rotulos: { menos: string; mais: string }; lang: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visto = useInView(ref, { once: true, amount: 0.3 });

  // O calendário começa num domingo; agrupa em colunas de 7.
  const semanas: Dia[][] = [];
  for (let i = 0; i < dias.length; i += 7) semanas.push(dias.slice(i, i + 7));
  const fmt = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en", { day: "numeric", month: "short", timeZone: "UTC" });

  return (
    <div ref={ref}>
      <div className="overflow-x-auto pb-2">
        <div className="flex w-max gap-[3px]">
          {semanas.map((semana, s) => (
            <div key={s} className="flex flex-col gap-[3px]">
              {semana.map((d) => (
                <span
                  key={d.data}
                  title={`${d.total} · ${fmt.format(new Date(d.data))}`}
                  className="size-[11px] rounded-[3px] transition-[opacity,transform] duration-500 motion-reduce:transition-none"
                  style={{
                    background: NIVEIS[d.nivel],
                    opacity: visto ? 1 : 0,
                    transform: visto ? "none" : "scale(0.4)",
                    transitionDelay: `${s * 12}ms`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-xs text-muted">
        {rotulos.menos}
        {NIVEIS.map((c) => (
          <span key={c} className="size-[11px] rounded-[3px]" style={{ background: c }} />
        ))}
        {rotulos.mais}
      </div>
    </div>
  );
}
