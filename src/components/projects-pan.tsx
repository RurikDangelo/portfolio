"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale, Projeto } from "@/content/site";
import { textosDemo } from "@/content/demos";
import { DemoGestao } from "./demos/demo-gestao";
import { DemoOperacional } from "./demos/demo-operacional";
import { DemoSobMedida } from "./demos/demo-sob-medida";

gsap.registerPlugin(ScrollTrigger);

// Do md para cima, a rolagem vertical desliza os projetos na horizontal (seção fixada).
// No celular e com movimento reduzido, viram uma lista vertical comum.
export function ProjectsPan({ titulo, aviso, projetos, lang }: { titulo: string; aviso: string; projetos: Projeto[]; lang: Locale }) {
  const d = textosDemo[lang];
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current || !track.current) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const distancia = () => track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: () => -distancia(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={wrap} id="projetos" className="relative overflow-hidden">
      <div ref={track} className="flex flex-col gap-6 px-4 py-24 md:h-[100dvh] md:flex-row md:items-center md:gap-8 md:px-[8vw] md:py-0">
        <div className="shrink-0 md:w-[32vw]">
          <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">{titulo}</h2>
          <p className="mt-4 max-w-[36ch] text-muted">{aviso}</p>
        </div>
        {projetos.map((p) => (
          <article
            key={p.slug}
            className="group relative flex shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-elev md:h-[82dvh] md:w-[min(50vw,700px)]"
          >
            {/* Demo interativa no lugar da imagem: altura fixa no celular, ocupa o espaço no desktop. */}
            <div className="relative h-[340px] p-3 md:h-auto md:min-h-0 md:flex-1 md:p-4">
              {p.demo === "gestao" && <DemoGestao t={d.gestao} aviso={d.aviso} lang={lang} />}
              {p.demo === "operacional" && <DemoOperacional t={d.operacional} aviso={d.aviso} />}
              {p.demo === "sobMedida" && <DemoSobMedida t={d.sobMedida} aviso={d.aviso} />}
            </div>
            <div className="relative px-6 pb-6 pt-2 md:px-7 md:pb-7">
              <h3 className="text-2xl font-semibold tracking-tight">{p.titulo}</h3>
              <p className="mt-2 max-w-[56ch] text-sm text-muted">{p.resumo}</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                {p.pontos.map((ponto) => (
                  <li key={ponto} className="flex gap-2">
                    <span className="text-accent">+</span>
                    {ponto}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
