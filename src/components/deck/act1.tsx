import { useState } from "react";
import { cn } from "@/lib/utils";
import { BadgeCheck, Facebook, Globe, Instagram } from "lucide-react";
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
import { DUELO_FIGS, FIG, POSTS } from "@/data/images";
import { FOOTER, PERIOD } from "@/lib/presentation/deck";
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


export type ChapterProps = { active: boolean };

const SPAL = "#2F5C9E";
const VAA = "#B76876";

export function Capa({ active }: ChapterProps) {
  return (
    <div className="flex h-full flex-col justify-between p-16 text-porcelain">
      <div className="flex items-start justify-between gap-10">
        <div className="max-w-[720px]">
          <Reveal i={0}>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-porcelain/60">
              Apresentação
            </p>
          </Reveal>
          <Reveal i={1}>
            <h1 className="deck-title mt-4">
              SPAL <span className="text-vaa">×</span> Vista Alegre
            </h1>
          </Reveal>
          <Reveal i={2}>
            <p className="mt-6 max-w-[560px] text-2xl leading-snug text-porcelain/85">
              Duas porcelanas portuguesas. Um percurso até à compra.{" "}
              <em className="text-vaa">Quem chega ao fim?</em>
            </p>
          </Reveal>
          <Reveal i={3}>
            <p className="mt-8 text-sm text-porcelain/55">
              Usa <strong>←</strong> <strong>→</strong> para andar e <strong>F</strong> para ecrã
              inteiro.
            </p>
          </Reveal>
        </div>
        <div className="relative mt-4 h-[320px] w-[320px] shrink-0">
          <div
            className="absolute inset-0 rounded-full bg-porcelain shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
            style={{ animation: active ? "deck-spin 26s linear infinite" : "none" }}
          >
            <div className="absolute inset-3 rounded-full border-[6px] border-spal/70 border-r-vaa/80" />
            <div className="absolute inset-10 rounded-full border border-navy/10" />
            <div className="absolute inset-20 rounded-full bg-[var(--gradient-plate)]" />
          </div>
        </div>
      </div>
      <div className="space-y-1 border-t border-porcelain/15 pt-5 text-[12px] text-porcelain/55">
        <p>{FOOTER}</p>
        <p>{PERIOD}</p>
      </div>
    </div>
  );
}

export function Nomes({ active }: ChapterProps) {
  return (
    <div className="flex h-full flex-col gap-5 p-12">
    <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_0.85fr] gap-10">

      <div className="space-y-5">
        <Reveal i={0} className="deck-card border border-spal/20 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-spal">SPAL</p>
          <p className="mt-2 text-[15px] leading-relaxed text-navy/80">
            Alcobaça, 1965. Desenha e produz porcelana para casas e para hotelaria. Cerca de{" "}
            <strong>60 % de exportação</strong>, mais de <strong>45 países</strong>, com o SPAL
            Studio a criar coleções próprias.
          </p>
        </Reveal>
        <Reveal i={1} className="deck-card border border-vaa/30 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-vaa">
            Vista Alegre
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-navy/80">
            Ílhavo, 1824. Grupo cotado em bolsa, arte e colecionismo, loja online a funcionar, cerca
            de <strong>25 lojas</strong> e <strong>6 outlets</strong>.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          <Reveal i={2} className="deck-card bg-navy p-6 text-porcelain">
            <Num value={71.3} decimals={1} suffix=" M€" active={active} className="text-5xl" />
            <p className="mt-2 text-xs text-porcelain/70">Vendas VAA, 1.º semestre 2026 (+1,6 %)</p>
          </Reveal>
          <Reveal i={3} className="deck-card bg-navy p-6 text-porcelain">
            <Num value={4.3} decimals={1} suffix=" M€" active={active} className="text-5xl" />
            <p className="mt-2 text-xs text-porcelain/70">Resultado líquido (+18,9 %)</p>
          </Reveal>
        </div>
      </div>
      <Reveal i={2} className="relative rounded-3xl border border-navy/10 bg-white p-6">
        <p className="text-sm font-semibold text-navy/70">Portugal, três pontos</p>
        <div className="relative mx-auto mt-4 h-[380px] w-[150px] rounded-[60px_60px_40px_40px] bg-porcelain">
          <Dot top="28%" left="18%" color={VAA} label="Ílhavo · Vista Alegre" delay={200} />
          <Dot top="47%" left="26%" color={SPAL} label="Alcobaça · SPAL" delay={700} />
          <Dot
            top="53%"
            left="58%"
            color="#C2603D"
            label="2026 — loja e outlet Vista Alegre em Alcobaça"
            delay={1300}
          />
        </div>
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

function Dot({
  top,
  left,
  color,
  label,
  delay,
}: {
  top: string;
  left: string;
  color: string;
  label: string;
  delay: number;
}) {
  return (
    <div className="absolute" style={{ top, left }}>
      <span
        className="deck-pop block h-3.5 w-3.5 rounded-full"
        style={{
          background: color,
          animationDelay: `${delay}ms`,
          boxShadow: `0 0 0 6px ${color}33`,
        }}
      />
      <span
        className="deck-rise absolute left-6 top-[-6px] w-[190px] text-[11px] font-semibold leading-tight text-navy/75"
        style={{ animationDelay: `${delay + 150}ms` }}
      >
        {label}
      </span>
    </div>
  );
}

export function Pergunta() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 p-16 text-center text-porcelain">
      <Reveal i={0}>
        <h2 className="deck-title max-w-[1000px]">
          Qual das marcas facilita melhor o percurso entre descobrir um produto, obter informação e
          avançar para a compra ou para um contacto?
        </h2>
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
  icon: string;
  nome: string;
  addr: string;
  detalhe: string;
  funcao: string;
  num?: { label: string; value: number; suffix?: string };
  num2?: { label: string; value: number };
  selo?: boolean;
  bio?: string;
  chips?: string[];
};

