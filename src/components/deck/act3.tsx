import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Chip, Glossary, Num, Reveal, Shot } from "./primitives";
import { RefShot } from "./mocks";
import { MAQUETE, PERFIL_SPAL } from "@/data/images";
import { FOOTER, PERIOD } from "@/lib/presentation/deck";
import type { ChapterProps } from "./act1";
import {
  Funil,
  Gauge,
  IndicadorMini,
  MargemStack,
  RadarDimensoes,
} from "./charts";


const SPAL = "var(--spal)";
const VAA = "var(--vaa)";

export function PorqueSpal() {
  const chips = [
    "tem design próprio",
    "tem lojas reais",
    "tem a porcelana dos hotéis",
    "e agora tem a Vista Alegre em Alcobaça",
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 p-14 text-center">
      <Reveal i={0}>
        <h3 className="deck-title text-navy">Porque a SPAL</h3>
        <p className="mx-auto mt-5 max-w-[900px] text-xl leading-relaxed text-navy/70">
          A distância entre o que a SPAL tem — design próprio, hotelware, exportação, rede física
          real — e o que comunica é grande. E a raiz do problema não são detalhes de conteúdo: é a
          própria plataforma. Por isso a prioridade não é corrigir o site atual. É substituí-lo.
        </p>
      </Reveal>
      <div className="flex max-w-[900px] flex-wrap justify-center gap-4">
        {chips.map((c, i) => (
          <Chip
            key={c}
            tone={i === 3 ? "ines" : "spal"}
            delay={400 + i * 400}
            className="px-6 py-3 text-lg"
          >
            {c}
          </Chip>
        ))}
      </div>
    </div>
  );
}

const JOGADAS = [
  {
    n: "01",
    title: "Site novo",
    prova:
      "Plataforma de 2013, sem preço, sem pesquisa, sem carrinho, sem adaptação a telemóvel — o mesmo diagnóstico do percurso da Inês.",
    jogada:
      "Construir um website novo, próprio, com navegação por ocasião (Mesa & Bar, Decoração, Presentes, Coleções), preço e botão de compra em todas as fichas, store locator completo, storytelling da ponte hotelaria→casa, mobile-first.",
    onde: "website (plataforma nova)",
    muda:
      "Percurso descobrir→comprar em ≤3 cliques; venda direta sem depender de parceiros externos; base própria de dados de cliente.",
  },
  {
    n: "02",
    title: "Lançamento nas redes",
    prova:
      "305 publicações vs. 3.717 da Vista Alegre; bio em inglês sem ligação de compra; cross-posting idêntico entre Instagram e Facebook, sem adaptação.",
    jogada:
      "Campanha de lançamento do novo site, com linha editorial «Feito em Alcobaça», adaptada a cada rede — não copiada de uma para a outra.",
    onde: "Instagram + Facebook",
    muda:
      "Tráfego qualificado para o novo site desde o primeiro dia; crescimento de seguidores em Portugal.",
  },
  {
    n: "03",
    title: "Indicadores desde o dia um",
    prova:
      "Sem Google Analytics, sem UTM, sem dados de conversão hoje.",
    jogada:
      "Implementar analítica completa (GA4, píxeis de redes sociais, disciplina de UTM em todas as campanhas) já no lançamento do site novo.",
    onde: "website + Meta Business Suite",
    muda: "Decisões futuras baseadas em dados reais, não em intuição.",
  },
];

export function Jogadas({ active }: ChapterProps) {
  return (
    <div className="flex h-full flex-col justify-center gap-7 p-14 text-navy">
      <Reveal i={0}>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/50">
          D · marca escolhida: SPAL
        </p>
        <h3 className="deck-title mt-2">Três jogadas, por ordem de prioridade.</h3>
      </Reveal>
      <div className="grid grid-cols-3 gap-5">
        {JOGADAS.map((j, i) => (
          <Reveal
            key={j.n}
            i={i + 1}
            className="border-t-2 border-spal p-6"
          >
            <p className="deck-num text-5xl text-vaa">{j.n}</p>
            <p className="mt-3 text-lg font-semibold">{j.title}</p>
            <p className="mt-2 text-[11px] font-bold uppercase text-navy/45">Evidência</p>
            <p className="mt-1 text-[12px] leading-snug text-navy/70">{j.prova}</p>
            <p className="mt-3 text-[11px] font-bold uppercase text-navy/45">Canal</p>
            <p className="mt-1 text-[12px] text-navy/70">{j.onde}</p>
            <p className="mt-3 text-[11px] font-bold uppercase text-navy/45">Resultado esperado</p>
            <p className="mt-1 text-[12px] leading-snug text-navy/70">{j.muda}</p>
          </Reveal>
        ))}
      </div>

      <Reveal i={4}>
        <p className="text-[15px] text-navy/80">
          A SPAL não perde por detalhes. Perde porque está a competir com uma loja de 2013 contra
          uma loja de 2026. A jogada não é consertar — é mudar de casa.
        </p>
      </Reveal>
    </div>
  );
}

