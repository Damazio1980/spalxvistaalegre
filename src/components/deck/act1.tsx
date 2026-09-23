import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { BadgeCheck, ChevronDown, Facebook, Globe, Instagram, Maximize2, Play, X } from "lucide-react";
import coverPlate from "@/assets/cover-plate.png.asset.json";
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
import { Chip, DuelBar, Glossary, Num, Reveal, Shot } from "./primitives";
import { RefShot } from "./mocks";
import { FIG, POSTS } from "@/data/images";
import {
  AudienciaLog,
  BarrasDimensoes,
  ChartPanel,
  DonutExportacao,
  EvolucaoVAA,
  PassosChart,
  PublicacoesPorPerfil,
  RadarDimensoes,
  ReacoesPorPublicacao,
} from "./charts";


export type ChapterProps = { active: boolean; subframe?: number };

const SPAL = "var(--spal)";
const VAA = "var(--vaa)";

export function Capa({}: ChapterProps) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundImage: `url(${coverAbertura.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
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
              Duas porcelanas portuguesas. Um percurso até à compra.{" "}
              <em className="text-vaa">Quem chega ao fim?</em>
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
  return <SectionSlide title="Apresentação das empresas" />;
}

export function IdentificacaoCanais() {
  return (
    <SectionSlide
      title="Identificação dos canais"
      subtitle="Os mesmos canais — funções diferentes"
      roseAccent
    />
  );
}

export function IntroducaoWebsite() {
  return <SectionSlide title="Website" subtitle="Em seis dimensões" />;
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
        <h2 className="deck-title text-[64px]">A pergunta</h2>
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
        <p className={cn("text-[12px] font-extrabold", tone === "spal" ? "text-porcelain" : "text-vaa")}>
          {canal.marca} · {canal.nome}
        </p>
      </div>
      <div className="mt-2 space-y-1 text-[10.5px] leading-[1.22] text-porcelain/75">
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
    <div className={cn("sample-channels-slide flex h-full flex-col gap-4 px-12 pb-8 pt-12", subframe === 0 ? "text-porcelain" : "text-navy")}>
      <div className="flex shrink-0 items-end justify-between">
        <Reveal i={0}>
          <p className={cn("text-[10px] font-bold uppercase tracking-[0.3em]", subframe === 0 ? "text-porcelain/55" : "text-navy/45")}>
            A · Canais {subframe + 1}/2
          </p>
          <h3 className={cn("mt-1 font-[var(--font-display)] text-[27px] font-extrabold leading-none", subframe === 0 ? "text-porcelain" : "text-navy")}>
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
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/45">
            B · website
          </p>
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
          className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-navy/85 px-3.5 py-1.5 text-[11px] font-semibold text-porcelain transition hover:bg-navy"
        >
          <Maximize2 className="h-3.5 w-3.5" /> Ampliar
        </button>
        <span className="pointer-events-none absolute left-3 top-2 rounded-full bg-porcelain/90 px-2.5 py-[2px] text-[10px] font-bold uppercase tracking-wider text-navy">
          ▶ vídeo · {site}
        </span>
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
      border: "border-spal/30",
      text: "text-spal",
      src: vids.spal,
      site: "spal.pt",
    },
    {
      name: "Vista Alegre",
      side: d.vaa,
      border: "border-vaa/40",
      text: "text-vaa",
      src: vids.vaa,
      site: "vistaalegre.com/pt",
    },
  ] as const;

  return (
    <div className="flex h-full flex-col gap-3 p-6">
      <Reveal i={0} className="flex shrink-0 items-baseline gap-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-navy/45">
          B · {d.title.toLowerCase()}
        </p>
        <h3 className="font-[var(--font-display)] text-2xl font-extrabold text-navy">
          {d.title} <span className="text-navy/45">— os dois sites em movimento</span>
        </h3>
      </Reveal>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
        {sides.map(({ name, side, border, text, src, site }, i) => (
          <Reveal
            key={name}
            i={i + 1}
            className={`flex min-h-0 flex-col rounded-3xl border-2 bg-white p-2.5 ${border}`}
          >
            <p className={`shrink-0 px-1 pb-1.5 text-[12px] font-bold uppercase tracking-widest ${text}`}>
              {name} <span className="deck-num text-navy/70">{side.score}/5</span>
            </p>
            {/* vídeo em destaque: ocupa quase todo o cartão, formato alto e quadrado */}
            <VideoPlayer
              src={src}
              label={name}
              site={site}
              phone={phone}
              className="min-h-0 flex-1"
            />
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
        <Reveal i={1} className="deck-card bg-navy p-6 text-porcelain">
          <p className="text-sm text-porcelain/70">Total das seis rondas</p>
          <div className="mt-2 flex items-end gap-6">
            <div>
              <Num value={13} active={active} className="text-6xl text-porcelain" />
              <p className="text-xs text-porcelain/60">SPAL · 3-2-3-1-2-2</p>
            </div>
            <div>
              <Num value={29} active={active} className="text-6xl text-vaa" />
              <p className="text-xs text-porcelain/60">Vista Alegre · 5-5-5-5-4-5</p>
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
  bioNota?: string;
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
    bioNota: "bio em inglês",
  },
  {
    marca: "SPAL",
    rede: "Facebook",
    handle: "/SPALPorcelanas",
    nums: [{ value: 15700, label: "gostos" }],
    bio: "Desde 1965, desenhamos, produzimos e comercializamos porcelana para fins domésticos e profissionais.",
    bioNota: "bio em português",
    extra: "Ligação para El Corte Inglés",
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
    bioNota: "bio em inglês",
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
    bioNota: "conta oficial verificada",
    extra: "★ Recomendado por 92% (293 avaliações)",
    extras: ["Produto/serviço", "socialmedia@vistaalegre.com", "vistaalegre.com"],
  },
];

const COMPARACAO: { dim: string; spal: string; vaa: string }[] = [
  {
    dim: "Tom",
    spal: "Institucional, bio em inglês no Instagram e em português no Facebook.",
    vaa: "Editorial: cada lançamento tem uma história (arquiteto, designer, património).",
  },
  { dim: "Imagem", spal: "[a completar com a amostra]", vaa: "[a completar com a amostra]" },
  { dim: "Variedade", spal: "[a completar com a amostra]", vaa: "[a completar com a amostra]" },
  {
    dim: "Adaptação à rede",
    spal: "Facebook para Portugal, Instagram para o público internacional.",
    vaa: "Instagram global, páginas de Facebook por região.",
  },
  {
    dim: "Respostas a dúvidas",
    spal: "[a completar com a amostra]",
    vaa: "[a completar com a amostra]",
  },
];

function PerfilCard({ p, i, active }: { p: Perfil; i: number; active: boolean }) {
  const spal = p.marca === "SPAL";
  const Icon = p.rede === "Instagram" ? Instagram : Facebook;
  return (
    <Reveal
      i={i}
      className={`deck-card flex flex-col bg-white p-3 ${spal ? "border border-spal/20" : "border border-vaa/35"}`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`grid h-7 w-7 place-items-center rounded-full ${spal ? "bg-spal/10 text-spal" : "bg-vaa/15 text-vaa"}`}
        >
          <Icon size={14} />
        </span>
        <div className="min-w-0">
          <p
            className={`text-[10px] font-bold uppercase tracking-widest ${spal ? "text-spal" : "text-vaa"}`}
          >
            {p.marca} · {p.rede}
            {p.selo && (
              <BadgeCheck className="inline h-3 w-3 text-spal" aria-label="conta verificada" />
            )}
          </p>
          <p className="truncate text-[11px] text-navy/55">{p.handle}</p>
        </div>
      </div>
      {p.nums.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {p.nums.map((m) => (
            <span
              key={m.label}
              className="flex items-baseline gap-1.5 rounded-lg bg-porcelain px-2 py-1"
            >
              <Num value={m.value} active={active} className="text-[14px]" />
              <span className="text-[9px] font-semibold uppercase tracking-wider text-navy/45">
                {m.label}
              </span>
            </span>
          ))}
        </div>
      )}
      <p className="mt-2 flex-1 text-[11.5px] leading-snug text-navy/70">"{p.bio}"</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {p.bioNota && <Chip>{p.bioNota}</Chip>}
        {p.extra && <Chip>{p.extra}</Chip>}
        {p.extras?.map((e) => <Chip key={e}>{e}</Chip>)}
      </div>
    </Reveal>
  );
}

export function Redes({ active }: ChapterProps) {
  return (
    <div className="flex h-full flex-col gap-3 p-8">
      <Reveal i={0}>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/45">
          C · Instagram + Facebook
        </p>
        <h3 className="mt-1 font-[var(--font-display)] text-[26px] font-extrabold leading-tight text-navy">
          Uma marca fala como fabricante. A outra, como marca de estilo de vida.
        </h3>
      </Reveal>
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1fr] gap-4">
        <div className="grid grid-cols-2 gap-3">
          {PERFIS.map((p, i) => (
            <PerfilCard key={p.marca + p.rede} p={p} i={i + 1} active={active} />
          ))}
        </div>
        <div className="flex flex-col gap-1.5">
          {COMPARACAO.map((l, i) => (
            <Reveal
              key={l.dim}
              i={i + 2}
              className="grid grid-cols-[92px_1fr_1fr] items-start gap-2 rounded-xl bg-white px-3 py-2"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy/50">
                {l.dim}
              </span>
              <span className="text-[11.5px] leading-snug text-spal">{l.spal}</span>
              <span className="text-[11.5px] leading-snug text-vaa">{l.vaa}</span>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="grid h-[136px] shrink-0 grid-cols-2 gap-4">
        <ChartPanel
          title="Publicações no período 05/08–04/09"
          note="valores por confirmar na amostra"
        >
          <PublicacoesPorPerfil active={active} />
        </ChartPanel>
        <ChartPanel
          title="Reações por publicação (1 a 12)"
          note="publicação 1 = 9 reações · restantes a inserir"
        >
          <ReacoesPorPublicacao active={active} />
        </ChartPanel>
      </div>
      <Reveal i={8}>

        <p className="rounded-2xl bg-navy px-5 py-3 text-[14px] font-semibold text-porcelain">
          A SPAL tem matéria-prima para uma narrativa própria — SPAL Studio, designers, hotelaria —
          que ainda não explora nas redes.
        </p>
      </Reveal>
    </div>
  );
}

type Post = {
  marca: string;
  rede: string;
  data: string;
  formato: string;
  tema: string;
  cta: string;
  reacoes: string;
  comentarios: string;
};

const POSTS_SEED: Post[] = POSTS.map((img) => ({
  marca: img.perfil?.toLowerCase().includes("spal") ? "SPAL" : "Vista Alegre",
  rede: img.canal,
  data: img.data,
  formato: img.formato ?? "",
  tema: img.tema ?? "",
  cta: img.cta ?? "",
  reacoes: img.reacoes ?? "",
  comentarios: img.comentarios ?? "",
}));

const CAMPOS: { key: keyof Post; label: string }[] = [
  { key: "marca", label: "Marca" },
  { key: "rede", label: "Rede" },
  { key: "data", label: "Data" },
  { key: "formato", label: "Formato" },
  { key: "tema", label: "Tema" },
  { key: "cta", label: "CTA" },
  { key: "reacoes", label: "Reações" },
  { key: "comentarios", label: "Comentários" },
];

export function RedesPosts() {
  const [posts, setPosts] = useState<Post[]>(POSTS_SEED);
  const set = (i: number, key: keyof Post, value: string) =>
    setPosts((prev) => prev.map((p, k) => (k === i ? { ...p, [key]: value } : p)));
  return (
    <div className="flex h-full flex-col gap-1.5 p-6">
      <Reveal i={0}>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/45">
          C · Instagram + Facebook
        </p>
        <h3 className="mt-1 font-[var(--font-display)] text-[20px] font-extrabold leading-tight text-navy">
          Doze publicações, três por perfil, com os campos à vista.
        </h3>
      </Reveal>
      <div className="grid min-h-0 flex-1 grid-cols-6 grid-rows-2 gap-2">
        {posts.map((p, i) => (
          <Reveal
            key={i}
            i={1 + (i % 6)}
            className="flex min-h-0 flex-col gap-1 overflow-hidden rounded-xl border border-navy/10 bg-white p-1.5"
          >
            <RefShot
              img={POSTS[i]!}
              group="posts"
              compact
              className="h-14 shrink-0"
            />
            <div className="grid min-h-0 grid-cols-2 gap-x-1 gap-y-0.5">
              {CAMPOS.map((c) => (
                <label key={c.key} className="block min-w-0">
                  <span className="block text-[7px] font-bold uppercase tracking-wider text-navy/40">
                    {c.label}
                  </span>
                  <input
                    value={p[c.key]}
                    onChange={(e) => set(i, c.key, e.target.value)}
                    placeholder="—"
                    className="w-full rounded-md bg-porcelain px-1 py-0 text-[9px] leading-[14px] text-navy outline-none focus:ring-1 focus:ring-spal/40"
                  />
                </label>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
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
      cor: "text-[#7FA6E0]",
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
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-porcelain/50">
          D · diagnóstico
        </p>
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
                  <span className="font-bold text-[#7FA6E0]">SPAL</span> · {s}
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
              <Num value={0} active={active} className="text-5xl text-[#7FA6E0]" />
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
                    ["SPAL", 5, "#7FA6E0"],
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

