import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Lightbox ─────────────────────────────────────────────────────────── */

export type LightboxItem = {
  id: string;
  group: string;
  caption: string;
  node: ReactNode;
  variant?: "default" | "phone";
};

type LightboxCtx = {
  open: (group: string, id: string) => void;
  register: (item: LightboxItem) => void;
};

const Ctx = createContext<LightboxCtx | null>(null);

export function useLightbox() {
  return useContext(Ctx);
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const items = useRef<Map<string, LightboxItem>>(new Map());
  const [current, setCurrent] = useState<{ group: string; id: string } | null>(null);

  const list = current
    ? [...items.current.values()].filter((i) => i.group === current.group)
    : [];
  const index = current ? list.findIndex((i) => i.id === current.id) : -1;

  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setCurrent(null);
      }
      if (e.key === "ArrowRight" && list.length > 1) {
        e.stopPropagation();
        setCurrent({ group: current.group, id: list[(index + 1) % list.length]!.id });
      }
      if (e.key === "ArrowLeft" && list.length > 1) {
        e.stopPropagation();
        setCurrent({
          group: current.group,
          id: list[(index - 1 + list.length) % list.length]!.id,
        });
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [current, index, list]);

  return (
    <Ctx.Provider
      value={{
        open: (group, id) => setCurrent({ group, id }),
        register: (item) => items.current.set(item.id, item),
      }}
    >
      {children}
      {current && index >= 0 && (
        <div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-navy/95 p-8 backdrop-blur-sm"
          onClick={() => setCurrent(null)}
        >
          <div
            className={cn(
              "deck-pop overflow-hidden bg-porcelain",
              list[index]!.variant === "phone"
                ? "h-[72vh] max-h-[820px] w-auto aspect-[9/16] rounded-[36px] border-[8px] border-porcelain/20 shadow-2xl"
                : "max-h-[70vh] w-full max-w-4xl rounded-3xl",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {list[index]!.node}
          </div>
          <p className="max-w-2xl text-center text-sm text-porcelain/80">
            {list[index]!.caption}
          </p>
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {list.length > 1 && (
              <>
                <button
                  className="rounded-full border border-porcelain/40 px-4 py-2 text-sm text-porcelain hover:bg-porcelain/10"
                  onClick={() =>
                    setCurrent({
                      group: current.group,
                      id: list[(index - 1 + list.length) % list.length]!.id,
                    })
                  }
                >
                  ← anterior
                </button>
                <span className="text-xs text-porcelain/60">
                  {index + 1}/{list.length}
                </span>
                <button
                  className="rounded-full border border-porcelain/40 px-4 py-2 text-sm text-porcelain hover:bg-porcelain/10"
                  onClick={() =>
                    setCurrent({
                      group: current.group,
                      id: list[(index + 1) % list.length]!.id,
                    })
                  }
                >
                  seguinte →
                </button>
              </>
            )}
            <button
              className="rounded-full bg-porcelain px-4 py-2 text-sm font-semibold text-navy"
              onClick={() => setCurrent(null)}
            >
              Fechar ✕
            </button>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

/** A mock capture / image panel with an "Ampliar" button. */
export function Shot({
  id,
  group,
  caption,
  children,
  className,
  replace,
  placeholder,
  lightboxVariant = "default",
  hideExpand = false,
}: {
  id: string;
  group: string;
  caption: string;
  children: ReactNode;
  className?: string | undefined;
  replace?: boolean | undefined;
  placeholder?: boolean | undefined;
  lightboxVariant?: "default" | "phone" | undefined;
  hideExpand?: boolean | undefined;
}) {
  const ctx = useContext(Ctx);
  useEffect(() => {
    ctx?.register({
      id,
      group,
      caption,
      variant: lightboxVariant,
      node: lightboxVariant === "phone" ? <div className="h-full">{children}</div> : <div className="p-6">{children}</div>,
    });
  });
  return (
    <div className={cn("group/shot relative overflow-hidden rounded-2xl border border-navy/10 bg-white", className)}>
      {children}
      {placeholder && (
        <span className="pointer-events-none absolute -right-10 top-3 rotate-45 bg-ines/75 px-10 py-[2px] text-center text-[7px] font-bold uppercase tracking-wider text-white">
          Referência · Substituir
        </span>
      )}
      {replace && (
        <span className="absolute left-2 top-2 rounded-full bg-ines px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
          SUBSTITUIR
        </span>
      )}
      {!hideExpand && (
        <button
          onClick={() => ctx?.open(group, id)}
          className="deck-media-control absolute bottom-2 right-2 z-10 flex items-center gap-1 rounded-full bg-navy px-3 py-1 text-[11px] font-semibold text-porcelain"
        >
          <Maximize2 className="h-3 w-3" /> Ampliar
        </button>
      )}
    </div>
  );
}


/* ── Count-up ─────────────────────────────────────────────────────────── */

export function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

export function Num({
  value,
  active,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  active: boolean;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const v = useCountUp(value, active);
  return (
    <span className={cn("deck-num", className)}>
      {prefix}
      {v.toLocaleString("pt-PT", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ── small building blocks ────────────────────────────────────────────── */

export function Chip({
  children,
  tone = "ink",
  delay = 0,
  className,
}: {
  children: ReactNode;
  tone?: "ink" | "spal" | "vaa" | "ines" | "light";
  delay?: number;
  className?: string;
}) {
  const tones: Record<string, string> = {
    ink: "bg-navy/8 text-navy",
    spal: "bg-spal/12 text-spal",
    vaa: "bg-vaa/20 text-vaa",
    ines: "bg-ines/12 text-ines",
    light: "bg-porcelain/15 text-porcelain",
  };
  return (
    <span
      className={cn(
        "deck-pop inline-flex items-center rounded-full px-3 py-1 text-[13px] font-semibold",
        tones[tone],
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
}

export function Reveal({
  i = 0,
  children,
  className,
}: {
  i?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("deck-rise", className)} style={{ animationDelay: `${i * 100}ms` }}>
      {children}
    </div>
  );
}

export function Glossary({ term, meaning }: { term: string; meaning: string }) {
  return (
    <span className="ml-2 rounded-md bg-navy/8 px-2 py-0.5 text-[11px] font-medium text-navy/70">
      {term} — {meaning}
    </span>
  );
}

/** Two-brand duel bar with 1-5 score. */
export function DuelBar({
  label,
  spal,
  vaa,
  active,
  max = 5,
  suffix = "",
  i = 0,
}: {
  label: string;
  spal: number;
  vaa: number;
  active: boolean;
  max?: number;
  suffix?: string;
  i?: number;
}) {
  return (
    <Reveal i={i} className="space-y-2">
      <p className="text-sm font-semibold text-navy/70">{label}</p>
      {(
        [
          ["SPAL", spal, "bg-spal"],
          ["Vista Alegre", vaa, "bg-vaa"],
        ] as const
      ).map(([name, value, color]) => (
        <div key={name} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-xs font-semibold text-navy/60">{name}</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-navy/8">
            <div
              className={cn("deck-grow h-full rounded-full", color)}
              style={{
                width: active ? `${(value / max) * 100}%` : "0%",
                animationDelay: `${i * 100 + 120}ms`,
              }}
            />
          </div>
          <span className="deck-num w-16 text-right text-sm text-navy">
            {value}
            {suffix}
          </span>
        </div>
      ))}
    </Reveal>
  );
}

export function Phone({
  title,
  tone,
  children,
}: {
  title: string;
  tone: "spal" | "vaa";
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className={cn(
          "text-xs font-bold uppercase tracking-widest",
          tone === "spal" ? "text-spal" : "text-vaa",
        )}
      >
        {title}
      </span>
      <div className="w-[240px] rounded-[28px] border-4 border-navy/85 bg-white p-2 shadow-[var(--shadow-card)]">
        <div className="mx-auto mb-2 h-1.5 w-14 rounded-full bg-navy/25" />
        <div className="h-[300px] overflow-hidden rounded-[18px] bg-porcelain text-[11px] text-navy">
          {children}
        </div>
      </div>
    </div>
  );
}
