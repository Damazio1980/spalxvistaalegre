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
import type { ChapterProps } from "./act1";

const SPAL = "#2F5C9E";
const VAA = "#C09C68";

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
        <p className="mt-4 text-xl text-navy/65">
          Nada do que vem a seguir exige um site novo. Exige usar o que já existe.
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
    title: "«Onde comprar» ligado a tudo",
    prova:
      "Ficha sem preço nem onde comprar; página Lojas com ligações externas e e-mails ilegíveis; bio do Instagram sem ligação de compra.",
    jogada:
      "Página «Onde comprar» com mapa, horários e e-mail legível; botão «Onde comprar esta coleção» em cada ficha; a mesma ligação na bio do Instagram e no botão do Facebook.",
    onde: "website + Instagram + Facebook",
    muda: "Cliques medíveis por UTM; menos mensagens «onde compro?».",
    antes: 0,
    depois: 5,
    unidade: "% de cliques em 'Onde comprar'",
  },
  {
    n: "02",
    title: "Fichas para o consumidor",
    prova:
      "Referência e «Pack 04/24», sem uso nem cuidados, coleções em miniaturas numeradas.",
    jogada:
      "Reescrever as 26 fichas de Uso Diário — nome visível, 2 frases sobre o design, ícones de uso confirmados pela SPAL, foto de mesa posta, ligação Onde comprar; dados técnicos num separador «Profissionais».",
    onde: "website",
    muda: "Mais tempo na página, menos rejeição em telemóvel.",
    antes: 2,
    depois: 5,
    unidade: "nota da ficha (1-5)",
  },
  {
    n: "03",
    title: "Linha editorial «Feito em Alcobaça»",
    prova:
      "305 publicações e bio em inglês, contra 3 717 publicações e narrativa de coleção na Vista Alegre.",
    jogada:
      "3 publicações por semana em 3 rubricas — Bastidores/SPAL Studio (Reel), Da hotelaria para casa (carrossel), Onde comprar/perguntas (Stories + Facebook); bio em português com ligação.",
    onde: "Instagram + Facebook",
    muda: "Alcance e guardados; seguidores portugueses; cliques na bio.",
    antes: 2,
    depois: 3,
    unidade: "publicações por semana",
  },
];

export function Jogadas() {
  return (
    <div className="flex h-full flex-col justify-center gap-7 p-14 text-porcelain">
      <Reveal i={0}>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-porcelain/50">
          D · marca escolhida: SPAL
        </p>
        <h3 className="deck-title mt-2">Três melhorias, por ordem de prioridade.</h3>
      </Reveal>
      <div className="grid grid-cols-3 gap-5">
        {JOGADAS.map((j, i) => (
          <Reveal
            key={j.n}
            i={i + 1}
            className="deck-card border border-porcelain/15 bg-porcelain/5 p-6"
          >
            <p className="deck-num text-5xl text-vaa">{j.n}</p>
            <p className="mt-3 text-lg font-semibold">{j.title}</p>
            <p className="mt-2 text-[12px] text-porcelain/60">{j.onde}</p>
          </Reveal>
        ))}
      </div>
      <Reveal i={4}>
        <p className="text-[15px] text-porcelain/80">
          A distância entre o que a SPAL tem e o que comunica é grande — e pode ser reduzida com
          três ações concretas.
        </p>
      </Reveal>
    </div>
  );
}

export function Jogada({ n, active }: { n: number; active: boolean }) {
  const j = JOGADAS[n - 1]!;
  return (
    <div className="grid h-full grid-cols-[1.25fr_0.75fr] gap-6 p-10">
      <div className="space-y-2.5">
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
          <Reveal key={k} i={i + 1} className="rounded-2xl bg-white p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-navy/45">{k}</p>
            <p className="text-[12px] leading-snug text-navy/80">{v}</p>
          </Reveal>
        ))}
      </div>
      <Reveal i={2} className="flex flex-col rounded-2xl border border-navy/10 bg-white p-4">
        <p className="text-[11px] font-semibold text-navy/60">antes → depois</p>
        <p className="text-[10px] text-navy/45">{j.unidade}</p>
        <div className="mt-2 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { m: "antes", v: j.antes },
                { m: "depois", v: j.depois },
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
        <Chip className="mt-2 self-start">valores a testar</Chip>
      </Reveal>
    </div>
  );
}


