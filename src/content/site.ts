// Todo texto visível do site, nos dois idiomas. Nenhum componente escreve copy própria.
// Regra de privacidade: nenhum nome de produto ou cliente e nenhum print de sistema real;
// os projetos são mostrados por demos interativas com dados fictícios (src/content/demos.ts).

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const hasLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export const perfil = {
  nome: "Rurik D'Angelo",
  github: "RurikDangelo",
  linkedin: "https://www.linkedin.com/in/rurik-d-angelo-626492221",
  email: "",
  foto: "/sobre-v4.webp",
};

type Projeto = {
  slug: string;
  titulo: string;
  resumo: string;
  pontos: string[];
  stack: string[];
  demo: "gestao" | "operacional" | "sobMedida";
};

type Etapa = { titulo: string; onde: string; texto: string; tags: string[] };

// Ícones resolvidos no componente pelo nome, para o conteúdo continuar serializável.
export type Icone =
  | "chat" | "brain" | "funnel" | "user" | "handshake" | "file" | "clock" | "pen" | "reply"
  | "check" | "heart" | "pix" | "repeat" | "camera" | "scan" | "doc" | "seal" | "send"
  | "cart" | "chart" | "plug" | "robot" | "ruler" | "gear";

type Passo = { icone: Icone; titulo: string; texto: string };
type Fluxo = { id: string; nome: string; passos: Passo[] };
type Solucao = { icone: Icone; titulo: string; texto: string };

type Dicionario = {
  meta: { titulo: string; descricao: string };
  nav: { sobre: string; solucoes: string; projetos: string; trajetoria: string; cta: string };
  hero: { papeis: string[]; sub: string; verProjetos: string; verSolucoes: string };
  sobre: { titulo: string; texto: string[]; fotoAlt: string };
  solucoes: { titulo: string; sub: string; lista: Solucao[] };
  automacoes: { titulo: string; sub: string; fluxos: Fluxo[] };
  stack: { titulo: string; rapido: string; detalhe: string };
  trajetoria: { titulo: string; itens: Etapa[] };
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
  projetos: { titulo: string; aviso: string; lista: Projeto[] };
  contato: { titulo: string; texto: string; foco: string; focoValor: string };
};

const stackGrupos = [
  {
    grupo: { pt: "IA e LLM", en: "AI and LLM" },
    itens: ["Claude API", "Agent SDK", "MCP", "RAG", "Embeddings", "Prompt engineering", "Agentes com ferramentas", "Voz (TTS)"],
  },
  {
    grupo: { pt: "Machine Learning", en: "Machine Learning" },
    itens: ["Python", "scikit-learn", "PyTorch", "Pandas", "Avaliação de modelos"],
  },
  {
    grupo: { pt: "Produto e front-end", en: "Product and front-end" },
    itens: ["TypeScript", "Next.js", "React", "Blazor", "Radzen", "Tailwind CSS", "Astro", "Three.js", "GLSL", "PWA"],
  },
  {
    grupo: { pt: "Dados e back-end", en: "Data and back-end" },
    itens: ["Java", "C#", ".NET", "ASP.NET", "REST APIs", "PostgreSQL", "Supabase", "Row Level Security", "Prisma", "Node.js", "Bun"],
  },
  {
    grupo: { pt: "Infra", en: "Infra" },
    itens: ["Microsoft Azure", "Vercel", "Docker", "Git", "CI", "Traefik"],
  },
];
export { stackGrupos };

