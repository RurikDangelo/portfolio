"use client";

import { useCallback, useMemo, useState } from "react";
import type { Locale } from "@/content/site";
import type { TextosDemo } from "@/content/demos";
import { Contador, Janela, useIntervalo, useMovimentoReduzido, useNaTela } from "./comum";

// Série fictícia e determinística (sem Math.random, para o servidor e o navegador concordarem).
function serie(n: number, semente: number) {
  let v = 40;
  return Array.from({ length: n }, (_, i) => {
    v += Math.sin(i * 0.9 + semente) * 6 + Math.cos(i * 0.37 + semente * 2) * 4 + 1.4;
    return Math.max(18, v);
  });
}
const PERIODOS = [serie(7, 1), serie(30, 2), serie(90, 3)];
const TICKET = [212, 198, 204];
const W = 300;
const H = 110;

// Plataforma de gestão: abas de período, indicadores que contam, gráfico com tooltip e um funil
// de CRM em que um lead avança de etapa a cada poucos segundos.
export function DemoGestao({ t, aviso, lang }: { t: TextosDemo["gestao"]; aviso: string; lang: Locale }) {
  const [periodo, setPeriodo] = useState(1);
  const [foco, setFoco] = useState<number | null>(null);
  const [etapas, setEtapas] = useState([0, 0, 1, 1, 2, 0]);
  const [ref, visivel] = useNaTela<HTMLDivElement>();
  const reduzir = useMovimentoReduzido();

  const local = lang === "pt" ? "pt-BR" : "en";
  const moeda = useCallback((n: number) => `${t.moeda} ${Math.round(n).toLocaleString(local)}`, [t.moeda, local]);
  const inteiro = useCallback((n: number) => Math.round(n).toLocaleString(local), [local]);

  const dados = PERIODOS[periodo];
  const receita = dados.reduce((s, v) => s + v, 0) * 1000;
  const pedidos = receita / TICKET[periodo];

  const { linha, area, pontos } = useMemo(() => {
    const max = Math.max(...dados) * 1.1;
    const pts = dados.map((v, i) => [(i / (dados.length - 1)) * W, H - (v / max) * H] as const);
    const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    return { linha: d, area: `${d} L${W},${H} L0,${H} Z`, pontos: pts };
  }, [dados]);

  useIntervalo(
    () =>
      setEtapas((e) => {
        const i = e.findIndex((x) => x < 2);
        if (i === -1) return [0, 0, 1, 1, 2, 0];
        return e.map((x, j) => (j === i ? x + 1 : x));
      }),
    2200,
    visivel && !reduzir,
  );

  const mover = (ev: React.PointerEvent<SVGSVGElement>) => {
    const r = ev.currentTarget.getBoundingClientRect();
    const i = Math.round(((ev.clientX - r.left) / r.width) * (dados.length - 1));
    setFoco(Math.max(0, Math.min(dados.length - 1, i)));
  };

  return (
    <div ref={ref} className="h-full">
      <Janela
        titulo={t.titulo}
        aviso={aviso}
        acoes={t.periodos.map((p, i) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriodo(i)}
            className={`rounded-md px-2 py-0.5 transition-colors ${periodo === i ? "bg-accent text-accent-ink" : "text-muted hover:text-fg"}`}
          >
            {p}
          </button>
        ))}
      >
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              [t.kpis[0], <Contador key="r" valor={receita} formatar={moeda} />],
              [t.kpis[1], <Contador key="p" valor={pedidos} formatar={inteiro} />],
              [t.kpis[2], <Contador key="t" valor={TICKET[periodo]} formatar={moeda} />],
            ].map(([rotulo, valor]) => (
              <div key={String(rotulo)} className="rounded-lg border border-line bg-elev p-2">
                <p className="text-[10px] text-muted">{rotulo}</p>
                <p className="mt-1 text-sm font-semibold tabular-nums">{valor}</p>
              </div>
            ))}
          </div>

          <div className="relative min-h-[90px]">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 size-full cursor-crosshair overflow-visible"
              onPointerMove={mover}
              onPointerLeave={() => setFoco(null)}
              role="img"
              aria-label={t.titulo}
            >
              <path key={`a${periodo}`} d={area} className="surgir fill-accent/15" />
              <path
                key={`l${periodo}`}
                d={linha}
                pathLength={1}
                className="desenhar fill-none stroke-accent"
                strokeWidth={1.8}
              />
              {foco !== null && (
                <line x1={pontos[foco][0]} x2={pontos[foco][0]} y1={0} y2={H} className="stroke-line" vectorEffect="non-scaling-stroke" />
              )}
            </svg>
            {foco !== null && (
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md border border-line bg-elev px-2 py-1 font-medium tabular-nums shadow-[var(--shadow)]"
                style={{ left: `${(pontos[foco][0] / W) * 100}%`, top: `${(pontos[foco][1] / H) * 100}%` }}
              >
                {moeda(dados[foco] * 1000)}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {t.funil.map((nome, col) => (
              <div key={nome} className="rounded-lg border border-line p-1.5">
                <p className="mb-1 text-[10px] text-muted">{nome}</p>
                <div className="flex min-h-[38px] flex-col gap-1">
                  {t.leads
                    .filter((_, i) => etapas[i] === col)
                    .slice(0, 2)
                    .map((lead) => (
                      <span key={`${lead}-${col}`} className={`entrar truncate rounded px-1.5 py-0.5 text-[10px] ${col === 2 ? "bg-accent text-accent-ink" : "bg-elev"}`}>
                        {lead}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Janela>
    </div>
  );
}
