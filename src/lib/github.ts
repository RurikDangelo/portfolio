import { cacheLife } from "next/cache";

export type Dia = { data: string; nivel: number; total: number };
export type ResumoGithub = {
  repos: number;
  seguidores: number;
  desde: string;
  total: number;
  diasAtivos: number;
  maiorSequencia: number;
  mesPico: { mes: string; total: number } | null;
  dias: Dia[];
};

const headers = { "User-Agent": "portfolio-rurik", Accept: "application/vnd.github+json" };

// O calendário público vem do HTML do perfil: a API GraphQL exigiria token.
// Contribuições em repositório privado só aparecem se o perfil liberar.
function lerCalendario(html: string): Dia[] {
  const totais = new Map<string, number>();
  for (const m of html.matchAll(/for="(contribution-day-component-[\d-]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = /^(\d+)/.exec(m[2]);
    totais.set(m[1], n ? Number(n[1]) : 0);
  }
  const dias: Dia[] = [];
  for (const m of html.matchAll(/data-date="([\d-]+)"\s+id="(contribution-day-component-[\d-]+)"\s+data-level="(\d)"/g)) {
    dias.push({ data: m[1], nivel: Number(m[3]), total: totais.get(m[2]) ?? 0 });
  }
  return dias.sort((a, b) => a.data.localeCompare(b.data));
}

export async function resumoGithub(usuario: string): Promise<ResumoGithub | null> {
  "use cache";
  cacheLife("hours");
  try {
    const [u, cal] = await Promise.all([
      fetch(`https://api.github.com/users/${usuario}`, { headers }).then((r) => (r.ok ? r.json() : null)),
      fetch(`https://github.com/users/${usuario}/contributions`, { headers }).then((r) => (r.ok ? r.text() : "")),
    ]);
    if (!u) return null;
    const dias = lerCalendario(cal);

    let sequencia = 0;
    let maiorSequencia = 0;
    const porMes = new Map<string, number>();
    for (const d of dias) {
      sequencia = d.total > 0 ? sequencia + 1 : 0;
      maiorSequencia = Math.max(maiorSequencia, sequencia);
      porMes.set(d.data.slice(0, 7), (porMes.get(d.data.slice(0, 7)) ?? 0) + d.total);
    }
    const pico = [...porMes].sort((a, b) => b[1] - a[1])[0];

    return {
      repos: u.public_repos,
      seguidores: u.followers,
      desde: u.created_at,
      total: dias.reduce((s, d) => s + d.total, 0),
      diasAtivos: dias.filter((d) => d.total > 0).length,
      maiorSequencia,
      mesPico: pico && pico[1] > 0 ? { mes: pico[0], total: pico[1] } : null,
      dias,
    };
  } catch {
    return null;
  }
}