const pt: Dicionario = {
  meta: {
    titulo: "Rurik D'Angelo | IA e sistemas sob medida",
    descricao: "Sistemas sob medida para qualquer nicho, com IA aplicada.",
  },
  nav: { sobre: "Sobre", solucoes: "O que construo", projetos: "Projetos", trajetoria: "Trajetória", cta: "Fale comigo" },
  hero: {
    papeis: ["Especialista em IA", "Engenheiro de LLM", "Machine Learning", "Arquiteto de SaaS"],
    sub: "Desenvolvo sistemas sob medida para qualquer nicho, com IA aplicada e foco em quem usa no dia a dia.",
    verProjetos: "Ver projetos",
    verSolucoes: "O que construo",
  },
  sobre: {
    titulo: "Tudo começou com jogos",
    texto: [
      "Aos 15 anos, eu abria o Eclipse e usava Java para decompilar os jogos da época. Queria entender como eles funcionavam por dentro e mudar uma coisa ou outra só para ver o que acontecia. Foi ali que a curiosidade virou vontade de construir.",
      "Desde então passei pelo suporte em TI, por sistemas legados e por plataformas SaaS que empresas usam o dia inteiro. Hoje sou Head de Tecnologia, formado em Ciência da Computação e especialista em IA, LLM e Machine Learning.",
      "Desenvolvo sistemas sob medida para qualquer nicho: entendo como o negócio funciona, desenho a solução e acompanho até ela fazer parte da rotina de quem usa.",
    ],
    fotoAlt: "Rurik programando com fone de ouvido, de costas diante do notebook e de perfil",
  },
  solucoes: {
    titulo: "O que eu construo",
    sub: "Sistemas sob medida para qualquer nicho, do banco de dados à interface.",
    lista: [
      { icone: "gear", titulo: "Sistemas sob medida", texto: "Gestão, CRM, financeiro e operação desenhados em torno do processo real de cada negócio, seja qual for o segmento." },
      { icone: "robot", titulo: "IA aplicada", texto: "Agentes que leem documentos, respondem clientes e executam tarefas, com revisão humana onde importa." },
      { icone: "plug", titulo: "Dados e integrações", texto: "APIs, painéis de indicadores e migração de dados de planilhas e sistemas antigos." },
    ],
  },
  automacoes: {
    titulo: "Exemplos de automação com IA",
    sub: "Dois fluxos que já construí. As etapas acendem em sequência.",
    fluxos: [
      {
        id: "atendimento",
        nome: "Atendimento no WhatsApp",
        passos: [
          { icone: "chat", titulo: "Mensagem chega", texto: "O cliente escreve, a qualquer hora." },
          { icone: "brain", titulo: "IA entende o pedido", texto: "Orçamento, dúvida ou suporte." },
          { icone: "user", titulo: "Encaminha", texto: "Card no funil para a pessoa certa." },
          { icone: "handshake", titulo: "Equipe assume", texto: "Com o resumo da conversa pronto." },
        ],
      },
      {
        id: "documentos",
        nome: "Leitura de documentos",
        passos: [
          { icone: "camera", titulo: "Arquivos chegam", texto: "Fotos, PDFs e planilhas." },
          { icone: "scan", titulo: "IA extrai os dados", texto: "E aponta o que está faltando." },
          { icone: "doc", titulo: "Registra no sistema", texto: "Sem ninguém redigitar nada." },
          { icone: "seal", titulo: "Equipe revisa", texto: "Confere e aprova em um clique." },
        ],
      },
    ],
  },
  stack: { titulo: "Ferramentas do dia a dia", rapido: "Rápido", detalhe: "Detalhe" },
  trajetoria: {
    titulo: "Trajetória",
    itens: [
      {
        titulo: "Plataformas SaaS em produção",
        onde: "Software B2B",
        texto: "Criei e evoluí plataformas SaaS de gestão e CRM usadas todos os dias por empresas de segmentos diferentes. Cuido da arquitetura, do produto e da conversa com os clientes, e hoje lidero a área de tecnologia.",
        tags: ["Arquitetura", "Produto", "IA aplicada", "Liderança"],
      },
      {
        titulo: "Projetos legados",
        onde: "Poliedro Educação",
        texto: "Trabalhei com projetos legados: entender código escrito por outras pessoas, manter o que já funcionava e evoluir sem parar a operação de quem dependia daquilo.",
        tags: ["Sistemas legados", "Manutenção", "Evolução"],
      },
      {
        titulo: "Suporte em TI",
        onde: "Back4App",
        texto: "No suporte em TI, o dia a dia era resolver o problema de quem estava do outro lado. Foi uma escola sobre ouvir o usuário antes de propor a solução.",
        tags: ["Suporte", "Infraestrutura"],
      },
      {
        titulo: "Jogos, Eclipse e Java",
        onde: "Aos 15 anos",
        texto: "A paixão por jogos me levou ao código. Com o Eclipse e o Java, eu decompilava os jogos da época para entender a lógica por trás deles.",
        tags: ["Java", "Eclipse", "Engenharia reversa"],
      },
    ],
  },
  github: {
    titulo: "O trabalho em público",
    sub: "Atividade no GitHub nos últimos 365 dias, incluindo repositórios privados.",
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
    aviso: "Interaja com as demonstrações: os sistemas reais guardam dados de clientes, então aqui os dados são fictícios.",
    lista: [
      {
        slug: "plataforma",
        titulo: "Plataforma de gestão e CRM",
        resumo: "Vendas, estoque, financeiro e atendimento no WhatsApp numa só plataforma, atendendo várias empresas ao mesmo tempo.",
        pontos: ["Multiempresa e white label", "CRM com IA"],
        stack: ["Next.js", "React", "PostgreSQL", "Supabase"],
        demo: "gestao",
      },
      {
        slug: "painel",
        titulo: "Painel operacional",
        resumo: "Acompanhamento de processos técnicos, com indicadores, prazos e mapa de atuação.",
        pontos: ["Indicadores em tempo real", "Alertas de prazo"],
        stack: ["Next.js", "PostgreSQL", "Mapas"],
        demo: "operacional",
      },
      {
        slug: "sob-medida",
        titulo: "Sistemas sob medida",
        resumo: "Gestão construída em torno do processo de cada negócio, em qualquer nicho.",
        pontos: ["Do orçamento à entrega", "App offline para equipes em campo"],
        stack: ["Next.js", "React", "Prisma", "PWA"],
        demo: "sobMedida",
      },
    ],
  },
  contato: {
    titulo: "Vamos construir algo real",
    texto: "Tem um processo que merece virar sistema? Vamos conversar.",
    foco: "Foco",
    focoValor: "Sistemas sob medida, IA, LLM e Machine Learning",
  },
};

