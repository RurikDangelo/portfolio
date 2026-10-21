import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { dicionarios, hasLocale, perfil, stackGrupos, type Dicionario, type Locale } from "@/content/site";
import { resumoGithub } from "@/lib/github";
import { Nav } from "@/components/nav";
import { PortalHero } from "@/components/portal-hero";
import { Typewriter } from "@/components/typewriter";
import { Scramble } from "@/components/scramble";
import { Reveal } from "@/components/reveal";
import { StackToggle } from "@/components/stack-toggle";
import { ProjectsPan } from "@/components/projects-pan";
import { Heatmap } from "@/components/heatmap";
import { Automacoes } from "@/components/automacoes";
import { Icone } from "@/components/icone";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = dicionarios[lang];

  return (
    <>
      <Nav lang={lang} nav={t.nav} iniciais="RD" />
      <main id="topo">
        <Hero t={t} />
        <Faixa />
        <Sobre t={t} />
        <Solucoes t={t} />
        <ProjectsPan titulo={t.projetos.titulo} aviso={t.projetos.aviso} projetos={t.projetos.lista} />
        <section id="stack" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
          <Scramble texto={t.stack.titulo} className="mb-10 text-4xl font-semibold tracking-tighter md:text-5xl" />
          <StackToggle grupos={stackGrupos} lang={lang} rotulos={t.stack} />
        </section>
        <Trajetoria t={t} />
        <Suspense fallback={<GithubEsqueleto t={t} />}>
          <GithubPublico t={t} lang={lang} />
        </Suspense>
        <Contato t={t} />
      </main>
    </>
  );
}

