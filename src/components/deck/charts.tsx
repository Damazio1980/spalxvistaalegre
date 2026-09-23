import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

export const SPAL_C = "var(--spal)";
export const VAA_C = "var(--vaa)";
export const IG_C = "var(--chart-blue-secondary)";
export const FB_C = "var(--navy)";
const EDITORIAL_LIGHT = "var(--chart-editorial-light)";
const EDITORIAL_SOFT = "var(--chart-editorial-soft)";
const EDITORIAL_DARK = "var(--chart-editorial-dark)";
const EDITORIAL_MUTED = "var(--chart-editorial-muted)";

const tip = {
  contentStyle: {
    borderRadius: 12,
    border: "1px solid rgba(27,42,68,0.12)",
    fontSize: 11,
    padding: "6px 10px",
  },
} as const;

/** small titled panel that holds a chart */
export function ChartPanel({
  title,
  note,
  className,
  children,
  dark,
}: {
  title: string;
  note?: string;
  className?: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-col border-y p-3",
        dark ? "border-porcelain/20 bg-transparent" : "border-navy/15 bg-transparent",
        className,
      )}
    >
      <p
        className={cn(
          "text-[10px] font-bold uppercase tracking-widest",
          dark ? "text-porcelain/60" : "text-navy/50",
        )}
      >
        {title}
      </p>
      <div className="mt-1 min-h-0 flex-1">{children}</div>
      {note && (
        <p className={cn("mt-1 text-[9.5px]", dark ? "text-porcelain/55" : "text-navy/45")}>
          {note}
        </p>
      )}
    </div>
  );
}

/* ── Capítulo 1 · evolução Vista Alegre + peso da exportação ─────────── */

