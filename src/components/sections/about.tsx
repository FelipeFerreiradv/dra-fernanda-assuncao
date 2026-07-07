import Image from "next/image";
import { aboutSection } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ParallaxImage } from "@/components/motion/parallax";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionCanvas } from "@/components/shared/section-canvas";

export function About() {
  return (
    <section
      id="sobre"
      className="relative isolate overflow-hidden bg-canvas py-24 md:py-36 lg:py-44"
    >
      <SectionCanvas curves="top-left" />
      <div className="container-luxe">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-12 lg:gap-0">
          {/* ————— Retrato editorial ————— */}
          <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:mx-0 lg:max-w-none">
            <div className="relative mt-5 mr-2 mb-8 ml-5 lg:mt-6 lg:ml-6">
              {/* Bloco sand deslocado no canto oposto ao da moldura */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-5 -left-5 h-2/3 w-2/3 bg-sand/40"
              />

              {/* Moldura dourada de 1px deslocada */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-3 translate-x-2 translate-y-2 border border-gold/40 md:translate-x-4 md:translate-y-4"
              />

              <ParallaxImage className="relative aspect-[3/4] bg-ivory">
                <Image
                  src="/images/fernanda-retrato.jpg"
                  alt={aboutSection.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 28rem, 100vw"
                  className="object-cover"
                />
                {/* Tratamento editorial quente — integra a foto à paleta */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gold/10 mix-blend-multiply"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
                />
              </ParallaxImage>

            </div>
          </Reveal>

          {/* ————— Texto de autoridade ————— */}
          <div className="lg:col-span-7 lg:pl-16">
            <SectionHeading
              number={aboutSection.number}
              eyebrow="Sobre a advogada"
              title={aboutSection.title}
            />

            <div className="mt-12 space-y-7 md:mt-14">
              {aboutSection.paragraphs.map((paragraph, index) => (
                <Reveal
                  key={paragraph}
                  as="p"
                  delay={0.15 + index * 0.12}
                  className={cn(
                    index === 0
                      ? "font-display text-2xl leading-snug font-medium text-ink text-pretty md:text-3xl"
                      : "leading-relaxed text-slate text-justify hyphens-auto"
                  )}
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>

            {/* Assinatura */}
            <Reveal delay={0.2} className="mt-14 hairline-gold">
              <p className="mt-7 font-display text-2xl italic text-gold-dark">
                {aboutSection.signature}
              </p>
              <p className="mt-3 text-xs uppercase tracking-wide-plus text-slate">
                {aboutSection.signatureBy}
              </p>
            </Reveal>
          </div>
        </div>

        {/* ————— Credenciais ————— */}
        <div className="mt-24 border-t border-ink/10 pt-14 md:mt-32 md:pt-16">
          <Stagger
            as="ul"
            interval={0.1}
            className="grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-2"
          >
            {aboutSection.credentials.map((credential) => (
              <StaggerItem
                key={credential}
                as="li"
                y={20}
                className="flex items-start gap-4"
              >
                <span
                  aria-hidden
                  className="mt-2.5 h-px w-6 shrink-0 bg-gold"
                />
                <span className="text-sm leading-relaxed text-slate">
                  {credential}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