const CANAIS_SPAL: Canal[] = [
  {
    icon: "Globe",
    nome: "Website",
    addr: "spal.pt",
    detalhe: "catálogo técnico · PT/EN/ES/FR",
    funcao: "Informar",
    num: { label: "idiomas", value: 4 },
  },
  {
    icon: "Instagram",
    nome: "Instagram",
    addr: "@spalporcelanasofficial",
    detalhe: "5 961 seguidores · 305 publicações",
    funcao: "Inspirar",
    num: { label: "seguidores", value: 5961 },
    num2: { label: "publicações", value: 305 },
  },
  {
    icon: "Facebook",
    nome: "Facebook",
    addr: "/SPALPorcelanas",
    detalhe: "15 700 gostos",
    funcao: "Encaminhar (link para El Corte Inglés)",
    num: { label: "gostos", value: 15700 },
  },
];

const CANAIS_VAA: Canal[] = [
  {
    icon: "Globe",
    nome: "Website",
    addr: "vistaalegre.com/pt",
    detalhe: "loja online · preços · carrinho · wishlist",
    funcao: "Comprar",
    num: { label: "passos até comprar", value: 4 },
  },
  {
    icon: "Instagram",
    nome: "Instagram",
    addr: "@vistaalegreofficial",
    detalhe: "360 000 seguidores · 3 717 publicações",
    funcao: "Inspirar + comprar",
    num: { label: "seguidores", value: 360000 },
    num2: { label: "publicações", value: 3717 },
  },
  {
    icon: "Facebook",
    nome: "Facebook",
    addr: "/vistaalegreofficial",
    detalhe: "conta oficial · Produto/serviço",
    funcao: "Informar",
    num: { label: "seguidores", value: 347000 },
    num2: { label: "publicações", value: 6000 },
    selo: true,
    bio: "Fundada em 1824, a Vista Alegre adquiriu uma notoriedade ímpar, tornando-a numa das poucas insígnias portuguesas de luxo a nível mundial. A Vista Alegre produz porcelana de mesa, decorativa, giftware e hotelware, vidro e cristal de alta qualidade.",
    chips: [
      "★ Recomendado por 92% (293 avaliações)",
      "socialmedia@vistaalegre.com",
      "vistaalegre.com",
    ],
  },
];

const OUTROS_SPAL = ["Pinterest", "YouTube", "LinkedIn", "Newsletter: não encontrada"];
const OUTROS_VAA = ["Newsletter", "App instalável", "Pinterest", "YouTube", "LinkedIn"];

