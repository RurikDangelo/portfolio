// Textos e dados fictícios das demonstrações interativas dos projetos, nos dois idiomas.
import type { Locale } from "./site";

export type Nicho = {
  nome: string;
  titulo: string;
  modulos: string[];
  kpis: [string, string][];
  colunas: [string, string, string];
  linhas: [string, string, string][];
};

export type TextosDemo = {
  aviso: string;
  gestao: {
    titulo: string;
    periodos: string[];
    kpis: [string, string, string];
    funil: [string, string, string];
    leads: string[];
    moeda: string;
  };
  operacional: {
    titulo: string;
    filtros: [string, string, string, string];
    total: string;
    vence: string;
    eventos: { texto: string; status: 0 | 1 | 2 }[];
  };
  sobMedida: { escolha: string; nichos: Nicho[] };
};

const pt: TextosDemo = {
  aviso: "Demonstração com dados fictícios",
  gestao: {
    titulo: "Visão geral",
    periodos: ["7 dias", "30 dias", "90 dias"],
    kpis: ["Receita", "Pedidos", "Ticket médio"],
    funil: ["Novo", "Proposta", "Fechado"],
    leads: ["Ana Ribeiro", "Studio Prisma", "Marcos Lima", "Clínica Vida", "Loja Norte", "Bruno Teles"],
    moeda: "R$",
  },
  operacional: {
    titulo: "Processos",
    filtros: ["Todos", "Em andamento", "Atrasados", "Concluídos"],
    total: "processos",
    vence: "vence em",
    eventos: [
      { texto: "Vistoria agendada", status: 0 },
      { texto: "Documento recebido", status: 0 },
      { texto: "Prazo vencido", status: 1 },
      { texto: "Relatório aprovado", status: 2 },
      { texto: "Nova solicitação", status: 0 },
      { texto: "Pendência resolvida", status: 2 },
      { texto: "Revisão atrasada", status: 1 },
    ],
  },
  sobMedida: {
    escolha: "Escolha um nicho",
    nichos: [
      {
        nome: "Clínica",
        titulo: "Agenda do dia",
        modulos: ["Agenda", "Pacientes", "Prontuários", "Financeiro"],
        kpis: [["Consultas hoje", "18"], ["Taxa de retorno", "64%"]],
        colunas: ["Hora", "Paciente", "Status"],
        linhas: [["09:00", "Helena M.", "Confirmado"], ["10:30", "Rafael S.", "Em espera"], ["11:15", "Lúcia P.", "Confirmado"]],
      },
      {
        nome: "Oficina",
        titulo: "Ordens de serviço",
        modulos: ["Ordens", "Veículos", "Peças", "Caixa"],
        kpis: [["OS abertas", "12"], ["Prazo médio", "2,4 dias"]],
        colunas: ["OS", "Veículo", "Etapa"],
        linhas: [["#1042", "Onix 2019", "Diagnóstico"], ["#1043", "HB20 2021", "Aguardando peça"], ["#1044", "Strada 2020", "Pronto"]],
      },
      {
        nome: "Varejo",
        titulo: "Vendas de hoje",
        modulos: ["PDV", "Estoque", "Clientes", "Relatórios"],
        kpis: [["Vendas hoje", "R$ 8.412"], ["Itens em falta", "7"]],
        colunas: ["Pedido", "Cliente", "Total"],
        linhas: [["#5531", "Carla N.", "R$ 289"], ["#5532", "Diego A.", "R$ 1.140"], ["#5533", "Joana F.", "R$ 74"]],
      },
      {
        nome: "Escritório",
        titulo: "Projetos ativos",
        modulos: ["Projetos", "Horas", "Clientes", "Faturamento"],
        kpis: [["Horas no mês", "326"], ["Projetos ativos", "9"]],
        colunas: ["Projeto", "Responsável", "Entrega"],
        linhas: [["Revisão contratual", "Paula R.", "28/10"], ["Auditoria anual", "Igor T.", "04/11"], ["Planejamento fiscal", "Nina C.", "12/11"]],
      },
      {
        nome: "Indústria",
        titulo: "Produção",
        modulos: ["Produção", "Insumos", "Qualidade", "Expedição"],
        kpis: [["Eficiência", "91%"], ["Lotes no turno", "14"]],
        colunas: ["Lote", "Produto", "Etapa"],
        linhas: [["L-208", "Peça A12", "Usinagem"], ["L-209", "Peça B07", "Inspeção"], ["L-210", "Peça A12", "Embalagem"]],
      },
    ],
  },
};

