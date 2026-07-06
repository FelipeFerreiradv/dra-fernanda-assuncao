import {
  FileX2,
  HardHat,
  HeartHandshake,
  Hourglass,
  type LucideIcon,
} from "lucide-react";
import { painSection } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionCanvas } from "@/components/shared/section-canvas";

/** Mapa string → componente de ícone (os dados guardam apenas o nome). */
const painIcons: Record<string, LucideIcon> = {
  FileX2,
  HardHat,
  HeartHandshake,
  Hourglass,
};

export function PainPoints() {
  return (
    <section className="relative isolate overflow-hidden bg-paper py-24 md:py-36 lg:py-44">
      <SectionCanvas curves="bottom-left" />
      <div className="container-luxe">
        <SectionHeading
          number={painSection.number}
          eyebrow="Você se reconhece?"
          title={painSection.title}
          intro={painSection.intro}
        />

        <Stagger
          as="ul"
          interval={0.14}
          className="mt-16 grid grid-cols-1 gap-6 md:mt-24 md:grid-cols-2 md:gap-8"
        >
          {painSection.items.map((item, index) => {
            const Icon = painIcons[item.icon];
            const isRightColumn = index % 2 === 1;

            return (
              <StaggerItem
                key={item.quote}
                as="li"
                className={cn(isRightColumn && "md:mt-16")}
              >
                <div className="group relative h-full border border-ink/10 bg-ivory/70 p-8 shadow-[0_20px_54px_-34px_rgba(11,15,25,0.28)] backdrop-blur-[2px] transition-all duration-700 ease-out-expo hover:-translate-y-1.5 hover:border-gold/50 hover:bg-paper hover:shadow-[0_30px_66px_-30px_rgba(11,15,25,0.34)] md:p-10">
                  {/* Numeração editorial do card */}
                  <span
                    aria-hidden
                    className="absolute top-6 right-6 font-display text-lg font-light italic text-gold/60 select-none md:top-8 md:right-8"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    aria-hidden
                    className="flex size-12 items-center justify-center border border-gold/40 text-gold-dark transition-transform duration-700 ease-out-expo group-hover:rotate-3 group-hover:-translate-y-0.5"
                  >
                    <Icon strokeWidth={1.5} className="size-5" />
                  </span>

                  <blockquote className="mt-8 font-display text-2xl leading-snug font-medium italic text-ink text-balance">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate text-justify hyphens-auto">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Fechamento — ponte emocional para a próxima seção */}
        <Reveal className="mx-auto mt-20 flex max-w-3xl flex-col items-center text-center md:mt-28">
          <span aria-hidden className="h-px w-14 bg-gold/70" />
          <p className="mt-8 font-display text-2xl leading-snug italic text-ink text-balance md:text-3xl">
            {painSection.bridge}
          </p>
          <span aria-hidden className="mt-8 h-px w-14 bg-gold/70" />
        </Reveal>
      </div>
    </section>
  );
}
