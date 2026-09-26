export type ActId = 1 | 2 | 3;

export type FrameDef = {
  id: string;
  /** Chapter number shown in the counter (1..22). */
  n: number;
  act: ActId;
  title: string;
  /** Small criterion tag from the brief, e.g. "A · canais". */
  tag?: string;
  /** One-line punchline shown alone before the rest of the content. */
  punchline?: string;
  /** navy background instead of porcelain */
  navy?: boolean;
  /** position of the frame centre in canvas space */
  x: number;
  y: number;
  rot: number;
  w: number;
  h: number;
  /** zoom applied when the camera lands on the frame */
  zoom?: number;
  /** parent frame id when this is a sub-frame */
  parent?: string;
  /** score gained on this chapter: [spal, vaa] */
  score?: [number, number];
};

const R_ACT1 = 5600;
const R_ACT2 = 4000;
const FULL = { w: 1280, h: 720 };
const SUB = { w: 760, h: 520 };

/** point on the plate: angle in degrees, 0 = top, clockwise */
function ring(radius: number, angle: number) {
  const a = ((angle - 90) * Math.PI) / 180;
  return { x: Math.round(Math.cos(a) * radius), y: Math.round(Math.sin(a) * radius) };
}

type Seed = Omit<FrameDef, "x" | "y" | "w" | "h" | "n"> & { sub?: boolean };