const en: TextosDemo = {
  aviso: "Demo with fictitious data",
  gestao: {
    titulo: "Overview",
    periodos: ["7 days", "30 days", "90 days"],
    kpis: ["Revenue", "Orders", "Average ticket"],
    funil: ["New", "Proposal", "Won"],
    leads: pt.gestao.leads,
    moeda: "R$",
  },
  operacional: {
    titulo: "Processes",
    filtros: ["All", "In progress", "Late", "Done"],
    total: "processes",
    vence: "due in",
    eventos: [
      { texto: "Inspection scheduled", status: 0 },
      { texto: "Document received", status: 0 },
      { texto: "Deadline missed", status: 1 },
      { texto: "Report approved", status: 2 },
      { texto: "New request", status: 0 },
      { texto: "Issue resolved", status: 2 },
      { texto: "Review overdue", status: 1 },
    ],
  },
  sobMedida: {
    escolha: "Pick a niche",
    nichos: [
      {
        ...pt.sobMedida.nichos[0],
        nome: "Clinic",
        titulo: "Today's schedule",
        modulos: ["Schedule", "Patients", "Records", "Finance"],
        kpis: [["Appointments today", "18"], ["Return rate", "64%"]],
        colunas: ["Time", "Patient", "Status"],
        linhas: [["09:00", "Helena M.", "Confirmed"], ["10:30", "Rafael S.", "Waiting"], ["11:15", "Lúcia P.", "Confirmed"]],
      },
      {
        ...pt.sobMedida.nichos[1],
        nome: "Repair shop",
        titulo: "Work orders",
        modulos: ["Orders", "Vehicles", "Parts", "Cash"],
        kpis: [["Open orders", "12"], ["Average lead time", "2.4 days"]],
        colunas: ["Order", "Vehicle", "Stage"],
        linhas: [["#1042", "Onix 2019", "Diagnosis"], ["#1043", "HB20 2021", "Waiting for part"], ["#1044", "Strada 2020", "Ready"]],
      },
      {
        ...pt.sobMedida.nichos[2],
        nome: "Retail",
        titulo: "Today's sales",
        modulos: ["POS", "Inventory", "Customers", "Reports"],
        kpis: [["Sales today", "R$ 8,412"], ["Out of stock", "7"]],
        colunas: ["Order", "Customer", "Total"],
        linhas: [["#5531", "Carla N.", "R$ 289"], ["#5532", "Diego A.", "R$ 1,140"], ["#5533", "Joana F.", "R$ 74"]],
      },
      {
        ...pt.sobMedida.nichos[3],
        nome: "Office",
        titulo: "Active projects",
        modulos: ["Projects", "Hours", "Clients", "Billing"],
        kpis: [["Hours this month", "326"], ["Active projects", "9"]],
        colunas: ["Project", "Owner", "Due"],
        linhas: [["Contract review", "Paula R.", "Oct 28"], ["Annual audit", "Igor T.", "Nov 4"], ["Tax planning", "Nina C.", "Nov 12"]],
      },
      {
        ...pt.sobMedida.nichos[4],
        nome: "Industry",
        titulo: "Production",
        modulos: ["Production", "Supplies", "Quality", "Shipping"],
        kpis: [["Efficiency", "91%"], ["Batches this shift", "14"]],
        colunas: ["Batch", "Product", "Stage"],
        linhas: [["L-208", "Part A12", "Machining"], ["L-209", "Part B07", "Inspection"], ["L-210", "Part A12", "Packing"]],
      },
    ],
  },
};

export const textosDemo: Record<Locale, TextosDemo> = { pt, en };
