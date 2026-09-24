import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { captionOf, type RefImage } from "@/data/images";
import { cn } from "@/lib/utils";
import { Shot } from "./primitives";

/* ── simulações ───────────────────────────────────────────────────────── */

function BarraEndereco({ url }: { url?: string | undefined }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-navy/10 bg-navy/5 px-2 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-ines/70" />
      <span className="h-1.5 w-1.5 rounded-full bg-vaa" />
      <span className="h-1.5 w-1.5 rounded-full bg-spal/60" />
      <span className="ml-1 flex-1 truncate rounded-full bg-white px-2 py-[1px] text-[7px] text-navy/55">
        {url ?? "—"}
      </span>
    </div>
  );
}

/** layout de catálogo (SPAL): menu horizontal, slideshow, grelha de miniaturas */
function CatalogoMock({ img }: { img: RefImage }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 px-2 py-1">
        <span className="h-2 w-8 rounded-sm bg-navy/25" />
        {["Produto", "Design", "Hotelaria", "Contactos"].map((m) => (
          <span key={m} className="text-[6px] font-semibold uppercase text-navy/45">
            {m}
          </span>
        ))}
      </div>
      <div className="relative h-[42%] overflow-hidden">
        <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="grid flex-1 grid-cols-4 gap-1 p-1.5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
          <div key={k} className="flex flex-col gap-[2px]">
            <div className="flex-1 rounded-[2px] bg-porcelain" />
            <span className="text-[6px] text-navy/40">{String(k).padStart(2, "0")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** layout de loja (Vista Alegre): fotografia, preço, botão de compra */
function LojaMock({ img }: { img: RefImage }) {
  return (
    <div className="flex h-full bg-white">
      <div className="w-[52%] overflow-hidden">
        <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2">
        <span className="h-1.5 w-10 rounded-sm bg-vaa/60" />
        <div className="h-1.5 w-full rounded-sm bg-navy/15" />
        <div className="h-1.5 w-3/4 rounded-sm bg-navy/10" />
        <p className="mt-1 text-[9px] font-bold text-vaa">29,50 €</p>
        <div className="rounded-sm bg-navy py-[2px] text-center text-[6px] font-semibold text-porcelain">
          Comprar
        </div>
        <div className="mt-1 h-1 w-full rounded-sm bg-navy/8" />
        <div className="h-1 w-2/3 rounded-sm bg-navy/8" />
      </div>
    </div>
  );
}

function DesktopMock({ img }: { img: RefImage }) {
  const loja = img.id.includes("vaa");
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <BarraEndereco url={img.url} />
      <div className="min-h-0 flex-1">{loja ? <LojaMock img={img} /> : <CatalogoMock img={img} />}</div>
    </div>
  );
}

function MobileMock({ img }: { img: RefImage }) {
  const loja = img.id.includes("vaa");
  return (
    <div className="flex h-full items-center justify-center bg-porcelain p-1">
      <div className="flex h-full w-[46%] flex-col overflow-hidden rounded-[10px] border-2 border-navy/80 bg-white">
        <div className="mx-auto my-[3px] h-[3px] w-6 rounded-full bg-navy/25" />
        <div className="truncate px-1 text-[6px] text-navy/50">{img.url}</div>
        <div className="h-[45%] overflow-hidden">
          <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="flex-1 space-y-[3px] p-1">
          <div className="h-1 w-3/4 rounded-sm bg-navy/15" />
          <div className="h-1 w-1/2 rounded-sm bg-navy/10" />
          {loja ? (
            <>
              <p className="text-[7px] font-bold text-vaa">29,50 €</p>
              <div className="rounded-sm bg-navy py-[1px] text-center text-[6px] text-porcelain">
                Comprar
              </div>
            </>
          ) : (
            <div className="rounded-sm border border-navy/20 py-[1px] text-center text-[6px] text-navy/50">
              Ver coleção
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** publicação de rede social simulada */
export function PostMock({ img, compact }: { img: RefImage; compact?: boolean | undefined }) {
  const inicial = img.perfil?.replace("@", "").charAt(0).toUpperCase() ?? "?";
  const images = img.gallery?.length ? img.gallery : [img.src];
  const [current, setCurrent] = useState(0);
  const go = (direction: -1 | 1) => {
    setCurrent((value) => (value + direction + images.length) % images.length);
  };
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-1 px-1.5 py-1">
        <span
          className={cn(
            "grid place-items-center rounded-full bg-navy/85 font-bold text-porcelain",
            compact ? "h-3 w-3 text-[6px]" : "h-6 w-6 text-[10px]",
          )}
        >
          {inicial}
        </span>
        <span className={cn("truncate font-semibold text-navy", compact ? "text-[6px]" : "text-[11px]")}>
          {img.perfil}
        </span>
        <span className={cn("ml-auto text-navy/40", compact ? "text-[5px]" : "text-[9px]")}>
          {img.canal}
        </span>
      </div>
      <div className="group/carousel relative min-h-0 flex-1 overflow-hidden">
        <img src={images[current]} alt={`${img.caption}${images.length > 1 ? ` · imagem ${current + 1}` : ""}`} loading="lazy" className="h-full w-full object-cover" />
        {images.length > 1 && (
          <>
            <button type="button" aria-label="Imagem anterior" onClick={(event) => { event.stopPropagation(); go(-1); }} className="absolute left-1 top-1/2 z-10 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-navy/80 text-porcelain opacity-90">
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button type="button" aria-label="Imagem seguinte" onClick={(event) => { event.stopPropagation(); go(1); }} className="absolute right-1 top-1/2 z-10 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-navy/80 text-porcelain opacity-90">
              <ChevronRight className="h-3 w-3" />
            </button>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-navy/80 px-1.5 py-0.5 text-[7px] font-bold text-porcelain">
              {current + 1}/{images.length}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/** maquete de Instagram em moldura de telemóvel */
export function MaqueteMock({ img }: { img: RefImage }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 px-2 py-1.5">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-navy/85 text-[10px] font-bold text-porcelain">
          S
        </span>
        <span className="text-[11px] font-semibold text-navy">@spalporcelanasofficial</span>
        <span className="ml-auto text-[11px] text-navy/40">···</span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="flex items-center gap-3 px-2 py-1 text-[11px] text-navy/60">
        <span>♡</span>
        <span>💬</span>
        <span>↗</span>
        <span className="ml-auto text-[9px]">1/6</span>
      </div>
    </div>
  );
}

function Mock({ img, compact }: { img: RefImage; compact?: boolean | undefined }) {
  if (img.kind === "desktop") return <DesktopMock img={img} />;
  if (img.kind === "mobile") return <MobileMock img={img} />;
  if (img.kind === "maquete") return <MaqueteMock img={img} />;
  return <PostMock img={img} compact={compact} />;
}

/* ── wrapper com Ampliar + faixa de provisório ────────────────────────── */

export function RefShot({
  img,
  group,
  idSuffix = "",
  className,
  compact,
  hideExpand = false,
}: {
  img: RefImage;
  group: string;
  idSuffix?: string;
  className?: string | undefined;
  compact?: boolean | undefined;
  hideExpand?: boolean | undefined;
}) {
  return (
    <Shot
      id={`${img.id}${idSuffix}`}
      group={group}
      caption={captionOf(img)}
      placeholder={img.isPlaceholder}
      lightboxVariant={group === "posts" ? "phone" : "default"}
      hideExpand={hideExpand}
      className={className}
    >
      <div className="h-full w-full">
        <Mock img={img} compact={compact} />
      </div>
    </Shot>
  );
}