function CanalCard({
  canal,
  tone,
  active,
  i,
}: {
  canal: Canal;
  tone: "spal" | "vaa";
  active: boolean;
  i: number;
}) {
  const Icon =
    canal.icon === "Instagram" ? Instagram : canal.icon === "Facebook" ? Facebook : Globe;
  return (
    <Reveal
      i={i}
      className={`deck-card bg-white p-3 ${tone === "spal" ? "border border-spal/20" : "border border-vaa/35"}`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            tone === "spal" ? "bg-spal/10 text-spal" : "bg-vaa/15 text-vaa"
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 text-[13px] font-bold text-navy">
            {canal.nome}
            {canal.selo && (
              <BadgeCheck className="h-3.5 w-3.5 text-spal" aria-label="conta verificada" />
            )}
          </p>
          <p className="truncate text-[12px] text-navy/55">{canal.addr}</p>
          <p className="mt-1 text-[12px] leading-snug text-navy/70">{canal.detalhe}</p>
          {canal.bio && (
            <p className="mt-1 text-[11px] italic leading-snug text-navy/60">“{canal.bio}”</p>
          )}
          {canal.chips && (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {canal.chips.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          )}
        </div>
        <Chip tone={tone}>{canal.funcao}</Chip>
      </div>
      {(canal.num || canal.num2) && (
        <div className="mt-2 flex gap-2">
          {[canal.num, canal.num2].map((m, k) =>
            m ? (
              <div key={k} className="flex items-baseline gap-2 rounded-lg bg-porcelain px-2 py-1">
                <Num value={m.value} active={active} className="text-[15px]" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-navy/45">
                  {m.label}
                </span>
              </div>
            ) : null,
          )}
        </div>
      )}
    </Reveal>
  );
}

export function Canais({ active }: ChapterProps) {
  return (
    <div className="flex h-full flex-col gap-3 p-8">
      <Reveal i={0}>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/45">A · canais</p>
        <h3 className="deck-h2 mt-1 text-navy">Os mesmos canais. Funções diferentes.</h3>
      </Reveal>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-spal">SPAL</p>
          {CANAIS_SPAL.map((c, i) => (
            <CanalCard key={c.nome} canal={c} tone="spal" active={active} i={i + 1} />
          ))}
          <Reveal i={4} className="flex flex-wrap gap-2">
            {OUTROS_SPAL.map((o) => (
              <Chip key={o}>{o}</Chip>
            ))}
          </Reveal>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-vaa">
            Vista Alegre
          </p>
          {CANAIS_VAA.map((c, i) => (
            <CanalCard key={c.nome} canal={c} tone="vaa" active={active} i={i + 2} />
          ))}
          <Reveal i={5} className="flex flex-wrap gap-2">
            {OUTROS_VAA.map((o) => (
              <Chip key={o}>{o}</Chip>
            ))}
          </Reveal>
        </div>
      </div>
      <Reveal i={6}>
        <ChartPanel
          title="Audiência nas redes · 04/09/2026"
          note="escala logarítmica para a diferença ser legível · audiência ≠ vendas"
          className="h-[168px]"
        >
          <AudienciaLog active={active} />
        </ChartPanel>
      </Reveal>
      <Reveal i={7} className="space-y-2">
        <p className="text-[11px] text-navy/50">
          Seguidores e gostos não demonstram vendas; servem para dimensionar a audiência.
          <Glossary term="audiência" meaning="quantas pessoas podem ver" />
        </p>

        <p className="rounded-2xl bg-navy px-5 py-3 text-[15px] font-semibold text-porcelain">
          A Vista Alegre usa o site como loja e as redes como montra. A SPAL usa o site como
          catálogo e as redes como galeria.
        </p>
      </Reveal>
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
    <div className="flex flex-col gap-1.5">
      <p
        className={`text-xs font-bold uppercase tracking-widest ${
          tone === "spal" ? "text-spal" : "text-vaa"
        }`}
      >
        {nome}
      </p>
      {passos.map((p, k) => (
        <Reveal key={p} i={i + k} className="flex items-start gap-3">
          <span
            className={`deck-num flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] text-white ${
              tone === "spal" ? "bg-spal" : "bg-vaa"
            }`}
          >
            {k + 1}
          </span>
          <span className="flex-1 rounded-xl border border-navy/10 bg-white px-3 py-1.5 text-[12.5px] leading-snug text-navy/80">
            {p}
          </span>
        </Reveal>
      ))}
      <Reveal i={i + passos.length}>
        <p
          className={`rounded-2xl px-4 py-2 text-[13px] font-bold ${
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
    <div className="flex h-full flex-col gap-2 p-8">
      <Reveal i={0}>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/45">
          B · percurso
        </p>
        <h3 className="mt-1 font-[var(--font-display)] text-[26px] font-extrabold leading-tight text-navy">
          "Procuro uma peça para oferecer e quero saber como a adquirir."
        </h3>
      </Reveal>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-5">
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
      <div className="grid h-[132px] shrink-0 grid-cols-[1.3fr_1fr] gap-4">
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

        <p className="rounded-2xl bg-navy px-5 py-3 text-[15px] font-semibold text-porcelain">
          A SPAL perde o consumidor exatamente no momento em que ele decide comprar.
        </p>
      </Reveal>
    </div>
  );
}

export function Duelo({ n, active }: { n: number; active: boolean }) {
  const d = DUELOS[n - 1]!;
  return (
    <div className="flex h-full flex-col gap-2 p-8">
      <Reveal i={0}>
        <h3 className="font-[var(--font-display)] text-3xl font-extrabold text-navy">{d.title}</h3>
      </Reveal>
      <div className="grid flex-1 grid-cols-2 gap-4">
        {(
          [
            ["SPAL", d.spal, "border-spal/25", "text-spal"],
            ["Vista Alegre", d.vaa, "border-vaa/40", "text-vaa"],
          ] as const
        ).map(([name, side, border, text], i) => (
          <Reveal
            key={name}
            i={i + 1}
            className={`flex flex-col rounded-2xl border bg-white p-4 ${border}`}
          >
            <p className={`text-[11px] font-bold uppercase tracking-widest ${text}`}>
              {name} {side.score}/5
            </p>
            <p className="mt-2 flex-1 text-[13px] leading-snug text-navy/75">{side.obs}</p>
            <RefShot
              img={FIG[DUELO_FIGS[n - 1]![i]!]!}
              group={`duelo-${n}`}
              idSuffix={`-d${n}`}
              className="mt-3 h-24"
            />
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
            <PolarGrid stroke="#1B2A4425" />
            <PolarAngleAxis dataKey="dim" tick={{ fontSize: 11, fill: "#1B2A44" }} />
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

