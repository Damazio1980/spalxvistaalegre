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

const RING_1 = 3050;
const RING_2 = 1750;

/** point on the plate: angle in degrees, 0 = top, clockwise */
function ring(radius: number, angle: number) {
  const a = ((angle - 90) * Math.PI) / 180;
  return { x: Math.round(Math.cos(a) * radius), y: Math.round(Math.sin(a) * radius) };
}

const FULL = { w: 1280, h: 720 };
const SUB = { w: 760, h: 520 };

type Seed = Omit<FrameDef, "x" | "y" | "w" | "h" | "n"> & {
  ringAngle?: number;
  ringRadius?: number;
  at?: { x: number; y: number };
  size?: { w: number; h: number };
};

const seeds: Seed[] = [
  // ── Ato 1 · aro exterior ────────────────────────────────────────────────
  {
    id: "capa",
    act: 1,
    title: "SPAL × Vista Alegre",
    navy: true,
    rot: 0,
    ringAngle: 0,
    ringRadius: RING_1,
    zoom: 0.78,
  },
  {
    id: "nomes",
    act: 1,
    title: "Os dois nomes",
    tag: "enquadramento",
    punchline: "A concorrente acabou de se instalar na rua da SPAL.",
    rot: -2.5,
    ringAngle: 30,
    ringRadius: RING_1,
  },
  {
    id: "pergunta",
    act: 1,
    title: "A pergunta",
    tag: "enquadramento",
    punchline: "Tudo o que vem a seguir responde a esta pergunta.",
    navy: true,
    rot: 2,
    ringAngle: 58,
    ringRadius: RING_1,
  },
  {
    id: "canais",
    act: 1,
    title: "Os mesmos canais, funções diferentes",
    tag: "A · canais",
    punchline: "Uma usa o site como loja. A outra, como catálogo.",
    rot: -1.5,
    ringAngle: 86,
    ringRadius: RING_1,
    score: [0, 1],
  },
  {
    id: "website",
    act: 1,
    title: "O website em seis rondas",
    tag: "B · website",
    punchline: "Seis rondas. O mesmo vencedor em todas.",
    rot: 2.5,
    ringAngle: 116,
    ringRadius: RING_1,
    zoom: 0.62,
  },
  { id: "duelo-1", act: 1, title: "Ronda 1 · Entrar no site", tag: "B · website", parent: "website", rot: -3, at: { x: -1180, y: 3260 }, size: SUB },
  { id: "duelo-2", act: 1, title: "Ronda 2 · Encontrar o produto", tag: "B · website", parent: "website", rot: 2, at: { x: -320, y: 3320 }, size: SUB },
  { id: "duelo-3", act: 1, title: "Ronda 3 · A ficha do produto", tag: "B · website", parent: "website", rot: -1.5, at: { x: -1180, y: 3880 }, size: SUB },
  { id: "duelo-4", act: 1, title: "Ronda 4 · Comprar", tag: "B · website", parent: "website", rot: 3, at: { x: -320, y: 3940 }, size: SUB },
  { id: "duelo-5", act: 1, title: "Ronda 5 · No telemóvel", tag: "B · website", parent: "website", rot: -2, at: { x: -1180, y: 4500 }, size: SUB },
  { id: "duelo-6", act: 1, title: "Ronda 6 · Confiança e contacto", tag: "B · website", parent: "website", rot: 1.5, at: { x: -320, y: 4560 }, size: SUB },
  {
    id: "radar",
    act: 1,
    title: "As seis rondas de uma só vez",
    tag: "B · website",
    punchline: "Repara na forma: uma quase toca o limite, a outra encolhe.",
    rot: -2,
    ringAngle: 146,
    ringRadius: RING_1,
    score: [0, 1],
  },
  {
    id: "redes",
    act: 1,
    title: "Nas redes",
    tag: "C · redes",
    punchline: "Uma fala como fabricante. A outra, como marca de estilo de vida.",
    rot: 2,
    ringAngle: 176,
    ringRadius: RING_1,
    score: [0, 1],
  },
  {
    id: "placar1",
    act: 1,
    title: "Placar do Ato 1",
    tag: "D · diagnóstico",
    punchline: "Não é falta de produto. É um site de 2013 a falar com o retalho.",
    navy: true,
    rot: -1,
    ringAngle: 206,
    ringRadius: RING_1,
  },

  // ── Ato 2 · anel intermédio ─────────────────────────────────────────────
  {
    id: "ines",
    act: 2,
    title: "Conhece a Inês",
    tag: "D · diagnóstico",
    punchline: "20 minutos. Um telemóvel. Uma prenda para a mãe.",
    rot: -2,
    ringAngle: 0,
    ringRadius: RING_2,
  },
  {
    id: "min0",
    act: 2,
    title: "Minuto 0 — a Inês entra",
    tag: "B · website",
    punchline: "Um site pede-lhe uma escolha. O outro mostra-lhe um preço.",
    rot: 2.5,
    ringAngle: 55,
    ringRadius: RING_2,
  },
  {
    id: "min3",
    act: 2,
    title: "Minuto 3 — à procura de um prato",
    tag: "B · website",
    punchline: "Cinco passos contra quatro. E um deles é uma miniatura sem nome.",
    rot: -2.5,
    ringAngle: 110,
    ringRadius: RING_2,
    score: [0, 1],
  },
  {
    id: "min8",
    act: 2,
    title: "Minuto 8 — a ficha",
    tag: "B · website",
    punchline: "Peso em gramas. E nem uma palavra sobre preço.",
    rot: 2,
    ringAngle: 165,
    ringRadius: RING_2,
    score: [0, 1],
  },
  {
    id: "min12",
    act: 2,
    title: "Minuto 12 — 'e agora, onde compro?'",
    tag: "B · website",
    punchline: "A SPAL perde a Inês exatamente no momento em que ela decide comprar.",
    rot: -1.5,
    ringAngle: 220,
    ringRadius: RING_2,
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
    ringAngle: 285,
    ringRadius: RING_2,
  },

  // ── Ato 3 · centro do prato ─────────────────────────────────────────────
  {
    id: "porque-spal",
    act: 3,
    title: "Porque a SPAL",
    tag: "E · intervenção",
    punchline: "A matéria-prima da resposta já existe.",
    rot: -1.5,
    at: { x: -1520, y: -520 },
  },
  {
    id: "jogadas",
    act: 3,
    title: "Três jogadas",
    tag: "E · intervenção",
    punchline: "Três jogadas. Nenhuma precisa de site novo.",
    navy: true,
    rot: 1.5,
    at: { x: -120, y: -520 },
    zoom: 0.62,
  },
  { id: "jogada-1", act: 3, title: "01 · Onde comprar, em todo o lado", tag: "E · intervenção", parent: "jogadas", rot: -2.5, at: { x: -560, y: 90 }, size: SUB },
  { id: "jogada-2", act: 3, title: "02 · Fichas que falam com a Inês", tag: "E · intervenção", parent: "jogadas", rot: 2, at: { x: 300, y: 150 }, size: SUB },
  { id: "jogada-3", act: 3, title: "03 · Feito em Alcobaça — 3 por semana", tag: "E · intervenção", parent: "jogadas", rot: -1.5, at: { x: -130, y: 700 }, size: SUB },
  {
    id: "semana",
    act: 3,
    title: "Uma semana de SPAL",
    tag: "E · calendário",
    punchline: "Uma semana chega para mudar a primeira impressão.",
    rot: -2,
    at: { x: 1280, y: -520 },
  },
  {
    id: "publicacao",
    act: 3,
    title: "A publicação",
    tag: "E · intervenção",
    punchline: "A legenda diz onde comprar. É a única coisa que falta hoje.",
    rot: 2.5,
    at: { x: -1520, y: 1360 },
  },
  {
    id: "bio",
    act: 3,
    title: "A bio, antes e depois",
    tag: "E · intervenção",
    punchline: "150 caracteres também vendem.",
    rot: -1,
    at: { x: 1280, y: 1360 },
  },
  {
    id: "resposta",
    act: 3,
    title: "A Inês pergunta",
    tag: "E · intervenção",
    punchline: "Responder é a campanha mais barata que existe.",
    rot: 2,
    at: { x: 2680, y: -520 },
  },
  {
    id: "marcax",
    act: 3,
    title: "E se fosse a sério? Os números",
    tag: "F · marca X",
    punchline: "O Instagram atrai. O Facebook vende.",
    navy: true,
    rot: -2,
    at: { x: 2680, y: 1360 },
  },
  {
    id: "indicadores",
    act: 3,
    title: "Como saberemos que resultou",
    tag: "F · indicadores",
    punchline: "Se não for medido, foi só uma opinião bonita.",
    rot: 1,
    at: { x: 4080, y: -520 },
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
    at: { x: 4080, y: 1360 },
  },
  {
    id: "bastidores",
    act: 3,
    title: "Bastidores",
    tag: "fontes",
    rot: -1.5,
    at: { x: 5480, y: 420 },
  },
];

let chapter = 0;
export const FRAMES: FrameDef[] = seeds.map((s) => {
  if (!s.parent) chapter += 1;
  const pos = s.at ?? ring(s.ringRadius ?? RING_1, s.ringAngle ?? 0);
  const size = s.size ?? FULL;
  const { ringAngle: _a, ringRadius: _r, at: _at, size: _s, ...rest } = s;
  return { ...rest, n: chapter, x: pos.x, y: pos.y, w: size.w, h: size.h };
});

export const TOTAL_CHAPTERS = chapter;

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
  1: { x: 0, y: 400, zoom: 0.115 },
  2: { x: 0, y: 200, zoom: 0.2 },
  3: { x: 2000, y: 420, zoom: 0.16 },
};

export const OVERVIEW = { x: 900, y: 700, zoom: 0.075 };

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
export const PERIOD =
  "Período de observação 05/08–04/09/2026 · consulta 04/09/2026";
