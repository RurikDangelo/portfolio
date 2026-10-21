"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

// Verdadeiro enquanto o elemento está na tela: as demos só animam sozinhas quando alguém vê.
export function useNaTela<T extends Element>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, visivel];
}

export function useMovimentoReduzido() {
  const [reduzir, setReduzir] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const aplicar = () => setReduzir(mq.matches);
    aplicar();
    mq.addEventListener("change", aplicar);
    return () => mq.removeEventListener("change", aplicar);
  }, []);
  return reduzir;
}

// Repete `fn` a cada `ms` enquanto `ativo`. A função mais recente é sempre a usada.
export function useIntervalo(fn: () => void, ms: number, ativo: boolean) {
  const atual = useRef(fn);
  useEffect(() => {
    atual.current = fn;
  });
  useEffect(() => {
    if (!ativo) return;
    const id = setInterval(() => atual.current(), ms);
    return () => clearInterval(id);
  }, [ms, ativo]);
}

// Número que sobe até o alvo, escrito direto no DOM (sem re-render por quadro).
export function Contador({ valor, formatar, className }: { valor: number; formatar: (n: number) => string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const anterior = useRef(0);
  const reduzir = useMovimentoReduzido();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduzir) {
      el.textContent = formatar(valor);
      anterior.current = valor;
      return;
    }
    const de = anterior.current;
    const inicio = performance.now();
    let raf = 0;
    const passo = (agora: number) => {
      const p = Math.min(1, (agora - inicio) / 800);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = formatar(de + (valor - de) * e);
      if (p < 1) raf = requestAnimationFrame(passo);
      else anterior.current = valor;
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [valor, formatar, reduzir]);
  return (
    <span ref={ref} className={className}>
      {formatar(valor)}
    </span>
  );
}

// Moldura de "janela de app" comum às três demos.
export function Janela({ titulo, aviso, children, acoes }: { titulo: string; aviso: string; children: React.ReactNode; acoes?: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-bg text-xs">
      <div className="flex items-center gap-3 border-b border-line px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
        </span>
        <span className="font-medium">{titulo}</span>
        <span className="ml-auto flex items-center gap-1">{acoes}</span>
      </div>
      <div className="relative min-h-0 flex-1 p-3">{children}</div>
      <p className="border-t border-line px-3 py-1.5 text-[10px] text-muted">{aviso}</p>
    </div>
  );
}