const seeds: Seed[] = [
  // ── Ato 1 · aro exterior ────────────────────────────────────────────────
  {
    id: "capa",
    act: 1,
    title: "Capa",
    navy: false,
    rot: 0,
    zoom: 0.78,
  },
  {
    id: "apresentacao",
    act: 1,
    title: "SPAL × Vista Alegre",
    navy: true,
    rot: 0,
    zoom: 0.78,
  },
  {
    id: "apresentacao-empresas",
    act: 1,
    parent: "apresentacao",
    title: "Apresentação das empresas",
    rot: 0,
  },
  {
    id: "nomes",
    act: 1,
    title: "Os dois nomes",
    rot: -2.5,
  },
  {
    id: "pergunta",
    act: 1,
    title: "A pergunta",
    navy: true,
    rot: 2,
  },
  {
    id: "identificacao-canais",
    act: 1,
    parent: "pergunta",
    title: "Identificação dos canais",
    rot: 0,
  },
  {
    id: "canais",
    act: 1,
    title: "Os mesmos canais, funções diferentes",
    rot: -1.5,
    score: [0, 1],
  },
  {
    id: "introducao-website",
    act: 1,
    parent: "canais",
    title: "Website",
    rot: 0,
  },
  {
    id: "website",
    act: 1,
    title: "O website em seis dimensões",
    rot: 2.5,
    zoom: 0.62,
  },
  {
    id: "duelo-1",
    act: 1,
    title: "Identidade e mensagem",
    parent: "website",
    sub: true,
    rot: -3,
  },
  {
    id: "duelo-2",
    act: 1,
    title: "Navegação e pesquisa",
    parent: "website",
    sub: true,
    rot: 2,
  },
  {
    id: "duelo-3",
    act: 1,
    title: "Informação do produto",
    parent: "website",
    sub: true,
    rot: -1.5,
  },
  {
    id: "duelo-4",
    act: 1,
    title: "Próximo passo",
    parent: "website",
    sub: true,
    rot: 3,
  },
  {
    id: "duelo-5",
    act: 1,
    title: "Telemóvel",
    parent: "website",
    sub: true,
    rot: -2,
  },
  {
    id: "duelo-6",
    act: 1,
    title: "Integração e confiança",
    parent: "website",
    sub: true,
    rot: 1.5,
  },
  {
    id: "percurso",
    act: 1,
    parent: "website",
    sub: true,
    title: "Teste de percurso",
    rot: 2.5,
  },
  {
    id: "radar",
    act: 1,
    parent: "website",
    sub: true,
    title: "As seis rondas de uma só vez",
    rot: -2,
    score: [0, 1],
  },
  {
    id: "redes",
    act: 1,
    title: "Redes sociais",
    tag: "C · Redes",
    punchline: "Uma fala como fabricante. A outra, como marca de estilo de vida.",
    rot: 2,
    score: [0, 2],
  },

  {
    id: "placar1",
    act: 1,
    title: "A resposta à pergunta",
    tag: "D · diagnóstico",
    punchline: "Não é falta de produto. É uma decisão histórica de comunicar para o retalho.",
    navy: true,
    rot: -1,
  },

  // ── Ato 2 · anel intermédio ─────────────────────────────────────────────
  {
    id: "ines",
    act: 2,
    title: "Conhece a Inês",
    tag: "D · diagnóstico",
    punchline: "20 minutos. Um telemóvel. Uma prenda para a mãe.",
    rot: -2,
  },
  {
    id: "min0",
    act: 2,
    title: "Minuto 0 — a Inês entra",
    punchline: "Um site pede-lhe uma escolha. O outro mostra-lhe um preço.",
    rot: 2.5,
  },
  {
    id: "min3",
    act: 2,
    title: "Minuto 3 — à procura de um prato",
    punchline: "Cinco passos contra quatro. E um deles é uma miniatura sem nome.",
    rot: -2.5,
    score: [0, 1],
  },
  {
    id: "min8",
    act: 2,
    title: "Minuto 8 — a ficha",
    punchline: "Peso em gramas. E nem uma palavra sobre preço.",
    rot: 2,
    score: [0, 1],
  },
  {
    id: "min12",
    act: 2,
    title: "Minuto 12 — 'e agora, onde compro?'",
    punchline: "A SPAL perde a Inês exatamente no momento em que ela decide comprar.",
    rot: -1.5,
    score: [0, 1],
  },
  {
    id: "dois-placares",
    act: 2,
    title: "Dois placares, o mesmo resultado",
    tag: "D · diagnóstico",
    punchline: "Os dados e a pessoa contam a mesma história.",
    navy: true,
    rot: 1.5,
  },

  // ── Ato 3 · centro do prato ─────────────────────────────────────────────
  {
    id: "porque-spal",
    act: 3,
    title: "Porque a SPAL",
    tag: "E · intervenção",
    punchline: "A matéria-prima da resposta já existe.",
    rot: -1.5,
  },
  {
    id: "jogadas",
    act: 3,
    title: "Três melhorias, por ordem de prioridade",
    tag: "D · marca escolhida: SPAL",
    punchline: "Três ações concretas. Nenhuma precisa de site novo.",
    navy: true,
    rot: 1.5,
    zoom: 0.62,
  },
  {
    id: "jogada-1",
    act: 3,
    title: "01 · «Onde comprar» ligado a tudo",
    tag: "E · intervenção",
    parent: "jogadas",
    sub: true,
    rot: -2.5,
  },
  {
    id: "jogada-2",
    act: 3,
    title: "02 · Fichas para o consumidor",
    tag: "E · intervenção",
    parent: "jogadas",
    sub: true,
    rot: 2,
  },
  {
    id: "jogada-3",
    act: 3,
    title: "03 · Linha editorial «Feito em Alcobaça»",
    tag: "E · intervenção",
    parent: "jogadas",
    sub: true,
    rot: -1.5,
  },
  {
    id: "semana",
    act: 3,
    title: "Uma semana de SPAL",
    tag: "E · calendário",
    punchline: "Uma semana chega para mudar a primeira impressão.",
    rot: -2,
  },
  {
    id: "publicacao",
    act: 3,
    title: "A publicação",
    tag: "E · intervenção",
    punchline: "A legenda diz onde comprar. É a única coisa que falta hoje.",
    rot: 2.5,
  },
  {
    id: "bio",
    act: 3,
    title: "A bio, antes e depois",
    tag: "E · intervenção",
    punchline: "150 caracteres também vendem.",
    rot: -1,
  },
  {
    id: "resposta",
    act: 3,
    title: "A Inês pergunta",
    tag: "E · intervenção",
    punchline: "Responder é a campanha mais barata que existe.",
    rot: 2,
  },
  {
    id: "marcax",
    act: 3,
    title: "O Instagram atrai melhor. O Facebook converte o dobro.",
    tag: "F · dados didáticos · marca X",
    punchline: "O Instagram atrai. O Facebook vende.",
    navy: true,
    rot: -2,
  },
  {
    id: "indicadores",
    act: 3,
    title: "Três indicadores. Uma decisão para cada resultado.",
    tag: "F · acompanhar as melhorias",
    punchline: "Se não for medido, foi só uma opinião bonita.",
    rot: 1,
  },
  {
    id: "final",
    act: 3,
    title: "A Inês, 20 minutos depois",
    tag: "E · intervenção",
    punchline:
      "A SPAL precisa de falar com a Inês antes que a Vista Alegre o faça por ela — em Alcobaça.",
    navy: true,
    rot: 0,
  },
  {
    id: "bastidores",
    act: 3,
    title: "Bastidores",
    tag: "fontes",
    rot: -1.5,
  },
];

