import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BadgeCheck, ChevronDown, Facebook, Globe, Instagram, Maximize2, Play, X } from "lucide-react";
import spinningPlate from "@/assets/spinning-plate.png.asset.json";
import coverAbertura from "@/assets/cover-abertura.png.asset.json";
import identidadeVideo from "@/assets/identidade-6d-spal.mp4.asset.json";
import identidadeVaaVideo from "@/assets/identidade-vaa.mp4.asset.json";
import navegacaoSpalVideo from "@/assets/navegacao-spal.mp4.asset.json";
import navegacaoVaaVideo from "@/assets/navegacao-vista-alegre.mp4.asset.json";
import produtoSpalVideo from "@/assets/produto-spal.mp4.asset.json";
import produtoVaaVideo from "@/assets/produto-vista-alegre.mp4.asset.json";
import compraSpalVideo from "@/assets/compra-spal.mp4.asset.json";
import compraVaaVideo from "@/assets/compra-vaa.mp4.asset.json";
import telemovelSpalVideo from "@/assets/telemovel-spal.mp4.asset.json";
import telemovelVaaVideo from "@/assets/telemovel-vista-alegre.mp4.asset.json";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Chip, DuelBar, Glossary, Num, Reveal, Shot, useLightbox } from "./primitives";
import { RefShot } from "./mocks";
import { FIG, POSTS } from "@/data/images";
import {
  AudienciaLog,
  BarrasDimensoes,
  ChartPanel,
  DonutExportacao,
  EvolucaoVAA,
  PassosChart,
  RadarDimensoes,
  ReacoesPorPublicacao,
} from "./charts";


export type ChapterProps = { active: boolean; subframe?: number };

const SPAL = "var(--spal)";
const VAA = "var(--vaa)";

