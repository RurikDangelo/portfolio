"use client";

import { useState } from "react";
import type { TextosDemo } from "@/content/demos";
import { Janela, useIntervalo, useMovimentoReduzido, useNaTela } from "./comum";

type Item = { id: number; texto: string; status: 0 | 1 | 2; dias: number };

// 0 = em andamento, 1 = atrasado, 2 = concluído. Atrasado é o único que usa a cor de alerta.
const COR = ["bg-accent", "bg-warn", "bg-muted"] as const;
const TRACO = ["stroke-accent", "stroke-warn", "stroke-muted"] as const;

// Painel operacional: a rosca mostra a proporção por status, os filtros recortam a lista e um
// evento novo chega no topo a cada poucos segundos, empurrando o mais antigo para fora.
export function DemoOperacional({ t, aviso }: { t: TextosDemo["operacional"]; aviso: string }) {
  const inicial: Item[] = t.eventos.slice(0, 6).map((e, i) => ({ id: i, ...e, dias: (i * 3) % 7 + 1 }));
  const [itens, setItens] = useState(inicial);
  const [proximo, setProximo] = useState(6);
  const [filtro, setFiltro] = useState(0);
  const [ref, visivel] = useNaTela<HTMLDivElement>();
  const reduzir = useMovimentoReduzido();

  useIntervalo(
    () => {
      const e = t.eventos[proximo % t.eventos.length];
      setItens((lista) => [{ id: proximo, ...e, dias: (proximo * 5) % 7 + 1 }, ...lista].slice(0, 6));
      setProximo((n) => n + 1);
    },
    2600,
    visivel && !reduzir,
  );

  const total = itens.length;
  const contagem = [0, 1, 2].map((s) => itens.filter((i) => i.status === s).length);
  let acumulado = 0;
  const visiveis = filtro === 0 ? itens : itens.filter((i) => i.status === filtro - 1);

  return (
    <div ref={ref} className="h-full">
      <Janela titulo={t.titulo} aviso={aviso}>
        <div className="grid h-full grid-cols-[auto_1fr] gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="relative size-24">
              <svg viewBox="0 0 36 36" className="size-full -rotate-90" aria-hidden>
                <circle cx="18" cy="18" r="15.9" className="fill-none stroke-line" strokeWidth="3.2" />
                {contagem.map((c, s) => {
                  const fatia = (c / total) * 100;
                  const el = (
                    <circle
                      key={s}
                      cx="18"
                      cy="18"
                      r="15.9"
                      pathLength={100}
                      className={`fill-none ${TRACO[s]} transition-[stroke-dasharray,stroke-dashoffset] duration-700`}
                      strokeWidth="3.2"
                      strokeDasharray={`${Math.max(0, fatia - 1.5)} 100`}
                      strokeDashoffset={-acumulado}
                    />
                  );
                  acumulado += fatia;
                  return el;
                })}
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="text-lg font-semibold tabular-nums">{total}</p>
                  <p className="text-[9px] text-muted">{t.total}</p>
                </div>
              </div>
            </div>
            <ul className="grid gap-1">
              {contagem.map((c, s) => (
                <li key={s} className="flex items-center gap-1.5 text-[10px] text-muted">
                  <span className={`size-2 rounded-full ${COR[s]}`} />
                  {t.filtros[s + 1]}
                  <span className="ml-auto pl-2 tabular-nums text-fg">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex flex-wrap gap-1">
              {t.filtros.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltro(i)}
                  className={`rounded-md border px-2 py-0.5 transition-colors ${filtro === i ? "border-accent text-fg" : "border-line text-muted hover:text-fg"}`}
                >
                  {f}
                </button>
              ))}
            </div>
            <ul className="flex min-h-0 flex-col gap-1 overflow-hidden">
              {visiveis.map((i) => (
                <li key={i.id} className="entrar flex items-center gap-2 rounded-lg border border-line bg-elev px-2 py-1.5">
                  <span className={`size-1.5 shrink-0 rounded-full ${COR[i.status]}`} />
                  <span className="truncate">{i.texto}</span>
                  <span className="ml-auto shrink-0 text-[10px] text-muted">
                    {i.status === 2 ? "✓" : `${t.vence} ${i.dias}d`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Janela>
    </div>
  );
}
