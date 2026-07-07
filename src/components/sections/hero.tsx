"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Clock, GraduationCap, MapPin, Scale, type LucideIcon } from "lucide-react";
import { hero, trustBar } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ParallaxImage } from "@/components/motion/parallax";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { SectionCanvas } from "@/components/shared/section-canvas";
import { Button } from "@/components/ui/button";

/** Mapa string → ícone lucide para os itens da trust bar (nomes vêm de data.ts). */
const trustIcons: Record<(typeof trustBar)[number]["icon"], LucideIcon> = {
  Clock,
  GraduationCap,
  MapPin,
  Scale,
};

const MAX_PARALLAX_PX = 8;

export function Hero() {
  const reduced = useReducedMotion();

  // Mouse-parallax discreto do cartão flutuante (máx. 8px, com mola).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cardX = useSpring(mx, { stiffness: 110, damping: 18, mass: 0.4 });
  const cardY = useSpring(my, { stiffness: 110, damping: 18, mass: 0.4 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    mx.set(relX * MAX_PARALLAX_PX * 2);
    my.set(relY * MAX_PARALLAX_PX * 2);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ivory pt-28 md:pt-32"
    >
      <SectionCanvas curves="top-right" />
      <div className="container-luxe flex flex-1 flex-col justify-center pb-14 md:pb-16">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:items-center lg:gap-x-12 xl:gap-x-16">
          {/* ————— Coluna esquerda: copy ————— */}
          <div className="relative lg:col-span-7">
            {/* Número editorial gigante atrás do título */}
            <span
              aria-hidden
              className="section-number absolute top-6 -left-3 text-[9rem] md:-top-8 md:-left-8 md:text-[15rem]"
            >
              01
            </span>

            <Reveal immediate delay={0.05} y={14} className="relative">
              <p className="flex items-start gap-4 text-xs font-medium uppercase tracking-luxe text-gold-deep">
                <span aria-hidden className="mt-2 h-px w-10 shrink-0 bg-gold/70" />
                <span className="flex flex-col gap-0.5 leading-relaxed">
                  <span>{hero.eyebrow}</span>
                  <span>{hero.eyebrowSub}</span>
                </span>
              </p>
            </Reveal>

            <TextReveal
              as="h1"
              immediate
              text={hero.title}
              delay={0.15}
              className="relative mt-8 font-display text-5xl leading-[1.1] font-medium tracking-tight text-balance text-ink md:text-6xl xl:text-7xl"
            />

            <Reveal
              immediate
              delay={0.55}
              as="p"
              className="relative mt-8 max-w-xl text-base leading-relaxed text-slate text-justify hyphens-auto md:text-lg"
            >
              {hero.subtitle}
            </Reveal>

            <Reveal
              immediate
              delay={0.75}
              className="relative mt-10 flex flex-wrap items-center gap-4"
            >
              <WhatsAppCta label={hero.cta} />
              <Button asChild variant="outline">
                <a href="#areas">Conhecer as áreas de atuação</a>
              </Button>
            </Reveal>

            <Reveal
              immediate
              delay={0.9}
              as="p"
              className="relative mt-6 text-xs leading-relaxed text-slate/80"
            >
              {hero.microcopy}
            </Reveal>
          </div>

          {/* ————— Coluna direita: retrato em arco ————— */}
          <div
            className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Reveal immediate delay={0.35} y={44} duration={1.2} className="relative">
              {/* Moldura externa de 1px deslocada — detalhe editorial */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border border-gold/40"
              />

              <ParallaxImage className="relative aspect-[4/5] rounded-t-full bg-cream">
                <Image
                  src="/images/fernanda-hero.jpg"
                  alt={hero.photoAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 100vw"
                  className="object-cover"
                />
                {/* Tratamento editorial quente sobre o retrato */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gold/10 mix-blend-multiply"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent"
                />
              </ParallaxImage>

              {/* Cartão flutuante com mouse-parallax discreto */}
              <motion.div
                style={reduced ? undefined : { x: cardX, y: cardY }}
                className="hairline-gold absolute bottom-8 -left-3 flex flex-col gap-2.5 border border-gold/30 bg-paper/90 px-5 py-4 shadow-[0_18px_50px_-30px_rgba(11,15,25,0.4)] backdrop-blur md:bottom-12 md:-left-8"
              >
                <p className="text-xs font-medium tracking-wide-plus text-ink">
                  {siteConfig.oab} · {hero.experienceBadge}
                </p>
              </motion.div>
            </Reveal>
          </div>
        </div>

        {/* ————— Ghost word editorial — preenche o espaço e dá caráter ————— */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-24 right-0 hidden select-none overflow-hidden lg:block"
        >
          <span className="ghost-word text-[7.5rem] leading-none xl:text-[9rem]">
            PREVIDÊNCIA
          </span>
        </div>

        {/* ————— Scroll indicator ————— */}
        <div
          aria-hidden
          className="pointer-events-none mt-14 hidden select-none items-center gap-4 lg:flex"
        >
          <span className="relative block h-14 w-px overflow-hidden bg-gold/25">
            <motion.span
              className="absolute left-0 top-0 block h-6 w-px bg-gold"
              animate={reduced ? undefined : { y: ["-110%", "260%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span className="text-[0.5625rem] uppercase tracking-luxe text-slate/80">
            role para descobrir
          </span>
        </div>
      </div>

      {/* ————— Trust bar ————— */}
      <div className="border-t border-ink/10">
        <div className="container-luxe py-8 md:py-10">
          <Stagger
            as="ul"
            interval={0.12}
            className="grid grid-cols-2 gap-x-6 gap-y-8 md:gap-x-10 lg:grid-cols-4"
          >
            {trustBar.map((item) => {
              const Icon = trustIcons[item.icon];
              return (
                <StaggerItem key={item.icon} as="li" className="flex items-start gap-3.5">
                  <Icon
                    aria-hidden
                    strokeWidth={1.5}
                    className="mt-0.5 size-5 shrink-0 text-gold-dark"
                  />
                  <p className="text-sm leading-relaxed text-slate">
                    <span className="font-medium text-ink">{item.highlight}</span>{" "}
                    {item.text}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
