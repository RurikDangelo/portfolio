import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, GithubLogo, LinkedinLogo, EnvelopeSimple, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { dicionarios, hasLocale, perfil, stackGrupos, type Dicionario, type Locale } from "@/content/site";
import { resumoGithub } from "@/lib/github";
import { Nav } from "@/components/nav";
import { NeuralField } from "@/components/neural-field";
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
        <section id="automacoes" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
          <Scramble texto={t.automacoes.titulo} className="text-4xl font-semibold tracking-tighter md:text-5xl" />
          <p className="mb-10 mt-4 max-w-[60ch] text-lg text-muted">{t.automacoes.sub}</p>
          <Automacoes t={t.automacoes} />
        </section>
        <ProjectsPan titulo={t.projetos.titulo} aviso={t.projetos.aviso} projetos={t.projetos.lista} />
        <section id="stack" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
          <Scramble texto={t.stack.titulo} className="mb-10 text-4xl font-semibold tracking-tighter md:text-5xl" />
          <StackToggle grupos={stackGrupos} lang={lang} rotulos={t.stack} />
        </section>
        <Experiencia t={t} />
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
      {/* Vídeo de fundo: telas de sistemas em produção, já anonimizadas. Parado com movimento reduzido. */}
      <video
        className="absolute inset-0 size-full scale-105 object-cover opacity-45 motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/video/hero-poster.jpg"
        aria-hidden
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      <Image src="/video/hero-poster.jpg" alt="" fill priority className="hidden object-cover opacity-40 motion-reduce:block" />
      <NeuralField className="absolute inset-0 size-full opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,var(--bg)_25%,color-mix(in_oklch,var(--bg)_70%,transparent)_60%,var(--bg)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t.hero.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] tracking-tighter md:text-7xl">
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
    <section id="sobre" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <Scramble texto={t.sobre.titulo} className="text-4xl font-semibold leading-[1.1] tracking-tighter md:text-5xl" />
          {t.sobre.texto.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <a
              href="/cv.pdf"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {t.sobre.cv}
              <DownloadSimple size={18} />
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklch,var(--accent)_35%,transparent),transparent_70%)] blur-2xl" />
          <div className="overflow-hidden rounded-full border border-line p-2 shadow-[var(--shadow)]">
            <Image src={perfil.foto} alt={perfil.nome} width={720} height={720} className="aspect-square w-full rounded-full object-cover" />
          </div>
        </Reveal>
      </div>
      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {t.sobre.destaques.map((d, i) => (
          <Reveal key={d.rotulo} delay={i * 0.06}>
            <div className="h-full border-t border-line pt-5">
              <p className="text-4xl font-semibold tracking-tighter text-accent md:text-5xl">{d.valor}</p>
              <p className="mt-2 text-muted">{d.rotulo}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Solucoes({ t }: { t: Dicionario }) {
  const s = t.solucoes;
  return (
    <section id="solucoes" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <Scramble texto={s.titulo} className="text-4xl font-semibold tracking-tighter md:text-5xl" />
      <p className="mt-4 max-w-[60ch] text-lg text-muted">{s.sub}</p>
      <div className="mt-12 grid gap-4 md:grid-cols-6">
        {s.lista.map((item, i) => (
          <Reveal key={item.titulo} delay={(i % 3) * 0.06} className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
            <article
              className={`group flex h-full flex-col rounded-2xl border border-line p-7 transition-colors hover:border-accent ${
                i === 0
                  ? "bg-[radial-gradient(circle_at_100%_0%,color-mix(in_oklch,var(--accent)_20%,transparent),transparent_65%)] bg-elev"
                  : i === 3
                    ? "bg-[linear-gradient(135deg,color-mix(in_oklch,var(--accent)_12%,var(--bg-elev)),var(--bg-elev))]"
                    : "bg-elev"
              }`}
            >
              <span className="grid size-12 place-items-center rounded-xl bg-bg text-accent transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Icone nome={item.icone} size={24} />
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{item.titulo}</h3>
              <p className="mt-2 text-muted">{item.texto}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                {item.itens.map((x) => (
                  <li key={x} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                    {x}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-20 text-2xl font-semibold tracking-tight">{s.processoTitulo}</h3>
      <ol className="mt-8 grid gap-8 md:grid-cols-4">
        {s.processo.map((p, i) => (
          <Reveal key={p.titulo} delay={i * 0.08}>
            <li className="relative">
              <span className="block h-px w-full bg-line">
                <span className="block h-px w-1/3 bg-accent" />
              </span>
              <p className="mt-5 text-lg font-medium">{p.titulo}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.texto}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Experiencia({ t }: { t: Dicionario }) {
  return (
    <section id="experiencia" className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <Scramble texto={t.experiencia.titulo} className="mb-12 text-4xl font-semibold tracking-tighter md:text-5xl" />
      <ol className="relative space-y-4 md:ml-6 md:border-l md:border-line md:pl-10">
        {t.experiencia.itens.map((e, i) => (
          <Reveal key={`${e.empresa}-${e.cargo}`} delay={i * 0.06}>
            <li className="group relative grid gap-3 rounded-2xl border border-line bg-elev p-6 transition-colors hover:border-accent md:grid-cols-[1fr_auto] md:p-8">
              <span className="absolute -left-[3.05rem] top-9 hidden size-3 rounded-full border-2 border-bg bg-accent md:block" aria-hidden />
              <div>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{e.cargo}</h3>
                <p className="mt-1 text-muted">{e.empresa}</p>
              </div>
              <p className="font-mono text-sm text-muted md:text-right">{e.periodo}</p>
              <p className="max-w-[70ch] md:col-span-2">{e.resumo}</p>
              <ul className="flex flex-wrap gap-2 md:col-span-2">
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
            <div className="flex h-full flex-col justify-between gap-8 rounded-2xl border border-line bg-[radial-gradient(circle_at_100%_0%,color-mix(in_oklch,var(--accent)_22%,transparent),transparent_60%)] bg-elev p-8">
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