export function Capa({}: ChapterProps) {
  return (
    <div className="h-full w-full overflow-hidden">
      <img
        src={coverAbertura.url}
        alt="Capa da apresentação SPAL e Vista Alegre"
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
}

export function Apresentacao({ active }: ChapterProps) {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-navy p-12 text-porcelain">
      <div className="relative z-10 flex w-full max-w-[1120px] items-center justify-center gap-16">
        <div className="max-w-[620px] text-center">
          <Reveal i={1}>
            <h1 className="deck-title">
              SPAL <span className="text-vaa">×</span> Vista Alegre
            </h1>
          </Reveal>
          <Reveal i={2}>
            <p className="mx-auto mt-6 max-w-[560px] text-2xl leading-snug text-porcelain/90">
              Duas porcelanas portuguesas
            </p>
          </Reveal>
        </div>
        <div className="relative z-10 h-[420px] w-[420px] shrink-0">
          <div
            className="absolute inset-0 overflow-hidden rounded-full bg-porcelain"
            style={{ animation: active ? "deck-spin 26s linear infinite" : "none" }}
          >
            <img
              src={spinningPlate.url}
              alt="Prato SPAL × Vista Alegre"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionSlide({ title, subtitle, roseAccent = false }: { title: string; subtitle?: string; roseAccent?: boolean }) {
  return (
    <div className="section-slide flex h-full flex-col items-start justify-center px-24 text-left">
      <div className={cn("mb-8 h-px w-28", roseAccent ? "bg-vaa" : "bg-current opacity-40")} />
      <Reveal i={0}>
        <h2 className="deck-title text-[64px] leading-tight">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal i={1}>
          <p className="mt-5 max-w-[760px] text-[28px] leading-snug opacity-75">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

export function ApresentacaoEmpresas() {
  return <SectionSlide title="APRESENTAÇÃO DAS EMPRESAS" />;
}

export function IdentificacaoCanais() {
  return <SectionSlide title="IDENTIFICAÇÃO DOS CANAIS" roseAccent />;
}

export function IntroducaoWebsite() {
  return <SectionSlide title="WEBSITE" />;
}

export function Nomes({ active }: ChapterProps) {
  return (
    <div className="sample-company-slide flex h-full flex-col gap-5 px-14 pb-10 pt-14 text-navy">
    <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_0.85fr] gap-12">

      <div className="space-y-5">
        <Reveal i={0} className="border-t border-navy/25 py-5">
          <p className="text-xs font-bold uppercase tracking-widest text-spal">SPAL</p>
          <p className="mt-2 text-[15px] leading-relaxed text-navy/75">
            Alcobaça, 1965. Desenha e produz porcelana para casas e para hotelaria. Cerca de{" "}
            <strong>60 % de exportação</strong>, mais de <strong>45 países</strong>, com o SPAL
            Studio a criar coleções próprias.
          </p>
        </Reveal>
        <Reveal i={1} className="border-t border-navy/20 py-5">
          <p className="text-xs font-bold uppercase tracking-widest text-vaa">
            Vista Alegre
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-navy/75">
            Ílhavo, 1824. Grupo cotado em bolsa, arte e colecionismo, loja online a funcionar, cerca
            de <strong>25 lojas</strong> e <strong>6 outlets</strong>.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          <Reveal i={2} className="border-l border-spal/40 pl-5 text-navy">
            <Num value={71.3} decimals={1} suffix=" M€" active={active} className="text-5xl" />
            <p className="mt-2 text-xs text-navy/65">Vendas VAA, 1.º semestre 2026 (+1,6 %)</p>
          </Reveal>
          <Reveal i={3} className="border-l border-vaa/50 pl-5 text-navy">
            <Num value={4.3} decimals={1} suffix=" M€" active={active} className="text-5xl" />
            <p className="mt-2 text-xs text-navy/65">Resultado líquido (+18,9 %)</p>
          </Reveal>
        </div>
      </div>
      <Reveal i={2} className="relative border-l border-navy/15 pl-10 pt-5">
        <p className="text-sm font-semibold text-navy/65">Portugal, três pontos</p>
        <PortugalMap />
      </Reveal>
    </div>
      <div className="grid h-[190px] shrink-0 grid-cols-[1.3fr_1fr] gap-4">
        <ChartPanel
          title="Evolução Vista Alegre · 1.º semestre"
          note="Volume de negócios 70,2 → 71,3 M€ · resultado líquido 3,6 → 4,3 M€"
        >
          <EvolucaoVAA active={active} />
        </ChartPanel>
        <ChartPanel title="Peso da exportação" note="valores aproximados">
          <div className="flex h-full gap-2">
            <DonutExportacao label="SPAL" value={60} color={SPAL} active={active} />
            <DonutExportacao label="Vista Alegre" value={70} color={VAA} active={active} />
          </div>
        </ChartPanel>
      </div>
    </div>

  );
}

function PortugalMap() {
  return (
    <div className="relative mt-3 h-[390px] w-full" aria-label="Mapa de Portugal com Ílhavo e Alcobaça assinalados">
      <svg viewBox="0 0 330 430" className="h-full w-full" role="img">
        <path
          d="M112 20 L155 29 L174 57 L169 87 L190 116 L176 148 L185 180 L168 209 L180 240 L160 269 L167 300 L148 332 L145 370 L119 404 L86 390 L76 352 L61 324 L70 288 L56 255 L67 221 L57 185 L72 151 L66 116 L86 84 L82 52 Z"
          className="fill-porcelain stroke-navy"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M122 144 L232 110" className="stroke-vaa" strokeWidth="2" />
        <circle cx="122" cy="144" r="7" className="fill-vaa" />
        <text x="240" y="108" className="fill-vaa text-[13px] font-bold">Ílhavo</text>
        <text x="240" y="126" className="fill-navy text-[11px]">Vista Alegre · 1824</text>
        <path d="M109 204 L232 194" className="stroke-spal" strokeWidth="2" />
        <circle cx="109" cy="204" r="7" className="fill-spal" />
        <text x="240" y="192" className="fill-spal text-[13px] font-bold">Alcobaça</text>
        <text x="240" y="210" className="fill-navy text-[11px]">SPAL · 1965</text>
        <path d="M117 218 L232 265" className="stroke-vaa" strokeWidth="2" strokeDasharray="5 5" />
        <circle cx="117" cy="218" r="6" className="fill-vaa stroke-porcelain" strokeWidth="2" />
        <text x="240" y="260" className="fill-vaa text-[13px] font-bold">Alcobaça</text>
        <text x="240" y="278" className="fill-navy text-[11px]">Loja + outlet VAA · 2026</text>
      </svg>
    </div>
  );
}

export function Pergunta() {
  return (
    <div className="sample-question-slide flex h-full flex-col items-start justify-center gap-8 px-24 text-left text-porcelain">
      <Reveal i={0}>
        <h2 className="deck-title text-[64px]">A PERGUNTA</h2>
      </Reveal>
      <Reveal i={1}>
        <p className="max-w-[900px] border-l border-porcelain/40 pl-8 text-[28px] font-semibold leading-snug text-porcelain/85">
          Qual das marcas facilita melhor o percurso entre descobrir um produto, obter informação e
          avançar para a compra ou para um contacto?
        </p>
      </Reveal>
      <div className="flex gap-4">
        {["Descobrir", "Informar", "Comprar"].map((c, i) => (
          <Chip key={c} tone="light" delay={400 + i * 350} className="px-6 py-2 text-lg">
            {c}
          </Chip>
        ))}
      </div>
    </div>
  );
}

type Canal = {
  marca: "SPAL" | "Vista Alegre";
  nome: "Website" | "Instagram" | "Facebook";
  endereco: string;
  autenticidade: string;
  publico: string;
  funcao: string;
};

const CANAIS: Canal[] = [
  {
    marca: "SPAL",
    nome: "Website",
    endereco: "spal.pt (sem redirecionamento; PT/EN/ES/FR)",
    autenticidade:
      "domínio próprio; morada da sede e Loja de Fábrica; ligação ao Livro de Reclamações",
    publico:
      "comprador profissional (retalho, hotelaria, corporate); consumidor final em segundo plano",
    funcao: "Informar",
  },
  {
    marca: "SPAL",
    nome: "Instagram",
    endereco: "instagram.com/spalporcelanasofficial",
    autenticidade: "ligado a partir do rodapé de spal.pt; 5 961 seguidores · 305 publicações",
    publico: "internacional / design (bio em inglês)",
    funcao: "Inspirar",
  },
  {
    marca: "SPAL",
    nome: "Facebook",
    endereco: "facebook.com/SPALPorcelanas",
    autenticidade: "ligado a partir do site; 15 700 gostos; morada e horário da loja de fábrica",
    publico: "consumidor português (bio em PT)",
    funcao: "Encaminhar para compra (link para El Corte Inglés)",
  },
  {
    marca: "Vista Alegre",
    nome: "Website",
    endereco:
      "vistaalegre.com/pt (confirmar região PT; redireciona por geolocalização fora de Portugal)",
    autenticidade:
      "domínio próprio; loja online com preços, carrinho, wishlist, login; política de privacidade, termos, cookies; ligação ao Grupo Visabeira e a Investidores",
    publico: "consumidor final (prendas, mesa, decoração, colecionismo) + corporate",
    funcao: "Comprar",
  },
  {
    marca: "Vista Alegre",
    nome: "Instagram",
    endereco: "instagram.com/vistaalegreofficial",
    autenticidade:
      '360 000 seguidores · 3 717 publicações; bio "The Official Instagram for Vista Alegre"',
    publico: "consumidor global, decoração e lifestyle",
    funcao: "Inspirar + comprar",
  },
  {
    marca: "Vista Alegre",
    nome: "Facebook",
    endereco: "facebook.com/vistaalegreofficial",
    autenticidade:
      'selo azul de verificado; 347 000 seguidores · 6 000 publicações; "Recomendado por 92% (293 avaliações)"',
    publico: "consumidor português",
    funcao: "Informar + confiança",
  },
];

const OUTROS_SPAL = ["Pinterest", "YouTube", "LinkedIn", "sem newsletter — não confirmada"];
const OUTROS_VAA = ["Newsletter", "App instalável", "Pinterest", "YouTube", "LinkedIn"];

function CanalCard({ canal, i }: { canal: Canal; i: number }) {
  const tone = canal.marca === "SPAL" ? "spal" : "vaa";
  const Icon = canal.nome === "Instagram" ? Instagram : canal.nome === "Facebook" ? Facebook : Globe;
  return (
    <Reveal
      i={i}
      className="min-h-0 border-t border-porcelain/25 px-1 py-3"
    >
      <div className="flex items-center gap-2 pb-1.5">
        <span
          className={cn("flex h-7 w-7 shrink-0 items-center justify-center", tone === "spal" ? "text-porcelain" : "text-vaa")}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <p className={cn("text-[14.5px] font-extrabold", tone === "spal" ? "text-porcelain" : "text-vaa")}>
          {canal.marca} · {canal.nome}
        </p>
      </div>
      <div className="mt-2 space-y-1 text-[12.5px] leading-[1.18] text-porcelain/75">
        <p><strong className="text-porcelain">Endereço:</strong> {canal.endereco}</p>
        <p><strong className="text-porcelain">Indício de autenticidade:</strong> {canal.autenticidade}</p>
        <p><strong className="text-porcelain">Público aparente:</strong> {canal.publico}</p>
        <p><strong className="text-porcelain">Função:</strong> {canal.funcao}</p>
      </div>
    </Reveal>
  );
}

export function Canais({ active, subframe = 0 }: ChapterProps) {
  const titles = ["Os canais e as suas funções", "Audiência e outros canais confirmados"];
  const spalCanais = CANAIS.filter((canal) => canal.marca === "SPAL");
  const vaaCanais = CANAIS.filter((canal) => canal.marca === "Vista Alegre");
  return (
    <div className={cn("sample-channels-slide flex h-full flex-col gap-4 px-12 pb-8 pt-12", subframe === 0 ? "channels-page-one text-porcelain" : "text-navy")}>
      <div className="flex shrink-0 items-end justify-between">
        <Reveal i={0}>
          <h3 className={cn("mt-1 font-[var(--font-display)] text-[32px] font-extrabold leading-none", subframe === 0 ? "text-porcelain" : "text-navy")}>
            {titles[subframe]}
          </h3>
        </Reveal>
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1].map((page) => (
            <span key={page} className={cn("h-1.5 w-8 rounded-full", page === subframe ? (subframe === 0 ? "bg-vaa" : "bg-navy") : (subframe === 0 ? "bg-porcelain/20" : "bg-navy/15"))} />
          ))}
        </div>
      </div>

      {subframe === 0 && (
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
          <div className="grid min-h-0 grid-rows-3 gap-2.5">
            {spalCanais.map((canal, i) => <CanalCard key={`${canal.marca}-${canal.nome}`} canal={canal} i={i + 1} />)}
          </div>
          <div className="grid min-h-0 grid-rows-3 gap-2.5">
            {vaaCanais.map((canal, i) => <CanalCard key={`${canal.marca}-${canal.nome}`} canal={canal} i={i + 4} />)}
          </div>
        </div>
      )}

      {subframe === 1 && (
        <div className="grid min-h-0 flex-1 grid-rows-[1.35fr_0.65fr] gap-4">
          <div className="grid min-h-0 grid-cols-[1.55fr_0.75fr] gap-6">
            <Reveal i={1} className="min-h-0 border-y border-navy/15 py-5">
              <ChartPanel title="IG seguidores · IG publicações · Facebook seguidores" note="audiência ≠ vendas" className="h-full border-0 bg-transparent p-0">
                <AudienciaLog active={active} />
              </ChartPanel>
            </Reveal>
            <Reveal i={2} className="flex items-center border-l-2 border-vaa pl-7">
              <p className="text-[22px] font-semibold leading-snug text-navy">
                A Vista Alegre usa o site como loja e as redes como montra. A SPAL usa o site como catálogo e as redes como galeria.
              </p>
            </Reveal>
          </div>
          <div className="grid min-h-0 grid-cols-2 gap-6">
            <Reveal i={2} className="flex min-h-0 flex-col border-t-2 border-spal px-1 py-4">
              <p className="text-xs font-extrabold uppercase tracking-widest text-spal">SPAL · outros canais</p>
              <p className="mt-2 text-[13px] font-semibold leading-relaxed text-navy">{OUTROS_SPAL.join(" · ")}</p>
              <div className="mt-auto border-t border-navy/10 pt-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-navy/45">Contactos</p>
                <p className="mt-1 text-[12px] font-semibold text-navy">loja.alcobaca@spal.pt</p>
                <p className="text-[12px] font-semibold text-navy">outlet.alcobaca@spal.pt</p>
              </div>
            </Reveal>
            <Reveal i={3} className="flex min-h-0 flex-col border-t-2 border-vaa px-1 py-4">
              <p className="text-xs font-extrabold uppercase tracking-widest text-vaa">Vista Alegre · outros canais</p>
              <p className="mt-2 text-[13px] font-semibold leading-relaxed text-navy">{OUTROS_VAA.join(" · ")}</p>
              <div className="mt-auto border-t border-navy/10 pt-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-navy/45">Contactos</p>
                <p className="mt-1 text-[12px] font-semibold text-navy">socialmedia@vistaalegre.com</p>
                <p className="text-[12px] font-semibold text-navy">vistaalegre.com</p>
              </div>
            </Reveal>
          </div>
        </div>
      )}
    </div>
  );
}

const DUELOS = [
  {
    id: 1,
    title: "Identidade e mensagem",
    spal: {
      obs: "Menu por segmento (Mesa, Hotelaria, Gift, Soluções Personalizadas); secção Design Spal; mas sobreposição de idioma na entrada, notícias de 2015, catálogos 2011-2013, rodapé © 2013.",
      score: 3,
    },
    vaa: {
      obs: "Montra de coleções com narrativa; menu por ocasião e público (Para Ela, Para Ele, Crianças); novidades e best sellers com preço.",
      score: 5,
    },
  },
  {
    id: 2,
    title: "Navegação e pesquisa",
    spal: {
      obs: "Sem campo de pesquisa; coleções listadas como miniaturas numeradas (1, 2, 3…); 5 cliques até uma peça.",
      score: 2,
    },
    vaa: {
      obs: "Pesquisa, filtros por preço e stock, vistos recentemente, wishlist; 3-4 cliques.",
      score: 5,
    },
  },
  {
    id: 3,
    title: "Informação do produto",
    spal: {
      obs: "Ficha Electric Rain: 5 fotos de ambiente + 11 peças com medidas, peso, capacidade, referência e 'Pack 04/24'. Sem preço, sem uso/cuidados.",
      score: 3,
    },
    vaa: { obs: "Preço, botão de compra, cuidados de produto, catálogo de prendas.", score: 5 },
  },
  {
    id: 4,
    title: "Próximo passo",
    spal: {
      obs: "Sem preço nem compra; página Lojas com ligações externas (El Corte Inglés, parceiros) e e-mails ilegíveis.",
      score: 1,
    },
    vaa: {
      obs: "Compra na ficha; store locator com ~25 lojas e 6 outlets com telefone, e-mail e horário.",
      score: 5,
    },
  },
  {
    id: 5,
    title: "Telemóvel",
    spal: { obs: "Plataforma de 2013, menu por hover, slideshows.", score: 2 },
    vaa: { obs: "Meta viewport, app instalável.", score: 4 },
  },
  {
    id: 6,
    title: "Integração e confiança",
    spal: {
      obs: "Redes no rodapé, Livro de Reclamações; privacidade e cookies na mesma página; sem newsletter; link do Facebook desatualizado.",
      score: 2,
    },
    vaa: {
      obs: "Newsletter, contactos, termos, tabela de cookies, certificações, ligação ao grupo. ★ Recomendado por 92% (293 avaliações) no Facebook.",
      score: 5,
    },
  },
];

function Dots({ n, tone }: { n: number; tone: "spal" | "vaa" }) {
  return (
    <span className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2.5 w-2.5 rounded-full ${
            i < n ? (tone === "spal" ? "bg-spal" : "bg-vaa") : "bg-navy/12"
          }`}
        />
      ))}
    </span>
  );
}

export function Website({ active }: ChapterProps) {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <div className="grid h-full grid-cols-[1.15fr_0.85fr] gap-6 p-10">
      <div className="flex min-h-0 flex-col gap-3">
        <Reveal i={0}>
          <h3 className="mt-1 font-[var(--font-display)] text-[26px] font-extrabold leading-tight text-navy">
            Seis dimensões, um padrão: a SPAL informa o profissional, a Vista Alegre serve o
            consumidor.
          </h3>
        </Reveal>
        <div className="min-h-0 flex-1 space-y-2 overflow-hidden">
          {DUELOS.map((d, i) => {
            const isOpen = open === d.id;
            return (
              <Reveal key={d.id} i={i + 1}>
                <button
                  onClick={() => setOpen(isOpen ? null : d.id)}
                  aria-expanded={isOpen}
                  className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-left transition-colors hover:border-navy/25"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-navy/35">0{d.id}</span>
                    <span className="flex-1 text-[14px] font-semibold text-navy">{d.title}</span>
                    <Dots n={d.spal.score} tone="spal" />
                    <Dots n={d.vaa.score} tone="vaa" />
                    <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-navy/45">
                      {isOpen ? "fechar" : "abrir"}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </div>
                  {isOpen && (
                    <div className="deck-rise mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-spal/20 bg-porcelain p-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-spal">
                          SPAL {d.spal.score}/5
                        </p>
                        <p className="mt-1 text-[12px] leading-snug text-navy/75">{d.spal.obs}</p>
                      </div>
                      <div className="rounded-xl border border-vaa/35 bg-porcelain p-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-vaa">
                          Vista Alegre {d.vaa.score}/5
                        </p>
                        <p className="mt-1 text-[12px] leading-snug text-navy/75">{d.vaa.obs}</p>
                      </div>
                    </div>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
      <Reveal i={2} className="flex min-h-0 flex-col gap-3">
        <ChartPanel
          title="Radar das seis dimensões (1 a 5)"
          className="min-h-0 flex-1"
          note="1 dificulta, 5 facilita"
        >
          <RadarDimensoes active={active} />
        </ChartPanel>
        <ChartPanel
          title="Pontuação por dimensão"
          className="min-h-0 flex-1"
          note="Toca numa linha à esquerda para abrir a evidência de cada dimensão."
        >
          <BarrasDimensoes active={active} />
        </ChartPanel>
      </Reveal>

    </div>
  );
}

const PERCURSO_SPAL = [
  "Entro em spal.pt → escolha de idioma",
  "Produto → Mesa → Colecções → Uso Diário",
  "Abro Electric Rain: medidas e referência, sem preço",
  "Procuro comprar na ficha: não existe",
  "Contactos → Lojas: saio do site para saber onde comprar",
];

const PERCURSO_VAA = [
  "Entro em vistaalegre.com/pt (confirmar região PT)",
  "Presentes → Para Ela / Para Ele",
  "Abro a peça: preço, comprar, wishlist",
  "Store locator: loja mais perto, com horário",
];

function Fluxo({
  nome,
  tone,
  passos,
  resultado,
  i,
}: {
  nome: string;
  tone: "spal" | "vaa";
  passos: string[];
  resultado: string;
  i: number;
}) {
  return (
    <div className="flex min-h-0 flex-col gap-1">
      <p
        className={`text-[11px] font-bold uppercase tracking-widest ${
          tone === "spal" ? "text-spal" : "text-vaa"
        }`}
      >
        {nome}
      </p>
      {passos.map((p, k) => (
        <Reveal key={p} i={i + k} className="flex items-start gap-2">
          <span
            className={`deck-num flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] text-white ${
              tone === "spal" ? "bg-spal" : "bg-vaa"
            }`}
          >
            {k + 1}
          </span>
          <span className="flex-1 rounded-lg border border-navy/10 bg-white px-2.5 py-1 text-[11.5px] leading-snug text-navy/80">
            {p}
          </span>
        </Reveal>
      ))}
      <Reveal i={i + passos.length} className="mt-auto">
        <p
          className={`rounded-xl px-3 py-1.5 text-[12px] font-bold leading-snug ${
            tone === "spal" ? "bg-spal/10 text-spal" : "bg-vaa/15 text-vaa"
          }`}
        >
          {resultado}
        </p>
      </Reveal>
    </div>
  );
}


export function Percurso({ active }: ChapterProps) {
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto_auto] gap-3 overflow-hidden px-8 py-5">
      <Reveal i={0}>
        <h3 className="font-[var(--font-display)] text-[22px] font-extrabold leading-tight text-navy">
          "Procuro uma peça para oferecer e quero saber como a adquirir."
        </h3>
      </Reveal>
      <div className="grid min-h-0 grid-cols-2 gap-5">
        <Fluxo
          nome="SPAL"
          tone="spal"
          passos={PERCURSO_SPAL}
          resultado="5 passos · sai do site · não confirma disponibilidade"
          i={1}
        />
        <Fluxo
          nome="Vista Alegre"
          tone="vaa"
          passos={PERCURSO_VAA}
          resultado="4 passos · compra ou loja sem sair do site"
          i={2}
        />
      </div>
      <div className="grid h-[112px] grid-cols-[1.3fr_1fr] gap-4">
        <ChartPanel title="Passos até saber como comprar">
          <PassosChart active={active} />
        </ChartPanel>
        <ChartPanel title="Sai do site para comprar?">
          <div className="flex h-full items-center justify-around">
            <div className="text-center">
              <Chip tone="spal">SPAL · Sim</Chip>
              <p className="mt-1 text-[10px] text-navy/50">termina em terceiros</p>
            </div>
            <div className="text-center">
              <Chip tone="vaa">Vista Alegre · Não</Chip>
              <p className="mt-1 text-[10px] text-navy/50">compra ou loja no site</p>
            </div>
          </div>
        </ChartPanel>
      </div>
      <Reveal i={9}>
        <p className="rounded-2xl bg-navy px-5 py-2.5 text-[14px] font-semibold text-porcelain">
          A SPAL perde o consumidor exatamente no momento em que ele decide comprar.
        </p>
      </Reveal>
    </div>
  );
}



function VideoPlayer({
  src,
  label,
  site,
  className,
  phone = false,
}: {
  src: string | null;
  label: string;
  site: string;
  className?: string;
  phone?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const bigRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  /* um clique no play: o vídeo toca já aqui, sem abrir nada */
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  /* ampliar: abre direto em ecrã cheio a tocar */
  const open = () => {
    ref.current?.pause();
    setPlaying(false);
    setExpanded(true);
  };
  const close = () => {
    bigRef.current?.pause();
    setExpanded(false);
  };

  /* enquanto o vídeo está ampliado, as teclas não mudam de slide */
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        e.preventDefault();
        close();
        return;
      }
      if (["ArrowRight", "ArrowLeft", " ", "PageUp", "PageDown"].includes(e.key)) {
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [expanded]);

  useEffect(() => {
    if (expanded) void bigRef.current?.play();
  }, [expanded]);

  if (!src) {
    return (
      <div
        className={cn(
          "relative grid place-items-center overflow-hidden rounded-2xl border-2 border-dashed border-navy/20 bg-navy/[0.06]",
          className,
        )}
      >
        <span className="grid h-16 w-16 place-items-center rounded-full bg-porcelain/80 shadow-md">
          <Play className="ml-1 h-7 w-7 fill-navy/40 text-navy/40" />
        </span>
        <span className="absolute bottom-2 left-3 rounded-full bg-porcelain/90 px-2.5 py-[2px] text-[10px] font-bold uppercase tracking-wider text-navy/60">
          vídeo a inserir · {site}
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "relative overflow-hidden bg-navy",
          phone
            ? "mx-auto w-[250px] max-w-full rounded-[30px] border-[6px] border-navy shadow-xl"
            : "rounded-2xl border border-navy/10",
          className,
        )}
      >
        {/* quadro alto e quase quadrado: o site vê-se bem à primeira vista */}
        <video
          ref={ref}
          src={src}
          onClick={toggle}
          className={cn("h-full w-full cursor-pointer", phone ? "object-contain" : "object-cover")}
          playsInline
          muted
          loop
          preload="auto"
        />
        {!playing && (
          <button
            type="button"
            onClick={toggle}
            aria-label={`Reproduzir vídeo do site da ${label}`}
            className="absolute inset-0 grid place-items-center bg-navy/20 transition-colors hover:bg-navy/5"
          >
            <span className="grid h-20 w-20 place-items-center rounded-full bg-porcelain/95 shadow-xl transition-transform hover:scale-110">
              <Play className="ml-1.5 h-9 w-9 fill-navy text-navy" />
            </span>
          </button>
        )}
        {/* ampliar: abre já em ecrã cheio, sem passos intermédios */}
        <button
          type="button"
          onClick={open}
          aria-label={`Ampliar vídeo do site da ${label}`}
          className="deck-media-control absolute bottom-2 right-2 z-10 flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-1.5 text-[11px] font-semibold text-porcelain"
        >
          <Maximize2 className="h-3.5 w-3.5" /> Ampliar
        </button>
        {phone && (
          <span className="pointer-events-none absolute left-3 top-2 rounded-full bg-porcelain/90 px-2.5 py-[2px] text-[10px] font-bold uppercase tracking-wider text-navy">
            ▶ vídeo · {site}
          </span>
        )}
      </div>

      {expanded &&
        createPortal(
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-3 bg-navy/95 p-6 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="flex w-full max-w-[1500px] items-center justify-between text-porcelain"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[12px] font-bold uppercase tracking-[0.3em]">
              {label} · {site}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar vídeo"
              className="flex items-center gap-2 rounded-full bg-porcelain/10 px-4 py-1.5 text-[12px] font-semibold text-porcelain transition hover:bg-porcelain/20"
            >
              <X className="h-4 w-4" /> Fechar
            </button>
          </div>
          <video
            ref={bigRef}
            src={src}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] w-full max-w-[1500px] rounded-2xl bg-black object-contain shadow-2xl"
            playsInline
            controls
            autoPlay
            muted
            loop
          />
        </div>,
          document.body,
        )}
    </>
  );
}


/* Vídeos por dimensão. Substitui o null pelo url do vídeo quando estiver pronto. */
const DUELO_VIDEOS: { spal: string | null; vaa: string | null }[] = [
  { spal: identidadeVideo.url, vaa: identidadeVaaVideo.url },
  { spal: navegacaoSpalVideo.url, vaa: navegacaoVaaVideo.url },
  { spal: produtoSpalVideo.url, vaa: produtoVaaVideo.url },
  { spal: compraSpalVideo.url, vaa: compraVaaVideo.url },
  { spal: telemovelSpalVideo.url, vaa: telemovelVaaVideo.url },
  { spal: null, vaa: null },
];

export function Duelo({ n, active }: { n: number; active: boolean }) {
  const d = DUELOS[n - 1]!;
  const vids = DUELO_VIDEOS[n - 1]!;
  const phone = n === 5;

  const sides = [
    {
      name: "SPAL",
      side: d.spal,
      text: "text-spal",
      src: vids.spal,
      site: "spal.pt",
    },
    {
      name: "Vista Alegre",
      side: d.vaa,
      text: "text-vaa",
      src: vids.vaa,
      site: "vistaalegre.com/pt",
    },
  ] as const;

  return (
    <div className="flex h-full flex-col gap-3 p-6">
      <Reveal i={0} className="flex shrink-0 items-baseline gap-3">
        <h3 className="font-[var(--font-display)] text-2xl font-extrabold text-navy">
          {d.title}
        </h3>
      </Reveal>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
        {sides.map(({ name, side, text, src, site }, i) => (
          <Reveal
            key={name}
            i={i + 1}
            className="flex min-h-0 flex-col"
          >
            <p className={`shrink-0 px-1 pb-1.5 text-[12px] font-bold uppercase tracking-widest ${text}`}>
              {name} <span className="deck-num text-navy/70">{side.score}/5</span>
            </p>
            {/* vídeo em destaque: ocupa quase todo o cartão, formato alto e quadrado */}
            {phone ? (
              <VideoPlayer src={src} label={name} site={site} phone className="min-h-0 flex-1" />
            ) : (
              <div className="flex min-h-0 flex-1 flex-col items-center">
                <div className="flex min-h-0 w-full flex-1 flex-col rounded-t-[14px] border-[7px] border-b-0 border-navy bg-navy">
                  <div className="flex shrink-0 items-center gap-1.5 rounded-t-[6px] bg-porcelain px-2.5 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-navy/25" />
                    <span className="h-2 w-2 rounded-full bg-navy/25" />
                    <span className="h-2 w-2 rounded-full bg-navy/25" />
                    <span className="ml-2 flex-1 truncate rounded-full bg-white px-3 py-[2px] text-[10px] text-navy/60">https://{site}</span>
                  </div>
                  <VideoPlayer src={src} label={name} site={site} className="min-h-0 flex-1 !rounded-none !border-0" />
                </div>
                <div className="h-3 w-full rounded-b-[10px] bg-navy/85" />
                <div className="h-5 w-16 bg-navy/60" />
                <div className="h-1.5 w-40 rounded-full bg-navy/60" />
              </div>
            )}
            <p className="shrink-0 px-1 pt-1.5 text-[11.5px] leading-snug text-navy/70">{side.obs}</p>
          </Reveal>
        ))}
      </div>
      <DuelBar
        label={`Pontuação da dimensão ${n} (1 a 5)`}
        spal={d.spal.score}
        vaa={d.vaa.score}
        active={active}
        i={3}
      />
    </div>
  );
}

export function Radar6({ active }: ChapterProps) {
  const data = DUELOS.map((d) => ({
    dim: d.title,
    SPAL: d.spal.score,
    "Vista Alegre": d.vaa.score,
  }));
  return (
    <div className="grid h-full grid-cols-[1fr_0.8fr] gap-8 p-12">
      <Reveal i={0} className="rounded-3xl border border-navy/10 bg-white p-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="var(--chart-grid)" />
            <PolarAngleAxis dataKey="dim" tick={{ fontSize: 11, fill: "var(--navy)" }} />
            <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend />
            <Radar
              dataKey="SPAL"
              stroke={SPAL}
              fill={SPAL}
              fillOpacity={0.35}
              isAnimationActive={active}
              animationDuration={1200}
            />
            <Radar
              dataKey="Vista Alegre"
              stroke={VAA}
              fill={VAA}
              fillOpacity={0.35}
              isAnimationActive={active}
              animationDuration={1200}
            />
          </RadarChart>
        </ResponsiveContainer>
      </Reveal>
      <div className="space-y-4">
        <Reveal i={1} className="border-y border-navy/15 bg-porcelain px-2 py-6 text-navy">
          <p className="text-sm text-navy/70">Total das seis rondas</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="border-t-2 border-spal pt-3">
              <Num value={13} active={active} className="text-6xl text-spal" />
              <p className="mt-2 text-xs text-spal">SPAL · 3-2-3-1-2-2</p>
            </div>
            <div className="border-t-2 border-vaa pt-3">
              <Num value={29} active={active} className="text-6xl text-vaa" />
              <p className="mt-2 text-xs text-vaa">Vista Alegre · 5-5-5-5-4-5</p>
            </div>
          </div>
        </Reveal>
        <Reveal i={2} className="deck-card bg-white p-6">
          <p className="text-[15px] leading-relaxed text-navy/80">
            A SPAL só se aproxima na ficha técnica. Perde onde a decisão acontece: encontrar,
            comprar e usar no telemóvel.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

type Perfil = {
  marca: "SPAL" | "Vista Alegre";
  rede: "Instagram" | "Facebook";
  handle: string;
  nums: { value: number; label: string }[];
  bio: string;
  extra?: string;
  extras?: string[];
  selo?: boolean;
};

const PERFIS: Perfil[] = [
  {
    marca: "SPAL",
    rede: "Instagram",
    handle: "@spalporcelanasofficial",
    nums: [
      { value: 5961, label: "seguidores" },
      { value: 863, label: "a seguir" },
      { value: 305, label: "publicações" },
    ],
    bio: "Finest porcelain dinnerware both for domestic and hotelware purposes. What's your view on SPAL? Tag your photos @spalporcelanasofficial",
  },
  {
    marca: "SPAL",
    rede: "Facebook",
    handle: "/SPALPorcelanas",
    nums: [{ value: 15700, label: "gostos" }],
    bio: "Desde 1965, desenhamos, produzimos e comercializamos porcelana para fins domésticos e profissionais.",
    extra: "liga para El Corte Inglés",
  },
  {
    marca: "Vista Alegre",
    rede: "Instagram",
    handle: "@vistaalegreofficial",
    nums: [
      { value: 360000, label: "seguidores" },
      { value: 1297, label: "a seguir" },
      { value: 3717, label: "publicações" },
    ],
    bio: "The Official Instagram for Vista Alegre. Inspiration, ideas and design for your home. Tag your photos with #VistaAlegre!",
  },
  {
    marca: "Vista Alegre",
    rede: "Facebook",
    handle: "/vistaalegreofficial",
    selo: true,
    nums: [
      { value: 347000, label: "seguidores" },
      { value: 6000, label: "publicações" },
    ],
    bio: "Fundada em 1824, a Vista Alegre adquiriu uma notoriedade ímpar, tornando-a numa das poucas insígnias portuguesas de luxo a nível mundial. A Vista Alegre produz porcelana de mesa, decorativa, giftware e hotelware, vidro e cristal de alta qualidade.",
    extra: "Recomendado por 92% (293 avaliações)",
    extras: ["socialmedia@vistaalegre.com"],
  },
];

type SocialPost = {
  numero: string;
  marca: "SPAL" | "Vista Alegre";
  rede: "Instagram" | "Facebook";
  perfil: string;
  data: string;
  formato: string;
  tema: string;
  publico?: string;
  objetivo?: string;
  cta?: string;
  reacoes: string;
  nota?: string;
};

const SOCIAL_POSTS: SocialPost[] = [
  { numero: "1", marca: "Vista Alegre", rede: "Instagram", perfil: "@vistaalegreofficial", data: "23/09", formato: "Reel (7s)", tema: "Lançamento coleção Outono", publico: "consumidor global, decoração", objetivo: "Inspirar", cta: "nenhum explícito", reacoes: "130 gostos, 2 comentários, 3 reposts, 11 envios" },
  { numero: "2–3", marca: "Vista Alegre", rede: "Instagram", perfil: "@vistaalegreofficial", data: "21/09", formato: "Carrossel 2 fotos", tema: "“History” — bilha de 1931 (ficha de arquivo + foto do produto)", publico: "colecionadores, património", objetivo: "Informar/Inspirar", cta: "nenhum", reacoes: "155 gostos, 4 (reposts/partilhas)" },
  { numero: "4", marca: "Vista Alegre", rede: "Instagram", perfil: "@vistaalegreofficial", data: "18/09", formato: "Carrossel 5 fotos", tema: "Nova loja no Fórum Algarve", publico: "consumidor Algarve + geral", objetivo: "Encaminhar (visitar loja)", cta: "“Venha conhecer as nossas coleções”", reacoes: "1.324 gostos, 18 comentários, 2 reposts, 44 envios" },
  { numero: "5", marca: "Vista Alegre", rede: "Facebook", perfil: "/vistaalegreofficial", data: "23/09 (há 6h)", formato: "Vídeo", tema: "Lançamento coleção Outono (mesmo conteúdo do IG)", objetivo: "Inspirar", cta: "nenhum", reacoes: "[não visível na captura]" },
  { numero: "6", marca: "Vista Alegre", rede: "Facebook", perfil: "/vistaalegreofficial", data: "21/09 (há 2 dias)", formato: "Carrossel", tema: "“History” — bilha de 1931, com texto expandido e análise estilística (Art Déco) — mais longo que a versão do Instagram", objetivo: "Informar (curadoria)", cta: "nenhum", reacoes: "35 gostos, 2 partilhas" },
  { numero: "7", marca: "Vista Alegre", rede: "Facebook", perfil: "/vistaalegreofficial", data: "21/09 (há 2 dias)", formato: "Carrossel", tema: "Jornadas Europeias do Património — Museu Vista Alegre, tema “Reviver, resistir, reinventar”, visitas guiadas e oficinas 18–27 set.", objetivo: "Institucional/cultural (conteúdo exclusivo do Facebook, não existe no Instagram)", cta: "“Conheça aqui as atividades e programação”", reacoes: "[não visível]" },
  { numero: "8", marca: "SPAL", rede: "Instagram", perfil: "@spalporcelanasofficial", data: "09/09", formato: "Imagem única", tema: "Recrutamento — Assistente de Loja (Loja de Fábrica de Alcobaça)", publico: "candidatos a emprego, não consumidor", objetivo: "Institucional/RH", cta: "“envie o seu CV para rh@spal.pt”", reacoes: "24 gostos, 12 envios" },
  { numero: "9", marca: "SPAL", rede: "Instagram", perfil: "@spalporcelanasofficial", data: "24/08", formato: "Reel", tema: "“Arte que se serve à mesa” — artesão a pintar à mão, Dia Mundial do Artista, bilingue PT/EN", publico: "geral/institucional", objetivo: "Inspirar (marca)", cta: "nenhum", reacoes: "17 gostos, 1 repost, 4 envios" },
  { numero: "10", marca: "SPAL", rede: "Instagram", perfil: "@spalporcelanasofficial", data: "28/07", formato: "Carrossel 9 imagens", tema: "Sustentabilidade (água reciclada, argila reciclada, embalagem reciclável, toque suave, usar e reutilizar, consciência energética, versátil e multifuncional)", publico: "institucional/ESG", objetivo: "Informar", cta: "nenhum", reacoes: "36 gostos, 1 envio" },
  { numero: "11", marca: "SPAL", rede: "Facebook", perfil: "/SPALPorcelanas", data: "09/09", formato: "cross-posting idêntico ao Instagram", tema: "Recrutamento Assistente de Loja (idêntico ao post 8)", reacoes: "5 gostos, 2 partilhas", nota: "mesmo texto e imagem, sem adaptação" },
  { numero: "12", marca: "SPAL", rede: "Facebook", perfil: "/SPALPorcelanas", data: "24/08", formato: "cross-posting idêntico ao Instagram", tema: "“Arte que se serve à mesa” (idêntico ao post 9)", reacoes: "10 reações, 1 partilha", nota: "mesmo texto e imagem, sem adaptação" },
  { numero: "13", marca: "SPAL", rede: "Facebook", perfil: "/SPALPorcelanas", data: "28/07", formato: "cross-posting idêntico ao Instagram", tema: "Sustentabilidade (idêntico ao post 10)", reacoes: "18 gostos, 1 partilha", nota: "mesmo texto e imagem, sem adaptação" },
];

const COMPARACAO: { dim: string; spal: string; vaa: string; winner?: boolean }[] = [
  {
    dim: "Tom",
    spal: "Institucional e bilingue PT/EN em todas as publicações (post 8: “envie o seu CV”; post 9–10: linguagem de missão e valores). Nenhuma publicação fala de uma coleção à venda.",
    vaa: "Editorial e emocional, maioritariamente em português (post 1: “tons mais quentes e envolventes”; post 6: tom de curadoria de museu, “presença da Art Déco na estilização minimalista”).",
  },
  {
    dim: "Imagem",
    spal: "Preto e branco no carrossel de sustentabilidade (post 10) e no reel institucional (post 9); azul institucional no post de recrutamento (post 8) — nenhuma é fotografia de produto SPAL identificável.",
    vaa: "Cor viva e still-life de produto (post 1: verde-jade e terracota sazonais); post 2–3 combina fotografia de arquivo histórico (ficha de catálogo de 1931) com a peça real — recurso que a SPAL não usa.",
  },
  {
    dim: "Variedade",
    spal: "3 publicações, 3 temas institucionais (RH, arte/processo, sustentabilidade) — zero sobre coleções à venda.",
    vaa: "4 temas nos 2 perfis — lançamento sazonal, património/arquivo, expansão de loja, agenda cultural do museu (só no Facebook) — cobre produto, história e retalho.",
    winner: true,
  },
  {
    dim: "Adaptação à rede",
    spal: "Nenhuma — os 3 posts do Facebook (11–13) são cópia exata dos 3 do Instagram (8–10): mesmo texto, mesma imagem, mesma data.",
    vaa: "Clara — o post da Bilha (6) tem texto mais longo e analítico no Facebook do que no Instagram (2–3); a publicação das Jornadas Europeias do Património (7) existe só no Facebook, dirigida a um público diferente.",
    winner: true,
  },
  {
    dim: "Respostas a dúvidas públicas",
    spal: "Nenhum comentário de dúvida de cliente identificável nas capturas recolhidas; sem exemplo de resposta a citar nesta amostra.",
    vaa: "Nenhum comentário de dúvida de cliente identificável nas capturas recolhidas; sem exemplo de resposta a citar nesta amostra.",
  },
];

function PerfilCard({ p, i, active }: { p: Perfil; i: number; active: boolean }) {
  const spal = p.marca === "SPAL";
  const Icon = p.rede === "Instagram" ? Instagram : Facebook;
  return (
    <Reveal i={i} className={`flex min-h-0 flex-col border-t-2 p-3 ${spal ? "border-spal" : "border-vaa"}`}>
      <div className="flex items-center gap-2">
        <Icon className={spal ? "text-spal" : "text-vaa"} size={15} />
        <p className={`text-[11px] font-bold uppercase tracking-widest ${spal ? "text-spal" : "text-vaa"}`}>
          {p.marca} · {p.rede}
        </p>
        {p.selo && <BadgeCheck className="h-3.5 w-3.5 text-vaa" aria-label="selo de verificado" />}
        <p className="ml-auto text-[11px] text-navy/55">{p.handle}</p>
      </div>
      <div className="mt-2 flex flex-wrap gap-3">
        {p.nums.map((m) => (
          <span key={m.label} className="flex items-baseline gap-1">
            <Num value={m.value} active={active} className="text-[19px] text-navy" />
            <span className="text-[8px] font-bold uppercase text-navy/45">{m.label}</span>
          </span>
        ))}
      </div>
      <p className="mt-2 text-[10.5px] leading-[1.35] text-navy/75">bio ({p.rede === "Instagram" ? "EN" : "PT"}): “{p.bio}”</p>
      {p.extra && <p className="mt-1 text-[9.5px] font-semibold text-navy/65">{p.extra}</p>}
      {p.extras?.map((extra) => <p key={extra} className="text-[9.5px] font-semibold text-navy/65">contacto {extra}</p>)}
    </Reveal>
  );
}

function PostCard({ post, index }: { post: SocialPost; index: number }) {
  const spal = post.marca === "SPAL";
  const lightbox = useLightbox();
  const group = `posts-${post.rede.toLowerCase()}`;
  const image = POSTS[index];
  const fields = [
    ["Data", post.data], ["Formato", post.formato], ["Tema", post.tema],
    ...(post.publico ? [["Público", post.publico]] : []),
    ...(post.objetivo ? [["Objetivo", post.objetivo]] : []),
    ...(post.cta ? [["CTA", post.cta]] : []),
    ["Reações", post.reacoes],
    ...(post.nota ? [["Nota", post.nota]] : []),
  ];
  return (
     <Reveal i={(index % 3) + 1} className={`flex min-h-0 gap-2 border-t pt-2 ${spal ? "border-spal/70" : "border-vaa/80"}`}>
      <RefShot
        img={image!}
        group={group}
        compact
        hideExpand
         className="h-[263px] w-[148px] shrink-0 rounded-[24px] border-[5px] border-navy/20 shadow-lg"
      />
      <div className="flex min-w-0 flex-1 flex-col py-1">
        <div className="mb-1 flex items-start justify-between gap-2">
          <div>
            <p className={`deck-num text-[18px] ${spal ? "text-spal" : "text-vaa"}`}>POST {post.numero}</p>
             <p className="max-w-[200px] truncate text-[10px] font-bold text-navy/70">{post.perfil}</p>
          </div>
           <span className={`post-brand-badge grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9px] font-bold text-porcelain ${spal ? "bg-spal" : "bg-vaa"}`}>{post.marca.charAt(0)}</span>
        </div>
        <div className="space-y-[1px]">
          {fields.map(([label, value]) => (
             <p key={`${label}-${value}`} className="text-[11px] leading-[1.2] text-navy/85">
               <strong className="text-navy">{label}:</strong> {value}
            </p>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label={`Ampliar post ${post.numero}`}
          onClick={() => image && lightbox?.open(group, image.id)}
           className="mt-auto h-7 self-start border-navy/40 bg-transparent px-2.5 text-[11px] text-navy hover:bg-navy/10 hover:text-navy"
        >
          <Maximize2 className="h-3 w-3" /> Ampliar
        </Button>
      </div>
    </Reveal>
  );
}

export function Redes({ active, subframe = 0 }: ChapterProps) {
  const instagramPosts = SOCIAL_POSTS.map((post, index) => ({ post, index })).filter(({ post }) => post.rede === "Instagram");
  const facebookPosts = SOCIAL_POSTS.map((post, index) => ({ post, index })).filter(({ post }) => post.rede === "Facebook");
  const titles = ["Publicações de Instagram", "Publicações de Facebook", "Perfis e frequência", "Comparação qualitativa"];
  if (subframe === 0 || subframe === 1) {
    const entries = subframe === 0 ? instagramPosts : facebookPosts;
    const network = subframe === 0 ? "Instagram" : "Facebook";
    return (
       <div className="flex h-full flex-col px-8 pb-7 pt-6 text-navy">
         <div className="mb-3 flex items-end justify-between border-b border-navy/20 pb-2">
          <div>
            <h3 className="font-[var(--font-display)] text-[27px] font-extrabold">{titles[subframe]}</h3>
          </div>
           <p className="text-[10px] text-navy/55">6 casos · {network}</p>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-x-5 gap-y-3">
          {entries.map(({ post, index }) => <PostCard key={post.numero} post={post} index={index} />)}
        </div>
      </div>
    );
  }
  if (subframe === 2) {
    return (
      <div className="flex h-full flex-col p-8 text-navy">
        <div className="mb-3">
          <h3 className="font-[var(--font-display)] text-[28px] font-extrabold">{titles[2]}</h3>
          <p className="text-[10px] text-navy/60">Referência da análise: 23/09/2026 · totais dos perfis por confirmar com capturas datadas</p>
        </div>
        <div className="grid h-[310px] grid-cols-2 grid-rows-2 gap-x-6 gap-y-3">
          {PERFIS.map((p, i) => <PerfilCard key={p.marca + p.rede} p={p} i={i + 1} active={active} />)}
        </div>
        <p className="my-3 rounded-md bg-muted px-4 py-2 text-[10.5px] font-semibold leading-snug text-muted-foreground">
          Frequência total no período 26/06–23/09: n/d — a listagem completa de cada perfil não estava acessível para contagem; analisámos a amostra das 3 publicações mais recentes por perfil, como o enunciado permite.
        </p>
        <ChartPanel title="Reações por publicação (das 12 analisadas)" note="Publicações 5 e 7: n/d — reação não visível na captura." className="min-h-0 flex-1">
          <ReacoesPorPublicacao active={active} />
        </ChartPanel>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col p-8 text-porcelain">
      <div className="mb-3">
        <h3 className="font-[var(--font-display)] text-[28px] font-extrabold">{titles[3]}</h3>
      </div>
      <div className="min-h-0 flex-1 divide-y divide-porcelain/20 border-y border-porcelain/20">
        {COMPARACAO.map((row, i) => (
          <Reveal key={row.dim} i={i + 1} className="grid grid-cols-[145px_1fr_1fr] gap-5 py-3">
            <div>
              <p className="text-[13px] font-extrabold uppercase text-vaa">{row.dim}</p>
              {row.winner && <span className="mt-1 inline-block text-[11px] font-bold text-vaa">vence Vista Alegre +1</span>}
              {!row.winner && i < 2 && <span className="mt-1 block text-[11px] text-porcelain/70">estilos diferentes · sem ponto</span>}
            </div>
            <p className="text-[14px] leading-[1.3] text-porcelain/90"><strong className="text-porcelain">SPAL:</strong> {row.spal}</p>
            <p className="text-[14px] leading-[1.3] text-porcelain/90"><strong className="text-vaa">Vista Alegre:</strong> {row.vaa}</p>
          </Reveal>
        ))}
      </div>
      <Reveal i={7} className="mt-5 border-l-4 border-vaa pl-5">
        <p className="font-[var(--font-display)] text-[21px] font-extrabold leading-tight">
          “A SPAL fala uma língua institucional em duas redes iguais. A Vista Alegre fala duas línguas diferentes — uma por rede.”
        </p>
      </Reveal>
    </div>
  );
}

export function Placar1({ active }: ChapterProps) {
  const criterios = [
    [
      "Descobrir",
      "≤ 4 cliques ou pesquisa",
      "5 cliques, sem pesquisa",
      "3-4 cliques, pesquisa e filtros",
      "Vista Alegre",
    ],
    [
      "Informar",
      "foto, medidas, uso, contexto",
      "foto e medidas sim; uso e contexto não",
      "foto, preço, cuidados, narrativa",
      "Vista Alegre",
    ],
    [
      "Avançar",
      "preço, compra ou onde comprar na ficha",
      "só via página Lojas, com saída para terceiros",
      "compra na ficha; lojas com contacto",
      "Vista Alegre",
    ],
  ];
  const marcas = [
    {
      nome: "SPAL",
      cor: "text-spal",
      forte:
        "Fichas técnicas completas, secção de design própria, rede física real (loja de fábrica, outlet, El Corte Inglés).",
      oportunidade:
        "Sem preço, sem 'onde comprar', sem pesquisa, conteúdos de 2011-2015, bio em inglês.",
    },
    {
      nome: "Vista Alegre",
      cor: "text-vaa",
      forte: "Loja online completa, store locator, newsletter, lançamentos com narrativa.",
      oportunidade:
        "Redirecionamento regional, navegação parcialmente em inglês, menu extenso com áreas institucionais.",
    },
  ];
  return (
    <div className="flex h-full flex-col gap-4 p-10 text-porcelain">
      <Reveal i={0}>
        <h3 className="mt-1 font-[var(--font-display)] text-[26px] font-extrabold leading-tight">
          A Vista Alegre facilita melhor o percurso completo. A SPAL destaca-se na informação
          técnica.
        </h3>
      </Reveal>
      <div className="grid grid-cols-[1.45fr_0.55fr] gap-5">
        <div className="space-y-2.5">
          {criterios.map(([c, def, s, v, w], i) => (
            <Reveal
              key={c}
              i={i + 1}
              className="rounded-2xl border border-porcelain/15 bg-porcelain/5 p-3.5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-extrabold">
                  {c}
                  <span className="ml-2 text-[11px] font-medium text-porcelain/50">{def}</span>
                </p>
                <Chip tone="vaa">vence {w}</Chip>
              </div>
              <div className="mt-1.5 grid grid-cols-2 gap-4 text-[12px]">
                <p className="text-porcelain/70">
                  <span className="font-bold text-spal">SPAL</span> · {s}
                </p>
                <p className="text-porcelain/70">
                  <span className="font-bold text-vaa">Vista Alegre</span> · {v}
                </p>
              </div>
            </Reveal>
          ))}
          <Reveal i={4}>
            <p className="text-[11px] text-porcelain/55">
              Em «Informar», a SPAL empata na parte técnica.
            </p>
          </Reveal>
        </div>
        <Reveal i={4} className="rounded-3xl bg-porcelain/10 p-5 text-center">
          <p className="text-[10px] uppercase tracking-widest text-porcelain/60">Placar do Ato 1</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <div>
              <Num value={0} active={active} className="text-5xl text-spal" />
              <p className="text-[10px] text-porcelain/60">SPAL</p>
            </div>
            <span className="text-2xl text-porcelain/40">—</span>
            <div>
              <Num value={3} active={active} className="text-5xl text-vaa" />
              <p className="text-[10px] text-porcelain/60">Vista Alegre</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-left">
            <p className="text-[9.5px] uppercase tracking-widest text-porcelain/55">
              Cliques até à peça
            </p>
            {(["Descobrir", "Informar", "Avançar"] as const).map((c, k) => (
              <div key={c} className="space-y-0.5">
                <p className="text-[9px] text-porcelain/60">{c}</p>
                {(
                  [
                    ["SPAL", 5, SPAL],
                    ["Vista Alegre", 4, VAA],
                  ] as const
                ).map(([nome, v, cor]) => (
                  <div key={nome} className="flex items-center gap-1.5">
                    <span className="w-14 shrink-0 text-[8.5px] text-porcelain/55">{nome}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-porcelain/15">
                      <span
                        className="deck-grow block h-full rounded-full"
                        style={{
                          width: active ? `${(v / 6) * 100}%` : "0%",
                          background: cor,
                          animationDelay: `${k * 120}ms`,
                        }}
                      />
                    </span>
                    <span className="deck-num w-3 text-[9px] text-porcelain/80">{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>

      </div>
      <div className="grid grid-cols-2 gap-4">
        {marcas.map((m, i) => (
          <Reveal
            key={m.nome}
            i={i + 5}
            className="rounded-2xl border border-porcelain/15 p-3.5 text-[12px]"
          >
            <p className={cn("text-sm font-bold", m.cor)}>{m.nome}</p>
            <p className="mt-1 text-porcelain/85">
              <span className="font-semibold text-porcelain">Ponto forte:</span> {m.forte}
            </p>
            <p className="mt-1 text-porcelain/70">
              <span className="font-semibold text-porcelain">Oportunidade:</span> {m.oportunidade}
            </p>
          </Reveal>
        ))}
      </div>
      <Reveal i={7}>
        <p className="text-[14px] font-semibold text-porcelain/90">
          Não é uma falha de produto. É uma decisão histórica de comunicar para o retalho e não para
          o consumidor.
        </p>
      </Reveal>
    </div>
  );
}

