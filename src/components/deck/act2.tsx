import { useEffect, useState } from "react";
import { Chip, Num, Phone, Reveal, Shot } from "./primitives";
import { RefShot } from "./mocks";
import { FIG } from "@/data/images";
import type { ChapterProps } from "./act1";

export function InesPersona() {
  return (
    <div className="grid h-full grid-cols-[0.85fr_1.15fr] items-center gap-10 p-14">
      <Reveal i={0} className="deck-card overflow-hidden bg-white">
        <div className="flex h-[300px] items-center justify-center bg-[linear-gradient(160deg,oklch(0.9_0.05_40),oklch(0.75_0.1_40))]">
          <div className="relative h-40 w-40 rounded-full bg-porcelain">
            <div className="absolute left-1/2 top-8 h-14 w-14 -translate-x-1/2 rounded-full bg-ines/80" />
            <div className="absolute bottom-6 left-1/2 h-16 w-24 -translate-x-1/2 rounded-t-[40px] bg-navy/70" />
          </div>
        </div>
        <div className="p-6">
          <p className="deck-h2 text-4xl text-ines">Inês</p>
          <p className="mt-1 text-sm text-navy/70">36 anos · Lisboa · compra pelo telemóvel</p>
        </div>
      </Reveal>
      <div className="space-y-5">
        <Reveal i={1}>
          <h3 className="deck-h2 text-navy">
            Quer oferecer uma peça à mãe. <em className="text-ines">Hoje.</em>
          </h3>
          <p className="mt-3 max-w-[560px] text-lg text-navy/70">
            Tem 20 minutos, o telemóvel na mão e nenhuma paciência para menus. A partir de agora,
            cada obstáculo que ela encontra é um número que já viste no Ato 1.
          </p>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {["não conhece as marcas", "quer saber o preço", "quer saber onde comprar"].map(
            (c, i) => (
              <Chip key={c} tone="ines" delay={300 + i * 250} className="px-5 py-2 text-base">
                {c}
              </Chip>
            ),
          )}
        </div>
        <Reveal i={4} className="rounded-2xl border border-navy/10 bg-white p-5">
          <p className="text-sm text-navy/70">
            Cronómetro a arrancar em <strong>00:00</strong>. Placar de volta a <strong>0-0</strong>.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export function Min0() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 p-12">
      <Reveal i={0} className="text-center">
        <h3 className="deck-h2 text-navy">Ela abre os dois sites</h3>
        <p className="mt-2 text-navy/65">O primeiro ecrã já decide muita coisa.</p>
      </Reveal>
      <div className="flex items-start gap-14">
        <Reveal i={1}>
          <Phone title="SPAL" tone="spal">
            <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
              <p className="text-[10px] uppercase tracking-widest text-navy/40">spal.pt</p>
              <p className="font-semibold">Escolha o idioma</p>
              <div className="flex gap-2">
                <span className="rounded-md border border-navy/20 px-3 py-1">PT</span>
                <span className="rounded-md border border-navy/20 px-3 py-1">EN</span>
              </div>
              <div className="mt-4 w-full rounded-lg bg-white p-2 text-left text-[9px] text-navy/50">
                Notícias · Feira de Frankfurt 2015 · Nova coleção 2015
              </div>
            </div>
          </Phone>
        </Reveal>
        <Reveal i={2}>
          <Phone title="Vista Alegre" tone="vaa">
            <div className="h-full p-3">
              <p className="text-[9px] uppercase tracking-widest text-navy/40">vistaalegre.com</p>
              <div className="mt-2 h-28 rounded-lg bg-gradient-to-br from-vaa to-vaa/25" />
              <p className="mt-2 font-semibold">Coleção Primavera</p>
              <p className="text-[10px] text-navy/60">Prato de sobremesa</p>
              <p className="mt-1 font-bold text-vaa">29,50 €</p>
              <div className="mt-2 rounded-md bg-navy py-1 text-center text-[10px] font-semibold text-porcelain">
                Comprar
              </div>
            </div>
          </Phone>
        </Reveal>
      </div>
      <div className="flex gap-3">
        <RefShot img={FIG["fig8-spal-mobile"]!} group="min0" idSuffix="-min0" className="h-24 w-56" />
        <RefShot img={FIG["fig9-vaa-mobile"]!} group="min0" idSuffix="-min0" className="h-24 w-56" />
      </div>
      <Chip tone="ines">isto é a ronda 1 do Ato 1 a acontecer</Chip>
    </div>
  );
}

