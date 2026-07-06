import { FileSearch, ShieldAlert, Users, type LucideIcon } from "lucide-react";
import { areasSection } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionCanvas } from "@/components/shared/section-canvas";
import { cn } from "@/lib/utils";

/** Mapa nome do ícone (string em data.ts) → componente lucide. */
const areaIcons: Record<string, LucideIcon> = {
  FileSearch,
  ShieldAlert,
  Users,
};

/**
 * Seção "Áreas de atuação" — três grandes cards editoriais, com o card
 * central deslocado para baixo em telas largas (assimetria intencional).
 */
export function PracticeAreas() {
  return (
    <section
      id="areas"
      className="relative isolate overflow-hidden bg-cream py-24 md:py-36 lg:py-44"
    >
      <SectionCanvas curves="full-sweep" />
      <div className="container-luxe">
        <SectionHeading
          number={areasSection.number}
          eyebrow="Áreas de atuação"
          title={areasSection.title}
          intro={areasSection.intro}
        />

        <Stagger
          as="div"
          interval={0.14}
          className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3 lg:gap-8 lg:pb-12"
        >
          {areasSection.items.map((item, index) => {
            const Icon = areaIcons[item.icon];
            return (
              <StaggerItem
                key={item.id}
                as="div"
                className={cn("h-full", index === 1 && "lg:translate-y-12")}
              >
                <article
                  id={item.id}
                  className="group relative flex h-full min-h-[30rem] scroll-mt-28 flex-col border border-ink/8 bg-paper p-10 shadow-[0_24px_60px_-40px_rgba(11,15,25,0.3)] transition-all duration-700 ease-out-expo hover:-translate-y-1.5 hover:border-gold/50 hover:bg-sand/15 hover:shadow-[0_34px_74px_-36px_rgba(11,15,25,0.36)] md:p-12"
                >
                  <div className="flex items-start justify-between">
                    <span aria-hidden className="section-number text-6xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {Icon && (
                      <Icon
                        aria-hidden
                        strokeWidth={1.5}
                        className="mt-2 size-6 text-gold-dark"
                      />
                    )}
                  </div>

                  <h3 className="mt-8 font-display text-2xl leading-tight font-medium tracking-tight text-ink text-balance md:text-[1.75rem]">
                    {item.title}
                  </h3>

                  <span
                    aria-hidden
                    className="mt-6 block h-px w-10 bg-gold transition-all duration-700 ease-out-expo group-hover:w-full"
                  />

                  <p className="mt-6 flex-1 text-[0.9375rem] leading-relaxed text-slate md:text-base">
                    {item.text}
                  </p>

                  <div className="mt-8">
                    <WhatsAppCta
                      label={item.cta}
                      variant="link"
                      size="none"
                      icon="arrow"
                    />
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal
          as="div"
          delay={0.15}
          className="mx-auto mt-20 flex max-w-2xl flex-col items-center gap-9 text-center md:mt-24"
        >
          <p className="font-display text-xl leading-relaxed font-light italic text-slate md:text-2xl">
            {areasSection.closing}
          </p>
          <WhatsAppCta
            label="Me conte a sua história no WhatsApp"
            variant="outline"
          />
        </Reveal>
      </div>
    </section>
  );
}
