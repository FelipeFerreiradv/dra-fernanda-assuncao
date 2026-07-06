import { cn } from "@/lib/utils";
import { OrganicCurves, type CurveVariant } from "./organic-curves";

type Glow =
  | "gold-tr"
  | "gold-tl"
  | "gold-br"
  | "gold-bl"
  | "sand-tl"
  | "sand-br"
  | "sand-tr";

const GLOW_POS: Record<Glow, string> = {
  "gold-tr": "-right-40 -top-48 bg-gold/14",
  "gold-tl": "-left-40 -top-48 bg-gold/14",
  "gold-br": "-right-48 -bottom-48 bg-gold/10",
  "gold-bl": "-left-48 -bottom-48 bg-gold/10",
  "sand-tl": "-left-48 -top-40 bg-sand/20",
  "sand-tr": "-right-48 -top-40 bg-sand/20",
  "sand-br": "-right-48 -bottom-40 bg-sand/20",
};

type SectionCanvasProps = {
  className?: string;
  tone?: "light" | "dark";
  /** Curvas orgânicas SVG — principal elemento artístico. */
  curves?: CurveVariant;
  /** Trama de grid editorial com máscara radial (opcional, sutil). */
  grid?: boolean;
  /** Brilhos radiais quentes nos cantos (opcional, muito sutil). */
  glow?: Glow[];
};

/**
 * Camada decorativa de fundo de seção: curvas orgânicas SVG + brilhos
 * dourados suaves + grid opcional. Fica atrás do conteúdo (-z-10).
 * A seção que a usa precisa ser `relative overflow-hidden`.
 */
export function SectionCanvas({
  className,
  tone = "light",
  curves,
  grid = false,
  glow = [],
}: SectionCanvasProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {/* Curvas orgânicas — elemento artístico principal */}
      {curves && <OrganicCurves variant={curves} tone={tone} />}

      {/* Brilhos radiais difusos — secundários, muito sutis */}
      {glow.map((g) => (
        <span
          key={g}
          className={cn(
            "absolute h-[32rem] w-[32rem] rounded-full blur-[120px]",
            GLOW_POS[g]
          )}
        />
      ))}

      {/* Grid editorial */}
      {grid && (
        <div className="fine-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      )}
    </div>
  );
}
