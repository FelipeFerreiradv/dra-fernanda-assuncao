import { faqSection } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { SectionCanvas } from "@/components/shared/section-canvas";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/**
 * Seção 08 — Perguntas frequentes.
 * Coluna esquerda sticky com heading + cartão de contato;
 * coluna direita com accordion editorial das 7 dúvidas.
 */
export function Faq() {
  return (
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-paper py-24 md:py-36 lg:py-44"
    >
      <SectionCanvas curves="top-right" />
      <div className="container-luxe">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-0">
          {/* Coluna esquerda — sticky em telas grandes */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <SectionHeading
              number={faqSection.number}
              eyebrow="Dúvidas frequentes"
              title={faqSection.title}
            />

            <Reveal delay={0.3} className="mt-14">
              <div className="border border-ink/8 bg-cream p-8 shadow-[0_20px_54px_-38px_rgba(11,15,25,0.28)]">
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                  Não encontrou a{" "}
                  <span className="italic">sua</span> dúvida?
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate">
                  Me conte a sua situação pelo WhatsApp — respondo
                  pessoalmente.
                </p>
                <div className="mt-6">
                  <WhatsAppCta
                    label="Enviar minha dúvida"
                    variant="link"
                    size="none"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Coluna direita — accordion */}
          <div className="lg:col-span-8 lg:pl-12">
            <Reveal delay={0.15} amount={0.1}>
              <Accordion
                type="single"
                collapsible
                className="border-t border-ink/10"
              >
                {faqSection.items.map((item, index) => (
                  <AccordionItem key={item.question} value={`item-${index}`}>
                    <AccordionTrigger>
                      <span className="flex items-baseline gap-5">
                        <span
                          aria-hidden
                          className="font-display text-sm font-light italic text-gold/50"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{item.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="pl-0 md:pl-10 text-justify hyphens-auto">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
