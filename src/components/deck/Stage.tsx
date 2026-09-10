import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize, List } from "lucide-react";
import {
  ACTS,
  FOOTER,
  FRAMES,
  TOTAL_CHAPTERS,
  scoreAt,
  type ActId,
  type FrameDef,
} from "@/lib/presentation/deck";
import { CHAPTERS } from "./registry";
import { LightboxProvider } from "./primitives";
import { cn } from "@/lib/utils";
import porcelainNavigationBackground from "@/assets/porcelain-navigation-bg-new.png.asset.json";

type Viewport = { width: number; height: number };

/** background rotation: pattern → navy → dusty rose → soft pattern */
type Backdrop = "pattern" | "navy" | "rose" | "wash";
const BACKDROPS: Backdrop[] = ["pattern", "navy", "rose", "wash"];

function fitScale(f: FrameDef, viewport: Viewport) {
  const widthFit = (viewport.width * 0.94) / f.w;
  const heightFit = (viewport.height * 0.86) / f.h;
  return Math.min(widthFit, heightFit);
}

export function Stage() {
  const [index, setIndex] = useState(0);
  const [viewport, setViewport] = useState<Viewport>({ width: 1280, height: 720 });
  const [actOverlay, setActOverlay] = useState<ActId | null>(null);
  const [menu, setMenu] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const previous = useRef(0);
  const shell = useRef<HTMLDivElement>(null);

  const frame = FRAMES[index]!;
  const score = scoreAt(index);
  const backdrop = BACKDROPS[index % BACKDROPS.length]!;

  useEffect(() => {
    const measure = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goTo = useCallback((next: number) => {
    setMenu(false);
    setIndex((cur) => {
      previous.current = cur;
      return Math.max(0, Math.min(FRAMES.length - 1, next));
    });
  }, []);

  /* act transition: short title card between acts */
  useEffect(() => {
    const from = FRAMES[previous.current]!;
    const to = FRAMES[index]!;
    if (from.act === to.act || previous.current === index) {
      setActOverlay(null);
      return;
    }
    setActOverlay(to.act);
    const t = window.setTimeout(() => setActOverlay(null), 1400);
    return () => clearTimeout(t);
  }, [index]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing =
        !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (typing && e.key !== "Escape") return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === "Escape") {
        setMenu(false);
      } else if (e.key.toLowerCase() === "f") {
        if (document.fullscreenElement) document.exitFullscreen();
        else shell.current?.requestFullscreen?.();
      }
    };
    shell.current?.focus?.({ preventScroll: true });
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [goTo, index]);

  /* swipe */
  useEffect(() => {
    let sx = 0;
    const start = (e: TouchEvent) => (sx = e.touches[0]!.clientX);
    const end = (e: TouchEvent) => {
      const dx = e.changedTouches[0]!.clientX - sx;
      if (Math.abs(dx) > 60) goTo(index + (dx < 0 ? 1 : -1));
    };
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", end, { passive: true });
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
    };
  }, [goTo, index]);

  /* Inês timer: only during act 2 */
  useEffect(() => {
    if (frame.act !== 2) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [frame.act]);
  useEffect(() => {
    if (frame.id === "ines") setSeconds(0);
  }, [frame.id]);

  const scale = useMemo(() => fitScale(frame, viewport), [frame, viewport]);
  const Chapter = CHAPTERS[frame.id];

  return (
    <LightboxProvider>
      <div
        ref={shell}
        tabIndex={-1}
        className={cn(
          "relative h-screen w-screen overflow-hidden font-sans text-ink outline-none",
          backdrop === "navy" ? "bg-navy" : "bg-porcelain",
        )}
      >
        <PorcelainBackdrop variant={backdrop} />

        {/* single slide, centred and scaled to the screen */}
        <div className="absolute inset-0 grid place-items-center">
          <div
            key={frame.id}
            className={cn(
              "deck-slide-enter overflow-hidden shadow-[var(--shadow-frame)]",
              frame.navy ? "bg-navy" : "bg-porcelain",
            )}
            style={{
              width: frame.w,
              height: frame.h,
              borderRadius: 12,
              transform: `scale(${scale})`,
            }}
          >
            {Chapter && (
              <FrameBody frame={frame} active={!actOverlay}>
                <Chapter active={!actOverlay} />
              </FrameBody>
            )}
          </div>
        </div>

        {/* act overlay */}
        {actOverlay && (
          <div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center bg-navy/85 text-center text-porcelain backdrop-blur-sm">
            <p className="deck-num text-[180px] leading-none text-vaa">{actOverlay}</p>
            <p className="deck-title">
              {ACTS[actOverlay].label} · {ACTS[actOverlay].title}
            </p>
            <p className="mt-4 text-lg text-porcelain/70">{ACTS[actOverlay].line}</p>
          </div>
        )}

        {/* scoreboard */}
        {frame.act !== 3 && !actOverlay && (
          <div className="absolute right-6 top-6 z-30 flex items-center gap-4 rounded-2xl bg-white/85 px-5 py-3 shadow-[var(--shadow-card)] backdrop-blur">
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-spal">SPAL</p>
              <p className="deck-num text-2xl text-spal">{score.spal}</p>
            </div>
            <span className="text-navy/25">—</span>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[oklch(0.55_0.075_78)]">
                V. Alegre
              </p>
              <p
                key={score.vaa}
                className="deck-num deck-pop text-2xl text-[oklch(0.55_0.075_78)]"
                style={{ animation: "deck-pop 500ms both, deck-glow 900ms 200ms" }}
              >
                {score.vaa}
              </p>
            </div>
            {frame.act === 2 && (
              <div className="ml-2 border-l border-navy/20 pl-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-ines">Inês</p>
                <p className="deck-num text-2xl text-ines">
                  {String(Math.floor(seconds / 60)).padStart(2, "0")}:
                  {String(seconds % 60).padStart(2, "0")}
                </p>
              </div>
            )}
          </div>
        )}

        {/* arrows */}
        <button
          aria-label="Anterior"
          onClick={() => goTo(index - 1)}
          className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/80 p-3 text-navy shadow-[var(--shadow-card)] transition hover:bg-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          aria-label="Seguinte"
          onClick={() => goTo(index + 1)}
          className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/80 p-3 text-navy shadow-[var(--shadow-card)] transition hover:bg-white"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* bottom bar */}
        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 rounded-2xl bg-white/85 px-5 py-2.5 shadow-[var(--shadow-card)] backdrop-blur">
          <button
            onClick={() => setMenu((m) => !m)}
            className="flex items-center gap-2 text-left text-sm font-semibold text-navy"
          >
            <List className="h-4 w-4 text-navy/50" />
            {ACTS[frame.act].label} · {frame.title}
          </button>
          <span className="deck-num text-xs text-navy/50">
            {frame.n === 0 ? "Capa" : `${frame.n}/${TOTAL_CHAPTERS}`}
          </span>
          <ChapterPlate frame={frame} />
          <button
            onClick={() =>
              document.fullscreenElement
                ? document.exitFullscreen()
                : shell.current?.requestFullscreen?.()
            }
            className="rounded-full border border-navy/15 p-1.5 text-navy"
            aria-label="Ecrã inteiro"
          >
            <Maximize className="h-3.5 w-3.5" />
          </button>
        </div>

        {menu && (
          <div className="absolute bottom-20 left-1/2 z-40 max-h-[60vh] w-[520px] -translate-x-1/2 overflow-auto rounded-2xl bg-white p-3 shadow-[var(--shadow-frame)]">
            {FRAMES.map((f, i) => (
              <button
                key={f.id}
                onClick={() => goTo(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm hover:bg-porcelain",
                  i === index && "bg-porcelain font-semibold",
                  f.parent && "pl-9 text-navy/65",
                )}
              >
                <span className="deck-num w-8 text-xs text-navy/40">{f.n}</span>
                <span className="flex-1 text-navy">{f.title}</span>
                <span className="text-[10px] uppercase tracking-widest text-navy/35">
                  {ACTS[f.act].label}
                </span>
              </button>
            ))}
          </div>
        )}

        <p
          className={cn(
            "pointer-events-none absolute bottom-2 left-4 z-20 max-w-[420px] text-[10px] leading-tight",
            backdrop === "navy" ? "text-porcelain/45" : "text-navy/40",
          )}
        >
          {FOOTER}
        </p>
      </div>
    </LightboxProvider>
  );
}

