// Todo texto visível do site, nos dois idiomas. Nenhum componente escreve copy própria.
// Regra de privacidade: nenhum nome de produto ou cliente. O único print real é o do sistema
// de laudos, com nomes, valores e mapa borrados; as demais imagens são fotos ilustrativas.

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const hasLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export const perfil = {
  nome: "Rurik D'Angelo",
  github: "RurikDangelo",
  linkedin: "https://www.linkedin.com/in/rurik-d-angelo-626492221",
  email: "",
  foto: "/perfil.webp",
};

// Fotos do Unsplash (licença livre), servidas direto do CDN deles.
const foto = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=70`;

type Projeto = {
  slug: string;
  titulo: string;
  resumo: string;
  pontos: string[];
  stack: string[];
  imagem?: string;
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
  sobre: { titulo: string; texto: string[]; cv: string; destaques: { valor: string; rotulo: string }[] };
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

const imagens = {
  plataforma: foto("1551288049-bebda4e38f71"),
  laudos: "/projetos/laudos.webp",
  verticais: foto("1720036236694-d0a231c52563"),
  voz: foto("1617994452722-4145e196248b"),
};

const pt: Dicionario = {
  meta: {
    titulo: "Rurik D'Angelo | IA e SaaS",
    descricao: "Plataformas SaaS e IA aplicada que rodam em produção.",
  },
  nav: { sobre: "Sobre", solucoes: "O que construo", projetos: "Projetos", trajetoria: "Trajetória", cta: "Fale comigo" },
  hero: {
    papeis: ["Especialista em IA", "Engenheiro de LLM", "Machine Learning", "Arquiteto de SaaS"],
    sub: "Construo plataformas SaaS e soluções com IA que rodam em produção.",
    verProjetos: "Ver projetos",
    verSolucoes: "O que construo",
  },
  sobre: {
    titulo: "Tecnologia que resolve o negócio",
    texto: [
      "Meu interesse por programação começou aos 15 anos, escrevendo meus primeiros programas em Java. A curiosidade de entender como o software funciona por dentro virou profissão.",
      "Hoje sou Head de Tecnologia, formado em Ciência da Computação e especialista em IA, LLM e Machine Learning. Já desenvolvi plataformas SaaS completas do zero, da arquitetura e do banco de dados até a interface e a venda para os clientes.",
    ],
    cv: "Baixar CV",
    destaques: [
      { valor: "15 anos", rotulo: "idade do meu primeiro código, em Java" },
      { valor: "150+", rotulo: "rotas numa única plataforma multi-tenant" },
      { valor: "6,9 ms", rotulo: "consulta que levava 149 ms, depois de reescrita" },
    ],
  },
  solucoes: {
    titulo: "O que eu construo",
    sub: "Software sob medida para operações reais, do banco de dados à interface.",
    lista: [
      { icone: "cart", titulo: "Plataformas SaaS", texto: "ERP e CRM multi-tenant, com vendas, estoque, financeiro, fiscal e atendimento integrados." },
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
        titulo: "SaaS completos, do zero à venda",
        onde: "Software B2B",
        texto: "Desenvolvi do zero plataformas SaaS completas de ERP e CRM, da arquitetura à interface, e vendi para empresas que usam o sistema todos os dias. Hoje lidero a tecnologia como Head.",
        tags: ["Arquitetura", "Multi-tenant", "IA aplicada", "Vendas", "Liderança"],
      },
      {
        titulo: "Projetos legados",
        onde: "Poliedro Educação",
        texto: "Trabalhei com projetos legados, mantendo e evoluindo sistemas que já estavam em uso.",
        tags: ["Sistemas legados", "Manutenção", "Evolução"],
      },
      {
        titulo: "Suporte em TI",
        onde: "Back4App",
        texto: "Atuei no suporte em TI de uma plataforma de backend como serviço.",
        tags: ["Suporte", "Infraestrutura"],
      },
      {
        titulo: "Primeiro código",
        onde: "Aos 15 anos, em Java",
        texto: "Foi onde tudo começou: os primeiros programas em Java e a vontade de entender software por dentro.",
        tags: ["Java", "Lógica de programação"],
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
    aviso: "A tela de laudos é real, com dados ocultados. As demais imagens são ilustrativas.",
    lista: [
      {
        slug: "plataforma",
        titulo: "Plataforma ERP e CRM white label",
        resumo: "Varejo, assistência técnica e locação numa plataforma multi-tenant, com CRM no WhatsApp e IA.",
        pontos: ["Mais de 150 rotas numa única plataforma", "CRM no WhatsApp com IA"],
        stack: ["Next.js", "React", "PostgreSQL", "Supabase", "Tailwind"],
        imagem: imagens.plataforma,
      },
      {
        slug: "laudos",
        titulo: "Sistema de laudos técnicos",
        resumo: "Montagem, acompanhamento e aprovação de laudos, com mapa e indicadores.",
        pontos: ["Indicadores de produção em tempo real", "Mapa de atuação"],
        stack: ["Next.js", "PostgreSQL", "Mapas", "PDF"],
        imagem: imagens.laudos,
      },
      {
        slug: "verticais",
        titulo: "Sistemas verticais sob medida",
        resumo: "Gestão construída em torno do processo de cada negócio, do orçamento à entrega.",
        pontos: ["Produção por ordem de serviço", "App offline para equipes em campo"],
        stack: ["Next.js", "React", "Prisma", "PWA"],
        imagem: imagens.verticais,
      },
      {
        slug: "voz",
        titulo: "Assistente de voz com IA",
        resumo: "Interface holográfica no navegador que acorda com a voz e executa tarefas reais.",
        pontos: ["Shaders GLSL próprios", "Ferramentas conectadas por MCP"],
        stack: ["React", "Three.js", "GLSL", "Claude Agent SDK"],
        imagem: imagens.voz,
      },
    ],
  },
  contato: {
    titulo: "Vamos construir algo real",
    texto: "Aberto a conversar sobre SaaS e IA aplicada.",
    foco: "Foco",
    focoValor: "IA, LLM, Machine Learning e SaaS",
  },
};

const en: Dicionario = {
  meta: {
    titulo: "Rurik D'Angelo | AI and SaaS",
    descricao: "SaaS platforms and applied AI running in production.",
  },
  nav: { sobre: "About", solucoes: "What I build", projetos: "Projects", trajetoria: "Journey", cta: "Get in touch" },
  hero: {
    papeis: ["AI Specialist", "LLM Engineer", "Machine Learning", "SaaS Architect"],
    sub: "I build SaaS platforms and AI solutions that run in production.",
    verProjetos: "View projects",
    verSolucoes: "What I build",
  },
  sobre: {
    titulo: "Technology that solves the business",
    texto: [
      "My interest in programming started at 15, writing my first programs in Java. The curiosity to understand how software works inside became a career.",
      "Today I am a Head of Technology with a degree in Computer Science and a specialist in AI, LLMs and Machine Learning. I have built complete SaaS platforms from scratch, from architecture and database to the interface and selling them to customers.",
    ],
    cv: "Download CV",
    destaques: [
      { valor: "Age 15", rotulo: "when I wrote my first code, in Java" },
      { valor: "150+", rotulo: "routes in a single multi-tenant platform" },
      { valor: "6.9 ms", rotulo: "query that took 149 ms, after a rewrite" },
    ],
  },
  solucoes: {
    titulo: "What I build",
    sub: "Custom software for real operations, from the database to the interface.",
    lista: [
      { icone: "cart", titulo: "SaaS platforms", texto: "Multi-tenant ERP and CRM with sales, inventory, finance, tax and customer service working together." },
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
        titulo: "Complete SaaS, from zero to sale",
        onde: "B2B software",
        texto: "I built complete ERP and CRM SaaS platforms from scratch, from architecture to interface, and sold them to companies that use them every day. Today I lead technology as Head.",
        tags: ["Architecture", "Multi-tenant", "Applied AI", "Sales", "Leadership"],
      },
      {
        titulo: "Legacy projects",
        onde: "Poliedro Educação",
        texto: "I worked on legacy projects, maintaining and evolving systems that were already in use.",
        tags: ["Legacy systems", "Maintenance", "Evolution"],
      },
      {
        titulo: "IT support",
        onde: "Back4App",
        texto: "I worked in IT support for a backend-as-a-service platform.",
        tags: ["Support", "Infrastructure"],
      },
      {
        titulo: "First code",
        onde: "At 15, in Java",
        texto: "Where it all started: my first Java programs and the urge to understand software from the inside.",
        tags: ["Java", "Programming logic"],
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
    aviso: "The reports screen is real, with data hidden. The other images are illustrative.",
    lista: [
      {
        ...pt.projetos.lista[0],
        titulo: "White label ERP and CRM platform",
        resumo: "Retail, repair services and rentals on a multi-tenant platform, with a WhatsApp CRM and AI.",
        pontos: ["Over 150 routes in a single platform", "WhatsApp CRM with AI"],
      },
      {
        ...pt.projetos.lista[1],
        titulo: "Technical reports system",
        resumo: "Building, tracking and approving reports, with a map and KPIs.",
        pontos: ["Real-time production KPIs", "Coverage map"],
        stack: ["Next.js", "PostgreSQL", "Maps", "PDF"],
      },
      {
        ...pt.projetos.lista[2],
        titulo: "Custom vertical systems",
        resumo: "Management built around each business's process, from quote to delivery.",
        pontos: ["Work-order driven production", "Offline app for field teams"],
      },
      {
        ...pt.projetos.lista[3],
        titulo: "AI voice assistant",
        resumo: "Holographic browser interface that wakes up by voice and runs real tasks.",
        pontos: ["Custom GLSL shaders", "Tools connected through MCP"],
      },
    ],
  },
  contato: {
    titulo: "Let's build something real",
    texto: "Open to talk about SaaS and applied AI.",
    foco: "Focus",
    focoValor: "AI, LLM, Machine Learning and SaaS",
  },
};

export const dicionarios: Record<Locale, Dicionario> = { pt, en };
export type { Dicionario, Projeto, Fluxo, Solucao };
