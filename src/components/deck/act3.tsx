import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { PERFIL_SPAL } from "@/data/images";
import spalPost01 from "@/assets/os-posts/spal-post-01.png.asset.json";
import spalPost02 from "@/assets/os-posts/spal-post-02.png.asset.json";
import spalPost03 from "@/assets/os-posts/spal-post-03.png.asset.json";
import { FOOTER, PERIOD } from "@/lib/presentation/deck";
import type { ChapterProps } from "./act1";
import {
  ChartPanel,
  Funil,
  Gauge,
  IndicadorMini,
  MargemStack,
  RadarDimensoes,
} from "./charts";


const SPAL = "var(--spal)";
const VAA = "var(--vaa)";

const RESUMO_VAA = [
  "Loja online com preço, pesquisa e carrinho de compra",
  "~25 lojas e 6 outlets, com localizador completo",
  "Redes sociais maiores (360 000 seguidores IG, 347 000 FB), conta verificada, «Recomendado por 92%»",
  "Conteúdo adaptado a cada rede — não repete o mesmo post em todo o lado",
  "Na jornada da Inês: chega à compra em 4 cliques e 6 minutos, com carrinho",
];

const RESUMO_SPAL = [
  "Site de 2013: sem preço, sem pesquisa, sem carrinho, sem versão para telemóvel",
  "Não vende diretamente — remete sempre para parceiros externos (ex.: El Corte Inglés)",
  "Bio em inglês, sem link de compra",
  "Publica o mesmo conteúdo, sem adaptação, no Instagram e no Facebook",
  "Na jornada da Inês: ao fim de 12 minutos, sem resposta clara — sai do site sem saber onde comprar",
];

function ResumoCard({
  brand,
  subtitle,
  items,
  tone,
}: {
  brand: string;
  subtitle: string;
  items: string[];
  tone: "vaa" | "spal";
}) {
  const isVaa = tone === "vaa";
  return (
    <Reveal i={1}>
      <div
        className={
          "deck-on-brand flex h-full flex-col gap-4 border-2 p-7 text-porcelain " +
          (isVaa ? "border-vaa bg-vaa" : "border-navy bg-navy")
        }
      >
        <div>
          <h4 className="font-[var(--font-display)] text-[30px] font-extrabold leading-tight text-porcelain">
            {brand}
          </h4>
          <p className="mt-1 text-[15px] font-semibold uppercase tracking-wide text-porcelain">
            {subtitle}
          </p>
        </div>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-porcelain" />
              <span className="text-[16px] leading-snug text-porcelain">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function OQueVimos() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-6 px-16 py-10 text-navy">
      <div className="absolute right-14 top-9 text-[11px] uppercase tracking-[0.25em] text-navy/40">
        resumo · antes da intervenção
      </div>
      <Reveal i={0}>
        <div className="mb-1 h-px w-24 bg-vaa" />
        <h3 className="font-[var(--font-display)] text-[52px] font-extrabold leading-tight">
          O que já vimos
        </h3>
        <p className="mt-2 text-xl text-navy/70">
          Dos números às pessoas — tudo apontou para o mesmo sítio.
        </p>
      </Reveal>
      <div className="grid flex-1 grid-cols-2 items-stretch gap-7">
        <ResumoCard
          brand="Vista Alegre"
          subtitle="Onde está mais forte"
          items={RESUMO_VAA}
          tone="vaa"
        />
        <ResumoCard
          brand="SPAL"
          subtitle="Onde está mais frágil"
          items={RESUMO_SPAL}
          tone="spal"
        />
      </div>
      <Reveal i={2}>
        <p className="text-center font-[var(--font-display)] text-[24px] font-bold leading-snug">
          A Vista Alegre não venceu por ter mais produto. Venceu por ter menos obstáculos entre a
          pessoa e a compra.
        </p>
        <p className="mt-2 text-center text-[13px] italic text-navy/50">
          É esta distância que a intervenção que se segue vai fechar.
        </p>
      </Reveal>
    </div>
  );
}