const SEMANA = [
  {
    dia: "Seg 8/9",
    titulo: "Feito em Alcobaça",
    detalhe: "Vídeo curto da fábrica, 20 s, legenda com 'Onde comprar →'.",
    hora: "10:00",
  },
  {
    dia: "Qua 10/9",
    titulo: "A mesa da avó",
    detalhe: "Foto de mesa posta em casa, com a peça de Uso Diário e preço indicativo.",
    hora: "19:00",
  },
  {
    dia: "Sex 12/9",
    titulo: "Escolhe tu",
    detalhe: "Duas peças, uma pergunta à audiência. Respostas todas respondidas no mesmo dia.",
    hora: "18:00",
  },
  {
    dia: "Dom 14/9",
    titulo: "Onde nos encontras",
    detalhe: "Carrossel com lojas, parceiros e link na bio atualizado.",
    hora: "11:00",
  },
];

export function Semana() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="flex h-full flex-col justify-center gap-8 p-14">
      <Reveal i={0}>
        <h3 className="deck-h2 text-navy">8 a 14 de setembro</h3>
        <Chip className="mt-3">horários = hipótese a testar</Chip>
      </Reveal>
      <div className="relative pt-10">
        <div className="deck-grow absolute left-0 right-0 top-14 h-0.5 bg-navy/15" />
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
                <span className="mt-1 block text-lg font-semibold">{s.titulo}</span>
              </button>
              <div
                className="overflow-hidden transition-all duration-500"
                style={{ maxHeight: open === i ? 160 : 0, opacity: open === i ? 1 : 0 }}
              >
                <p className="mt-3 rounded-2xl bg-white p-4 text-[13px] leading-snug text-navy/75">
                  {s.detalhe}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Publicacao() {
  const [alt, setAlt] = useState(false);
  return (
    <div className="grid h-full grid-cols-[0.9fr_1.1fr] items-center gap-12 p-14">
      <Reveal i={0} className="mx-auto w-[340px] rounded-3xl border border-navy/10 bg-white p-4 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 pb-3">
          <span className="h-8 w-8 rounded-full bg-spal" />
          <span className="text-sm font-semibold text-navy">spal.porcelanas</span>
        </div>
        <Shot
          id="maquete"
          group="maquete"
          caption="Maquete da publicação · Instagram SPAL · maquete_publicacao_SPAL.png"
          replace
          className="aspect-square"
        >
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-[linear-gradient(160deg,#eae4d8,#f7f5f0)] text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-navy/45">
              maquete_publicacao_SPAL.png
            </p>
            <p className="px-6 text-[11px] text-navy/50">
              carrega a imagem para substituir este espaço
            </p>
          </div>
        </Shot>
        <p className="mt-3 text-[13px] leading-snug text-navy/80">
          <strong>Feito em Alcobaça desde 1965.</strong> Este prato sai do forno a 1 400 °C e vai
          direto para a tua mesa. Vai à máquina e ao micro-ondas.
          <br />
          <span className="text-spal">Onde comprar →</span> link na bio.
        </p>
        <button
          onClick={() => setAlt((a) => !a)}
          className="deck-slide-btn mt-3 rounded-full border border-navy/15 px-4 py-1.5 text-xs font-semibold text-navy"
        >
          {alt ? "esconder alt text" : "ver alt text"}
        </button>
        {alt && (
          <p className="deck-rise mt-2 rounded-xl bg-porcelain p-3 text-[11px] text-navy/70">
            Prato branco de porcelana SPAL com friso azul, sobre mesa de madeira clara, ao lado de
            um guardanapo de linho.
          </p>
        )}
      </Reveal>
      <div className="space-y-4">
        <Reveal i={1}>
          <h3 className="deck-h2 text-navy">Uma publicação, três trabalhos</h3>
        </Reveal>
        {[
          ["Mostra a origem", "Alcobaça é um argumento de venda, não uma nota de rodapé."],
          ["Responde à dúvida", "Vai à máquina. É a pergunta que a Inês tinha."],
          ["Fecha o percurso", "'Onde comprar' na legenda e na bio, sempre."],
        ].map(([t, d], i) => (
          <Reveal key={t} i={i + 2} className="deck-card bg-white p-5">
            <p className="font-semibold text-navy">{t}</p>
            <p className="mt-1 text-[14px] text-navy/70">{d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

const BIO_DEPOIS =
  "Porcelana feita em Alcobaça desde 1965. Mesa, casa e hotelaria. Vai à máquina. Onde comprar 👉";

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
    }, 28);
    return () => clearInterval(id);
  }, [depois]);
  useEffect(() => {
    if (!active) setDepois(false);
  }, [active]);
  return (
    <div className="flex h-full flex-col justify-center gap-8 p-14">
      <Reveal i={0}>
        <h3 className="deck-h2 text-navy">A bio, antes e depois</h3>
      </Reveal>
      <div className="grid grid-cols-2 gap-6">
        <Reveal i={1} className="rounded-3xl border border-navy/10 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-navy/45">Antes</p>
          <p className="mt-3 text-[15px] leading-relaxed text-navy/80">
            SPAL Porcelanas · Portuguese porcelain manufacturer since 1965 · Tableware & Hotelware
          </p>
          <p className="mt-4 text-xs text-navy/45">Fala inglês, fala com o retalho, não tem link útil.</p>
        </Reveal>
        <Reveal i={2} className="rounded-3xl border border-spal/25 bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-spal">Depois</p>
            <button
              onClick={() => setDepois(true)}
              className="deck-slide-btn rounded-full bg-spal px-4 py-1.5 text-xs font-semibold text-porcelain"
            >
              depois
            </button>
          </div>
          <p className="mt-3 min-h-[92px] text-[15px] leading-relaxed text-navy/85">
            {typed}
            {depois && typed.length < BIO_DEPOIS.length && (
              <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-navy align-middle" />
            )}
          </p>
          <p className="mt-2 text-xs font-semibold text-navy/55">
            <Num value={depois ? typed.length : 0} active={active} />/150 caracteres
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export function Resposta({ active }: ChapterProps) {
  const resposta =
    "Olá Inês! Obrigada 💙 Essa peça é da nossa linha de Uso Diário. Pode encontrá-la no El Corte Inglés de Lisboa e Gaia, nos nossos parceiros de mesa e na loja de fábrica em Alcobaça (seg-sáb, 10h-19h). Quer que lhe indiquemos a mais perto de si?";
  const [typed, setTyped] = useState("");
  useEffect(() => {
    setTyped("");
    if (!active) return;
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i += 2;
        setTyped(resposta.slice(0, i));
        if (i >= resposta.length) clearInterval(id);
      }, 26);
    }, 1200);
    return () => clearTimeout(start);
  }, [active]);
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-14">
      <Reveal i={0}>
        <h3 className="deck-h2 text-navy">A Inês pergunta</h3>
      </Reveal>
      <Reveal i={1} className="max-w-[620px] rounded-3xl rounded-bl-md bg-ines/12 p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-ines">Inês · comentário</p>
        <p className="mt-2 text-lg text-navy/85">
          "Gostei desta peça, mas não consigo perceber onde a posso comprar…"
        </p>
      </Reveal>
      <div className="flex justify-end">
        <div className="max-w-[680px] rounded-3xl rounded-br-md bg-spal p-6 text-porcelain">
          <p className="text-[10px] font-bold uppercase tracking-widest text-porcelain/70">
            SPAL · resposta em minutos
          </p>
          <p className="mt-2 min-h-[110px] text-lg leading-snug">
            {typed}
            {typed.length < resposta.length && (
              <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-porcelain align-middle" />
            )}
          </p>
        </div>
      </div>
      <Chip tone="spal" className="self-start">
        regra: responder a 95 % dos comentários em 24 h
      </Chip>
    </div>
  );
}