/* frame chrome: tag, title, punchline-first reveal */
function FrameBody({
  frame,
  active,
  children,
}: {
  frame: FrameDef;
  active: boolean;
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<"punch" | "content">(
    frame.punchline ? "punch" : "content",
  );
  useEffect(() => {
    if (!frame.punchline) return;
    if (!active) {
      setPhase("punch");
      return;
    }
    setPhase("punch");
    const t = setTimeout(() => setPhase("content"), 900);
    return () => clearTimeout(t);
  }, [active, frame.punchline]);

  const showPunch = Boolean(frame.punchline) && phase === "punch";

  return (
    <div className="relative h-full w-full">
      {frame.tag && (
        <span
          className={cn(
            "absolute right-5 top-5 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest",
            frame.navy ? "bg-porcelain/10 text-porcelain/70" : "bg-navy/6 text-navy/45",
          )}
        >
          {frame.tag}
        </span>
      )}
      {frame.id !== "capa" && (
        <span
          className={cn(
            "absolute left-6 top-5 z-10 text-[11px] font-bold uppercase tracking-[0.25em]",
            frame.navy ? "text-vaa" : "text-navy/40",
          )}
        >
          {frame.title}
        </span>
      )}
      {showPunch ? (
        <div
          key="punch"
          className={cn(
            "flex h-full items-center justify-center px-16 text-center",
            frame.navy ? "text-porcelain" : "text-navy",
          )}
        >
          <p
            className="deck-rise text-4xl italic leading-snug"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            {frame.punchline}
          </p>
        </div>
      ) : (
        <div key={`content-${active}`} className="h-full pt-6">
          {children}
        </div>
      )}
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

function ChapterPlate({ frame }: { frame: FrameDef }) {
  return (
    <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full border-2 border-spal/30 bg-porcelain shadow-inner">
      <span className="deck-num text-[11px] text-navy/55">
        {frame.n === 0 ? "00" : String(frame.n).padStart(2, "0")}
      </span>
      <span className="sr-only">{frame.title}</span>
    </div>
  );
}
