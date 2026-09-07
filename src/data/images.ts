/**
 * Registo único de todas as imagens da apresentação.
 *
 * Para substituir uma imagem de referência pela peça final:
 *   1. coloca o ficheiro em src/assets/
 *   2. troca `src` pela nova importação
 *   3. muda `isPlaceholder` para false  → a faixa "REFERÊNCIA · SUBSTITUIR" desaparece
 */
import refPorcelana from "@/assets/ref-porcelana.jpg";
import refMesa from "@/assets/ref-mesa.jpg";
import refMaquete from "@/assets/ref-maquete.jpg";

export type RefKind = "desktop" | "mobile" | "post" | "maquete";

export type RefImage = {
  id: string;
  /** fotografia genérica usada dentro da simulação (ou a peça final) */
  src: string;
  caption: string;
  canal: string;
  /** data da captura a fazer / feita */
  data: string;
  /** URL real mostrado na barra de endereço */
  url?: string;
  kind: RefKind;
  isPlaceholder: boolean;
  /** campos de publicação (kind === "post") */
  perfil?: string;
  formato?: string;
  tema?: string;
  cta?: string;
  reacoes?: string;
  comentarios?: string;
};

const PLACEHOLDER_NOTE = (d: string) =>
  `imagem de referência — a substituir pela captura de ${d}`;

export function captionOf(img: RefImage) {
  return img.isPlaceholder ? `${img.caption} · ${PLACEHOLDER_NOTE(img.data)}` : img.caption;
}

/* ── capturas de website (Fig. 1-9) ─────────────────────────────────────── */

export const FIGURAS: RefImage[] = [
  {
    id: "fig1-spal-home",
    src: refPorcelana,
    caption: "Fig. 1 · spal.pt · página inicial (desktop)",
    canal: "Website SPAL",
    data: "04/09/2026",
    url: "https://www.spal.pt/",
    kind: "desktop",
    isPlaceholder: true,
  },
  {
    id: "fig2-spal-colecoes",
    src: refMesa,
    caption: "Fig. 2 · spal.pt · Uso Diário, coleções em miniaturas numeradas",
    canal: "Website SPAL",
    data: "04/09/2026",
    url: "https://www.spal.pt/index.php/mesa/uso-diario",
    kind: "desktop",
    isPlaceholder: true,
  },
  {
    id: "fig3-spal-ficha",
    src: refPorcelana,
    caption: "Fig. 3 · spal.pt · ficha Electric Rain, sem preço e sem compra",
    canal: "Website SPAL",
    data: "04/09/2026",
    url: "https://www.spal.pt/index.php/mesa/uso-diario/electricrain",
    kind: "desktop",
    isPlaceholder: true,
  },
  {
    id: "fig4-spal-lojas",
    src: refMesa,
    caption: "Fig. 4 · spal.pt · página Lojas com ligações externas",
    canal: "Website SPAL",
    data: "04/09/2026",
    url: "https://www.spal.pt/index.php/contactos/lojas",
    kind: "desktop",
    isPlaceholder: true,
  },
  {
    id: "fig5-vaa-home",
    src: refMesa,
    caption: "Fig. 5 · vistaalegre.com/pt · página inicial da loja",
    canal: "Website Vista Alegre",
    data: "04/09/2026",
    url: "https://vistaalegre.com/pt",
    kind: "desktop",
    isPlaceholder: true,
  },
  {
    id: "fig6-vaa-produto",
    src: refPorcelana,
    caption: "Fig. 6 · vistaalegre.com/pt · ficha com preço, compra e wishlist",
    canal: "Website Vista Alegre",
    data: "04/09/2026",
    url: "https://vistaalegre.com/pt/presentes",
    kind: "desktop",
    isPlaceholder: true,
  },
  {
    id: "fig7-vaa-lojas",
    src: refMesa,
    caption: "Fig. 7 · vistaalegre.com/pt · store locator com horários",
    canal: "Website Vista Alegre",
    data: "04/09/2026",
    url: "https://vistaalegre.com/pt/lojas",
    kind: "desktop",
    isPlaceholder: true,
  },
  {
    id: "fig8-spal-mobile",
    src: refPorcelana,
    caption: "Fig. 8 · spal.pt no telemóvel · plataforma de 2013",
    canal: "Website SPAL",
    data: "04/09/2026",
    url: "https://www.spal.pt/",
    kind: "mobile",
    isPlaceholder: true,
  },
  {
    id: "fig9-vaa-mobile",
    src: refMesa,
    caption: "Fig. 9 · vistaalegre.com/pt no telemóvel · app instalável",
    canal: "Website Vista Alegre",
    data: "04/09/2026",
    url: "https://vistaalegre.com/pt",
    kind: "mobile",
    isPlaceholder: true,
  },
];

