"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

// Digita e apaga cada papel em sequência. Sem movimento reduzido, mostra o primeiro fixo.
export function Typewriter({ palavras }: { palavras: string[] }) {
  const reduzir = useReducedMotion();
  const [i, setI] = useState(0);
  const [n, setN] = useState(palavras[0].length);
  const [apagando, setApagando] = useState(false);

  useEffect(() => {
    if (reduzir) return;
    const atual = palavras[i];
    const espera = !apagando && n === atual.length ? 1600 : apagando ? 35 : 70;
    const t = setTimeout(() => {
      if (!apagando && n === atual.length) return setApagando(true);
      if (apagando && n === 0) {
        setApagando(false);
        setI((i + 1) % palavras.length);
        return;
      }
      setN(n + (apagando ? -1 : 1));
    }, espera);
    return () => clearTimeout(t);
  }, [i, n, apagando, palavras, reduzir]);

  return (
    <span className="text-accent">
      <span className="sr-only">{palavras.join(", ")}</span>
      <span aria-hidden>
        {palavras[i].slice(0, n)}
        <span className="caret ml-0.5 inline-block w-[0.08em] translate-y-[0.08em] bg-current">&nbsp;</span>
      </span>
    </span>
  );
}