export function Min3() {
  const spal = ["Produto", "Mesa", "Colecções", "Uso Diário", "miniatura 04/24"];
  const vaa = ["Presentes", "Para Ela", "Peça", "Comprar"];
  return (
    <div className="flex h-full flex-col justify-center gap-8 p-14">
      <Reveal i={0}>
        <h3 className="deck-h2 text-navy">Quantos cliques até um prato?</h3>
      </Reveal>
      {(
        [
          ["SPAL", spal, "bg-spal", "text-spal"],
          ["Vista Alegre", vaa, "bg-vaa", "text-vaa"],
        ] as const
      ).map(([name, steps, bg, text], row) => (
        <Reveal key={name} i={row + 1} className="space-y-2">
          <p className={`text-xs font-bold uppercase tracking-widest ${text}`}>
            {name} · {steps.length} passos
          </p>
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className="deck-pop rounded-xl bg-white px-4 py-3 text-sm font-semibold text-navy shadow-[var(--shadow-card)]"
                  style={{ animationDelay: `${row * 500 + i * 220}ms` }}
                >
                  {s}
                </span>
                {i < steps.length - 1 && (
                  <span
                    className="deck-grow h-0.5 w-8 rounded-full"
                    style={{ animationDelay: `${row * 500 + i * 220 + 120}ms` }}
                  >
                    <span className={`block h-full w-full ${bg}`} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      ))}
      <Reveal i={4} className="flex items-center gap-4">
        <Chip tone="vaa">+1 Vista Alegre</Chip>
        <p className="text-sm text-navy/65">
          A última etapa da SPAL é uma miniatura numerada. A Inês não sabe o que está a clicar.
        </p>
      </Reveal>
    </div>
  );
}

function FlipCard({
  brand,
  front,
  back,
  tone,
  delay,
}: {
  brand: string;
  front: string[];
  back: string[];
  tone: "spal" | "vaa";
  delay: number;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="deck-rise [perspective:1200px]"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative h-[330px] w-full cursor-pointer transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
      >
        <div className="absolute inset-0 rounded-3xl border border-navy/10 bg-white p-6 [backface-visibility:hidden]">
          <p
            className={`text-xs font-bold uppercase tracking-widest ${
              tone === "spal" ? "text-spal" : "text-vaa"
            }`}
          >
            {brand}
          </p>
          <p className="mt-1 text-sm font-semibold text-navy/70">o que a Inês vê</p>
          <ul className="mt-4 space-y-2 text-[14px] text-navy/80">
            {front.map((f) => (
              <li key={f}>· {f}</li>
            ))}
          </ul>
          <p className="absolute bottom-4 text-[11px] text-navy/40">clica para virar</p>
        </div>
        <div className="absolute inset-0 rounded-3xl bg-navy p-6 text-porcelain [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-sm font-semibold text-vaa">o que a Inês precisava</p>
          <ul className="mt-4 space-y-2 text-[14px] text-porcelain/85">
            {back.map((f) => (
              <li key={f}>· {f}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Min8() {
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-14">
      <Reveal i={0}>
        <h3 className="deck-h2 text-navy">A ficha do produto</h3>
      </Reveal>
      <div className="grid grid-cols-2 gap-6">
        <FlipCard
          brand="SPAL"
          tone="spal"
          delay={150}
          front={["medidas em cm", "peso em gramas", "referência interna", "Pack 04/24"]}
          back={["preço", "onde comprar", "vai bem na máquina?", "embalagem para presente"]}
        />
        <FlipCard
          brand="Vista Alegre"
          tone="vaa"
          delay={300}
          front={["preço", "botão comprar", "cuidados de lavagem", "material e origem"]}
          back={["já tem tudo o que ela procurava"]}
        />
      </div>
      <div className="flex items-center gap-4">
        <Chip tone="vaa">+1 Vista Alegre</Chip>
        <Chip tone="ines">
          a SPAL tem melhor informação técnica do que muitas lojas — mas para o retalho, não para a
          Inês
        </Chip>
      </div>
    </div>
  );
}

export function Min12({ active }: ChapterProps) {
  return (
    <div className="grid h-full grid-cols-2 gap-10 p-14">
      <Reveal i={0} className="rounded-3xl border border-spal/25 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-spal">SPAL</p>
        <p className="mt-2 text-lg font-semibold text-navy">O caminho parte-se a meio</p>
        <div className="mt-5 space-y-3">
          {["Ficha do produto", "Onde comprar?", "El Corte Inglés · parceiros", "e-mail em imagem"].map(
            (s, i) => (
              <div
                key={s}
                className="deck-rise flex items-center gap-3"
                style={{ animationDelay: `${i * 180}ms` }}
              >
                <span className="h-2 w-2 rounded-full bg-spal" />
                <span className="text-[14px] text-navy/75">{s}</span>
                {i === 1 && (
                  <span className="rounded-full bg-ines/12 px-2 py-0.5 text-[11px] font-bold text-ines">
                    caminho cortado
                  </span>
                )}
              </div>
            ),
          )}
        </div>
        <div className="mt-6 rounded-2xl bg-porcelain p-4">
          <p className="text-xs text-navy/55">Ao minuto 12</p>
          <Num value={12} active={active} suffix=" min" className="text-4xl text-spal" />
          <p className="text-xs text-navy/55">sem resposta</p>
        </div>
      </Reveal>
      <Reveal i={1} className="rounded-3xl border border-vaa/40 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-vaa">
          Vista Alegre
        </p>
        <p className="mt-2 text-lg font-semibold text-navy">O caminho chega ao fim</p>
        <div className="mt-5 space-y-3">
          {["Ficha com preço", "Adicionar ao carrinho", "Portes e prazo", "Loja mais perto · horário ✓"].map(
            (s, i) => (
              <div
                key={s}
                className="deck-rise flex items-center gap-3"
                style={{ animationDelay: `${i * 180}ms` }}
              >
                <span className="h-2 w-2 rounded-full bg-vaa" />
                <span className="text-[14px] text-navy/75">{s}</span>
              </div>
            ),
          )}
        </div>
        <div className="mt-6 rounded-2xl bg-porcelain p-4">
          <p className="text-xs text-navy/55">Ao minuto 6</p>
          <Num value={6} active={active} suffix=" min" className="text-4xl text-vaa" />
          <p className="text-xs text-navy/55">com carrinho</p>
        </div>
      </Reveal>
    </div>
  );
}

export function DoisPlacares({ active }: ChapterProps) {
  const [merged, setMerged] = useState(false);
  useEffect(() => {
    setMerged(false);
    if (!active) return;
    const t = setTimeout(() => setMerged(true), 1400);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-10 p-14 text-porcelain">
      <Reveal i={0}>
        <h3 className="deck-h2 text-center">Dois placares, o mesmo resultado</h3>
      </Reveal>
      <div className="relative flex h-[280px] w-full items-center justify-center">
        {(
          [
            ["Ato 1 · os dados", -1],
            ["Ato 2 · a Inês", 1],
          ] as const
        ).map(([label, dir]) => (
          <div
            key={label}
            className="absolute w-[340px] rounded-3xl bg-porcelain/10 p-8 text-center transition-all duration-[1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: merged
                ? "translateX(0) scale(1.05)"
                : `translateX(${dir * 220}px) rotate(${dir * 2}deg)`,
              opacity: merged && dir === -1 ? 0.35 : 1,
            }}
          >
            <p className="text-xs uppercase tracking-widest text-porcelain/60">{label}</p>
            <div className="mt-3 flex items-center justify-center gap-5">
              <Num value={0} active={active} className="text-7xl text-[#7FA6E0]" />
              <span className="text-2xl text-porcelain/40">—</span>
              <Num value={3} active={active} className="text-7xl text-vaa" />
            </div>
            <p className="mt-1 text-xs text-porcelain/60">SPAL — Vista Alegre</p>
          </div>
        ))}
      </div>
      <Reveal i={2}>
        <p className="text-2xl italic text-vaa">Os dados e a pessoa contam a mesma história.</p>
      </Reveal>
    </div>
  );
}
