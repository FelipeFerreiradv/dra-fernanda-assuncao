"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MessageCircle, Route, Search, type LucideIcon } from "lucide-react";
import { processSection } from "@/lib/data";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionCanvas } from "@/components/shared/section-canvas";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/* Os dados guardam o ícone apenas como string — mapa local string → componente. */
const stepIcons: Record<string, LucideIcon> = {
  MessageCircle,
  Search,
  Route,
};

/**
 * Seção 05 — Processo. Momento escuro cinematográfico da página:
 * timeline horizontal (lg) / vertical (mobile) com linha dourada que se
 * desenha ao entrar no viewport e nós nas junções de cada passo.
 */
export function Process() {
  const reduced = useReducedMotion();

  const horizontalLine: Variants = {
    hidden: reduced ? { opacity: 0 } : { scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: 1.6, ease: EASE_OUT_EXPO, delay: 0.25 },
    },
  };

  const verticalLine: Variants = {
    hidden: reduced ? { opacity: 0 } : { scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 1.6, ease: EASE_OUT_EXPO, delay: 0.25 },
    },
  };

  return (
    <section
      id="processo"
      className="relative isolate overflow-hidden bg-ink py-28 text-ivory md:py-40 lg:py-52"
    >
      <SectionCanvas tone="dark" curves="diagonal-dark" />
      {/* ————— Decoração de fundo: glow dourado muito sutil + hairlines ————— */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 -right-48 size-[38rem]"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in srgb, var(--color-gold) 6%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-ivory/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[6%] hidden w-px bg-ivory/5 lg:block"
      />

      <div className="container-luxe relative">
        <SectionHeading
          number={processSection.number}
          eyebrow="Como funciona o atendimento"
          title={processSection.title}
          tone="dark"
        />

        {/* ————— Timeline ————— */}
        <div className="relative mt-20 md:mt-24 lg:mt-32">
          {/* Linha conectora horizontal — desktop */}
          <div aria-hidden className="absolute inset-x-0 top-0 hidden lg:block">
            <motion.div
              className="h-px origin-left bg-gold/30"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={horizontalLine}
            />
            {/* Nó de fechamento no fim da linha */}
            <span className="absolute top-0 right-0 size-1.5 -translate-y-1/2 rounded-full bg-gold/60" />
          </div>

          {/* Linha conectora vertical — mobile (esmaece no fim) */}
          <motion.div
            aria-hidden
            className="absolute top-2 bottom-4 left-0 w-px origin-top bg-gradient-to-b from-gold/30 via-gold/30 via-70% to-transparent lg:hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={verticalLine}
          />

          <Stagger
            as="ol"
            interval={0.18}
            amount={0.15}
            className="grid gap-16 lg:grid-cols-3 lg:gap-x-14"
          >
            {processSection.steps.map((step) => {
              const Icon = stepIcons[step.icon];
              return (
                <StaggerItem
                  as="li"
                  key={step.step}
                  className="relative pl-10 lg:pl-0 lg:pt-14"
                >
                  {/* Nó dourado na junção da linha */}
                  <span
                    aria-hidden
                    className="absolute top-2 left-0 size-2.5 -translate-x-1/2 rounded-full bg-gold ring-[3px] ring-gold/20 lg:top-0 lg:-translate-y-1/2 lg:translate-x-0"
                  />

                  {/* Número do passo — contorno dourado, decorativo */}
                  <span
                    aria-hidden
                    className="section-number block text-7xl md:text-8xl [-webkit-text-stroke:1px_color-mix(in_srgb,var(--color-gold)_70%,transparent)]"
                  >
                    {step.step}
                  </span>

                  {Icon && (
                    <Icon
                      aria-hidden
                      strokeWidth={1.5}
                      className="mt-8 size-6 text-gold"
                    />
                  )}

                  <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-ivory">
                    {step.title}
                  </h3>

                  <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/65">
                    {step.text}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* ————— CTA central ————— */}
        <Reveal delay={0.15} className="mt-20 flex justify-center md:mt-28">
          <WhatsAppCta
            variant="gold"
            size="lg"
            label={processSection.cta}
          />
        </Reveal>
      </div>
    </section>
  );
}
