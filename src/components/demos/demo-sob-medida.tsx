"use client";

import { useState } from "react";
import type { TextosDemo } from "@/content/demos";
import { Janela, useIntervalo, useMovimentoReduzido, useNaTela } from "./comum";

// Sistema sob medida: o mesmo app muda de módulos, indicadores e tabela conforme o nicho.
// Troca sozinho enquanto está na tela; um clique num nicho fixa a escolha.
export function DemoSobMedida({ t, aviso }: { t: TextosDemo["sobMedida"]; aviso: string }) {
  const [ativo, setAtivo] = useState(0);
  const [fixado, setFixado] = useState(false);
  const [ref, visivel] = useNaTela<HTMLDivElement>();
  const reduzir = useMovimentoReduzido();
  const n = t.nichos[ativo];

  useIntervalo(() => setAtivo((a) => (a + 1) % t.nichos.length), 3200, visivel && !fixado && !reduzir);

  return (
    <div ref={ref} className="h-full">
      <Janela titulo={n.titulo} aviso={aviso}>
        <div className="flex h-full flex-col gap-3">
          <div className="flex flex-wrap items-center gap-1" role="tablist" aria-label={t.escolha}>
            {t.nichos.map((x, i) => (
              <button
                key={x.nome}
                type="button"
                role="tab"
                aria-selected={ativo === i}
                onClick={() => {
                  setAtivo(i);
                  setFixado(true);
                }}
                className={`rounded-full border px-2.5 py-0.5 transition-colors ${
                  ativo === i ? "border-accent bg-accent text-accent-ink" : "border-line text-muted hover:text-fg"
                }`}
              >
                {x.nome}
              </button>
            ))}
          </div>

          <div key={ativo} className="grid min-h-0 flex-1 grid-cols-[88px_1fr] gap-3">
            <ul className="grid content-start gap-1 border-r border-line pr-2">
              {n.modulos.map((m, i) => (
                <li
                  key={m}
                  className={`entrar truncate rounded-md px-2 py-1 ${i === 0 ? "bg-elev text-fg" : "text-muted"}`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {m}
                </li>
              ))}
            </ul>
            <div className="flex min-w-0 flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                {n.kpis.map(([rotulo, valor], i) => (
                  <div key={rotulo} className="entrar rounded-lg border border-line bg-elev p-2" style={{ animationDelay: `${80 + i * 60}ms` }}>
                    <p className="truncate text-[10px] text-muted">{rotulo}</p>
                    <p className="mt-1 text-sm font-semibold tabular-nums">{valor}</p>
                  </div>
                ))}
              </div>
              <table className="w-full table-fixed text-left">
                <thead>
                  <tr className="text-[10px] text-muted">
                    {n.colunas.map((c) => (
                      <th key={c} className="truncate pb-1 font-normal">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {n.linhas.map((l, i) => (
                    <tr key={l[0]} className="entrar border-t border-line" style={{ animationDelay: `${160 + i * 60}ms` }}>
                      {l.map((c, j) => (
                        <td key={j} className={`truncate py-1.5 ${j === 0 ? "font-mono text-muted" : ""}`}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Janela>
    </div>
  );
}
