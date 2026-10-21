// Todo texto visível do site, nos dois idiomas. Nenhum componente escreve copy própria.
// Regra de privacidade: só o NIT aparece pelo nome; os demais projetos de cliente
// são descritos pelo segmento, sem nome e sem link para o repositório.

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const hasLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export const perfil = {
  nome: "Rurik D'Angelo",
  github: "RurikDangelo",
  linkedin: "", // preenchido a partir do LinkedIn
  email: "",
  avatar: "https://avatars.githubusercontent.com/u/98221730?v=4",
};

type Projeto = {
  slug: string;
  titulo: string;
  resumo: string;
  pontos: string[];
  stack: string[];
  imagem: string;
  link?: string;
};

type Experiencia = { cargo: string; empresa: string; periodo: string; tags: string[] };

type Dicionario = {
  meta: { titulo: string; descricao: string };
  nav: { sobre: string; stack: string; experiencia: string; projetos: string; contato: string; cta: string };
  hero: { eyebrow: string; papeis: string[]; sub: string; verProjetos: string };
  sobre: { titulo: string; texto: string[]; cv: string };
  stack: { titulo: string; rapido: string; detalhe: string };
  experiencia: { titulo: string; itens: Experiencia[] };
  github: {
    titulo: string;
    sub: string;
    repos: string;
    seguidores: string;
    contribuicoes: string;
    diasAtivos: string;
    maiorSequencia: string;
    mesPico: string;
    dias: string;
    abrir: string;
    indisponivel: string;
    menos: string;
    mais: string;
  };
  projetos: { titulo: string; lista: Projeto[] };
  contato: { titulo: string; texto: string; foco: string; focoValor: string };
};

const stackGrupos = [
  {
    grupo: { pt: "IA e LLM", en: "AI and LLM" },
    itens: ["Claude API", "Agent SDK", "MCP", "RAG", "Embeddings", "Prompt engineering", "Agentes com ferramentas", "ElevenLabs"],
  },
  {
    grupo: { pt: "Machine Learning", en: "Machine Learning" },
    itens: ["Python", "scikit-learn", "PyTorch", "Pandas", "Avaliação de modelos"],
  },
  {
    grupo: { pt: "Produto e front-end", en: "Product and front-end" },
    itens: ["TypeScript", "Next.js", "React", "Tailwind CSS", "Astro", "Three.js", "GLSL", "PWA"],
  },
  {
    grupo: { pt: "Dados e back-end", en: "Data and back-end" },
    itens: ["PostgreSQL", "Supabase", "Row Level Security", "Prisma", "Node.js", "Bun", "C# .NET", "WhatsApp API"],
  },
  {
    grupo: { pt: "Infra", en: "Infra" },
    itens: ["Vercel", "Docker", "Git", "CI", "Traefik"],
  },
];
export { stackGrupos };

