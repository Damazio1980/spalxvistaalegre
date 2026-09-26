import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import {
  FRAMES,
  type FrameDef,
} from "@/lib/presentation/deck";
import { CHAPTERS } from "./registry";
import { LightboxProvider } from "./primitives";
import { AudienceQuestion } from "./AudienceQuestion";
import { cn } from "@/lib/utils";
import porcelainNavigationBackground from "@/assets/porcelain-navigation-bg-new.png.asset.json";

type Viewport = { width: number; height: number };

/** Single-colour editorial canvases. The cover remains the sole image-led exception. */
type Backdrop = "pattern" | "navy" | "rose" | "wash" | "white";

/** Todas as páginas que incluem gráficos usam uma base branca. */
const CHART_BACKDROPS: Record<string, Extract<Backdrop, "white">> = {
  nomes: "white",
  website: "white",
  "duelo-1": "white",
  "duelo-2": "white",
  "duelo-3": "white",
  "duelo-4": "white",
  "duelo-5": "white",
  "duelo-6": "white",
  percurso: "white",
  radar: "white",
  redes: "white",
  placar1: "white",
  jogadas: "white",
  "jogada-1": "white",
  "jogada-2": "white",
  "jogada-3": "white",
  marcax: "white",
  indicadores: "white",
  final: "white",
  min0: "white",
};

const REQUESTED_BACKDROPS: Record<string, Extract<Backdrop, "navy" | "white">> = {
  min8: "navy",
  "dois-placares": "white",
  semana: "navy",
};

function fitScale(f: FrameDef, viewport: Viewport) {
  const widthFit = (viewport.width * 0.94) / f.w;
  const heightFit = (viewport.height * 0.86) / f.h;
  return Math.min(widthFit, heightFit);
}

export function Stage() {
  const [index, setIndex] = useState(0);
  const [viewport, setViewport] = useState<Viewport>({ width: 1280, height: 720 });
  const [canaisPage, setCanaisPage] = useState(0);
  const [redesPage, setRedesPage] = useState(0);
  const previous = useRef(0);
  const shell = useRef<HTMLDivElement>(null);

  const frame = FRAMES[index]!;
  const redesTheme: Extract<Backdrop, "navy" | "rose" | "white"> | undefined =
    frame.id === "redes" ? (redesPage === 2 ? "white" : "navy") : undefined;
  const canaisTheme: Extract<Backdrop, "navy" | "white"> | undefined =
    frame.id === "canais" ? (canaisPage === 0 ? "navy" : "white") : undefined;
  const requestedTheme = REQUESTED_BACKDROPS[frame.id];
  const chartTheme = frame.id === "redes" || frame.id === "canais" ? undefined : CHART_BACKDROPS[frame.id];
  const editorialTheme: Extract<Backdrop, "navy" | "rose"> = index % 2 === 0 ? "rose" : "navy";
  const backdrop: Backdrop = frame.id === "capa" ? "pattern" : requestedTheme ?? canaisTheme ?? redesTheme ?? chartTheme ?? editorialTheme;
  const frameTheme = frame.id === "capa" ? undefined : requestedTheme ?? canaisTheme ?? redesTheme ?? chartTheme ?? editorialTheme;

  useEffect(() => {
    const measure = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex((cur) => {
      previous.current = cur;
      const target = Math.max(0, Math.min(FRAMES.length - 1, next));
      if (FRAMES[target]?.id === "canais") setCanaisPage(next < cur ? 1 : 0);
      if (FRAMES[target]?.id === "redes") setRedesPage(next < cur ? 3 : 0);
      return target;
    });
  }, []);

  const goForward = useCallback(() => {
    if (frame.id === "canais" && canaisPage < 1) {
      setCanaisPage((page) => page + 1);
      return;
    }
    if (frame.id === "redes" && redesPage < 3) {
      setRedesPage((page) => page + 1);
      return;
    }
    goTo(index + 1);
  }, [canaisPage, frame.id, goTo, index, redesPage]);

  const goBack = useCallback(() => {
    if (frame.id === "canais" && canaisPage > 0) {
      setCanaisPage((page) => page - 1);
      return;
    }
    if (frame.id === "redes" && redesPage > 0) {
      setRedesPage((page) => page - 1);
      return;
    }
    goTo(index - 1);
  }, [canaisPage, frame.id, goTo, index, redesPage]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('[data-video-expanded="true"]')) return;
      const t = e.target as HTMLElement | null;
      const typing =
        !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (typing && e.key !== "Escape") return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        goForward();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goBack();
      } else if (e.key.toLowerCase() === "f") {
        if (document.fullscreenElement) document.exitFullscreen();
        else shell.current?.requestFullscreen?.();
      }
    };
    shell.current?.focus?.({ preventScroll: true });
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [goBack, goForward]);

  /* swipe */
  useEffect(() => {
    let sx = 0;
    const start = (e: TouchEvent) => (sx = e.touches[0]!.clientX);
    const end = (e: TouchEvent) => {
      if (document.querySelector('[data-video-expanded="true"]')) return;
      const dx = e.changedTouches[0]!.clientX - sx;
      if (Math.abs(dx) > 60) (dx < 0 ? goForward() : goBack());
    };
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", end, { passive: true });
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
    };
  }, [goBack, goForward]);

  const scale = useMemo(() => fitScale(frame, viewport), [frame, viewport]);
  const transitionStyle = useMemo(() => {
    const from = FRAMES[previous.current] ?? frame;
    const rawX = frame.x - from.x;
    const rawY = frame.y - from.y;
    const distance = Math.hypot(rawX, rawY);
    const fallback = index >= previous.current ? 1 : -1;
    const unitX = distance > 0 ? rawX / distance : fallback;
    const unitY = distance > 0 ? rawY / distance : 0;
    return {
      "--deck-scale": scale,
      "--deck-entry-scale": scale * 0.72,
      "--deck-travel-x": `${Math.round(unitX * 150)}px`,
      "--deck-travel-y": `${Math.round(unitY * 100)}px`,
    } as CSSProperties;
  }, [frame, index, scale]);
  const Chapter = CHAPTERS[frame.id];

  return (
    <LightboxProvider>
      <div
        ref={shell}
        tabIndex={-1}
        className={cn(
          "relative h-screen w-screen overflow-hidden font-sans text-ink outline-none",
          backdrop === "navy" ? "bg-navy" : backdrop === "rose" ? "bg-vaa" : "bg-porcelain",
        )}
      >
        <PorcelainBackdrop variant={backdrop} />

        {/* single slide, centred and scaled to the screen */}
        <div className="absolute inset-0 flex min-w-0 items-center justify-center">
          <div
            key={frame.id}
            className={cn(
              "deck-slide-enter shrink-0 overflow-hidden",
              frameTheme ? "deck-sample-slide" : "shadow-[var(--shadow-frame)]",
              frameTheme === "navy" || (!frameTheme && frame.navy) ? "bg-navy" :
                frameTheme === "rose" ? "bg-vaa" : "bg-porcelain",
              frameTheme && `deck-theme-${frameTheme}`,
            )}
            style={{
              width: frame.w,
              height: frame.h,
              borderRadius: frameTheme ? 0 : 12,
               ...transitionStyle,
            }}
          >
            {Chapter && (
              <FrameBody frame={frame} theme={frameTheme}>
                <Chapter
                  active
                  {...(frame.id === "canais" ? { subframe: canaisPage } : {})}
                  {...(frame.id === "redes" ? { subframe: redesPage } : {})}
                />
              </FrameBody>
            )}
          </div>
        </div>

        {/* arrows */}
        <button
          aria-label="Anterior"
          onClick={goBack}
          className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/80 p-3 text-navy shadow-[var(--shadow-card)] transition hover:bg-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          aria-label="Seguinte"
          onClick={goForward}
          className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/80 p-3 text-navy shadow-[var(--shadow-card)] transition hover:bg-white"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* presentation tools remain available without slide navigation chrome */}
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
          <AudienceQuestion />
          <button
            onClick={() =>
              document.fullscreenElement
                ? document.exitFullscreen()
                : shell.current?.requestFullscreen?.()
            }
            className="grid h-7 w-7 place-items-center rounded-full border border-navy/15 bg-porcelain text-navy"
            aria-label="Ecrã inteiro"
          >
            <Maximize className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </LightboxProvider>
  );
}

