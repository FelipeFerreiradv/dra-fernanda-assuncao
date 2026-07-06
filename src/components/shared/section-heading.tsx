import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

type SectionHeadingProps = {
  /** Número editorial da seção, ex.: "02". */
  number: string;
  /** Eyebrow curto acima do título, ex.: "Áreas de atuação". */
  eyebrow: string;
  /** Título da seção (vira H2). */
  title: string;
  /** Parágrafo introdutório opcional. */
  intro?: string;
  align?: "left" | "center";
  /** Tema claro (fundo ivory/branco) ou escuro (fundo ink). */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Cabeçalho editorial padrão de todas as seções:
 * número gigante + linha dourada + eyebrow + H2 com reveal por palavras.
 */
export function SectionHeading({
  number,
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "relative",
        centered && "flex flex-col items-center text-center",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "section-number absolute -top-10 select-none text-[7rem] leading-none md:-top-16 md:text-[11rem]",
          centered ? "left-1/2 -translate-x-1/2" : "-left-2 md:-left-6"
        )}
      >
        {number}
      </span>

      <Reveal delay={0.1} y={16} className="relative">
        <span
          className={cn(
            "flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-luxe",
            dark ? "text-gold" : "text-gold-deep",
            centered && "justify-center"
          )}
        >
          <span aria-hidden className="h-px w-10 bg-gold/70" />
          {eyebrow}
          {centered && <span aria-hidden className="h-px w-10 bg-gold/70" />}
        </span>
      </Reveal>

      <TextReveal
        as="h2"
        text={title}
        delay={0.2}
        className={cn(
          "relative mt-6 max-w-3xl font-display text-4xl leading-[1.08] font-medium tracking-tight text-balance md:text-5xl lg:text-6xl",
          dark ? "text-ivory" : "text-ink"
        )}
      />

      {intro && (
        <Reveal
          delay={0.45}
          as="p"
          className={cn(
            "relative mt-7 max-w-2xl text-base leading-relaxed md:text-lg",
            dark ? "text-ivory/70" : "text-slate"
          )}
        >
          {intro}
        </Reveal>
      )}
    </div>
  );
}
