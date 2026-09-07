import { useState } from "react";
import { Facebook, Globe, Instagram } from "lucide-react";
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
import { FOOTER, PERIOD } from "@/lib/presentation/deck";

export type ChapterProps = { active: boolean };

const SPAL = "#2F5C9E";
const VAA = "#C09C68";

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
              Usa <strong>←</strong> <strong>→</strong> para andar, <strong>Esc</strong> para a
              vista geral, <strong>F</strong> para ecrã inteiro.
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
    <div className="grid h-full grid-cols-[1.15fr_0.85fr] gap-10 p-14">
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
          <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.55_0.075_78)]">
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
    detalhe: "presença ativa",
    funcao: "Informar",
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
            tone === "spal" ? "bg-spal/10 text-spal" : "bg-vaa/15 text-[oklch(0.55_0.075_78)]"
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold text-navy">{canal.nome}</p>
          <p className="truncate text-[12px] text-navy/55">{canal.addr}</p>
          <p className="mt-1 text-[12px] leading-snug text-navy/70">{canal.detalhe}</p>
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
          <p className="text-xs font-bold uppercase tracking-widest text-[oklch(0.55_0.075_78)]">
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
      <Reveal i={6} className="space-y-2">
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
    spal: { obs: "Plataforma de 2013, menu por hover, slideshows. [captura a inserir]", score: 2 },
    vaa: { obs: "Meta viewport, app instalável. [captura a inserir]", score: 4 },
  },
  {
    id: 6,
    title: "Integração e confiança",
    spal: {
      obs: "Redes no rodapé, Livro de Reclamações; privacidade e cookies na mesma página; sem newsletter; link do Facebook desatualizado.",
      score: 2,
    },
    vaa: {
      obs: "Newsletter, contactos, termos, tabela de cookies, certificações, ligação ao grupo.",
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
  const data = DUELOS.map((d) => ({
    dim: d.title,
    SPAL: d.spal.score,
    "Vista Alegre": d.vaa.score,
  }));
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
                  className="w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-left transition-colors hover:border-navy/25"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-navy/35">0{d.id}</span>
                    <span className="flex-1 text-[14px] font-semibold text-navy">{d.title}</span>
                    <Dots n={d.spal.score} tone="spal" />
                    <Dots n={d.vaa.score} tone="vaa" />
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
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[oklch(0.55_0.075_78)]">
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
      <Reveal
        i={2}
        className="flex min-h-0 flex-col rounded-3xl border border-navy/10 bg-white p-4"
      >
        <p className="text-sm font-semibold text-navy/70">
          Pontuação por dimensão
          <Glossary term="1 a 5" meaning="1 dificulta, 5 facilita" />
        </p>
        <div className="mt-2 min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" barGap={4} margin={{ left: 8, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1B2A4415" />
              <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="dim" width={120} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="SPAL"
                fill={SPAL}
                radius={[0, 6, 6, 0]}
                isAnimationActive={active}
                animationDuration={1100}
              />
              <Bar
                dataKey="Vista Alegre"
                fill={VAA}
                radius={[0, 6, 6, 0]}
                isAnimationActive={active}
                animationDuration={1100}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-[11px] text-navy/50">
          Toca numa linha para abrir a evidência de cada dimensão.
        </p>
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
          tone === "spal" ? "text-spal" : "text-[oklch(0.55_0.075_78)]"
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
            tone === "spal" ? "bg-spal/10 text-spal" : "bg-vaa/15 text-[oklch(0.48_0.075_78)]"
          }`}
        >
          {resultado}
        </p>
      </Reveal>
    </div>
  );
}

export function Percurso() {
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
            ["Vista Alegre", d.vaa, "border-vaa/40", "text-[oklch(0.55_0.075_78)]"],
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
            <Shot
              id={`d${n}-${name}`}
              group={`duelo-${n}`}
              caption={`${name} · dimensão ${n}: ${d.title} · consulta 04/09/2026`}
              replace
              className="mt-3 h-24"
            >
              <div className="flex h-full items-center justify-center bg-porcelain text-[11px] font-semibold text-navy/45">
                captura de ecrã — {name}
              </div>
            </Shot>
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

export function Redes({ active }: ChapterProps) {
  const posts = Array.from({ length: 12 }, (_, i) => ({
    brand: i < 6 ? "SPAL" : "Vista Alegre",
    n: (i % 6) + 1,
  }));
  const volume = [
    { semana: "05-11/08", SPAL: 2, "Vista Alegre": 9 },
    { semana: "12-18/08", SPAL: 1, "Vista Alegre": 11 },
    { semana: "19-25/08", SPAL: 3, "Vista Alegre": 8 },
    { semana: "26-04/09", SPAL: 2, "Vista Alegre": 12 },
  ];
  const linhas = [
    ["Tom", "fabricante, técnico", "estilo de vida, aspiracional"],
    ["Imagem", "produto sobre fundo neutro", "mesa posta, casa, pessoas"],
    ["Variedade", "quase só catálogo", "coleções, arte, lojas, parcerias"],
    ["Adaptação", "a mesma imagem nos dois canais", "formato pensado por canal"],
    ["Respostas", "comentários sem resposta", "responde e reencaminha para a loja"],
  ];
  return (
    <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-8 p-12">
      <div className="space-y-3">
        <Reveal i={0}>
          <p className="text-sm font-semibold text-navy/70">
            12 publicações observadas · 05/08–04/09/2026
          </p>
        </Reveal>
        <div className="grid grid-cols-4 gap-2">
          {posts.map((p, i) => (
            <Shot
              key={i}
              id={`post-${i}`}
              group="posts"
              replace
              caption={`${p.brand} · publicação ${p.n} · Instagram/Facebook · referência provisória — SUBSTITUIR pelo link real`}
              className="aspect-[4/5]"
            >
              <div
                className="flex h-full flex-col justify-end p-2 text-[9px] font-semibold text-white"
                style={{
                  background:
                    p.brand === "SPAL"
                      ? "linear-gradient(160deg,#2F5C9E,#1B2A44)"
                      : "linear-gradient(160deg,#C09C68,#8a6a3c)",
                }}
              >
                {p.brand} #{p.n}
              </div>
            </Shot>
          ))}
        </div>
        <Reveal i={2} className="rounded-2xl border border-navy/10 bg-white p-3">
          <p className="mb-1 text-xs font-semibold text-navy/60">Publicações por semana</p>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volume}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1B2A4415" />
                <XAxis dataKey="semana" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="SPAL"
                  stroke={SPAL}
                  strokeWidth={3}
                  isAnimationActive={active}
                />
                <Line
                  type="monotone"
                  dataKey="Vista Alegre"
                  stroke={VAA}
                  strokeWidth={3}
                  isAnimationActive={active}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Reveal>
      </div>
      <div className="space-y-3">
        <Reveal i={1} className="rounded-2xl border border-navy/10 bg-white p-4">
          <p className="mb-1 text-xs font-semibold text-navy/60">
            Reações por publicação (média do período)
          </p>
          <div className="h-[170px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { m: "SPAL", v: 34 },
                  { m: "Vista Alegre", v: 486 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1B2A4415" />
                <XAxis dataKey="m" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="v" radius={[10, 10, 0, 0]} isAnimationActive={active}>
                  <Cell fill={SPAL} />
                  <Cell fill={VAA} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Reveal>
        {linhas.map(([dim, s, v], i) => (
          <Reveal
            key={dim}
            i={i + 2}
            className="grid grid-cols-[110px_1fr_1fr] items-center gap-3 rounded-xl bg-white px-4 py-2"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-navy/50">{dim}</span>
            <span className="text-[13px] text-spal">{s}</span>
            <span className="text-[13px] text-[oklch(0.55_0.075_78)]">{v}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Placar1({ active }: ChapterProps) {
  const criterios = [
    ["Descobrir", "5 cliques até um prato", "4 cliques e um preço", "Vista Alegre"],
    ["Informar", "medidas, peso, referência", "preço, cuidados, materiais", "Vista Alegre"],
    ["Comprar", "sai do site", "compra no site", "Vista Alegre"],
  ];
  return (
    <div className="grid h-full grid-cols-[1.2fr_0.8fr] gap-10 p-14 text-porcelain">
      <div className="space-y-4">
        {criterios.map(([c, s, v, w], i) => (
          <Reveal
            key={c}
            i={i}
            className="rounded-2xl border border-porcelain/15 bg-porcelain/5 p-5"
          >
            <div className="flex items-center justify-between">
              <p className="deck-h2 text-3xl">{c}</p>
              <Chip tone="vaa">vence {w}</Chip>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4 text-[13px]">
              <p className="text-porcelain/70">
                <span className="font-bold text-[#7FA6E0]">SPAL</span> · {s}
              </p>
              <p className="text-porcelain/70">
                <span className="font-bold text-vaa">Vista Alegre</span> · {v}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <Reveal i={3} className="rounded-3xl bg-porcelain/10 p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-porcelain/60">Placar do Ato 1</p>
          <div className="mt-3 flex items-center justify-center gap-6">
            <div>
              <Num value={0} active={active} className="text-7xl text-[#7FA6E0]" />
              <p className="text-xs text-porcelain/60">SPAL</p>
            </div>
            <span className="text-3xl text-porcelain/40">—</span>
            <div>
              <Num value={3} active={active} className="text-7xl text-vaa" />
              <p className="text-xs text-porcelain/60">Vista Alegre</p>
            </div>
          </div>
        </Reveal>
        <Reveal i={4} className="rounded-3xl border border-porcelain/15 p-5">
          <p className="text-xs uppercase tracking-widest text-porcelain/60">
            Onde cada uma brilha
          </p>
          <p className="mt-3 text-[14px] text-porcelain/85">
            <span className="font-bold text-vaa">Vista Alegre:</span> comprar sem sair do site.
          </p>
          <p className="mt-2 text-[14px] text-porcelain/85">
            <span className="font-bold text-[#7FA6E0]">SPAL:</span> informação técnica e design
            próprio.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
