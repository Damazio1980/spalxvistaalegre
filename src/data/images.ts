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
import vaaPost1 from "@/assets/social-posts/vaa-post-1.jpg.asset.json";
import vaaPost2Archive from "@/assets/social-posts/vaa-post-2-archive.jpg.asset.json";
import vaaPost2Product from "@/assets/social-posts/vaa-post-2-product.jpg.asset.json";
import vaaPost4Image1 from "@/assets/social-posts/vaa-post-4-1.jpg.asset.json";
import vaaPost4Image2 from "@/assets/social-posts/vaa-post-4-2.jpg.asset.json";
import vaaPost4Image3 from "@/assets/social-posts/vaa-post-4-3.jpg.asset.json";
import vaaPost4Image4 from "@/assets/social-posts/vaa-post-4-4.jpg.asset.json";
import vaaPost4Image5 from "@/assets/social-posts/vaa-post-4-5.jpg.asset.json";
import spalPost8 from "@/assets/social-posts/spal-ig-7383.jpg.asset.json";
import spalPost9Video from "@/assets/social-posts/spal-ig-7385.jpg.asset.json";
import spalPost9Copy from "@/assets/social-posts/spal-ig-7386.jpg.asset.json";
import spalPost10Cover from "@/assets/social-posts/spal-ig-7388.jpg.asset.json";
import spalPost10Image4 from "@/assets/social-posts/spal-ig-7391.jpg.asset.json";
import spalPost10Image5 from "@/assets/social-posts/spal-ig-7392.jpg.asset.json";
import spalPost10Image6 from "@/assets/social-posts/spal-ig-7393.jpg.asset.json";
import spalPost10Image7 from "@/assets/social-posts/spal-ig-7394.jpg.asset.json";
import spalPost10Image8 from "@/assets/social-posts/spal-ig-7395.jpg.asset.json";
import spalPost10Image9 from "@/assets/social-posts/spal-ig-7396.jpg.asset.json";
import vaaFbOutono from "@/assets/social-posts/vaa-fb-outono.jpg.asset.json";
import vaaFbHistory from "@/assets/social-posts/vaa-fb-history.jpg.asset.json";
import vaaFbPatrimonio from "@/assets/social-posts/vaa-fb-patrimonio.jpg.asset.json";
import spalFbRecrutamento from "@/assets/social-posts/spal-fb-recrutamento.jpg.asset.json";
import spalFbArteCopy from "@/assets/social-posts/spal-fb-arte-copy.jpg.asset.json";
import spalFbArteVideo from "@/assets/social-posts/spal-fb-arte-video.png.asset.json";
import spalFbSustentabilidadeCopy from "@/assets/social-posts/spal-fb-sustentabilidade-copy.jpg.asset.json";
import spalFbSustentabilidade from "@/assets/social-posts/spal-fb-sustentabilidade.jpg.asset.json";

export type RefKind = "desktop" | "mobile" | "post" | "maquete";

