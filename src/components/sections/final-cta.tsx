import { finalCtaSection } from "@/lib/data";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { SectionCanvas } from "@/components/shared/section-canvas";
import { ContactForm } from "@/components/shared/contact-form";

/**
 * Seção final de conversão — fundo ink dramático, glow dourado sutil
 * e formulário como cartão claro em contraste.
 */
export function FinalCta() {
  return (
    <section
      id="contato"
      className="relative isolate overflow-hidden bg-ink py-28 text-ivory md:py-44 lg:py-56"
    >
      <SectionCanvas tone="dark" curves="diagonal-dark" />
      {/* Decoração: glow radial dourado sutilíssimo + hairlines ivory */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-72 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[140px]" />
        <div className="absolute -bottom-40 right-[-12%] h-[30rem] w-[30rem] rounded-full bg-gold/[0.05] blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-ivory/5" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-ivory/5" />
        <div className="absolute left-1/2 top-0 hidden h-full w-px bg-ivory/5 lg:block" />
      </div>

      {/* Número editorial gigante da seção */}
      <span
        aria-hidden
        className="section-number absolute -top-6 right-2 text-[10rem] md:-top-4 md:right-10 md:text-[16rem]"
      >
        {finalCtaSection.number}
      </span>

      <div className="container-luxe relative grid gap-16 lg:grid-cols-12 lg:items-center">
        {/* Esquerda — mensagem e CTA principal */}
        <div className="lg:col-span-6">
          <Reveal delay={0.05} y={16}>
            <span className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-luxe text-gold">
              <span aria-hidden className="h-px w-10 bg-gold/70" />
              Fale com a Dra. Fernanda
            </span>
          </Reveal>

          <TextReveal
            as="h2"
            text={finalCtaSection.title}
            delay={0.15}
            className="mt-6 font-display text-4xl font-medium leading-[1.06] tracking-tight text-balance text-ivory md:text-6xl"
          />

          <Reveal as="p" delay={0.4} className="mt-8 max-w-xl leading-relaxed text-ivory/70 text-justify">
            {finalCtaSection.text}
          </Reveal>

          <Reveal delay={0.55} className="mt-10">
            <WhatsAppCta variant="gold" size="lg" label={finalCtaSection.cta} />
            <p className="mt-5 text-xs text-ivory/50">{finalCtaSection.microcopy}</p>
          </Reveal>
        </div>

        {/* Direita — formulário em cartão claro sobre fundo escuro */}
        <div className="lg:col-span-6">
          <Reveal delay={0.25} y={36}>
            <div className="border border-ivory/10 bg-paper p-8 text-ink shadow-[0_40px_90px_-50px_rgba(0,0,0,0.7)] md:p-12">
              <h3 className="hairline-gold font-display text-2xl font-medium tracking-tight text-ink before:mb-5">
                Prefere escrever? <em className="italic">Me mande uma mensagem</em>
              </h3>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