const pt: Dicionario = {
  meta: {
    titulo: "Rurik D'Angelo | Engenheiro de Software e IA",
    descricao: "SaaS multi-tenant, CRM no WhatsApp e agentes de IA em produção.",
  },
  nav: { sobre: "Sobre", stack: "Stack", experiencia: "Experiência", projetos: "Projetos", contato: "Contato", cta: "Fale comigo" },
  hero: {
    eyebrow: "Engenharia de software e IA",
    papeis: ["Especialista em IA", "Engenheiro de LLM", "Machine Learning", "Arquiteto de SaaS"],
    sub: "Construo SaaS verticais, CRMs no WhatsApp e agentes de IA que rodam em produção todos os dias.",
    verProjetos: "Ver projetos",
  },
  sobre: {
    titulo: "Software que aguenta o dia a dia",
    texto: [
      "Sou desenvolvedor de SaaS e especialista em IA, LLM e Machine Learning. Trabalho do banco de dados à interface, com foco em sistemas que empresas reais usam o dia inteiro.",
      "Hoje lidero a engenharia do NIT, uma plataforma multi-tenant de ERP e CRM, e fundei a Tivexy, onde construo sistemas sob medida, automação e inteligência artificial para empresas.",
    ],
    cv: "Baixar CV",
  },
  stack: { titulo: "Ferramentas do dia a dia", rapido: "Rápido", detalhe: "Detalhe" },
  experiencia: {
    titulo: "Onde trabalhei",
    itens: [
      { cargo: "Fundador e CEO", empresa: "Tivexy", periodo: "2026 - hoje", tags: ["SaaS", "IA aplicada", "Automação"] },
      { cargo: "Engenheiro de Software", empresa: "NIT Technology", periodo: "2026 - hoje", tags: ["ERP", "CRM", "Multi-tenant", "Supabase"] },
    ],
  },
  github: {
    titulo: "O trabalho em público",
    sub: "Atividade pública no GitHub nos últimos 365 dias.",
    repos: "Repositórios públicos",
    seguidores: "Seguidores",
    contribuicoes: "Contribuições no ano",
    diasAtivos: "Dias ativos",
    maiorSequencia: "Maior sequência",
    mesPico: "Mês de pico",
    dias: "dias",
    abrir: "Abrir GitHub",
    indisponivel: "Os dados do GitHub não carregaram agora. Tente de novo em instantes.",
    menos: "Menos",
    mais: "Mais",
  },
  projetos: {
    titulo: "Projetos selecionados",
    lista: [
      {
        slug: "nit",
        titulo: "NIT",
        resumo: "ERP de varejo e CRM conversacional no WhatsApp, multi-tenant e white label, num só deploy.",
        pontos: [
          "Mais de 150 rotas entre ERP, CRM e painel da plataforma",
          "Isolamento por empresa e por loja com RLS no Postgres",
          "Policy reescrita: de 149 ms para 6,9 ms numa página de mil clientes",
          "Assistente de IA que consulta os dados do negócio em modo leitura",
        ],
        stack: ["Next.js 16", "React 19", "Supabase", "PostgreSQL", "Tailwind v4"],
        imagem: "https://picsum.photos/seed/nit-erp-crm-dashboard/1600/1000",
        link: "https://www.mundonit.com.br",
      },
      {
        slug: "marmoraria",
        titulo: "ERP vertical para marmoraria",
        resumo: "Gestão construída em torno da ordem de serviço, do orçamento à instalação, em produção.",
        pontos: ["12 etapas, da medição à expedição", "Estoque de chapas e financeiro no mesmo fluxo"],
        stack: ["Next.js 16", "Supabase", "TypeScript"],
        imagem: "https://picsum.photos/seed/marble-workshop-stone/1600/1000",
      },
      {
        slug: "cafeteria",
        titulo: "Sistema operacional de cafeteria",
        resumo: "PDV, ficha técnica e produção para quem fabrica e vende no mesmo balcão.",
        pontos: ["A venda baixa a farinha usada", "A compra atualiza a margem de cada item"],
        stack: ["Next.js", "Prisma", "PostgreSQL", "Docker"],
        imagem: "https://picsum.photos/seed/coffee-bar-counter/1600/1000",
      },
      {
        slug: "vidracaria",
        titulo: "Gestão de vidraçaria offline",
        resumo: "PWA instalável que acompanha o serviço do orçamento à instalação, inclusive em obra sem sinal.",
        pontos: ["Nenhuma medida redigitada entre etapas", "Funciona no escritório e no celular do instalador"],
        stack: ["React", "Vite", "Supabase", "PWA"],
        imagem: "https://picsum.photos/seed/glass-facade-reflection/1600/1000",
      },
      {
        slug: "jarvis",
        titulo: "Assistente de voz com Claude",
        resumo: "Interface holográfica no navegador com o Claude Code como cérebro, acordando com a voz.",
        pontos: ["Shaders GLSL próprios", "Ferramentas reais por MCP"],
        stack: ["React", "Three.js", "GLSL", "Claude Agent SDK"],
        imagem: "https://picsum.photos/seed/hologram-interface-dark/1600/1000",
      },
    ],
  },
  contato: {
    titulo: "Vamos construir algo real",
    texto: "Aberto a projetos de SaaS, CRM e IA aplicada.",
    foco: "Foco",
    focoValor: "IA, LLM, Machine Learning e SaaS multi-tenant",
  },
};