export function MarcaX({ active }: ChapterProps) {
  const [flipped, setFlipped] = useState(false);
  const duelos: Array<[string, number, number, string, string]> = [
    ["CTR", 3.0, 2.5, "%", "quantas pessoas clicam no anúncio"],
    ["Conversão", 2.5, 5.0, "%", "quantos cliques acabam em compra"],
    ["ROAS", 4, 8, "×", "quanto rende cada euro de anúncio"],
  ];
  return (
    <div className="grid h-full grid-cols-[0.95fr_1.05fr] gap-10 p-14 text-porcelain">
      <div className="space-y-4">
        <Reveal i={0}>
          <h3 className="deck-h2">O Instagram atrai. O Facebook vende.</h3>
        </Reveal>
        {(
          [
            ["Instagram", 100, 3.0, 2.5, "#7FA6E0"],
            ["Facebook", 100, 2.5, 5.0, VAA],
          ] as const
        ).map(([canal, base, ctr, conv, color], i) => (
          <Reveal key={canal} i={i + 1} className="rounded-2xl border border-porcelain/15 p-4">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
              {canal}
            </p>
            <div className="mt-3 space-y-2">
              {[
                ["Impressões", base],
                ["Cliques", ctr],
                ["Compras", (base * ctr * conv) / 10000],
              ].map(([label, v], k) => (
                <div key={label as string} className="flex items-center gap-3">
                  <span className="w-24 text-[11px] text-porcelain/60">{label}</span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-porcelain/10">
                    <div
                      className="deck-grow h-full rounded-full"
                      style={{
                        width: active ? `${100 / (k * 6 + 1)}%` : 0,
                        background: color,
                        animationDelay: `${i * 200 + k * 150}ms`,
                      }}
                    />
                  </div>
                  <span className="deck-num w-14 text-right text-xs">
                    {(v as number).toLocaleString("pt-PT", { maximumFractionDigits: 1 })}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
      <div className="space-y-4">
        {duelos.map(([label, ig, fb, suffix, gloss], i) => (
          <Reveal key={label} i={i + 1} className="rounded-2xl bg-porcelain/8 p-4">
            <p className="text-sm font-semibold">
              {label}
              <span className="ml-2 text-[11px] font-normal text-porcelain/60">{gloss}</span>
            </p>
            <div className="mt-2 flex items-end gap-6">
              <div>
                <Num value={ig} active={active} decimals={label === "ROAS" ? 0 : 1} suffix={suffix} className="text-4xl text-[#7FA6E0]" />
                <p className="text-[11px] text-porcelain/60">Instagram</p>
              </div>
              <div>
                <Num value={fb} active={active} decimals={label === "ROAS" ? 0 : 1} suffix={suffix} className="text-4xl text-vaa" />
                <p className="text-[11px] text-porcelain/60">Facebook</p>
              </div>
            </div>
          </Reveal>
        ))}
        <div className="[perspective:1200px]" onClick={() => setFlipped((f) => !f)}>
          <div
            className="relative h-[120px] cursor-pointer transition-transform duration-700 [transform-style:preserve-3d]"
            style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
          >
            <div className="absolute inset-0 rounded-2xl bg-vaa p-5 text-navy [backface-visibility:hidden]">
              <p className="deck-num text-3xl">ROAS 8</p>
              <p className="text-sm">clica para ver o senão</p>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-porcelain p-5 text-navy [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <p className="font-semibold">ROAS 8 → não é lucro</p>
              <p className="mt-1 text-[13px] text-navy/70">
                Falta descontar produto, portes, devoluções e o trabalho. É receita por euro
                investido, não margem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Indicadores({ active }: ChapterProps) {
  const gauges = [
    { label: "Cliques em 'Onde comprar'", base: 0, min: 2, alvo: 5, suffix: " %" },
    { label: "Respostas em 24 h", base: 40, min: 80, alvo: 95, suffix: " %" },
    { label: "Rejeição no telemóvel", base: 0, min: -10, alvo: -10, suffix: " pontos" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-8 p-14">
      <Reveal i={0}>
        <h3 className="deck-h2 text-navy">Como saberemos que resultou</h3>
        <Chip className="mt-3">a medir · 30 dias após arrancar</Chip>
      </Reveal>
      <div className="grid grid-cols-3 gap-6">
        {gauges.map((g, i) => (
          <Reveal key={g.label} i={i + 1} className="deck-card bg-white p-6">
            <p className="text-sm font-semibold text-navy/70">{g.label}</p>
            <div className="mt-4 flex items-end gap-2">
              <Num value={g.alvo} active={active} suffix={g.suffix} className="text-5xl text-spal" />
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-navy/8">
              <div
                className="deck-grow h-full rounded-full bg-spal"
                style={{ width: active ? "78%" : 0, animationDelay: `${i * 150}ms` }}
              />
            </div>
            <p className="mt-2 text-xs text-navy/55">
              mínimo aceitável {g.min}
              {g.suffix} · alvo {g.alvo}
              {g.suffix}
            </p>
          </Reveal>
        ))}
      </div>
      <Reveal i={4}>
        <p className="text-sm text-navy/60">
          Medição
          <Glossary term="taxa de rejeição" meaning="quem entra e sai sem clicar em nada" />
        </p>
      </Reveal>
    </div>
  );
}

export function Final() {
  return (
    <div className="grid h-full grid-cols-[0.85fr_1.15fr] items-center gap-12 p-14 text-porcelain">
      <Reveal i={0} className="mx-auto w-[300px] rounded-[28px] border-4 border-porcelain/25 bg-porcelain p-3">
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
          <p className="text-sm uppercase tracking-[0.3em] text-porcelain/50">20:00 · cronómetro parado</p>
          <h3 className="deck-title mt-3">A Inês teve resposta.</h3>
        </Reveal>
        <Reveal i={2}>
          <p className="max-w-[680px] text-2xl italic leading-snug text-vaa">
            A SPAL precisa de falar com a Inês antes que a Vista Alegre o faça por ela — em
            Alcobaça.
          </p>
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
    <div className="grid h-full grid-cols-2 gap-10 p-14">
      <div className="space-y-3">
        <Reveal i={0}>
          <h3 className="deck-h2 text-navy">Bastidores</h3>
          <p className="mt-2 text-sm text-navy/60">Fontes consultadas em 04/09/2026.</p>
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
    </div>
  );
}