function Hero({ t }: { t: Dicionario }) {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <PortalHero className="absolute inset-0" />
      {/* Escurece só o lado do texto; no celular, o portal fica atrás e mais apagado. */}
      <div className="pointer-events-none absolute inset-0 bg-bg/55 md:bg-transparent md:bg-gradient-to-r md:from-bg md:via-bg/50 md:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-24">
        <Reveal delay={0.08}>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tighter md:text-7xl">
            {perfil.nome}
            <br />
            <Typewriter palavras={t.hero.papeis} />
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">{t.hero.sub}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projetos"
              className="flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-ink transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {t.hero.verProjetos}
              <ArrowDown size={16} weight="bold" />
            </a>
            <a
              href="#solucoes"
              className="flex h-12 items-center gap-2 rounded-full border border-line bg-elev/60 px-6 font-medium backdrop-blur transition-colors hover:border-fg"
            >
              {t.hero.verSolucoes}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faixa() {
  const itens = stackGrupos.flatMap((g) => g.itens);
  return (
    <div className="overflow-hidden border-y border-line py-5" aria-hidden>
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-mono text-sm uppercase text-muted">
        {[...itens, ...itens].map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            {item}
            <span className="text-accent">*</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Sobre({ t }: { t: Dicionario }) {
  return (
    <section id="sobre" className="mx-auto grid max-w-6xl gap-12 px-4 py-24 md:grid-cols-[1fr_1.15fr] md:items-center md:py-32">
      <div>
        <Scramble texto={t.sobre.titulo} className="text-4xl font-semibold leading-[1.1] tracking-tighter md:text-5xl" />
        {t.sobre.texto.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">{p}</p>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <div className="overflow-hidden rounded-2xl border border-line shadow-[var(--shadow)]">
          <Image
            src={perfil.foto}
            alt={t.sobre.fotoAlt}
            width={1536}
            height={1024}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="aspect-[3/2] w-full object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}

function Solucoes({ t }: { t: Dicionario }) {
  const s = t.solucoes;
  return (
    <section id="solucoes" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <Scramble texto={s.titulo} className="text-4xl font-semibold tracking-tighter md:text-5xl" />
      <p className="mt-4 max-w-[60ch] text-lg text-muted">{s.sub}</p>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {s.lista.map((item, i) => (
          <Reveal key={item.titulo} delay={i * 0.06}>
            <article className="group flex h-full flex-col gap-5 rounded-2xl border border-line bg-elev p-7 transition-colors hover:border-accent">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-bg text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Icone nome={item.icone} size={24} />
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{item.titulo}</h3>
                <p className="mt-2 text-muted">{item.texto}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-4">
        <Automacoes t={t.automacoes} />
      </Reveal>
    </section>
  );
}

function Trajetoria({ t }: { t: Dicionario }) {
  return (
    <section id="trajetoria" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <Scramble texto={t.trajetoria.titulo} className="mb-12 text-4xl font-semibold tracking-tighter md:text-5xl" />
      <ol className="relative space-y-4 md:ml-6 md:border-l md:border-line md:pl-10">
        {t.trajetoria.itens.map((e, i) => (
          <Reveal key={e.titulo} delay={i * 0.06}>
            <li className="group relative grid gap-3 rounded-2xl border border-line bg-elev p-6 transition-colors hover:border-accent md:p-8">
              <span
                className={`absolute -left-[3.05rem] top-9 hidden size-3 rounded-full border-2 border-bg md:block ${i === 0 ? "bg-accent" : "bg-line"}`}
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{e.titulo}</h3>
                <p className="font-mono text-sm text-muted">{e.onde}</p>
              </div>
              <p className="max-w-[70ch] text-muted">{e.texto}</p>
              <ul className="flex flex-wrap gap-2">
                {e.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-bg px-3 py-1 font-mono text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

async function GithubPublico({ t, lang }: { t: Dicionario; lang: Locale }) {
  const g = await resumoGithub(perfil.github);
  const fmtMes = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en", { month: "short", year: "numeric", timeZone: "UTC" });
  const num = new Intl.NumberFormat(lang === "pt" ? "pt-BR" : "en");

  return (
    <section id="github" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <Scramble texto={t.github.titulo} className="text-4xl font-semibold tracking-tighter md:text-5xl" />
      <p className="mt-4 max-w-[60ch] text-muted">{t.github.sub}</p>
      {!g ? (
        <p className="mt-10 rounded-2xl border border-line bg-elev p-8 text-muted">{t.github.indisponivel}</p>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-line bg-elev p-8">
              <div className="flex items-center gap-3">
                <GithubLogo size={28} />
                <span className="font-mono">@{perfil.github}</span>
              </div>
              <div>
                <p className="text-6xl font-semibold tracking-tighter md:text-7xl">{num.format(g.total)}</p>
                <p className="mt-2 text-muted">{t.github.contribuicoes}</p>
              </div>
              <a
                href={`https://github.com/${perfil.github}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-fit items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                {t.github.abrir}
                <ArrowUpRight size={16} weight="bold" />
              </a>
            </div>
          </Reveal>
          {[
            [t.github.diasAtivos, num.format(g.diasAtivos)],
            [t.github.maiorSequencia, `${g.maiorSequencia} ${t.github.dias}`],
            [t.github.repos, num.format(g.repos)],
            [t.github.mesPico, g.mesPico ? fmtMes.format(new Date(`${g.mesPico.mes}-01`)) : "-"],
          ].map(([rotulo, valor], i) => (
            <Reveal key={rotulo} delay={0.05 * i}>
              <div className="h-full rounded-2xl border border-line bg-elev p-6">
                <p className="text-3xl font-semibold tracking-tight">{valor}</p>
                <p className="mt-2 text-sm text-muted">{rotulo}</p>
              </div>
            </Reveal>
          ))}
          <Reveal className="md:col-span-4">
            <div className="rounded-2xl border border-line bg-elev p-6">
              <Heatmap dias={g.dias} rotulos={t.github} lang={lang} />
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}

function GithubEsqueleto({ t }: { t: Dicionario }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:py-32" aria-busy>
      <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">{t.github.titulo}</h2>
      <div className="mt-10 grid animate-pulse gap-4 md:grid-cols-4">
        <div className="h-72 rounded-2xl bg-elev md:col-span-2 md:row-span-2" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-elev" />
        ))}
        <div className="h-36 rounded-2xl bg-elev md:col-span-4" />
      </div>
    </section>
  );
}

function Contato({ t }: { t: Dicionario }) {
  const links = [
    { href: `https://github.com/${perfil.github}`, rotulo: "GitHub", Icone: GithubLogo },
    perfil.linkedin && { href: perfil.linkedin, rotulo: "LinkedIn", Icone: LinkedinLogo },
    perfil.email && { href: `mailto:${perfil.email}`, rotulo: "E-mail", Icone: EnvelopeSimple },
  ].filter(Boolean) as { href: string; rotulo: string; Icone: typeof GithubLogo }[];

  return (
    <section id="contato" className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-28 md:py-40">
        <Scramble texto={t.contato.titulo} className="max-w-[14ch] text-5xl font-semibold leading-[1.05] tracking-tighter md:text-7xl" />
        <Reveal>
          <p className="mt-6 max-w-[50ch] text-lg text-muted">{t.contato.texto}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-10 flex flex-wrap gap-3">
            {links.map(({ href, rotulo, Icone: Ic }) => (
              <li key={rotulo}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 items-center gap-2 rounded-full border border-line bg-elev px-5 font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  <Ic size={18} />
                  {rotulo}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <dl className="mt-16 grid gap-1 border-t border-line pt-6 text-sm">
          <dt className="text-muted">{t.contato.foco}</dt>
          <dd>{t.contato.focoValor}</dd>
        </dl>
      </div>
      <p className="pb-8 text-center font-mono text-xs text-muted">© 2026 {perfil.nome}</p>
    </section>
  );
}