/* ── layout on the plate ──────────────────────────────────────────────────
 * Act 1 sits on the outer rim (clockwise), Act 2 on the middle ring,
 * Act 3 fills the centre of the plate as a grid.
 */
function layout(): FrameDef[] {
  const act1Main = seeds.filter((s) => s.act === 1 && !s.sub);
  const act2Main = seeds.filter((s) => s.act === 2 && !s.sub);
  const act3All = seeds.filter((s) => s.act === 3);
  const satellites = seeds.filter((s) => s.act === 1 && s.sub);

  const pos = new Map<string, { x: number; y: number; w: number; h: number }>();

  act1Main.forEach((s, i) => {
    const p = ring(R_ACT1, i * 43);
    pos.set(s.id, { ...p, ...FULL });
  });

  // satellites of the website chapter: 2 columns × 4 rows, pushed outward
  const host = pos.get("website")!;
  const len = Math.hypot(host.x, host.y) || 1;
  const ux = host.x / len;
  const uy = host.y / len;
  const tx = -uy;
  const ty = ux;
  satellites.forEach((s, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const out = 1100 + row * 740;
    const side = (col - 1.5) * 900;
    pos.set(s.id, {
      x: Math.round(host.x + ux * out + tx * side),
      y: Math.round(host.y + uy * out + ty * side),
      ...SUB,
    });
  });

  act2Main.forEach((s, i) => {
    const p = ring(R_ACT2, 20 + i * 60);
    pos.set(s.id, { ...p, ...FULL });
  });

  act3All.forEach((s, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    pos.set(s.id, {
      x: -2175 + col * 1450,
      y: -1275 + row * 850,
      ...(s.sub ? SUB : FULL),
    });
  });

  let chapter = 0;
  return seeds.map((s) => {
    if (!s.parent && s.id !== "capa") chapter += 1;
    const p = pos.get(s.id)!;
    const { sub: _sub, ...rest } = s;
    return { ...rest, n: chapter, x: p.x, y: p.y, w: p.w, h: p.h };
  });
}

export const FRAMES: FrameDef[] = layout();

export const TOTAL_CHAPTERS = FRAMES[FRAMES.length - 1]!.n;

export const PLATE_RADIUS = 8100;

export const ACTS: Record<ActId, { label: string; title: string; line: string }> = {
  1: { label: "Ato 1", title: "O que descobrimos", line: "Os dados, as evidências, o placar." },
  2: {
    label: "Ato 2",
    title: "Vamos ver isto acontecer",
    line: "A Inês, 20 minutos, dois sites.",
  },
  3: {
    label: "Ato 3",
    title: "O que a SPAL faz a seguir",
    line: "Três jogadas, uma semana, os números.",
  },
};

export const ACT_VIEW: Record<ActId, { x: number; y: number; zoom: number }> = {
  1: { x: 54, y: 500, zoom: 0.06 },
  2: { x: 0, y: 0, zoom: 0.085 },
  3: { x: 0, y: 0, zoom: 0.2 },
};

export const OVERVIEW = { x: 54, y: 1250, zoom: 0.047 };

export function frameIndex(id: string) {
  return FRAMES.findIndex((f) => f.id === id);
}

/** cumulative score up to and including a frame, restarted per act */
export function scoreAt(index: number): { spal: number; vaa: number } {
  const act = FRAMES[index]?.act ?? 1;
  const scope = act === 1 ? 1 : 2;
  let spal = 0;
  let vaa = 0;
  FRAMES.forEach((f, i) => {
    if (i <= index && f.act === scope && f.score) {
      spal += f.score[0];
      vaa += f.score[1];
    }
  });
  return { spal, vaa };
}

export const FOOTER =
  "Exercício académico · UC 00279 Gerir os canais de comunicação digital · IEFP Sintra · Fernanda [apelido] · setembro 2026";
export const PERIOD = "Redes sociais: perfis analisados em 23/09/2026 · frequência 26/06–23/09/2026 · websites consultados em 04/09/2026";