export function EvolucaoVAA({ active, editorial = false }: { active: boolean; editorial?: boolean }) {
  const data = [
    { m: "Volume de negócios", "1.º sem. 2025": 70.2, "1.º sem. 2026": 71.3 },
    { m: "Resultado líquido", "1.º sem. 2025": 3.6, "1.º sem. 2026": 4.3 },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barGap={6} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={editorial ? EDITORIAL_MUTED : "var(--chart-grid)"} />
        <XAxis dataKey="m" tick={{ fontSize: 9, fill: editorial ? EDITORIAL_SOFT : EDITORIAL_DARK }} />
        <YAxis tick={{ fontSize: 9, fill: editorial ? EDITORIAL_SOFT : EDITORIAL_DARK }} unit=" M€" width={52} />
        <Tooltip {...tip} formatter={(v) => `${v} M€`} />
        <Legend wrapperStyle={{ fontSize: 9 }} />
        <Bar
          dataKey="1.º sem. 2025"
          fill={editorial ? EDITORIAL_SOFT : "var(--chart-blue-secondary)"}
          radius={[6, 6, 0, 0]}
          isAnimationActive={active}
          animationDuration={1100}
        />
        <Bar
          dataKey="1.º sem. 2026"
          fill={editorial ? EDITORIAL_LIGHT : VAA_C}
          radius={[6, 6, 0, 0]}
          isAnimationActive={active}
          animationDuration={1100}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DonutExportacao({
  label,
  value,
  color,
  active,
  editorial = false,
}: {
  label: string;
  value: number;
  color: string;
  active: boolean;
  editorial?: boolean;
}) {
  const data = [
    { name: "Exportação", value },
    { name: "Mercado interno", value: 100 - value },
  ];
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center">
      <div className="relative min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip {...tip} formatter={(v) => `${v} %`} />
            <Pie
              data={data}
              dataKey="value"
              innerRadius="62%"
              outerRadius="92%"
              startAngle={90}
              endAngle={-270}
              isAnimationActive={active}
              animationDuration={1100}
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill={editorial ? EDITORIAL_MUTED : "var(--chart-grid)"} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <span className={cn("deck-num pointer-events-none absolute inset-0 grid place-items-center text-[15px]", editorial ? "text-porcelain" : "text-navy")}>
          ≈{value} %
        </span>
      </div>
      <p className={cn("text-[9.5px] font-semibold uppercase tracking-wider", editorial ? "text-porcelain/60" : "text-navy/55")}>{label}</p>
    </div>
  );
}

/* ── Capítulo 3 · audiência nas redes (escala logarítmica) ───────────── */

export function AudienciaLog({ active }: { active: boolean }) {
  const data = [
    { m: "IG seguidores", SPAL: 5961, "Vista Alegre": 360000 },
    { m: "IG publicações", SPAL: 305, "Vista Alegre": 3717 },
    { m: "Facebook seguidores", SPAL: 15700, "Vista Alegre": 347000 },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        barGap={3}
        margin={{ top: 2, right: 20, left: 6, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
        <XAxis
          type="number"
          scale="log"
          domain={[1, 500000]}
          allowDataOverflow
          tick={{ fontSize: 9 }}
        />
        <YAxis type="category" dataKey="m" width={86} tick={{ fontSize: 9 }} />
        <Tooltip
          {...tip}
          formatter={(v: number) => v.toLocaleString("pt-PT")}
        />
        <Legend wrapperStyle={{ fontSize: 9 }} />
        <Bar
          dataKey="SPAL"
          fill={SPAL_C}
          radius={[0, 5, 5, 0]}
          isAnimationActive={active}
          animationDuration={1100}
        />
        <Bar
          dataKey="Vista Alegre"
          fill={VAA_C}
          radius={[0, 5, 5, 0]}
          isAnimationActive={active}
          animationDuration={1100}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Capítulos 4 e 21 · radar das seis dimensões ─────────────────────── */

export const DIMENSOES = [
  { dim: "Identidade", SPAL: 3, "Vista Alegre": 5 },
  { dim: "Navegação", SPAL: 2, "Vista Alegre": 5 },
  { dim: "Informação", SPAL: 3, "Vista Alegre": 5 },
  { dim: "Próximo passo", SPAL: 1, "Vista Alegre": 5 },
  { dim: "Telemóvel", SPAL: 2, "Vista Alegre": 4 },
  { dim: "Confiança", SPAL: 2, "Vista Alegre": 5 },
];

export function RadarDimensoes({
  active,
  compact,
  dark,
}: {
  active: boolean;
  compact?: boolean;
  dark?: boolean;
}) {
  const label = dark ? "var(--porcelain)" : "var(--navy)";
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={DIMENSOES} outerRadius={compact ? "70%" : "76%"}>
        <PolarGrid stroke={dark ? "var(--chart-grid-light)" : "var(--chart-grid)"} />
        <PolarAngleAxis
          dataKey="dim"
          tick={{ fontSize: compact ? 8.5 : 11, fill: label }}
        />
        <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 8, fill: label }} />
        <Tooltip {...tip} />
        {!compact && <Legend wrapperStyle={{ fontSize: 10 }} />}
        <Radar
          dataKey="SPAL"
          stroke={SPAL_C}
          fill={SPAL_C}
          fillOpacity={0.35}
          isAnimationActive={active}
          animationDuration={1200}
        />
        <Radar
          dataKey="Vista Alegre"
          stroke={VAA_C}
          fill={VAA_C}
          fillOpacity={0.35}
          isAnimationActive={active}
          animationDuration={1200}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function BarrasDimensoes({ active }: { active: boolean }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={DIMENSOES}
        layout="vertical"
        barGap={3}
        margin={{ top: 2, right: 16, left: 4, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
        <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 9 }} />
        <YAxis type="category" dataKey="dim" width={86} tick={{ fontSize: 9 }} />
        <Tooltip {...tip} />
        <Legend wrapperStyle={{ fontSize: 9 }} />
        <Bar
          dataKey="SPAL"
          fill={SPAL_C}
          radius={[0, 5, 5, 0]}
          isAnimationActive={active}
          animationDuration={1100}
        />
        <Bar
          dataKey="Vista Alegre"
          fill={VAA_C}
          radius={[0, 5, 5, 0]}
          isAnimationActive={active}
          animationDuration={1100}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Capítulos 9-11 · passos até saber como comprar ──────────────────── */

export function PassosChart({ active }: { active: boolean }) {
  const data = [
    { m: "SPAL", passos: 5, cor: SPAL_C },
    { m: "Vista Alegre", passos: 4, cor: VAA_C },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 2, right: 24, left: 4, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
        <XAxis type="number" domain={[0, 6]} tick={{ fontSize: 9 }} />
        <YAxis type="category" dataKey="m" width={80} tick={{ fontSize: 9 }} />
        <Tooltip {...tip} formatter={(v) => `${v} passos`} />
        <Bar dataKey="passos" radius={[0, 6, 6, 0]} isAnimationActive={active}>
          {data.map((d) => (
            <Cell key={d.m} fill={d.cor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Capítulo 5 · publicações e reações ──────────────────────────────── */

export function PublicacoesPorPerfil({ active }: { active: boolean }) {
  const data = [
    { m: "SPAL · FB", v: 1, cor: SPAL_C },
    { m: "SPAL · IG", v: 0, cor: SPAL_C },
    { m: "VAA · IG", v: 1, cor: VAA_C },
    { m: "VAA · FB", v: 0, cor: VAA_C },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 2, right: 6, left: -22, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
        <XAxis dataKey="m" tick={{ fontSize: 8.5 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 8.5 }} width={40} />
        <Tooltip {...tip} formatter={(v: number) => (v ? `${v} publicações` : "valor a inserir")} />
        <Bar dataKey="v" radius={[5, 5, 0, 0]} isAnimationActive={active}>
          {data.map((d) => (
            <Cell key={d.m} fill={d.cor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ReacoesPorPublicacao({ active }: { active: boolean }) {
  const data = Array.from({ length: 12 }, (_, i) => ({
    m: `${i + 1}`,
    v: i === 0 ? 9 : 0,
    cor: i < 6 ? SPAL_C : VAA_C,
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 2, right: 6, left: -22, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
        <XAxis dataKey="m" tick={{ fontSize: 8.5 }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 8.5 }} width={40} />
        <Tooltip {...tip} formatter={(v: number) => (v ? `${v} reações` : "valor a inserir")} />
        <Bar dataKey="v" radius={[4, 4, 0, 0]} isAnimationActive={active}>
          {data.map((d) => (
            <Cell key={d.m} fill={d.cor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Capítulo 19 · marca X ───────────────────────────────────────────── */

export function IndicadorMini({
  label,
  ig,
  fb,
  max,
  suffix,
  active,
}: {
  label: string;
  ig: number;
  fb: number;
  max: number;
  suffix: string;
  active: boolean;
}) {
  const data = [
    { m: "Instagram", v: ig, cor: IG_C },
    { m: "Facebook", v: fb, cor: FB_C },
  ];
  return (
    <ChartPanel title={label} className="h-[130px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 2, right: 4, left: -26, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
          <XAxis dataKey="m" tick={{ fontSize: 8.5 }} />
          <YAxis domain={[0, max]} tick={{ fontSize: 8.5 }} width={38} />
          <Tooltip {...tip} formatter={(v) => `${v}${suffix}`} />
          <Bar dataKey="v" radius={[5, 5, 0, 0]} isAnimationActive={active}>
            {data.map((d) => (
              <Cell key={d.m} fill={d.cor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartPanel>
  );
}

const FUNIL = [
  { etapa: "Impressões", ig: 10000, fb: 8000 },
  { etapa: "Cliques", ig: 300, fb: 200 },
  { etapa: "Sessões", ig: 240, fb: 160 },
  { etapa: "Encomendas", ig: 6, fb: 8 },
];

export function Funil({ active }: { active: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {(["ig", "fb"] as const).map((k) => (
        <div key={k} className="space-y-1">
          <p
            className="text-[9.5px] font-bold uppercase tracking-widest"
            style={{ color: k === "ig" ? IG_C : VAA_C }}
          >
            {k === "ig" ? "Instagram" : "Facebook"}
          </p>
          {FUNIL.map((f, i) => {
            const v = f[k];
            const w = 100 - i * 18;
            return (
              <div
                key={f.etapa}
                className="deck-grow mx-auto flex items-center justify-between rounded-md px-2 py-[3px] text-[9.5px] text-porcelain"
                style={{
                  width: active ? `${w}%` : "10%",
                  background: k === "ig" ? IG_C : VAA_C,
                  animationDelay: `${i * 120}ms`,
                }}
                title={`${f.etapa}: ${v.toLocaleString("pt-PT")}`}
              >
                <span>{f.etapa}</span>
                <span className="deck-num">{v.toLocaleString("pt-PT")}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function MargemStack({ active }: { active: boolean }) {
  const data = [
    {
      m: "640 € de receita",
      "Custo do produto (60 %)": 384,
      "Anúncios (80 €)": 80,
      "Margem estimada": 176,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 2, right: 8, left: 4, bottom: 0 }}>
        <XAxis type="number" domain={[0, 640]} tick={{ fontSize: 8.5 }} unit=" €" />
        <YAxis type="category" dataKey="m" width={92} tick={{ fontSize: 8.5 }} />
        <Tooltip {...tip} formatter={(v) => `${v} €`} />
        <Legend wrapperStyle={{ fontSize: 8.5 }} />
        <Bar
          dataKey="Custo do produto (60 %)"
          stackId="a"
          fill="var(--chart-neutral)"
          isAnimationActive={active}
        />
        <Bar dataKey="Anúncios (80 €)" stackId="a" fill={FB_C} isAnimationActive={active} />
        <Bar
          dataKey="Margem estimada"
          stackId="a"
          fill={VAA_C}
          radius={[0, 6, 6, 0]}
          isAnimationActive={active}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Capítulo 20 · medidores dos indicadores ─────────────────────────── */

export function Gauge({
  low,
  high,
  max,
  unidade,
  active,
}: {
  low: number;
  high: number;
  max: number;
  unidade: string;
  active: boolean;
}) {
  const data = [
    { name: "alerta", value: low, fill: VAA_C },
    { name: "meta", value: high, fill: SPAL_C },
  ];
  return (
    <div className="relative h-[118px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          innerRadius="52%"
          outerRadius="100%"
          startAngle={180}
          endAngle={0}
          barSize={9}
        >
          <PolarAngleAxis type="number" domain={[0, max]} tick={false} axisLine={false} />
          <Tooltip {...tip} formatter={(v) => `${v}${unidade}`} />
          <RadialBar
            dataKey="value"
            background={{ fill: "var(--chart-grid)" }}
            cornerRadius={5}
            isAnimationActive={active}
            animationDuration={1100}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-x-0 bottom-1 text-center">
        <p className="text-[15px] font-extrabold text-navy/35">a medir</p>
        <p className="text-[9px] text-navy/50">
          alerta {low}
          {unidade} · meta {high}
          {unidade}
        </p>
      </div>
    </div>
  );
}

/* ── Capítulo 14 · antes → depois esperado ───────────────────────────── */

export function AntesDepois({
  antes,
  depois,
  active,
}: {
  antes: number;
  depois: number;
  active: boolean;
}) {
  const data = [
    { m: "antes", v: antes, cor: SPAL_C },
    { m: "depois", v: depois, cor: VAA_C },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 2, right: 4, left: -26, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
        <XAxis dataKey="m" tick={{ fontSize: 9, fill: "var(--navy)" }} />
        <YAxis tick={{ fontSize: 9, fill: "var(--navy)" }} width={36} />
        <Tooltip {...tip} />
        <Bar dataKey="v" radius={[6, 6, 0, 0]} isAnimationActive={active} animationDuration={1100}>
          {data.map((d) => (
            <Cell key={d.m} fill={d.cor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