/* frame chrome: slide content is visible without temporary pop-up pages */
function FrameBody({
  frame,
  theme,
  children,
}: {
  frame: FrameDef;
  theme?: "navy" | "rose" | "white" | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full w-full">
      {frame.id === "nomes" && (
        <span className="absolute left-6 top-5 z-10 text-[11px] font-bold uppercase tracking-[0.25em] text-navy/40">
          Enquadramento
        </span>
      )}
      {![
        "capa",
        "apresentacao",
        "apresentacao-empresas",
        "nomes",
        "pergunta",
        "identificacao-canais",
        "introducao-website",
        "placar1",
        "jornada-compra",
        "jogadas",
        "semana",
      ].includes(frame.id) && (
        <span
          className={cn(
            "absolute left-6 top-5 z-10 text-[11px] font-bold uppercase tracking-[0.25em]",
            theme === "navy" ? "text-porcelain/55" : theme === "rose" ? "text-navy/60" : frame.navy ? "text-vaa" : "text-navy/40",
          )}
        >
          {frame.title}
        </span>
      )}
      <div className="h-full pt-6">{children}</div>
    </div>
  );
}

/* alternating slide backgrounds: porcelain pattern, navy, dusty rose, soft pattern */
function PorcelainBackdrop({ variant }: { variant: Backdrop }) {
  const showArt = variant === "pattern" || variant === "wash";
  return (
    <div
      className={cn(
        "porcelain-pattern pointer-events-none absolute inset-0",
        variant === "navy" && "porcelain-pattern--navy",
        variant === "rose" && "porcelain-pattern--rose",
        variant === "white" && "porcelain-pattern--white",
      )}
      aria-hidden="true"
    >
      {showArt && (
        <img
          src={porcelainNavigationBackground.url}
          alt=""
          width={1920}
          height={1088}
          className={cn(
            "porcelain-pattern__art",
            variant === "pattern" && "porcelain-pattern__art--full",
          )}
        />
      )}
      {variant === "wash" && <div className="porcelain-pattern__glaze" />}
    </div>
  );
}