export function Jogada({ n }: { n: number; active: boolean }) {
  const j = JOGADAS[n - 1];
  if (!j) return null;
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-12">
      <div className="space-y-3">
        <Reveal i={0}>
          <p className="deck-num text-4xl text-vaa">{j.n}</p>
          <h3 className="font-[var(--font-display)] text-2xl font-extrabold text-navy">
            {j.title}
          </h3>
        </Reveal>
        {(
          [
            ["Evidência", j.prova],
            ["Ação", j.jogada],
            ["Canal", j.onde],
            ["Resultado esperado", j.muda],
          ] as const
        ).map(([k, v], i) => (
          <Reveal key={k} i={i + 1} className="border-t border-navy/15 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-navy/45">{k}</p>
            <p className="text-[12px] leading-snug text-navy/80">{v}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}


const SEMANA = [
  {
    dia: "Seg 08/09",
    hora: "19h00",
    canal: "Instagram Reel + Facebook",
    titulo: "«A SPAL tem casa nova» — teaser do novo site, bastidores do processo de design (SPAL Studio)",
    cta: "Fica atento",
    indicador: "alcance, visualizações",
  },
  {
    dia: "Qua 10/09",
    hora: "12h30",
    canal: "Facebook carrossel + IG Stories",
    titulo:
      "«O que muda» — preço visível, compra online, store locator, tudo num só lugar",
    cta: "Explora o novo spal.pt",
    indicador: "cliques no link (UTM)",
  },
  {
    dia: "Sex 12/09",
    hora: "18h00",
    canal: "Instagram carrossel",
    titulo: "Primeira coleção com ficha completa no novo site (ex.: Electric Rain), com preço e botão de compra",
    cta: "Já podes comprar online",
    indicador: "sessões no site, primeiras encomendas",
  },
  {
    dia: "Dom 14/09",
    hora: "10h30",
    canal: "IG Stories caixa de perguntas + Facebook",
    titulo: "«O que querias encontrar no novo site da SPAL?» — feedback real dos seguidores antes/depois do lançamento",
    cta: "Diz-nos o que procuras",
    indicador: "nº de respostas, taxa de resposta < 24 h",
  },
];

export function Semana() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-12">
      <Reveal i={0}>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/45">
          E · simulação · exercício académico
        </p>
        <h3 className="deck-h2 mt-1 text-navy">
          Uma semana de SPAL a falar com o consumidor.
        </h3>
        <p className="mt-1 text-sm text-navy/60">8 a 14 de setembro de 2026</p>
      </Reveal>
      <div className="relative pt-8">
        <div className="deck-grow absolute left-0 right-0 top-12 h-0.5 bg-navy/15" />
        <div className="relative grid grid-cols-4 gap-4">
          {SEMANA.map((s, i) => (
            <Reveal key={s.dia} i={i + 1}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="deck-slide-btn block w-full text-left text-navy"
              >
                <span className="mb-4 block h-4 w-4 rounded-full bg-spal ring-4 ring-spal/20" />
                <span className="block text-xs font-bold uppercase tracking-widest text-navy/50">
                  {s.dia} · {s.hora}
                </span>
                <span className="mt-1 block text-[15px] font-semibold leading-snug">
                  {s.titulo}
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-500"
                style={{ maxHeight: open === i ? 220 : 0, opacity: open === i ? 1 : 0 }}
              >
                <div className="mt-3 space-y-1 rounded-2xl bg-white p-4 text-[12px] leading-snug text-navy/75">
                  <p>
                    <strong className="text-navy">Canal</strong> · {s.canal}
                  </p>
                  <p>
                    <strong className="text-navy">Chamada à ação</strong> · «{s.cta}»
                  </p>
                  <p>
                    <strong className="text-navy">Indicador</strong> · {s.indicador}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal i={5}>
        <Chip className="text-[12px]">
          Horários como hipótese a testar: comparar 12h30 vs 19h00 durante 2 semanas e adotar o
          vencedor por rubrica.
        </Chip>
      </Reveal>
    </div>
  );
}

const LEGENDA =
  "A SPAL tem casa nova. A mesma porcelana que desenhamos e produzimos em Alcobaça para a hotelaria, agora com preço, compra online e todas as lojas num só lugar. Descobre o novo spal.pt — link na bio.";

const ALT_TEXT =
  "Prato de porcelana branca com friso azul sobre fundo bege; texto: Da mesa dos hotéis para a tua mesa — porcelana de design feita em Alcobaça desde 1965; botão Onde comprar; logótipo SPAL.";

export function Publicacao() {
  const [alt, setAlt] = useState(false);
  return (
    <div className="grid h-full grid-cols-[0.85fr_1.15fr] items-center gap-10 p-12">
      <Reveal
        i={0}
        className="mx-auto w-[300px] rounded-3xl border border-navy/10 bg-white p-3 shadow-[var(--shadow-card)]"
      >
        <div className="flex items-center gap-2 pb-2">
          <span className="h-7 w-7 rounded-full bg-spal" />
          <span className="text-[13px] font-semibold text-navy">spalporcelanasofficial</span>
        </div>
        <RefShot img={MAQUETE} group="maquete" className="aspect-[4/5]" />
        <p className="mt-2 max-h-[150px] overflow-auto text-[11px] leading-snug text-navy/80">
          <strong>spalporcelanasofficial</strong> {LEGENDA}
        </p>
      </Reveal>
      <div className="space-y-3">
        <Reveal i={1}>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/45">
            E · simulação · exercício académico
          </p>
          <h3 className="deck-h2 mt-1 text-navy">A publicação, com ficha técnica.</h3>
        </Reveal>
        {(
          [
            ["Formato", "carrossel 1080×1350"],
            ["Chamada à ação", "Ver o novo site →"],
            ["Destino", "página inicial do novo spal.pt"],
          ] as const
        ).map(([t, d], i) => (
          <Reveal key={t} i={i + 2} className="deck-card bg-white px-5 py-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-navy/45">{t}</p>
            <p className="mt-0.5 text-[15px] font-semibold text-navy">{d}</p>
          </Reveal>
        ))}
        <Reveal i={5}>
          <button
            onClick={() => setAlt((a) => !a)}
            className="deck-slide-btn rounded-full border border-navy/15 px-4 py-1.5 text-xs font-semibold text-navy"
          >
            {alt ? "esconder texto alternativo" : "ver texto alternativo"}
            <Glossary term="alt text" meaning="descrição da imagem para quem não a vê" />
          </button>
          {alt && (
            <p className="deck-rise mt-2 rounded-xl bg-porcelain p-3 text-[12px] leading-snug text-navy/70">
              {ALT_TEXT}
            </p>
          )}
        </Reveal>
      </div>
    </div>
  );
}

const BIO_ANTES =
  "Finest porcelain dinnerware both for domestic and hotelware purposes. What's your view on SPAL? 📷 Tag your photos @spalporcelanasofficial";

const BIO_DEPOIS =
  "Porcelana de design feita em Alcobaça desde 1965 🇵🇹 Novo site: preço, compra e lojas num só lugar. Descobre 👇";

export function Bio({ active }: ChapterProps) {
  const [depois, setDepois] = useState(false);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (!depois) {
      setTyped("");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(BIO_DEPOIS.slice(0, i));
      if (i >= BIO_DEPOIS.length) clearInterval(id);
    }, 24);
    return () => clearInterval(id);
  }, [depois]);
  useEffect(() => {
    if (!active) setDepois(false);
  }, [active]);
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-12">
      <Reveal i={0}>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/45">
          E · simulação · exercício académico
        </p>
        <h3 className="deck-h2 mt-1 text-navy">A biografia, antes e depois.</h3>
      </Reveal>
      <div className="grid grid-cols-2 gap-6">
        <Reveal i={1} className="rounded-3xl border border-navy/10 bg-white p-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-navy/15 text-sm font-bold text-navy">
              S
            </span>
            <div>
              <span className="block text-[13px] font-semibold text-navy">
                {PERFIL_SPAL.handle.replace("@", "")}
              </span>
              <span className="block text-[11px] text-navy/50">
                {PERFIL_SPAL.seguidores.toLocaleString("pt-PT")} seguidores ·{" "}
                {PERFIL_SPAL.publicacoes} publicações
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-navy/45">Antes</p>
          <p className="mt-2 text-[15px] leading-relaxed text-navy/80">{BIO_ANTES}</p>
          <p className="mt-3 text-xs text-navy/45">
            Fala inglês, fala com o retalho, não tem ligação para comprar.
          </p>
        </Reveal>
        <Reveal i={2} className="rounded-3xl border border-spal/25 bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-spal text-sm font-bold text-porcelain">
                S
              </span>
              <div>
                <span className="block text-[13px] font-semibold text-navy">
                  {PERFIL_SPAL.handle.replace("@", "")}
                </span>
                <span className="block text-[11px] text-navy/50">
                  {PERFIL_SPAL.seguidores.toLocaleString("pt-PT")} seguidores ·{" "}
                  {PERFIL_SPAL.publicacoes} publicações
                </span>
              </div>
            </div>
            <button
              onClick={() => setDepois(true)}
              className="deck-slide-btn rounded-full bg-spal px-4 py-1.5 text-xs font-semibold text-porcelain"
            >
              depois
            </button>
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-spal">Depois</p>
          <p className="mt-2 min-h-[92px] text-[15px] leading-relaxed text-navy/85">
            {typed}
            {depois && typed.length < BIO_DEPOIS.length && (
              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-navy align-middle" />
            )}
          </p>
          <p className="text-[13px] font-semibold text-spal">
            novo spal.pt · página inicial
          </p>
          <p className="mt-2 text-xs font-semibold text-navy/55">
            <Num value={depois ? typed.length : 0} active={active} />/150 caracteres
          </p>
        </Reveal>
      </div>
      <div className="flex flex-wrap gap-3">
        {["PT em vez de EN", "origem + posicionamento", "ligação para a compra"].map((c, i) => (
          <Chip key={c} tone="spal" delay={300 + i * 200}>
            {c}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export function Resposta({ active }: ChapterProps) {
  const resposta =
    "Olá! Muito obrigada, fico feliz que tenha gostado. 😊 Acabámos de lançar o novo site da SPAL, onde já pode ver o preço, comprar online ou consultar a loja mais perto de si com horário e contacto — é só aceder a [novo site]. Qualquer dúvida, estamos aqui. Obrigada por nos acompanhar!";
  const [typed, setTyped] = useState("");
  useEffect(() => {
    setTyped("");
    if (!active) return;
    let i = 0;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i += 4;
        setTyped(resposta.slice(0, i));
        if (i >= resposta.length) clearInterval(id);
      }, 20);
    }, 900);
    return () => {
      clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [active]);
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-12">
      <Reveal i={0}>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/45">
          E · simulação · exercício académico
        </p>
        <h3 className="deck-h2 mt-1 text-navy">A resposta ao cliente.</h3>
      </Reveal>
      <Reveal i={1} className="max-w-[620px] rounded-3xl rounded-bl-md bg-ines/12 p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-ines">
          Cliente · comentário
        </p>
        <p className="mt-2 text-[17px] leading-snug text-navy/85">
          «Gostei desta peça, mas não consigo perceber onde a posso comprar nem se existe numa loja
          perto de mim.»
        </p>
      </Reveal>
      <div className="flex justify-end">
        <div className="max-w-[760px] rounded-3xl rounded-br-md bg-spal p-5 text-porcelain">
          <p className="text-[10px] font-bold uppercase tracking-widest text-porcelain/70">
            SPAL · resposta em menos de 24 h
          </p>
          <p className="mt-2 min-h-[150px] text-[15px] leading-snug">
            {typed}
            {typed.length < resposta.length && (
              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-porcelain align-middle" />
            )}
          </p>
        </div>
      </div>
      <Chip tone="spal" className="self-start">
        Só pontos de venda confirmados no site; sem promessas de disponibilidade ou preço.
      </Chip>
    </div>
  );
}


export function MarcaX({ active }: ChapterProps) {
  const INSTA = "var(--chart-blue-secondary)";
  const campanhas = [
    {
      nome: "Instagram",
      cor: INSTA,
      dados: [
        { label: "Impressões", value: 10000 },
        { label: "Cliques", value: 300 },
        { label: "Sessões", value: 240 },
        { label: "Encomendas", value: 6 },
        { label: "Receita", value: 480, suffix: " €" },
        { label: "Investimento", value: 120, suffix: " €" },
      ],
    },
    {
      nome: "Facebook",
      cor: VAA,
      dados: [
        { label: "Impressões", value: 8000 },
        { label: "Cliques", value: 200 },
        { label: "Sessões", value: 160 },
        { label: "Encomendas", value: 8 },
        { label: "Receita", value: 640, suffix: " €" },
        { label: "Investimento", value: 80, suffix: " €" },
      ],
    },
  ];

  const indicadores = [
    { label: "CTR", ig: 3.0, fb: 2.5, suffix: "%", gloss: "cliques por cada 100 impressões" },
    { label: "Conversão", ig: 2.5, fb: 5.0, suffix: "%", gloss: "encomendas por cada 100 sessões" },
    { label: "ROAS", ig: 4.0, fb: 8.0, suffix: "×", gloss: "receita por cada euro de anúncio" },
  ];

  const extras = [
    { label: "Custo por encomenda", ig: 20, fb: 10, suffix: " €" },
    { label: "Valor médio", ig: 80, fb: 80, suffix: " €" },
  ];

  return (
    <div className="grid h-full grid-cols-[1fr_1fr] gap-8 p-10 text-navy">
      <div className="flex min-h-0 flex-col gap-3">
        <Reveal i={0}>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/50">
            F · dados didáticos · marca fictícia X
          </p>
          <h3 className="mt-1 text-[30px] font-semibold leading-[1.1]">
            O Instagram atrai melhor. O Facebook converte o dobro.
          </h3>
        </Reveal>
        {campanhas.map((c, i) => (
          <Reveal key={c.nome} i={i + 1} className="rounded-2xl bg-white p-4 text-navy">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: c.cor }}>
              {c.nome}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {c.dados.map((d) => (
                <div key={d.label}>
                  <p className="text-[9.5px] font-semibold uppercase tracking-wider text-navy/50">
                    {d.label}
                  </p>
                  <p className="deck-num text-base">
                    <Num value={d.value} active={active} suffix={d.suffix ?? ""} />
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
        <Reveal i={3} className="min-h-0">
          <ChartPanel
            title="Funil: impressões → cliques → sessões → encomendas"
            className="h-[150px]"
            note="o Instagram traz mais tráfego; o Facebook fecha mais encomendas"
          >
            <Funil active={active} />
          </ChartPanel>
        </Reveal>
        <Reveal i={4} className="min-h-0">
          <ChartPanel
            title="ROAS não é lucro · os 640 € por dentro"
            className="h-[104px]"
            note="margem de 40 % é um exemplo didático"
          >
            <MargemStack active={active} />
          </ChartPanel>
        </Reveal>
      </div>


      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {indicadores.map((ind, i) => (
            <Reveal key={ind.label} i={i + 1} className="rounded-2xl bg-white p-2 text-navy">
              <p className="text-[11px] font-semibold text-navy/85">{ind.label}</p>
              <p className="text-[9px] text-navy/50">{ind.gloss}</p>
              <IndicadorMini
                label={`Instagram vs Facebook (${ind.suffix.trim()})`}
                ig={ind.ig}
                fb={ind.fb}
                max={ind.label === "ROAS" ? 10 : 6}
                suffix={ind.suffix}
                active={active}
              />
              <p className="mt-1 text-center text-[10px] text-navy/60">
                <span style={{ color: INSTA }}>
                  <Num value={ind.ig} active={active} decimals={1} suffix={ind.suffix} />
                </span>{" "}
                ·{" "}
                <span className="text-navy">
                  <Num value={ind.fb} active={active} decimals={1} suffix={ind.suffix} />
                </span>
              </p>
            </Reveal>
          ))}
        </div>

        {extras.map((e, i) => (
          <Reveal
            key={e.label}
            i={i + 4}
            className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-navy"
          >
            <p className="text-sm font-semibold text-navy/80">{e.label}</p>
            <div className="flex gap-5">
              <p className="deck-num text-base" style={{ color: INSTA }}>
                IG <Num value={e.ig} active={active} suffix={e.suffix} />
              </p>
              <p className="deck-num text-base text-vaa">
                FB <Num value={e.fb} active={active} suffix={e.suffix} />
              </p>
            </div>
          </Reveal>
        ))}
        <Reveal i={6} className="rounded-2xl bg-vaa p-4 text-navy">
          <p className="text-xs font-bold uppercase tracking-widest">Decisão</p>
          <p className="mt-2 text-[13px] leading-snug">
            Reforçar o Facebook (mais encomendas, mais receita, menos investimento). No Instagram
            testar a página de destino — enviar o clique diretamente para a ficha do produto com
            preço e botão de compra — porque o problema está entre a sessão e a encomenda, não no
            anúncio.
          </p>
        </Reveal>
        <Reveal i={7} className="rounded-2xl bg-white p-4 text-navy">
          <p className="text-xs font-bold uppercase tracking-widest text-navy/70">
            Porque o ROAS 8 não é lucro
          </p>
          <p className="mt-2 text-[13px] leading-snug text-navy/80">
            ROAS 8 = 8 € de receita por 1 € de anúncio, não 8 € de lucro. Ignora custo do produto,
            embalagem, transporte, devoluções, comissões, IVA e equipa. Com margem bruta de 40 %, os
            640 € deixam 256 € — antes dos 80 € de anúncios e da logística.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

const GAUGES = [
  { low: 2, high: 5, max: 10, unidade: " %" },
  { low: 80, high: 95, max: 100, unidade: " %" },
  { low: 5, high: 10, max: 20, unidade: " pontos" },
];

export function Indicadores({ active }: ChapterProps) {

  const cards = [
    {
      label: 'Cliques em "Onde comprar"',
      fonte: "Analytics do site + Meta Business Suite",
      freq: "semanal",
      utm: true,
      decisao:
        "< 2 % das sessões → rever posição e texto do botão · ≥ 5 % → replicar em todas as coleções",
      acesso: "sim",
    },
    {
      label: "Taxa de resposta a comentários e mensagens em < 24 h",
      fonte: "Meta Business Suite + contagem manual de comentários públicos",
      freq: "semanal",
      utm: false,
      decisao:
        "< 80 % → definir responsável e modelos · ≥ 95 % → alargar ao fim de semana",
      acesso: "parcial",
    },
    {
      label: "Sessões em telemóvel nas fichas e taxa de rejeição",
      fonte: "Google Analytics",
      freq: "mensal, antes/depois",
      utm: false,
      decisao:
        "rejeição não baixa 10 pontos em 2 meses → rever layout móvel · baixa → continuar para Ocasiões Especiais",
      acesso: "sim",
    },
  ];

  return (
    <div className="flex h-full flex-col justify-center gap-6 p-12">
      <Reveal i={0}>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-navy/45">
          F · acompanhar as melhorias
        </p>
        <h3 className="deck-h2 mt-1 text-navy">
          Três indicadores. Uma decisão para cada resultado.
        </h3>
      </Reveal>
      <div className="grid grid-cols-3 gap-5">
        {cards.map((c, i) => (
          <Reveal key={c.label} i={i + 1} className="deck-card bg-white p-5">
            <p className="text-sm font-semibold leading-snug text-navy/85">{c.label}</p>
            <div className="mt-4 space-y-2 text-[12px] leading-snug text-navy/70">
              <p>
                <strong className="text-navy/90">Fonte</strong> · {c.fonte}
              </p>
              <p>
                <strong className="text-navy/90">Frequência</strong> · {c.freq}
              </p>
              {c.utm && (
                <p>
                  <Glossary term="UTM" meaning="código no link que identifica a origem do clique" />
                </p>
              )}
            </div>
            <div className="mt-3">
              <Gauge
                low={GAUGES[i]!.low}
                high={GAUGES[i]!.high}
                max={GAUGES[i]!.max}
                unidade={GAUGES[i]!.unidade}
                active={active}
              />
            </div>
            <div className="mt-3 rounded-xl bg-porcelain p-3">

              <p className="text-[11px] font-semibold uppercase tracking-wider text-navy/50">
                Decisão
              </p>
              <p className="mt-1 text-[13px] font-medium leading-snug text-navy/85">
                {c.decisao}
              </p>
            </div>
            <p className="mt-3 text-[11px] text-navy/45">
              Acesso interno:{" "}
              <span className="font-semibold text-navy/70">{c.acesso}</span>
            </p>
          </Reveal>
        ))}
      </div>
      <Reveal i={4}>
        <Chip tone="ink">
          Indicadores públicos sem acesso interno: publicações por semana, reações, comentários,
          seguidores — não medem vendas.
        </Chip>
      </Reveal>
    </div>
  );
}

export function Final({ active }: ChapterProps) {
  return (
    <div className="grid h-full grid-cols-[0.85fr_1.15fr] items-center gap-12 p-14 text-navy">
      <Reveal i={0} className="mx-auto w-[300px] rounded-[28px] border-4 border-navy/15 bg-porcelain p-3">
        <div className="rounded-2xl bg-white p-3 text-navy">
          <p className="text-[10px] font-bold uppercase tracking-widest text-spal">
            spal.porcelanas
          </p>
          <p className="mt-2 rounded-2xl rounded-bl-md bg-ines/12 p-3 text-[12px]">
            Onde posso comprar esta peça?
          </p>
          <p className="mt-2 rounded-2xl rounded-br-md bg-spal p-3 text-[12px] text-porcelain">
            Em Alcobaça, na loja de fábrica: seg-sáb, 10h-19h. Fica a 6 min de si em Lisboa? Temos
            no El Corte Inglés 💙
          </p>
          <p className="mt-2 text-right text-[10px] text-navy/45">visto · 20:14</p>
        </div>
      </Reveal>
      <div className="space-y-6">
        <Reveal i={1}>
          <p className="text-sm uppercase tracking-[0.3em] text-navy/50">20:00 · cronómetro parado</p>
          <h3 className="deck-title mt-3">A Inês teve resposta.</h3>
        </Reveal>
        <Reveal i={2}>
          <p className="max-w-[680px] text-2xl italic leading-snug text-vaa">
            A SPAL precisa de falar com a Inês antes que a Vista Alegre o faça por ela — em
            Alcobaça.
          </p>
        </Reveal>
        <Reveal i={3}>
          <ChartPanel
            title="Síntese · as seis dimensões do website"
            className="h-[230px] max-w-[520px]"
            note="SPAL 3-2-3-1-2-2 · Vista Alegre 5-5-5-5-4-5"
          >
            <RadarDimensoes active={active} compact />
          </ChartPanel>
        </Reveal>
      </div>
    </div>
  );
}

export function Bastidores() {
  const fontes = [
    "spal.pt",
    "LinkedIn SPAL",
    "Instagram e Facebook das duas marcas",
    "vistaalegre.com/pt e store locator",
    "Resultados VAA · 1.º semestre 2026",
    "Notícias do outlet de Alcobaça e da coleção Niemeyer",
  ];
  return (
    <div className="relative grid h-full grid-cols-2 gap-10 px-14 pb-24 pt-14">
      <div className="space-y-3">
        <Reveal i={0}>
          <h3 className="deck-h2 text-navy">Bastidores</h3>
          <p className="mt-2 text-sm text-navy/60">Redes sociais analisadas em 23/09/2026 · websites consultados em 04/09/2026.</p>
        </Reveal>
        {fontes.map((f, i) => (
          <Reveal key={f} i={i + 1} className="rounded-xl bg-white px-4 py-2 text-[14px] text-navy/75">
            {f}
          </Reveal>
        ))}
      </div>
      <Reveal i={2} className="flex flex-col justify-center rounded-3xl bg-navy p-8 text-porcelain">
        <p className="text-xs font-bold uppercase tracking-widest text-vaa">Utilização de IA</p>
        <p className="mt-4 text-[15px] leading-relaxed text-porcelain/85">
          Claude apoiou a leitura das páginas públicas, cálculos, estrutura e redação; observações
          verificadas e capturas próprias; interpretações e propostas da formanda.
        </p>
      </Reveal>
      <div className="absolute inset-x-14 bottom-7 border-t border-navy/15 pt-4 text-[11px] leading-relaxed text-navy/55">
        <p>{FOOTER}</p>
        <p>{PERIOD}</p>
      </div>
    </div>
  );
}
