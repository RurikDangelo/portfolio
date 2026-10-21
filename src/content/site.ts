// Todo texto visível do site, nos dois idiomas. Nenhum componente escreve copy própria.
// Regra de privacidade: nenhum nome de empresa, produto ou cliente. Projetos são descritos
// pelo que fazem, e os prints em /public/projetos têm nomes, valores e mapas borrados.

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

type Projeto = {
  slug: string;
  titulo: string;
  resumo: string;
  pontos: string[];
  stack: string[];
  imagem?: string;
};

type Experiencia = { cargo: string; empresa: string; periodo: string; resumo: string; tags: string[] };

// Ícones resolvidos no componente pelo nome, para o conteúdo continuar serializável.
export type Icone =
  | "chat" | "brain" | "funnel" | "user" | "handshake" | "file" | "clock" | "pen" | "reply"
  | "check" | "heart" | "pix" | "repeat" | "camera" | "scan" | "doc" | "seal" | "send"
  | "cart" | "chart" | "plug" | "robot" | "ruler" | "gear";

type Passo = { icone: Icone; titulo: string; texto: string };
type Fluxo = { id: string; nome: string; problema: string; resultado: string; passos: Passo[] };
type Solucao = { icone: Icone; titulo: string; texto: string; itens: string[] };

type Dicionario = {
  meta: { titulo: string; descricao: string };
  nav: { sobre: string; solucoes: string; automacoes: string; projetos: string; experiencia: string; cta: string };
  hero: { eyebrow: string; papeis: string[]; sub: string; verProjetos: string; verSolucoes: string };
  sobre: { titulo: string; texto: string[]; cv: string; destaques: { valor: string; rotulo: string }[] };
  solucoes: { titulo: string; sub: string; lista: Solucao[]; processoTitulo: string; processo: { titulo: string; texto: string }[] };
  automacoes: { titulo: string; sub: string; problema: string; resultado: string; fluxos: Fluxo[] };
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
    itens: ["C#", ".NET", "ASP.NET", "REST APIs", "PostgreSQL", "Supabase", "Row Level Security", "Prisma", "Node.js", "Bun", "WhatsApp API"],
  },
  {
    grupo: { pt: "Infra", en: "Infra" },
    itens: ["Microsoft Azure", "Vercel", "Docker", "Git", "CI", "Traefik"],
  },
];
export { stackGrupos };