const en: Dicionario = {
  meta: {
    titulo: "Rurik D'Angelo | AI and custom systems",
    descricao: "Custom systems for any niche, with applied AI.",
  },
  nav: { sobre: "About", solucoes: "What I build", projetos: "Projects", trajetoria: "Journey", cta: "Get in touch" },
  hero: {
    papeis: ["AI Specialist", "LLM Engineer", "Machine Learning", "SaaS Architect"],
    sub: "I build custom systems for any niche, with applied AI and a focus on the people who use them every day.",
    verProjetos: "View projects",
    verSolucoes: "What I build",
  },
  sobre: {
    titulo: "It all started with games",
    texto: [
      "At 15, I would open Eclipse and use Java to decompile the games of the time. I wanted to understand how they worked inside and change one thing or another just to see what happened. That is where curiosity turned into the urge to build.",
      "Since then I have worked in IT support, on legacy systems and on SaaS platforms that companies use all day. Today I am a Head of Technology with a degree in Computer Science and a specialist in AI, LLMs and Machine Learning.",
      "I build custom systems for any niche: I learn how the business works, design the solution and stay with it until it is part of the users' routine.",
    ],
    fotoAlt: "Rurik coding with a headset, seen from behind at the laptop and in profile",
  },
  solucoes: {
    titulo: "What I build",
    sub: "Custom systems for any niche, from the database to the interface.",
    lista: [
      { icone: "gear", titulo: "Custom systems", texto: "Management, CRM, finance and operations designed around each business's real process, whatever the industry." },
      { icone: "robot", titulo: "Applied AI", texto: "Agents that read documents, answer customers and run tasks, with human review where it matters." },
      { icone: "plug", titulo: "Data and integrations", texto: "APIs, KPI dashboards and data migration from spreadsheets and legacy systems." },
    ],
  },
  automacoes: {
    titulo: "AI automation examples",
    sub: "Two flows I have built. The steps light up in sequence.",
    fluxos: [
      {
        id: "atendimento",
        nome: "WhatsApp service",
        passos: [
          { icone: "chat", titulo: "Message arrives", texto: "The customer writes, at any hour." },
          { icone: "brain", titulo: "AI reads the request", texto: "Quote, question or support." },
          { icone: "user", titulo: "Routes it", texto: "A pipeline card for the right person." },
          { icone: "handshake", titulo: "Team takes over", texto: "With the conversation summary ready." },
        ],
      },
      {
        id: "documentos",
        nome: "Document reading",
        passos: [
          { icone: "camera", titulo: "Files arrive", texto: "Photos, PDFs and spreadsheets." },
          { icone: "scan", titulo: "AI extracts the data", texto: "And flags what is missing." },
          { icone: "doc", titulo: "Saves to the system", texto: "Nobody types anything twice." },
          { icone: "seal", titulo: "Team reviews", texto: "Checks and approves in one click." },
        ],
      },
    ],
  },
  stack: { titulo: "Everyday tools", rapido: "Quick", detalhe: "Detail" },
  trajetoria: {
    titulo: "Journey",
    itens: [
      {
        titulo: "SaaS platforms in production",
        onde: "B2B software",
        texto: "I created and evolved management and CRM SaaS platforms used every day by companies in different industries. I own the architecture, the product and the conversation with customers, and today I lead the technology area.",
        tags: ["Architecture", "Product", "Applied AI", "Leadership"],
      },
      {
        titulo: "Legacy projects",
        onde: "Poliedro Educação",
        texto: "I worked on legacy projects: understanding code written by other people, keeping what already worked and evolving it without stopping the operation that depended on it.",
        tags: ["Legacy systems", "Maintenance", "Evolution"],
      },
      {
        titulo: "IT support",
        onde: "Back4App",
        texto: "In IT support, the daily job was solving the problem of the person on the other side. It taught me to listen to the user before proposing a solution.",
        tags: ["Support", "Infrastructure"],
      },
      {
        titulo: "Games, Eclipse and Java",
        onde: "At 15",
        texto: "My passion for games led me to code. With Eclipse and Java, I decompiled the games of the time to understand the logic behind them.",
        tags: ["Java", "Eclipse", "Reverse engineering"],
      },
    ],
  },
  github: {
    titulo: "Work in public",
    sub: "GitHub activity over the last 365 days, including private repositories.",
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
    aviso: "Play with the demos: the real systems hold customer data, so the data here is fictitious.",
    lista: [
      {
        ...pt.projetos.lista[0],
        titulo: "Management and CRM platform",
        resumo: "Sales, inventory, finance and WhatsApp service in a single platform, serving several companies at once.",
        pontos: ["Multi-company and white label", "AI-powered CRM"],
      },
      {
        ...pt.projetos.lista[1],
        titulo: "Operations dashboard",
        resumo: "Tracking of technical processes, with KPIs, deadlines and a coverage map.",
        pontos: ["Real-time KPIs", "Deadline alerts"],
        stack: ["Next.js", "PostgreSQL", "Maps"],
      },
      {
        ...pt.projetos.lista[2],
        titulo: "Custom systems",
        resumo: "Management built around each business's process, in any niche.",
        pontos: ["From quote to delivery", "Offline app for field teams"],
      },
    ],
  },
  contato: {
    titulo: "Let's build something real",
    texto: "Got a process that deserves to become a system? Let's talk.",
    foco: "Focus",
    focoValor: "Custom systems, AI, LLM and Machine Learning",
  },
};

export const dicionarios: Record<Locale, Dicionario> = { pt, en };
export type { Dicionario, Projeto, Fluxo, Solucao };
