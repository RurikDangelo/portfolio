"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Projeto } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

// Do md para cima, a rolagem vertical desliza os projetos na horizontal (seção fixada).
// No celular e com movimento reduzido, viram uma lista vertical comum.
export function ProjectsPan({ titulo, projetos }: { titulo: string; projetos: Projeto[] }) {
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
      gsap.utils.toArray<HTMLElement>(".projeto-img").forEach((img) => {
        gsap.fromTo(img, { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top top", end: () => `+=${distancia()}`, scrub: true } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={wrap} id="projetos" className="relative overflow-hidden">
      <div ref={track} className="flex flex-col gap-6 px-4 py-24 md:h-[100dvh] md:flex-row md:items-center md:gap-8 md:px-[8vw] md:py-0">
        <div className="shrink-0 md:w-[32vw]">
          <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">{titulo}</h2>
        </div>
        {projetos.map((p) => (
          <article
            key={p.slug}
            className="group relative flex shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-elev md:h-[72dvh] md:w-[min(46vw,640px)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:flex-1">
              <Image
                src={p.imagem}
                alt=""
                fill
                sizes="(min-width: 768px) 46vw, 100vw"
                className="projeto-img object-cover opacity-80 grayscale transition duration-700 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-elev via-elev/20 to-transparent" />
            </div>
            <div className="relative p-6 md:p-8">
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{p.titulo}</h3>
              <p className="mt-3 max-w-[52ch] text-muted">{p.resumo}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {p.pontos.map((ponto) => (
                  <li key={ponto} className="flex gap-2">
                    <span className="text-accent">+</span>
                    {ponto}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted">
                    {s}
                  </span>
                ))}
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.titulo}: site`}
                    className="ml-auto grid size-10 place-items-center rounded-full bg-accent text-accent-ink transition-transform hover:-translate-y-0.5 hover:rotate-12"
                  >
                    <ArrowUpRight size={18} weight="bold" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