export type RefImage = {
  id: string;
  /** fotografia genérica usada dentro da simulação (ou a peça final) */
  src: string;
  /** imagens adicionais quando a publicação é um carrossel */
  gallery?: string[];
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
  post("post-1", "@vistaalegreofficial", "Instagram", vaaPost1.url, {
    data: "23/09",
    formato: "Reel (7s)",
    tema: "Lançamento coleção Outono",
    cta: "nenhum explícito",
    reacoes: "130 gostos, 2 comentários, 3 reposts, 11 envios",
    isPlaceholder: false,
  }),
  post("post-2", "@vistaalegreofficial", "Instagram", vaaPost2Archive.url, {
    data: "21/09", formato: "Carrossel 2 fotos", tema: "History — bilha de 1931", cta: "nenhum", reacoes: "155 gostos, 4 reposts/partilhas",
    gallery: [vaaPost2Archive.url, vaaPost2Product.url],
    isPlaceholder: false,
  }),
  post("post-3", "@vistaalegreofficial", "Instagram", vaaPost4Image1.url, {
    data: "18/09", formato: "Carrossel 5 fotos", tema: "Nova loja no Fórum Algarve", cta: "Venha conhecer as nossas coleções", reacoes: "1.324 gostos, 18 comentários, 2 reposts, 44 envios",
    gallery: [vaaPost4Image1.url, vaaPost4Image2.url, vaaPost4Image3.url, vaaPost4Image4.url, vaaPost4Image5.url],
    isPlaceholder: false,
  }),
  post("post-4", "Vista Alegre", "Facebook", vaaFbOutono.url, {
    data: "23/09 (há 6h)", formato: "Vídeo", tema: "Lançamento coleção Outono", cta: "nenhum", reacoes: "[não visível na captura]",
    isPlaceholder: false,
  }),
  post("post-5", "Vista Alegre", "Facebook", vaaFbHistory.url, {
    data: "21/09 (há 2 dias)", formato: "Carrossel", tema: "History — bilha de 1931 e Art Déco", cta: "nenhum", reacoes: "35 gostos, 2 partilhas",
    isPlaceholder: false,
  }),
  post("post-6", "Vista Alegre", "Facebook", vaaFbPatrimonio.url, {
    data: "21/09 (há 2 dias)", formato: "Carrossel", tema: "Jornadas Europeias do Património", cta: "Conheça aqui as atividades e programação", reacoes: "[não visível]",
    isPlaceholder: false,
  }),
  post("post-7", "@spalporcelanasofficial", "Instagram", spalPost8.url, {
    data: "09/09", formato: "Imagem única", tema: "Recrutamento — Assistente de Loja", cta: "envie o seu CV para rh@spal.pt", reacoes: "24 gostos, 12 envios",
    isPlaceholder: false,
  }),
  post("post-8", "@spalporcelanasofficial", "Instagram", spalPost9Video.url, {
    data: "24/08", formato: "Reel", tema: "Arte que se serve à mesa", cta: "nenhum", reacoes: "17 gostos, 1 repost, 4 envios",
    gallery: [spalPost9Video.url, spalPost9Copy.url],
    isPlaceholder: false,
  }),
  post("post-9", "@spalporcelanasofficial", "Instagram", spalPost10Cover.url, {
    data: "28/07", formato: "Carrossel 9 imagens", tema: "Sustentabilidade", cta: "nenhum", reacoes: "36 gostos, 1 envio",
    gallery: [spalPost10Cover.url, spalPost10Image4.url, spalPost10Image5.url, spalPost10Image6.url, spalPost10Image7.url, spalPost10Image8.url, spalPost10Image9.url],
    isPlaceholder: false,
  }),
  post("post-10", "SPAL Porcelanas", "Facebook", spalFbRecrutamento.url, {
    data: "09/09", formato: "Imagem única", tema: "Recrutamento Assistente de Loja", cta: "envie o seu CV para rh@spal.pt", reacoes: "5 gostos, 2 partilhas",
    isPlaceholder: false,
  }),
  post("post-11", "SPAL Porcelanas", "Facebook", spalFbArteCopy.url, {
    data: "24/08", formato: "Reel", tema: "Arte que se serve à mesa", cta: "nenhum", reacoes: "10 reações, 1 partilha",
    gallery: [spalFbArteCopy.url, spalFbArteVideo.url],
    isPlaceholder: false,
  }),
  post("post-12", "SPAL Porcelanas", "Facebook", spalFbSustentabilidadeCopy.url, {
    data: "28/07", formato: "Carrossel 9 imagens", tema: "Sustentabilidade", cta: "nenhum", reacoes: "18 gostos, 1 partilha",
    gallery: [spalFbSustentabilidadeCopy.url, spalFbSustentabilidade.url],
    isPlaceholder: false,
  }),
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