const en: Dicionario = {
  meta: {
    titulo: "Rurik D'Angelo | Software and AI Engineer",
    descricao: "Multi-tenant SaaS, WhatsApp CRM and AI agents in production.",
  },
  nav: { sobre: "About", stack: "Stack", experiencia: "Experience", projetos: "Projects", contato: "Contact", cta: "Get in touch" },
  hero: {
    eyebrow: "Software and AI engineering",
    papeis: ["AI Specialist", "LLM Engineer", "Machine Learning", "SaaS Architect"],
    sub: "I build vertical SaaS, WhatsApp CRMs and AI agents that run in production every day.",
    verProjetos: "View projects",
  },
  sobre: {
    titulo: "Software that survives the daily grind",
    texto: [
      "I am a SaaS developer and a specialist in AI, LLMs and Machine Learning. I work from the database to the interface, focused on systems real businesses use all day long.",
      "Today I lead engineering at NIT, a multi-tenant ERP and CRM platform, and I founded Tivexy, where I build custom systems, automation and artificial intelligence for companies.",
    ],
    cv: "Download CV",
  },
  stack: { titulo: "Everyday tools", rapido: "Quick", detalhe: "Detail" },
  experiencia: {
    titulo: "Where I have worked",
    itens: [
      { cargo: "Founder and CEO", empresa: "Tivexy", periodo: "2026 - present", tags: ["SaaS", "Applied AI", "Automation"] },
      { cargo: "Software Engineer", empresa: "NIT Technology", periodo: "2026 - present", tags: ["ERP", "CRM", "Multi-tenant", "Supabase"] },
    ],
  },
  github: {
    titulo: "Work in public",
    sub: "Public GitHub activity over the last 365 days.",
    repos: "Public repositories",
    seguidores: "Followers",
    contribuicoes: "Contributions this year",
    diasAtivos: "Active days",
    maiorSequencia: "Longest streak",
    mesPico: "Peak month",
    dias: "days",
    abrir: "Open GitHub",
    indisponivel: "GitHub data did not load right now. Try again in a moment.",
    menos: "Less",
    mais: "More",
  },
  projetos: {
    titulo: "Selected projects",
    lista: [
      {
        ...pt.projetos.lista[0],
        resumo: "Retail ERP and WhatsApp-first conversational CRM, multi-tenant and white label, in a single deploy.",
        pontos: [
          "Over 150 routes across ERP, CRM and the platform panel",
          "Per-company and per-store isolation with Postgres RLS",
          "Rewritten policy: from 149 ms to 6.9 ms on a page of a thousand customers",
          "AI assistant that queries business data in read-only mode",
        ],
      },
      {
        ...pt.projetos.lista[1],
        titulo: "Vertical ERP for a stone workshop",
        resumo: "Management built around the work order, from quote to installation, running in production.",
        pontos: ["12 stages, from measuring to shipping", "Slab inventory and finance in the same flow"],
      },
      {
        ...pt.projetos.lista[2],
        titulo: "Coffee shop operating system",
        resumo: "POS, recipes and production for a shop that makes and sells at the same counter.",
        pontos: ["Each sale deducts the flour it used", "Each purchase updates every item's margin"],
      },
      {
        ...pt.projetos.lista[3],
        titulo: "Offline-first glazing management",
        resumo: "Installable PWA that follows the job from quote to installation, even on a site with no signal.",
        pontos: ["No measurement is typed twice", "Works at the office and on the installer's phone"],
      },
      {
        ...pt.projetos.lista[4],
        titulo: "Voice assistant powered by Claude",
        resumo: "Holographic browser interface with Claude Code as the brain, woken up by voice.",
        pontos: ["Custom GLSL shaders", "Real tools through MCP"],
      },
    ],
  },
  contato: {
    titulo: "Let's build something real",
    texto: "Open to SaaS, CRM and applied AI projects.",
    foco: "Focus",
    focoValor: "AI, LLM, Machine Learning and multi-tenant SaaS",
  },
};

export const dicionarios: Record<Locale, Dicionario> = { pt, en };
export type { Dicionario, Projeto };
