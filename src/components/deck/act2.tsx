import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import spalOpeningVideo from "@/assets/ines-abre-spal.mp4.asset.json";
import vaaOpeningVideo from "@/assets/ines-abre-vista-alegre.mp4.asset.json";
import spalOpeningPoster from "@/assets/ines-abre-spal.jpg.asset.json";
import vaaOpeningPoster from "@/assets/ines-abre-vista-alegre.jpg.asset.json";
import { Chip, Num, Reveal } from "./primitives";
import type { ChapterProps } from "./act1";

export function InesPersona() {
  return (
    <div className="grid h-full grid-cols-[0.85fr_1.15fr] items-center gap-10 p-14">
      <Reveal i={0} className="deck-card overflow-hidden bg-white">
        <div className="flex h-[300px] items-center justify-center bg-vaa/15">
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

function OpeningPhone({ brand, site, video, poster, tone }: {
  brand: string;
  site: string;
  video: string;
  poster: string;
  tone: "spal" | "vaa";
}) {
  const smallVideo = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    const player = smallVideo.current;
    if (!player) return;
    if (player.paused) {
      void player.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      player.pause();
      setPlaying(false);
    }
  };
  const open = () => {
    smallVideo.current?.pause();
    setPlaying(false);
    setExpanded(true);
  };

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setExpanded(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  return (
    <div className="flex min-w-0 flex-col items-center gap-3">
      <div className="w-full border-b border-navy/15 pb-2 text-center">
        <p className={`text-sm font-extrabold uppercase ${tone === "spal" ? "text-spal" : "text-vaa"}`}>{brand}</p>
        <p className="text-xs text-navy/55">{site}</p>
      </div>
      <div className="relative aspect-[9/16] h-[370px] max-h-full overflow-hidden rounded-[29px] border-[6px] border-navy bg-navy shadow-[var(--shadow-card)]">
        <video
          ref={smallVideo}
          src={video}
          poster={poster}
          playsInline
          muted
          preload="metadata"
          onEnded={() => setPlaying(false)}
          className="h-full w-full cursor-pointer object-contain"
          onClick={toggle}
          aria-label={`Vídeo da ${brand}`}
        />
        {!playing && (
          <Button
            type="button"
            variant="ghost"
            onClick={toggle}
            aria-label={`Reproduzir vídeo da ${brand}`}
            className="absolute inset-0 h-full w-full rounded-none bg-navy/10 hover:bg-navy/10"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-porcelain text-navy shadow-[var(--shadow-card)]">
              <Play className="ml-1 fill-current" />
            </span>
          </Button>
        )}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={open}
        aria-label={`Ampliar vídeo da ${brand}`}
        className={`h-9 border-current bg-transparent px-5 ${tone === "spal" ? "text-spal" : "text-vaa"}`}
      >
        <Maximize2 /> Ampliar
      </Button>
      {expanded && createPortal(
        <div data-video-expanded="true" role="dialog" aria-modal="true" aria-label={`Vídeo ampliado da ${brand}`} className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-navy/95 p-4" onClick={() => setExpanded(false)}>
          <div className="flex w-full max-w-lg items-center justify-between text-porcelain" onClick={(event) => event.stopPropagation()}>
            <span className="text-sm font-bold">{brand} · {site}</span>
            <Button type="button" variant="ghost" onClick={() => setExpanded(false)} className="text-porcelain hover:bg-porcelain/10 hover:text-porcelain" aria-label="Fechar vídeo"><X /> Fechar</Button>
          </div>
          <video src={video} poster={poster} autoPlay controls playsInline className="max-h-[82vh] max-w-full rounded-md bg-navy object-contain" onClick={(event) => event.stopPropagation()} />
        </div>,
        document.body,
      )}
    </div>
  );
}

export function Min0() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-14 py-8">
      <Reveal i={0} className="text-center">
        <h3 className="deck-h2 text-navy">Ela abre os dois sites</h3>
        <p className="mt-2 text-navy/65">O primeiro ecrã já decide muita coisa.</p>
      </Reveal>
      <div className="grid w-full max-w-[700px] grid-cols-2 gap-12">
        <Reveal i={1}><OpeningPhone brand="SPAL" site="spal.pt" video={spalOpeningVideo.url} poster={spalOpeningPoster.url} tone="spal" /></Reveal>
        <Reveal i={2}><OpeningPhone brand="Vista Alegre" site="vistaalegre.com" video={vaaOpeningVideo.url} poster={vaaOpeningPoster.url} tone="vaa" /></Reveal>
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

function ProductComparison({ brand, seen, needed, tone, delay }: {
  brand: string;
  seen: string[];
  needed: string[];
  tone: "spal" | "vaa";
  delay: number;
}) {
  const accent = tone === "spal" ? "text-spal" : "text-vaa";
  const rule = tone === "spal" ? "border-spal" : "border-vaa";
  return (
    <div className="deck-rise border-t border-navy/20 pt-4" style={{ animationDelay: `${delay}ms` }}>
      <p className={`mb-4 text-sm font-extrabold uppercase ${accent}`}>{brand}</p>
      <div className="grid grid-cols-2 gap-8">
        <section className={`border-l-[3px] ${rule} pl-5`}>
          <h4 className="mb-3 text-lg font-bold text-navy">O que a Inês vê</h4>
          <ul className="space-y-2 text-[17px] leading-snug text-navy/80">
            {seen.map((item) => <li key={item}>· {item}</li>)}
          </ul>
        </section>
        <section className={`border-l-[3px] ${rule} pl-5`}>
          <h4 className="mb-3 text-lg font-bold text-navy">O que a Inês precisava</h4>
          <ul className="space-y-2 text-[17px] leading-snug text-navy/80">
            {needed.map((item) => <li key={item}>· {item}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function Min8() {
  return (
    <div className="flex h-full flex-col justify-center gap-7 px-16 py-12">
      <Reveal i={0}>
        <h3 className="deck-h2 text-navy">A ficha do produto</h3>
      </Reveal>
      <div className="space-y-8">
        <ProductComparison
          brand="SPAL"
          tone="spal"
          delay={150}
          seen={["medidas em cm", "peso em gramas", "referência interna", "Pack 04/24"]}
          needed={["preço", "onde comprar", "vai bem na máquina?", "embalagem para presente"]}
        />
        <ProductComparison
          brand="Vista Alegre"
          tone="vaa"
          delay={300}
          seen={["preço", "botão comprar", "cuidados de lavagem", "material e origem"]}
          needed={["já tem tudo o que ela procurava"]}
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
              <Num value={0} active={active} className="text-7xl text-spal" />
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
