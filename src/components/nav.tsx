"use client";

import Link from "next/link";
import { Moon, Sun } from "@phosphor-icons/react";
import type { Dicionario, Locale } from "@/content/site";

function alternarTema() {
  const el = document.documentElement;
  const novo = el.dataset.theme === "light" ? "dark" : "light";
  el.dataset.theme = novo;
  try {
    localStorage.setItem("tema", novo);
  } catch {}
}

export function Nav({ lang, nav, iniciais }: { lang: Locale; nav: Dicionario["nav"]; iniciais: string }) {
  const outro = lang === "pt" ? "en" : "pt";
  const links = [
    ["#sobre", nav.sobre],
    ["#solucoes", nav.solucoes],
    ["#automacoes", nav.automacoes],
    ["#projetos", nav.projetos],
    ["#experiencia", nav.experiencia],
  ] as const;

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 rounded-full border border-line bg-elev/70 pl-2 pr-2 shadow-[var(--shadow)] backdrop-blur-xl">
        <a href="#topo" className="flex items-center gap-2.5 rounded-full pr-3 text-sm font-medium">
          <span className="grid size-10 place-items-center rounded-full bg-accent font-mono text-xs font-semibold text-accent-ink">
            {iniciais}
          </span>
          <span className="hidden sm:inline">Rurik D&apos;Angelo</span>
        </a>
        <ul className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {links.map(([href, rotulo]) => (
            <li key={href}>
              <a href={href} className="transition-colors duration-300 hover:text-fg">
                {rotulo}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5">
          <Link
            href={`/${outro}`}
            hrefLang={outro}
            className="grid h-10 min-w-10 place-items-center rounded-full px-2 font-mono text-xs uppercase text-muted transition-colors hover:text-fg"
          >
            {outro}
          </Link>
          <button
            type="button"
            onClick={alternarTema}
            aria-label={lang === "pt" ? "Alternar tema" : "Toggle theme"}
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:text-fg"
          >
            <Sun size={18} weight="regular" className="hidden dark:block" />
            <Moon size={18} weight="regular" className="dark:hidden" />
          </button>
          <a
            href="#contato"
            className="hidden h-10 items-center rounded-full bg-fg px-4 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-px active:scale-[0.98] sm:flex"
          >
            {nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