export const FIG = Object.fromEntries(FIGURAS.map((f) => [f.id, f])) as Record<string, RefImage>;

/** figura usada em cada dimensão do website: [SPAL, Vista Alegre] */
export const DUELO_FIGS: [string, string][] = [
  ["fig1-spal-home", "fig5-vaa-home"],
  ["fig2-spal-colecoes", "fig6-vaa-produto"],
  ["fig3-spal-ficha", "fig6-vaa-produto"],
  ["fig4-spal-lojas", "fig7-vaa-lojas"],
  ["fig8-spal-mobile", "fig9-vaa-mobile"],
  ["fig1-spal-home", "fig5-vaa-home"],
];

/* ── publicações (12 cartões da secção C) ───────────────────────────────── */

const post = (
  id: string,
  perfil: string,
  canal: "Instagram" | "Facebook",
  src: string,
  extra: Partial<RefImage>,
): RefImage => ({
  id,
  src,
  caption: `Publicação ${id.replace("post-", "")} · ${perfil} · ${canal}`,
  canal,
  perfil,
  data: "[data exemplo: 00/09/2026]",
  formato: "[formato exemplo: imagem]",
  tema: "[tema exemplo: nova coleção de outono]",
  cta: "[CTA exemplo: Ver mais]",
  reacoes: "[reações: 000]",
  comentarios: "[comentários: 00]",
  kind: "post",
  isPlaceholder: true,
  ...extra,
});

export const POSTS: RefImage[] = [
  post("post-1", "SPAL Porcelanas", "Facebook", refMesa, {
    data: "24/08/2026",
    formato: "imagem",
    tema: "Arte que se serve à mesa…",
    reacoes: "9",
    comentarios: "[comentários: 00]",
    cta: "[CTA exemplo: Saber mais]",
  }),
  post("post-2", "@spalporcelanasofficial", "Instagram", refPorcelana, {}),
  post("post-3", "@spalporcelanasofficial", "Instagram", refMesa, {}),
  post("post-4", "SPAL Porcelanas", "Facebook", refPorcelana, {}),
  post("post-5", "@spalporcelanasofficial", "Instagram", refMesa, {}),
  post("post-6", "SPAL Porcelanas", "Facebook", refPorcelana, {}),
  post("post-7", "@vistaalegreofficial", "Instagram", refPorcelana, {
    data: "~28/08/2026",
    formato: "carrossel",
    tema: "Coleção Niemeyer: 6 pratos colecionáveis com a Fundação Niemeyer",
    cta: "[CTA exemplo: Comprar agora]",
  }),
  post("post-8", "@vistaalegreofficial", "Instagram", refMesa, {}),
  post("post-9", "@vistaalegreofficial", "Instagram", refPorcelana, {}),
  post("post-10", "Vista Alegre", "Facebook", refMesa, {}),
  post("post-11", "Vista Alegre", "Facebook", refPorcelana, {}),
  post("post-12", "Vista Alegre", "Facebook", refMesa, {}),
];

/* ── maquete da publicação (secção E) ───────────────────────────────────── */

export const MAQUETE: RefImage = {
  id: "maquete-publicacao",
  src: refMaquete,
  caption: "Maquete da publicação · Instagram SPAL · carrossel 1080×1350",
  canal: "Instagram",
  data: "08/09/2026",
  url: "https://www.spal.pt/index.php/contactos/lojas",
  kind: "maquete",
  isPlaceholder: true,
};

/* ── perfis para a biografia antes/depois (texto real, não provisório) ──── */

export const PERFIL_SPAL = {
  id: "perfil-spal-ig",
  handle: "@spalporcelanasofficial",
  seguidores: 5961,
  publicacoes: 305,
};

export const ALL_IMAGE_IDS = [
  ...FIGURAS.map((f) => f.id),
  ...POSTS.map((p) => p.id),
  MAQUETE.id,
  PERFIL_SPAL.id,
];