const pt: Dicionario = {
  meta: {
    titulo: "Rurik D'Angelo | Head de Tecnologia, IA e SaaS",
    descricao: "Sistemas de gestão, CRM com automações de IA e projetos técnicos para engenheiros.",
  },
  nav: { sobre: "Sobre", solucoes: "Soluções", automacoes: "Automações", projetos: "Projetos", experiencia: "Experiência", cta: "Fale comigo" },
  hero: {
    eyebrow: "Head de Tecnologia",
    papeis: ["Especialista em IA", "Engenheiro de LLM", "Machine Learning", "Arquiteto de SaaS"],
    sub: "Construo sistemas de gestão, CRMs com automação por IA e projetos técnicos para engenheiros.",
    verProjetos: "Ver projetos",
    verSolucoes: "Soluções",
  },
  sobre: {
    titulo: "Tecnologia que resolve o negócio",
    texto: [
      "Sou Head de Tecnologia, formado em Ciência da Computação e especialista em IA, LLM e Machine Learning. Cuido da arquitetura, do time e da entrega de plataformas que empresas usam o dia inteiro: ERP, CRM, financeiro, fiscal e atendimento.",
      "Também desenvolvo projetos técnicos para engenheiros, como sistemas de laudos e avaliações, onde a precisão do dado vale tanto quanto a velocidade. Trabalho do banco de dados à interface, em C# .NET e no ecossistema TypeScript.",
      "Meu foco é transformar processo manual em sistema: menos planilha, menos retrabalho e decisões com o número certo na tela.",
    ],
    cv: "Baixar CV",
    destaques: [
      { valor: "150+", rotulo: "rotas numa única plataforma multi-tenant" },
      { valor: "6,9 ms", rotulo: "consulta que levava 149 ms, depois de reescrita" },
      { valor: "24 h", rotulo: "atendimento com IA no WhatsApp, sem fila" },
    ],
  },
  solucoes: {
    titulo: "Soluções para empresas",
    sub: "Software sob medida para o problema que trava a operação, não um pacote genérico com módulos que ninguém usa.",
    lista: [
      {
        icone: "chat",
        titulo: "CRM conversacional no WhatsApp",
        texto: "Todas as conversas da empresa num só lugar, com funil, responsáveis e histórico de cada cliente.",
        itens: ["Vários números e atendentes", "Funil de vendas em quadro", "IA que responde e qualifica"],
      },
      {
        icone: "cart",
        titulo: "ERP sob medida",
        texto: "Vendas, estoque, compras, financeiro e fiscal conversando entre si, sem redigitar nada.",
        itens: ["PDV e ordem de serviço", "Emissão de nota fiscal", "Multiempresa e multiloja"],
      },
      {
        icone: "robot",
        titulo: "Automação de processos com IA",
        texto: "Agentes que leem documentos, classificam pedidos, respondem clientes e executam tarefas nos seus sistemas.",
        itens: ["Agentes com ferramentas reais", "Leitura de PDFs e fotos", "Revisão humana onde importa"],
      },
      {
        icone: "ruler",
        titulo: "Projetos técnicos para engenheiros",
        texto: "Sistemas para laudos, avaliações e relatórios técnicos, do levantamento de campo ao PDF aprovado.",
        itens: ["Montagem de laudos", "Amostras e zoneamento", "Mapa de atuação"],
      },
      {
        icone: "chart",
        titulo: "Painéis e indicadores",
        texto: "O número que importa na tela de quem decide, comparado com o período anterior e com a meta.",
        itens: ["Metas e ritmo do mês", "Comparativo de períodos", "Alertas de desvio"],
      },
      {
        icone: "plug",
        titulo: "Integrações e migração",
        texto: "Seu sistema novo conversa com o que já existe e nasce com os dados do antigo.",
        itens: ["APIs e webhooks", "PIX e boletos", "Importação de planilhas"],
      },
    ],
    processoTitulo: "Como um projeto anda",
    processo: [
      { titulo: "Diagnóstico", texto: "Entendo o processo real, onde o tempo se perde e o que precisa sair do papel." },
      { titulo: "Protótipo", texto: "Uma versão navegável em poucos dias, para validar com quem vai usar." },
      { titulo: "Produção", texto: "Entrega em etapas, com dados reais, testes e acesso por perfil." },
      { titulo: "Evolução", texto: "Medição de uso e melhorias contínuas, com IA entrando onde dá retorno." },
    ],
  },
  automacoes: {
    titulo: "Automações com IA no CRM",
    sub: "Fluxos que trabalham enquanto a equipe vende. Escolha um para ver cada etapa.",
    problema: "O problema",
    resultado: "O resultado",
    fluxos: [
      {
        id: "atendimento",
        nome: "Atendimento e qualificação",
        problema: "Lead chega fora do horário, espera horas e compra do concorrente.",
        resultado: "Resposta na hora, lead qualificado e vendedor entrando com o contexto pronto.",
        passos: [
          { icone: "chat", titulo: "Mensagem chega", texto: "O cliente escreve no WhatsApp, a qualquer hora." },
          { icone: "brain", titulo: "IA entende a intenção", texto: "Identifica se é orçamento, dúvida, suporte ou reclamação." },
          { icone: "funnel", titulo: "Qualifica o lead", texto: "Pergunta o essencial: produto, prazo, quantidade e região." },
          { icone: "user", titulo: "Distribui no funil", texto: "Cria o card na etapa certa e atribui ao vendedor da vez." },
          { icone: "handshake", titulo: "Vendedor assume", texto: "Recebe um resumo da conversa e fecha com o cliente aquecido." },
        ],
      },
      {
        id: "followup",
        nome: "Follow-up de orçamento",
        problema: "Orçamento enviado e esquecido. Ninguém lembra de cobrar a resposta.",
        resultado: "Nenhum orçamento morre em silêncio, e o vendedor só entra quando há interesse.",
        passos: [
          { icone: "file", titulo: "Orçamento enviado", texto: "O sistema registra a proposta e o valor no card." },
          { icone: "clock", titulo: "Sem resposta em 48 h", texto: "O prazo vence e o fluxo acorda sozinho." },
          { icone: "pen", titulo: "IA escreve o lembrete", texto: "Mensagem personalizada com o que o cliente pediu." },
          { icone: "reply", titulo: "Cliente responde", texto: "A IA tira a dúvida simples ou marca o interesse." },
          { icone: "check", titulo: "Volta para o vendedor", texto: "Com prioridade alta e todo o histórico da negociação." },
        ],
      },
      {
        id: "posvenda",
        nome: "Pós-venda e cobrança",
        problema: "Cobrança manual, cliente que some depois da compra e recompra que não acontece.",
        resultado: "Recebimento em dia, cliente acompanhado e venda recorrente puxada no tempo certo.",
        passos: [
          { icone: "heart", titulo: "Venda concluída", texto: "Boas-vindas, instruções de uso e pesquisa de satisfação." },
          { icone: "pix", titulo: "Lembrete com PIX", texto: "Antes do vencimento, com o link de pagamento pronto." },
          { icone: "check", titulo: "Baixa automática", texto: "Pagamento confirmado atualiza o financeiro sozinho." },
          { icone: "repeat", titulo: "Hora de recomprar", texto: "Pelo histórico, a IA sugere a próxima oferta ao cliente." },
        ],
      },
      {
        id: "engenharia",
        nome: "Triagem para engenharia",
        problema: "Engenheiro gastando o dia conferindo documento e foto em vez de analisar.",
        resultado: "Laudo chega em rascunho, com pendências apontadas, e o engenheiro só revisa e assina.",
        passos: [
          { icone: "camera", titulo: "Cliente envia arquivos", texto: "Fotos, matrículas e documentos pelo WhatsApp ou por link." },
          { icone: "scan", titulo: "IA extrai os dados", texto: "Lê os documentos e aponta o que está faltando." },
          { icone: "doc", titulo: "Monta o rascunho", texto: "Preenche o laudo com amostras e dados do imóvel." },
          { icone: "seal", titulo: "Engenheiro revisa", texto: "Ajusta, aprova e assina com responsabilidade técnica." },
          { icone: "send", titulo: "Cliente recebe", texto: "PDF final e atualização de status, sem ligação." },
        ],
      },
    ],
  },
  stack: { titulo: "Ferramentas do dia a dia", rapido: "Rápido", detalhe: "Detalhe" },
  experiencia: {
    titulo: "Onde trabalhei",
    itens: [
      {
        cargo: "Head de Tecnologia",
        empresa: "Empresa de software B2B (ERP e CRM)",
        periodo: "jul. 2026 - hoje",
        resumo: "Lidero a arquitetura e a entrega de uma plataforma multi-tenant de ERP e CRM com atendimento por IA no WhatsApp.",
        tags: ["Liderança técnica", "Arquitetura", "Multi-tenant", "IA aplicada", "Next.js", "PostgreSQL"],
      },
      {
        cargo: "Desenvolvedor independente",
        empresa: "Sistemas sob medida",
        periodo: "atual",
        resumo: "Sistemas de gestão para empresas e projetos técnicos para engenheiros, da especificação ao deploy.",
        tags: ["ERP", "Engenharia", "Automação", "Supabase"],
      },
      {
        cargo: "Estagiário de Inovação",
        empresa: "Poliedro Educação",
        periodo: "abr. 2025 - jul. 2026",
        resumo: "Projetos de inovação e desenvolvimento de software em equipe remota.",
        tags: ["Inovação", "Desenvolvimento de software", "Remoto"],
      },
      {
        cargo: "Estagiário",
        empresa: "Back4App",
        periodo: "mai. 2024 - nov. 2024",
        resumo: "Desenvolvimento Android e suporte técnico numa plataforma de backend como serviço.",
        tags: ["Android", "Backend as a Service", "Suporte técnico"],
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
    aviso: "Telas de sistemas em produção, com nomes, valores e localizações ocultados.",
    lista: [
      {
        slug: "erp-crm",
        titulo: "Plataforma ERP e CRM white label",
        resumo: "Varejo, assistência técnica e locação numa plataforma multi-tenant, com CRM no WhatsApp e IA.",
        pontos: [
          "Mais de 150 rotas entre ERP, CRM e painel da plataforma",
          "Isolamento por empresa e por loja direto no banco",
          "Consulta reescrita de 149 ms para 6,9 ms",
          "Assistente de IA que consulta os dados do negócio",
        ],
        stack: ["Next.js", "React", "PostgreSQL", "Supabase", "Tailwind"],
        imagem: "/projetos/erp.webp",
      },
      {
        slug: "laudos",
        titulo: "Laudos técnicos para engenharia",
        resumo: "Sistema para engenheiros montarem, acompanharem e aprovarem laudos de avaliação.",
        pontos: [
          "Tempo médio de montagem medido por laudo",
          "Mapa de atuação por coordenada ou município",
          "Amostras, zoneamento e clientes integrados",
          "Prazos da abertura à aprovação com alerta",
        ],
        stack: ["Next.js", "PostgreSQL", "Mapas", "PDF"],
        imagem: "/projetos/laudos.webp",
      },
      {
        slug: "verticais",
        titulo: "Sistemas verticais sob medida",
        resumo: "Gestão construída em torno do processo de cada negócio, do orçamento à entrega.",
        pontos: [
          "Produção guiada por ordem de serviço",
          "PDV com ficha técnica e baixa de insumos",
          "App offline para equipes em campo",
        ],
        stack: ["Next.js", "React", "Prisma", "PWA"],
        imagem: "/projetos/modulos.webp",
      },
      {
        slug: "voz",
        titulo: "Assistente de voz com IA",
        resumo: "Interface holográfica no navegador que acorda com a voz e executa tarefas reais.",
        pontos: ["Shaders GLSL próprios", "Ferramentas conectadas por MCP"],
        stack: ["React", "Three.js", "GLSL", "Claude Agent SDK"],
      },
    ],
  },
  contato: {
    titulo: "Vamos construir algo real",
    texto: "Aberto a projetos de ERP, CRM com IA, automação de processos e sistemas para engenharia.",
    foco: "Foco",
    focoValor: "IA, LLM, Machine Learning, CRM, ERP e projetos técnicos para engenheiros",
  },
};

const en: Dicionario = {
  meta: {
    titulo: "Rurik D'Angelo | Head of Technology, AI and SaaS",
    descricao: "Management systems, CRM with AI automations and technical projects for engineers.",
  },
  nav: { sobre: "About", solucoes: "Solutions", automacoes: "Automations", projetos: "Projects", experiencia: "Experience", cta: "Get in touch" },
  hero: {
    eyebrow: "Head of Technology",
    papeis: ["AI Specialist", "LLM Engineer", "Machine Learning", "SaaS Architect"],
    sub: "I build management systems, CRMs with AI automation and technical projects for engineers.",
    verProjetos: "View projects",
    verSolucoes: "Solutions",
  },
  sobre: {
    titulo: "Technology that solves the business",
    texto: [
      "I am a Head of Technology with a degree in Computer Science and a specialist in AI, LLMs and Machine Learning. I own the architecture, the team and the delivery of platforms companies use all day: ERP, CRM, finance, tax and customer service.",
      "I also build technical projects for engineers, such as report and appraisal systems, where data accuracy matters as much as speed. I work from the database to the interface, in C# .NET and the TypeScript ecosystem.",
      "My focus is turning manual processes into systems: fewer spreadsheets, less rework and decisions made with the right number on screen.",
    ],
    cv: "Download CV",
    destaques: [
      { valor: "150+", rotulo: "routes in a single multi-tenant platform" },
      { valor: "6.9 ms", rotulo: "query that took 149 ms, after a rewrite" },
      { valor: "24 h", rotulo: "AI customer service on WhatsApp, no queue" },
    ],
  },
  solucoes: {
    titulo: "Solutions for companies",
    sub: "Custom software for the problem that blocks the operation, not a generic package full of unused modules.",
    lista: [
      {
        icone: "chat",
        titulo: "Conversational CRM on WhatsApp",
        texto: "Every company conversation in one place, with a pipeline, owners and each customer's history.",
        itens: ["Multiple numbers and agents", "Kanban sales pipeline", "AI that replies and qualifies"],
      },
      {
        icone: "cart",
        titulo: "Custom ERP",
        texto: "Sales, inventory, purchasing, finance and tax talking to each other, with nothing typed twice.",
        itens: ["POS and work orders", "Tax invoice issuing", "Multi-company and multi-store"],
      },
      {
        icone: "robot",
        titulo: "AI process automation",
        texto: "Agents that read documents, sort requests, answer customers and run tasks inside your systems.",
        itens: ["Agents with real tools", "PDF and photo reading", "Human review where it matters"],
      },
      {
        icone: "ruler",
        titulo: "Technical projects for engineers",
        texto: "Systems for reports, appraisals and technical documents, from field survey to the approved PDF.",
        itens: ["Report assembly", "Samples and zoning", "Coverage map"],
      },
      {
        icone: "chart",
        titulo: "Dashboards and KPIs",
        texto: "The number that matters on the decision maker's screen, compared with the last period and the goal.",
        itens: ["Goals and monthly pace", "Period comparison", "Deviation alerts"],
      },
      {
        icone: "plug",
        titulo: "Integrations and migration",
        texto: "Your new system talks to what already exists and starts with the old system's data.",
        itens: ["APIs and webhooks", "Instant payments and invoices", "Spreadsheet import"],
      },
    ],
    processoTitulo: "How a project moves",
    processo: [
      { titulo: "Discovery", texto: "I learn the real process, where time is lost and what needs to leave paper." },
      { titulo: "Prototype", texto: "A clickable version in a few days, validated with the people who will use it." },
      { titulo: "Production", texto: "Delivery in stages, with real data, tests and role-based access." },
      { titulo: "Evolution", texto: "Usage metrics and continuous improvement, with AI where it pays off." },
    ],
  },
  automacoes: {
    titulo: "AI automations in the CRM",
    sub: "Flows that work while the team sells. Pick one to see every step.",
    problema: "The problem",
    resultado: "The result",
    fluxos: [
      {
        id: "atendimento",
        nome: "Service and qualification",
        problema: "A lead arrives after hours, waits for hours and buys from a competitor.",
        resultado: "Instant replies, qualified leads and a salesperson stepping in with the context ready.",
        passos: [
          { icone: "chat", titulo: "Message arrives", texto: "The customer writes on WhatsApp, at any hour." },
          { icone: "brain", titulo: "AI reads the intent", texto: "Tells a quote request from a question, support or a complaint." },
          { icone: "funnel", titulo: "Qualifies the lead", texto: "Asks the essentials: product, deadline, quantity and region." },
          { icone: "user", titulo: "Routes the pipeline", texto: "Creates the card in the right stage and assigns the next salesperson." },
          { icone: "handshake", titulo: "Salesperson takes over", texto: "Gets a conversation summary and closes with a warm customer." },
        ],
      },
      {
        id: "followup",
        nome: "Quote follow-up",
        problema: "A quote is sent and forgotten. Nobody remembers to chase the answer.",
        resultado: "No quote dies in silence, and sales only steps in when there is interest.",
        passos: [
          { icone: "file", titulo: "Quote sent", texto: "The system records the proposal and value on the card." },
          { icone: "clock", titulo: "No reply in 48 h", texto: "The deadline passes and the flow wakes up on its own." },
          { icone: "pen", titulo: "AI writes the reminder", texto: "A personal message about what the customer asked for." },
          { icone: "reply", titulo: "Customer replies", texto: "AI answers simple doubts or flags the interest." },
          { icone: "check", titulo: "Back to sales", texto: "With high priority and the full negotiation history." },
        ],
      },
      {
        id: "posvenda",
        nome: "After-sales and billing",
        problema: "Manual collection, customers who vanish after buying and repeat sales that never happen.",
        resultado: "Payments on time, customers followed up and repeat sales pulled at the right moment.",
        passos: [
          { icone: "heart", titulo: "Sale closed", texto: "Welcome message, instructions and a satisfaction survey." },
          { icone: "pix", titulo: "Payment reminder", texto: "Before the due date, with the payment link ready." },
          { icone: "check", titulo: "Automatic settlement", texto: "A confirmed payment updates finance on its own." },
          { icone: "repeat", titulo: "Time to buy again", texto: "From the history, AI suggests the next offer." },
        ],
      },
      {
        id: "engenharia",
        nome: "Engineering intake",
        problema: "Engineers spend the day checking documents and photos instead of analysing.",
        resultado: "The report arrives as a draft with gaps flagged, and the engineer only reviews and signs.",
        passos: [
          { icone: "camera", titulo: "Customer sends files", texto: "Photos, deeds and documents via WhatsApp or a link." },
          { icone: "scan", titulo: "AI extracts the data", texto: "Reads the documents and points out what is missing." },
          { icone: "doc", titulo: "Builds the draft", texto: "Fills the report with samples and property data." },
          { icone: "seal", titulo: "Engineer reviews", texto: "Adjusts, approves and signs with technical responsibility." },
          { icone: "send", titulo: "Customer receives", texto: "Final PDF and a status update, no phone call." },
        ],
      },
    ],
  },
  stack: { titulo: "Everyday tools", rapido: "Quick", detalhe: "Detail" },
  experiencia: {
    titulo: "Where I have worked",
    itens: [
      {
        cargo: "Head of Technology",
        empresa: "B2B software company (ERP and CRM)",
        periodo: "Jul 2026 - present",
        resumo: "I lead architecture and delivery of a multi-tenant ERP and CRM platform with AI customer service on WhatsApp.",
        tags: ["Technical leadership", "Architecture", "Multi-tenant", "Applied AI", "Next.js", "PostgreSQL"],
      },
      {
        cargo: "Independent developer",
        empresa: "Custom systems",
        periodo: "ongoing",
        resumo: "Management systems for companies and technical projects for engineers, from spec to deploy.",
        tags: ["ERP", "Engineering", "Automation", "Supabase"],
      },
      {
        cargo: "Innovation Intern",
        empresa: "Poliedro Educação",
        periodo: "Apr 2025 - Jul 2026",
        resumo: "Innovation projects and software development in a remote team.",
        tags: ["Innovation", "Software development", "Remote"],
      },
      {
        cargo: "Intern",
        empresa: "Back4App",
        periodo: "May 2024 - Nov 2024",
        resumo: "Android development and technical support on a backend-as-a-service platform.",
        tags: ["Android", "Backend as a Service", "Technical support"],
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
    aviso: "Screens from systems in production, with names, values and locations hidden.",
    lista: [
      {
        ...pt.projetos.lista[0],
        titulo: "White label ERP and CRM platform",
        resumo: "Retail, repair services and rentals on a multi-tenant platform, with a WhatsApp CRM and AI.",
        pontos: [
          "Over 150 routes across ERP, CRM and the platform panel",
          "Per-company and per-store isolation inside the database",
          "Query rewritten from 149 ms to 6.9 ms",
          "AI assistant that queries business data",
        ],
      },
      {
        ...pt.projetos.lista[1],
        titulo: "Technical reports for engineering",
        resumo: "A system for engineers to build, track and approve appraisal reports.",
        pontos: [
          "Average assembly time measured per report",
          "Coverage map by coordinates or municipality",
          "Samples, zoning and clients in one place",
          "Deadlines from opening to approval, with alerts",
        ],
        stack: ["Next.js", "PostgreSQL", "Maps", "PDF"],
      },
      {
        ...pt.projetos.lista[2],
        titulo: "Custom vertical systems",
        resumo: "Management built around each business's process, from quote to delivery.",
        pontos: ["Production driven by work orders", "POS with recipes and supply deduction", "Offline app for field teams"],
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
    texto: "Open to ERP, AI-powered CRM, process automation and engineering systems projects.",
    foco: "Focus",
    focoValor: "AI, LLM, Machine Learning, CRM, ERP and technical projects for engineers",
  },
};

export const dicionarios: Record<Locale, Dicionario> = { pt, en };
export type { Dicionario, Projeto, Fluxo, Solucao };