export function EmpresaEscolhida() {
  return (
    <div className="flex h-full items-center px-24 text-porcelain">
      <div>
        <div className="mb-8 h-px w-28 bg-vaa" />
        <Reveal i={0}>
          <p className="text-[28px] font-semibold text-porcelain/80">A empresa escolhida para intervenção</p>
          <h2 className="mt-5 font-[var(--font-display)] text-[120px] font-extrabold leading-none text-porcelain">SPAL</h2>
        </Reveal>
      </div>
    </div>
  );
}

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
        <h3 className="deck-title text-porcelain">Porque a SPAL</h3>
        <p className="mx-auto mt-5 max-w-[900px] text-xl leading-relaxed text-porcelain/80">
          A distância entre o que a SPAL tem, incluindo design próprio, hotelware, exportação e rede física
          real, e o que comunica é grande. E a raiz do problema não são detalhes de conteúdo: é a
          própria plataforma. Por isso a prioridade não é corrigir o site atual. É substituí-lo.
        </p>
      </Reveal>
      <div className="flex max-w-[900px] flex-wrap justify-center gap-4">
        {chips.map((c, i) => (
          <Chip
            key={c}
            tone="ines"
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

export function Jogadas() {
  return (
    <div className="flex h-full flex-col justify-center gap-6 px-12 py-10 text-navy">
      <Reveal i={0}>
        <h3 className="font-[var(--font-display)] text-[48px] font-extrabold leading-tight">
          Três jornadas por ordem de prioridade
        </h3>
      </Reveal>
      <div className="grid min-h-0 grid-cols-3 gap-6">
        {JOGADAS.map((j, i) => (
          <Reveal
            key={j.n}
            i={i + 1}
            className="border-t-2 border-spal px-3 py-4"
          >
            <p className="deck-num text-[42px] text-vaa">{j.n}</p>
            <p className="mt-2 text-lg font-semibold">{j.title}</p>
            <p className="mt-3 text-[11px] font-bold uppercase text-navy/45">Evidência</p>
            <p className="mt-1 text-[13px] leading-snug text-navy/70">{j.prova}</p>
            <p className="mt-3 text-[11px] font-bold uppercase text-navy/45">Ação</p>
            <p className="mt-1 text-[13px] leading-snug text-navy/70">{j.jogada}</p>
            <p className="mt-3 text-[11px] font-bold uppercase text-navy/45">Canal</p>
            <p className="mt-1 text-[13px] text-navy/70">{j.onde}</p>
            <p className="mt-3 text-[11px] font-bold uppercase text-navy/45">Resultado esperado</p>
            <p className="mt-1 text-[13px] leading-snug text-navy/70">{j.muda}</p>
          </Reveal>
        ))}
      </div>

      <Reveal i={4}>
        <p className="text-[15px] leading-snug text-navy/80">
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
    dia: "Segunda",
    hora: "19h00",
    canal: "Instagram + Facebook",
    objetivo: "Notoriedade",
    titulo: "A SPAL tem casa nova (teaser)",
    descricao: "Reel (20-30s) com bastidores do processo de design (SPAL Studio).",
    cta: "Fica atento",
    destino: "Sem link — é teaser; o site novo ainda não está no ar nesta ação.",
    indicador: "alcance, visualizações, guardados",
  },
  {
    dia: "Quarta",
    hora: "12h30",
    canal: "Facebook + Stories",
    objetivo: "Compra",
    titulo: "O que muda no novo site",
    descricao:
      "Carrossel: preço visível em todas as fichas, compra online, store locator completo, tudo num só lugar.",
    cta: "Explora o novo spal.pt",
    destino: "Página inicial do site novo — destino fictício, simulação académica.",
    indicador: "cliques no link (UTM)",
  },
  {
    dia: "Sexta",
    hora: "18h00",
    canal: "Instagram",
    objetivo: "Informar",
    titulo: "Primeira coleção já à venda",
    descricao:
      "Carrossel: coleção Electric Rain a ganhar ficha completa no site novo, com preço, botão de compra e medidas.",
    cta: "Já podes comprar online",
    destino: "Ficha de produto Electric Rain no site novo — destino fictício, simulação académica.",
    indicador: "sessões no site, primeiras encomendas",
  },
  {
    dia: "Domingo",
    hora: "10h30",
    canal: "Stories + Facebook",
    objetivo: "Fidelizar",
    titulo: "O que procuras no novo site?",
    descricao: "Caixa de perguntas em Stories + resumo em publicação de Facebook.",
    cta: "Diz-nos o que procuras",
    destino: "Recolha de feedback antes do lançamento, sem link.",
    indicador: "nº de respostas, taxa de resposta <24h",
  },
];

const NOTION_CALENDAR_URL = "https://app.notion.com/p/3671d655a81745a68f73db13608b9c70";

export function Semana() {
  return (
    <div className="flex h-full flex-col justify-center gap-5 px-10 py-8">
      <Reveal i={0}>
        <h3 className="deck-h2 text-porcelain">
          Uma semana de SPAL a falar com o consumidor.
        </h3>
        <p className="mt-1 text-sm text-porcelain/65">Campanha de lançamento do site novo · 7 dias · 4 ações</p>
      </Reveal>
      <div className="relative pt-5">
        <div className="deck-grow absolute left-2 right-2 top-[31px] h-px bg-vaa/70" />
        <div className="relative grid grid-cols-4 gap-5">
          {SEMANA.map((s, i) => (
            <Reveal key={s.dia} i={i + 1} className="min-w-0">
              <div className="w-full text-left text-porcelain">
                <span className="mb-4 block h-3.5 w-3.5 rounded-full bg-vaa ring-4 ring-vaa/20" />
                <span className="block text-[11px] font-bold uppercase text-porcelain/60">
                  {s.dia} · {s.hora}
                </span>
                <span className="mt-1 block min-h-[42px] text-[16px] font-semibold leading-snug">
                  {s.titulo}
                </span>
              </div>
              <div className="mt-3 min-h-[238px] space-y-1.5 border-t border-porcelain/20 pt-3 text-[11px] leading-snug text-porcelain/80">
                  <p>
                    <strong className="text-vaa">Canal</strong> · {s.canal}
                  </p>
                  <p>
                    <strong className="text-vaa">Objetivo</strong> · {s.objetivo}
                  </p>
                  <p>{s.descricao}</p>
                  <p>
                    <strong className="text-vaa">Chamada à ação</strong> · «{s.cta}»
                  </p>
                  <p>
                    <strong className="text-vaa">Destino</strong> · {s.destino}
                  </p>
                  <p>
                    <strong className="text-vaa">Indicador</strong> · {s.indicador}
                  </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal i={5}>
        <div className="flex items-center justify-between gap-6 border-t border-porcelain/20 pt-4">
          <p className="max-w-[610px] text-[12px] leading-relaxed text-porcelain/60">
            Calendário de trabalho mantido no Notion — inclui vista de tabela e vista de calendário
            mensal.
          </p>
          <Button asChild variant="outline" className="shrink-0 border-vaa bg-vaa text-porcelain hover:bg-vaa/85 hover:text-porcelain">
            <a href={NOTION_CALENDAR_URL} target="_blank" rel="noreferrer">
              Ver calendário completo no Notion →
            </a>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}

const POST_CAROUSEL = [spalPost01.url, spalPost02.url, spalPost03.url] as const;

const POST_LEGENDA = `A SPAL tem uma nova casa digital.

Agora, encontras as coleções, os preços, as lojas e a compra online reunidos num só lugar.

Mais detalhe para escolher. Mais informação para decidir. A mesma porcelana de sempre, agora mais perto de ti.

Explora o novo spal.pt.

#SPALPorcelanas #SPAL #PorcelanaPortuguesa #Porcelana #MesaPosta #DesignPortuguês #ElectricRain #CasaPortuguesa #DecoraçãoDeInteriores #NovoSite`;

function PostPhone({
  image,
  label,
  children,
}: {
  image?: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-2">
      <div className="deck-device-frame relative h-[472px] w-[226px] overflow-hidden border-2 border-navy bg-white text-navy">
        {children ?? (
          <img src={image} alt={label} className="h-full w-full object-contain" />
        )}
      </div>
      <p className="text-[11px] font-bold uppercase text-vaa">{label}</p>
    </div>
  );
}

export function OsPosts() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const activeCarouselImage = POST_CAROUSEL[carouselIndex] ?? POST_CAROUSEL[0];

  const moveCarousel = (direction: -1 | 1) => {
    setCarouselIndex((current) => (current + direction + POST_CAROUSEL.length) % POST_CAROUSEL.length);
  };

  return (
    <div className="flex h-full flex-col px-9 py-7 text-navy">
      <Reveal i={0}>
        <h3 className="font-[var(--font-display)] text-[42px] font-extrabold leading-none text-navy">
          Os Posts
        </h3>
        <p className="mt-2 text-[15px] font-semibold text-navy">
          Carrossel de lançamento · Instagram SPAL
        </p>
      </Reveal>

      <div className="mt-5 grid min-h-0 flex-1 grid-cols-4 items-center gap-5">
        <Reveal i={1}>
          <PostPhone image={POST_CAROUSEL[0]} label="Imagem 1 de 3" />
        </Reveal>

        <Reveal i={2}>
          <PostPhone label="Post completo">
            <div className="flex h-full flex-col bg-white">
              <div className="flex h-9 shrink-0 items-center gap-2 border-b border-navy/15 px-2.5">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-navy text-[9px] font-bold text-porcelain">S</span>
                <span className="text-[9px] font-bold">spalporcelanasofficial</span>
              </div>
              <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-white">
                <img
                  src={activeCarouselImage}
                  alt={`Carrossel SPAL, imagem ${carouselIndex + 1} de 3`}
                  className="h-full w-full object-contain"
                />
                <Button
                  type="button"
                  variant="default"
                  size="icon"
                  aria-label="Imagem anterior"
                  onClick={() => moveCarousel(-1)}
                  className="deck-media-control absolute left-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-navy text-porcelain"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="icon"
                  aria-label="Imagem seguinte"
                  onClick={() => moveCarousel(1)}
                  className="deck-media-control absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-navy text-porcelain"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <span className="absolute right-2 top-2 rounded-full bg-navy px-2 py-1 text-[8px] font-bold text-porcelain">
                  {carouselIndex + 1}/3
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2 px-2.5 py-1.5 text-navy">
                <Heart className="h-4 w-4" />
                <MessageCircle className="h-4 w-4" />
                <Send className="h-4 w-4" />
              </div>
              <p className="min-h-0 flex-1 overflow-hidden whitespace-pre-line px-2.5 pb-2 text-[7.5px] leading-[1.35] text-navy">
                <strong>spalporcelanasofficial</strong>{" "}{POST_LEGENDA}
              </p>
            </div>
          </PostPhone>
        </Reveal>

        <Reveal i={3}>
          <PostPhone image={POST_CAROUSEL[1]} label="Imagem 2 de 3" />
        </Reveal>
        <Reveal i={4}>
          <PostPhone image={POST_CAROUSEL[2]} label="Imagem 3 de 3" />
        </Reveal>
      </div>
    </div>
  );
}

function CriativoSpal({ controls = false }: { controls?: boolean }) {
  const [index, setIndex] = useState(0);
  const image = POST_CAROUSEL[index] ?? POST_CAROUSEL[0];
  const move = (direction: -1 | 1) => {
    setIndex((current) => (current + direction + POST_CAROUSEL.length) % POST_CAROUSEL.length);
  };

  return (
    <div className="criativo-white relative flex h-full items-center justify-center overflow-hidden">
      <img
        src={image}
        alt={`Carrossel de lançamento do novo site SPAL, imagem ${index + 1} de 3`}
        className="h-full w-full object-contain"
      />
      {controls && (
        <>
          <Button type="button" variant="default" size="icon" aria-label="Imagem anterior" onClick={() => move(-1)} className="deck-media-control absolute left-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-navy text-porcelain">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button type="button" variant="default" size="icon" aria-label="Imagem seguinte" onClick={() => move(1)} className="deck-media-control absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-navy text-porcelain">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span className="deck-on-blue absolute right-2 top-2 rounded-full bg-navy px-2 py-1 text-[8px] font-bold text-porcelain">{index + 1}/3</span>
        </>
      )}
    </div>
  );
}

function PostCompleto() {
  return (
    <div className="criativo-white flex h-full flex-col text-navy">
      <div className="flex h-10 shrink-0 items-center gap-2 px-3">
        <span className="h-6 w-6 rounded-full bg-navy" />
        <span className="text-[10px] font-semibold">spalporcelanasofficial</span>
      </div>
      <div className="aspect-square w-full shrink-0"><CriativoSpal controls /></div>
      <div className="flex shrink-0 items-center gap-2 px-3 py-1.5 text-navy">
        <Heart className="h-4 w-4" />
        <MessageCircle className="h-4 w-4" />
        <Send className="h-4 w-4" />
      </div>
      <p className="min-h-0 flex-1 overflow-hidden whitespace-pre-line px-3 pb-2 text-[7.2px] leading-[1.3]">
        <strong>spalporcelanasofficial</strong>{" "}{POST_LEGENDA}
      </p>
    </div>
  );
}

export function Publicacao() {
  return (
    <div className="grid h-full grid-cols-[0.85fr_1.15fr] items-center gap-10 p-12">
      <Reveal
        i={0}
        className="mx-auto w-[280px] overflow-hidden rounded-[28px] border-[5px] border-ink bg-white"
      >
        <Shot
          id="maquete-publicacao"
          group="maquete"
          caption="Criativo da publicação · Instagram SPAL · carrossel 1080×1350"
          className="aspect-[9/16] rounded-none border-0"
          lightboxVariant="phone"
        >
          <PostCompleto />
        </Shot>
      </Reveal>
      <div className="space-y-3">
        <Reveal i={1}>
          <h3 className="deck-h2 text-navy">A publicação, com ficha técnica.</h3>
        </Reveal>
        {(
          [
            ["Formato", "carrossel 1080×1350"],
            ["Chamada à ação", "Ver o novo site →"],
            ["Destino", "página inicial do novo spal.pt"],
          ] as const
        ).map(([t, d], i) => (
          <Reveal key={t} i={i + 2} className="deck-card bg-white px-5 py-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-vaa">{t}</p>
            <p className="mt-0.5 text-[15px] font-semibold text-navy">{d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

const ANATOMIA = [
  ["1 · LOGÓTIPO", "Canto superior esquerdo, pequeno e discreto. Confirma a autoria da SPAL sem competir com a headline."],
  ["2 · IMAGEM PRINCIPAL", "Louça branca em estilo clean e premium. A imagem ocupa o centro visual e reforça a linha Electric Rain."],
  ["3 · LINHA EDITORIAL", "Base branca, luz natural e poucos elementos. O foco fica na porcelana, na textura e na elegância da marca."],
  ["4 · HEADLINE", "Três mensagens principais: “A SPAL tem uma nova casa digital”, “Vê cada coleção com mais detalhe” e “Compra online sem complicações”."],
  ["5 · TEXTO DE APOIO", "Frase curta e funcional. Explica a novidade sem pesar: compra online, mantendo a essência da marca."],
  ["6 · CTA", "Botão preto com alto contraste. “Explora o novo spal.pt” fecha o percurso visual e orienta a ação."],
] as const;

export function AnatomiaPublicacao() {
  return (
    <div className="flex h-full flex-col p-10 text-navy">
      <Reveal i={0}>
        <h3 className="font-[var(--font-display)] text-[38px] font-extrabold text-navy">Anatomia da publicação</h3>
        <p className="mt-1 text-[15px] text-navy/70">Cada elemento cumpre uma função estratégica dentro do post.</p>
      </Reveal>
      <div className="mt-6 grid min-h-0 flex-1 grid-cols-[1fr_1.35fr_1fr] items-center gap-7">
        <div className="space-y-5">
          {ANATOMIA.slice(0, 3).map(([title, copy], index) => (
            <Reveal key={title} i={index + 1} className="border border-navy/50 p-3">
              <p className="text-[13px] font-extrabold text-vaa">{title}</p>
              <p className="mt-1 text-[11px] leading-snug text-navy">{copy}</p>
            </Reveal>
          ))}
        </div>
        <Reveal i={2} className="mx-auto aspect-square w-full max-w-[385px] overflow-hidden border-2 border-navy">
          <CriativoSpal controls />
        </Reveal>
        <div className="space-y-5">
          {ANATOMIA.slice(3).map(([title, copy], index) => (
            <Reveal key={title} i={index + 4} className="border border-navy/50 p-3">
              <p className="text-[13px] font-extrabold text-vaa">{title}</p>
              <p className="mt-1 text-[11px] leading-snug text-navy">{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

const BIO_ANTES =
  "Finest porcelain dinnerware both for domestic and hotelware purposes. What's your view on SPAL? 📷 Tag your photos @spalporcelanasofficial";

const BIO_DEPOIS =
  "Porcelana de design feita em Alcobaça desde 1965 🇵🇹 Novo site: preço, compra e lojas num só lugar. Descobre 👇";

export function Bio({ active }: ChapterProps) {
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-12 text-porcelain">
      <Reveal i={0}>
        <h3 className="deck-h2 text-porcelain">A biografia, antes e depois.</h3>
      </Reveal>
      <div className="grid grid-cols-2 gap-6">
        <Reveal i={1} className="border-t-2 border-porcelain/40 p-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-porcelain/50 text-sm font-bold text-porcelain">
              S
            </span>
            <div>
              <span className="block text-[13px] font-semibold text-porcelain">
                {PERFIL_SPAL.handle.replace("@", "")}
              </span>
              <span className="block text-[11px] text-porcelain/70">
                {PERFIL_SPAL.seguidores.toLocaleString("pt-PT")} seguidores ·{" "}
                {PERFIL_SPAL.publicacoes} publicações
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-vaa">Antes</p>
          <p className="mt-2 text-[15px] leading-relaxed text-porcelain">{BIO_ANTES}</p>
          <p className="mt-3 text-xs text-porcelain/70">
            Fala inglês, fala com o retalho, não tem ligação para comprar.
          </p>
        </Reveal>
        <Reveal i={2} className="border-t-2 border-vaa p-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-vaa text-sm font-bold text-porcelain">
              S
            </span>
            <div>
              <span className="block text-[13px] font-semibold text-porcelain">
                {PERFIL_SPAL.handle.replace("@", "")}
              </span>
              <span className="block text-[11px] text-porcelain/70">
                {PERFIL_SPAL.seguidores.toLocaleString("pt-PT")} seguidores ·{" "}
                {PERFIL_SPAL.publicacoes} publicações
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-vaa">Depois</p>
          <p className="mt-2 min-h-[92px] text-[15px] leading-relaxed text-porcelain">{BIO_DEPOIS}</p>
          <p className="text-[13px] font-semibold text-vaa">novo spal.pt · página inicial</p>
          <p className="mt-2 text-xs font-semibold text-porcelain/70">
            <Num value={BIO_DEPOIS.length} active={active} />/150 caracteres
          </p>
        </Reveal>
      </div>
      <div className="flex flex-wrap gap-3">
        {["PT em vez de EN", "origem + posicionamento", "ligação para a compra"].map((c, i) => (
          <Chip key={c} tone="vaa" delay={300 + i * 200}>
            {c}
          </Chip>
        ))}
      </div>
    </div>
  );
}

const NOTA_ENQUADRAMENTO =
  "O enunciado pede uma resposta com base na situação atual da marca — é a Resposta 1. A Resposta 2 é um acréscimo, para ilustrar o impacto da intervenção proposta.";

const COMENTARIO_INES =
  "«Gostei desta peça, mas não consigo perceber onde a posso comprar nem se existe numa loja perto de mim.»";

const RESP1_HOJE =
  "Olá! Muito obrigada, ficamos felizes que tenha gostado. 😊 De momento não vendemos diretamente no nosso site, mas pode encontrar esta peça na nossa Loja de Fábrica em Alcobaça ou em pontos de venda como o El Corte Inglés. Qualquer dúvida sobre disponibilidade, pode escrever-nos para rh@spal.pt ou visitar spal.pt/contactos. Obrigada por nos acompanhar!";

const RESP2_DEPOIS =
  "Olá! Muito obrigada, fico feliz que tenha gostado. 😊 Acabámos de lançar o novo site da SPAL, onde já pode ver o preço, comprar online ou consultar a loja mais perto de si com horário e contacto — é só aceder a [novo site]. Qualquer dúvida, estamos aqui. Obrigada por nos acompanhar!";

export function Resposta() {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-12">
      <Reveal i={0}>
        <h3 className="deck-h2 text-navy">A resposta ao cliente.</h3>
      </Reveal>
      <Reveal i={1}>
        <p className="max-w-[900px] text-[11.5px] italic leading-snug text-navy/55">
          {NOTA_ENQUADRAMENTO}
        </p>
      </Reveal>
      <Reveal i={2} className="deck-on-rose max-w-[720px] rounded-3xl rounded-bl-md bg-vaa p-4 text-porcelain">
        <p className="text-[10px] font-bold uppercase tracking-widest text-porcelain">
          Cliente · comentário
        </p>
        <p className="mt-1.5 text-[16px] leading-snug text-porcelain">{COMENTARIO_INES}</p>
      </Reveal>
      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">
        <Reveal i={3} className="rounded-3xl border-2 border-navy/25 bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-navy/60">
            Hoje — site atual, sem compra online
          </p>
          <p className="mt-2 text-[13px] leading-snug text-navy/85">{RESP1_HOJE}</p>
        </Reveal>
        <div className="flex flex-col items-center justify-center gap-1 self-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-navy/50">
            Hoje
          </span>
          <span className="text-3xl leading-none text-vaa">→</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-vaa">
            Depois
          </span>
        </div>
        <Reveal i={4} className="deck-on-blue rounded-3xl bg-navy p-5 text-porcelain">
          <p className="text-[10px] font-bold uppercase tracking-widest text-porcelain/70">
            Depois — com o site novo, compra online
          </p>
          <p className="mt-2 text-[13px] leading-snug">{RESP2_DEPOIS}</p>
        </Reveal>
      </div>
      <p className="text-[11.5px] italic text-navy/55">
        A pergunta da Inês não muda. A resposta da SPAL, sim.
      </p>
    </div>
  );
}

export function NoAr() {
  return (
    <div className="flex h-full items-center px-24 text-porcelain">
      <div>
        <div className="mb-8 h-px w-28 bg-vaa" />
        <Reveal i={0}>
          <h2 className="deck-title text-[64px] leading-tight">E SE JÁ ESTIVESSE NO AR?</h2>
        </Reveal>
        <Reveal i={1}>
          <p className="mt-6 max-w-3xl text-3xl leading-snug text-porcelain/75">
            As jogadas estão feitas. Agora, os números decidem.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export function SimulacaoReal() {
  return (
    <div className="flex h-full items-center px-24 text-porcelain">
      <div>
        <div className="mb-8 h-px w-28 bg-vaa" />
        <Reveal i={0}>
          <h2 className="deck-title text-[64px] leading-tight">DA SIMULAÇÃO PARA O REAL</h2>
        </Reveal>
        <Reveal i={1}>
          <p className="mt-6 max-w-3xl text-3xl leading-snug text-porcelain/75">
            Chega de imaginar. Isto é o que vamos mesmo medir.
          </p>
        </Reveal>
      </div>
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
          <h3 className="text-[30px] font-semibold leading-[1.1]">
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
        <Reveal i={6} className="deck-on-blue rounded-2xl bg-navy p-4 text-porcelain">
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
    <div className="flex h-full flex-col justify-center gap-3 p-6">
      <Reveal i={0}>
        <h3 className="deck-h2 text-[36px] text-navy">
          Três indicadores. Uma decisão para cada resultado.
        </h3>
      </Reveal>
      <div className="grid grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <Reveal key={c.label} i={i + 1} className="deck-card bg-white p-4">
            <p className="text-[13px] font-semibold leading-snug text-navy/85">{c.label}</p>
            <div className="mt-2 space-y-1.5 text-[11px] leading-snug text-navy/70">
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
            <div className="mt-2">
              <Gauge
                low={GAUGES[i]!.low}
                high={GAUGES[i]!.high}
                max={GAUGES[i]!.max}
                unidade={GAUGES[i]!.unidade}
                active={active}
              />
            </div>
            <div className="mt-2 rounded-xl bg-porcelain p-2.5">

              <p className="text-[11px] font-semibold uppercase tracking-wider text-navy/50">
                Decisão
              </p>
              <p className="mt-1 text-[13px] font-medium leading-snug text-navy/85">
                {c.decisao}
              </p>
            </div>
            <p className="mt-2 text-[10.5px] text-navy/45">
              Acesso interno:{" "}
              <span className="font-semibold text-navy/70">{c.acesso}</span>
            </p>
          </Reveal>
        ))}
      </div>
      <Reveal
        i={5}
        className="rounded-2xl border-2 border-dashed border-navy/30 bg-porcelain/60 p-3"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold uppercase tracking-widest text-navy/70">
            Se as metas fossem atingidas
          </p>
          <span className="shrink-0 rounded-full border border-navy/25 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy/60">
            Simulação — números hipotéticos para ilustrar a meta, não resultados reais
          </span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-3 text-[11px] leading-tight text-navy/70">
          <div>
            <p className="font-semibold text-navy/85">
              1 · Cliques em “Onde comprar” — meta ≥ 5 %
            </p>
            <p className="mt-1">
              Num mês com 4.000 sessões no site novo, atingir 5 % significa 200 sessões a avançar
              para “onde comprar” — hoje essa contagem simplesmente não existe, porque o botão não
              existe.
            </p>
          </div>
          <div>
            <p className="font-semibold text-navy/85">
              2 · Resposta a comentários e mensagens em {"<24 h"} — meta ≥ 95 %
            </p>
            <p className="mt-1">
              Numa semana com 40 comentários e mensagens recebidas, a meta significa responder a
              pelo menos 38 dentro de 24 horas.
            </p>
          </div>
          <div>
            <p className="font-semibold text-navy/85">
              3 · Sessões em telemóvel — rejeição, meta −10 pontos
            </p>
            <p className="mt-1">
              Se a rejeição em telemóvel partisse de um valor de referência de 70 % (hipotético, a
              confirmar com o Google Analytics do site novo), atingir a meta significa descer para
              60 % — 10 em cada 100 visitas de telemóvel a ficarem no site em vez de sair de
              imediato.
            </p>
          </div>
        </div>
        <p className="mt-2 text-center text-[10.5px] italic text-navy/55">
          Isto não são números que já temos — é o que o sucesso pareceria, para sabermos
          reconhecê-lo quando o site novo estiver a funcionar.
        </p>
      </Reveal>
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
          <p className="deck-on-blue mt-2 rounded-2xl rounded-bl-md bg-navy p-3 text-[12px] text-porcelain">
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
          <Reveal key={f} i={i + 1} className="border-b border-navy/15 px-4 py-2 text-[14px] text-navy/75">
            {f}
          </Reveal>
        ))}
      </div>
      <Reveal i={2} className="flex flex-col justify-center border-l-2 border-vaa p-8 text-navy">
        <p className="text-xs font-bold uppercase tracking-widest text-vaa">Utilização de IA</p>
        <p className="mt-4 text-[15px] leading-relaxed text-navy/85">
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
