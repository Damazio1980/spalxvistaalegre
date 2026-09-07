import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Grid2x2, Maximize, List } from "lucide-react";
import {
  ACTS,
  ACT_VIEW,
  FOOTER,
  FRAMES,
  OVERVIEW,
  TOTAL_CHAPTERS,
  scoreAt,
  type ActId,
  type FrameDef,
} from "@/lib/presentation/deck";
import { CHAPTERS } from "./registry";
import { LightboxProvider } from "./primitives";
import { cn } from "@/lib/utils";

type Cam = { x: number; y: number; zoom: number };

const EASE = "cubic-bezier(0.66, 0, 0.24, 1)";

function frameCam(f: FrameDef): Cam {
  return { x: f.x, y: f.y, zoom: f.zoom ?? (f.w < 1000 ? 1.15 : 0.82) };
}

export function Stage() {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<"frame" | "overview">("frame");
  const [cam, setCam] = useState<Cam>(() => frameCam(FRAMES[0]!));
  const [zoomBoost, setZoomBoost] = useState(1);
  const [dur, setDur] = useState(1000);
  const [actOverlay, setActOverlay] = useState<ActId | null>(null);
  const [menu, setMenu] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timers = useRef<number[]>([]);
  const shell = useRef<HTMLDivElement>(null);

  const frame = FRAMES[index]!;
  const score = scoreAt(index);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const goTo = useCallback(
    (next: number, opts: { fly?: boolean } = { fly: true }) => {
      const target = Math.max(0, Math.min(FRAMES.length - 1, next));
      const from = FRAMES[index]!;
      const to = FRAMES[target]!;
      clearTimers();
      setMenu(false);
      setMode("frame");
      setZoomBoost(1);

      const land = () => {
        setDur(1000);
        setCam(frameCam(to));
        setIndex(target);
      };

      const actChanged = from.act !== to.act && target > index;
      if (actChanged) {
        setDur(900);
        setCam(ACT_VIEW[to.act]);
        setActOverlay(to.act);
        timers.current.push(
          window.setTimeout(() => {
            setActOverlay(null);
            land();
          }, 2100) as unknown as number,
        );
        return;
      }

      if (opts.fly) {
        // fly-over: pull back over the midpoint, then zoom into the target
        setDur(480);
        setCam({
          x: (from.x + to.x) / 2,
          y: (from.y + to.y) / 2,
          zoom: Math.min(frameCam(from).zoom, frameCam(to).zoom) * 0.42,
        });
        timers.current.push(window.setTimeout(land, 460) as unknown as number);
      } else {
        land();
      }
    },
    [index],
  );

  const overview = useCallback(() => {
    clearTimers();
    setDur(1100);
    setZoomBoost(1);
    setMode("overview");
    setCam(OVERVIEW);
  }, []);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        goTo(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === "Escape") {
        mode === "overview" ? goTo(index, { fly: false }) : overview();
      } else if (e.key.toLowerCase() === "f") {
        if (document.fullscreenElement) document.exitFullscreen();
        else shell.current?.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, index, mode, overview]);

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

  /* free zoom with the wheel */
  useEffect(() => {
    const el = shell.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && Math.abs(e.deltaY) < 2) return;
      e.preventDefault();
      setDur(160);
      setZoomBoost((z) => Math.max(0.08, Math.min(3, z * (e.deltaY > 0 ? 0.9 : 1.1))));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* Inês timer: only during act 2 */
  useEffect(() => {
    if (frame.act !== 2) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [frame.act]);
  useEffect(() => {
    if (frame.id === "ines") setSeconds(0);
  }, [frame.id]);

  const visible = useMemo(() => {
    const near = new Set<string>();
    FRAMES.forEach((f) => {
      const d = Math.hypot(f.x - cam.x, f.y - cam.y);
      if (mode === "overview" || actOverlay || d < 2600) near.add(f.id);
    });
    return near;
  }, [cam, mode, actOverlay]);

  const transform = `translate(50vw, 50vh) scale(${cam.zoom * zoomBoost}) translate(${-cam.x}px, ${-cam.y}px)`;

  return (
    <LightboxProvider>
      <div
        ref={shell}
        className="relative h-screen w-screen overflow-hidden bg-[oklch(0.9_0.012_90)] font-sans text-ink"
      >
        {/* the plate canvas */}
        <div
          className="absolute left-0 top-0 origin-top-left will-change-transform"
          style={{ transform, transition: `transform ${dur}ms ${EASE}` }}
        >
          <Plate />
          {FRAMES.map((f, i) => {
            const isVisible = visible.has(f.id);
            const active = i === index && mode === "frame" && !actOverlay;
            const Chapter = CHAPTERS[f.id];
            return (
              <div
                key={f.id}
                onClick={() => mode === "overview" && goTo(i, { fly: false })}
                className={cn(
                  "absolute overflow-hidden shadow-[var(--shadow-frame)] transition-[opacity,filter] duration-500",
                  f.navy ? "bg-navy" : "bg-porcelain",
                  mode === "overview" && "cursor-pointer hover:brightness-105",
                  !active && mode === "frame" && "opacity-70",
                )}
                style={{
                  left: f.x - f.w / 2,
                  top: f.y - f.h / 2,
                  width: f.w,
                  height: f.h,
                  borderRadius: 24,
                  transform: `rotate(${f.rot}deg)`,
                }}
              >
                {isVisible && Chapter && (
                  <FrameBody frame={f} active={active}>
                    <Chapter active={active} />
                  </FrameBody>
                )}
              </div>
            );
          })}
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
              <div className="ml-2 border-l border-navy/10 pl-4 text-center">
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
            {frame.n}/{TOTAL_CHAPTERS}
          </span>
          <MiniPlate index={index} />
          <button
            onClick={overview}
            className="deck-slide-btn flex items-center gap-1.5 rounded-full border border-navy/15 px-3 py-1 text-xs font-semibold text-navy"
          >
            <Grid2x2 className="h-3.5 w-3.5" /> Vista geral
          </button>
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

        <p className="pointer-events-none absolute bottom-2 left-4 z-20 max-w-[420px] text-[10px] leading-tight text-navy/40">
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

/* watermark plate drawn on the canvas itself */
function Plate() {
  return (
    <div className="pointer-events-none absolute" style={{ left: -4200, top: -3900 }}>
      <div
        className="rounded-full"
        style={{
          width: 8400,
          height: 8400,
          background: "var(--gradient-plate)",
          boxShadow: "inset 0 0 400px oklch(0.259 0.049 262 / 0.08)",
        }}
      >
        <div className="absolute inset-[220px] rounded-full border-[10px] border-spal/10" />
        <div className="absolute inset-[420px] rounded-full border border-navy/10" />
        <div className="absolute inset-[1400px] rounded-full border-[24px] border-vaa/10" />
        <div className="absolute inset-[2600px] rounded-full border border-navy/8" />
        <div className="absolute inset-[3200px] rounded-full bg-white/40" />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.10]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <path
              key={i}
              d={`M50 50 C ${50 + Math.cos(i) * 16} ${50 + Math.sin(i) * 22}, ${
                50 + Math.cos(i * 2) * 30
              } ${50 + Math.sin(i * 1.4) * 34}, ${50 + Math.cos(i) * 46} ${50 + Math.sin(i) * 46}`}
              stroke="#1B2A44"
              strokeWidth="0.15"
              fill="none"
            />
          ))}
        </svg>
      </div>
      <svg className="absolute left-0 top-0" width={8400} height={8400}>
        <polyline
          points={FRAMES.map((f) => `${f.x + 4200},${f.y + 3900}`).join(" ")}
          fill="none"
          stroke="#1B2A44"
          strokeOpacity="0.25"
          strokeWidth="4"
          strokeDasharray="18 14"
        />
      </svg>
    </div>
  );
}

function MiniPlate({ index }: { index: number }) {
  const f = FRAMES[index]!;
  const S = 46;
  const scale = S / 9000;
  return (
    <div className="relative h-[46px] w-[46px] shrink-0 rounded-full border border-navy/15 bg-porcelain">
      {FRAMES.map((fr, i) => (
        <span
          key={fr.id}
          className={cn(
            "absolute h-[3px] w-[3px] rounded-full",
            i === index ? "bg-ines" : "bg-navy/25",
          )}
          style={{
            left: S / 2 + fr.x * scale,
            top: S / 2 + fr.y * scale,
            transform: i === index ? "scale(2.2)" : undefined,
          }}
        />
      ))}
      <span className="sr-only">{f.title}</span>
    </div>
  );
}
