import type { ReactNode } from "react";
import { Globe, Instagram, MapPin, MessageCircle } from "lucide-react";
import { locationSection } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionCanvas } from "@/components/shared/section-canvas";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";

/**
 * Envolve uma expressão do texto em <strong> preservando a string
 * exata vinda de data.ts. Se a expressão não existir, retorna o texto puro.
 */
function emphasize(text: string, phrase: string): ReactNode {
  const parts = text.split(phrase);
  if (parts.length === 1) return text;

  return parts.flatMap((part, index) =>
    index === 0
      ? [part]
      : [
          <strong key={index} className="font-semibold text-ink">
            {phrase}
          </strong>,
          part,
        ]
  );
}

const modes = [
  {
    icon: MapPin,
    label: "Presencial",
    value: "Mooca, São Paulo/SP",
  },
  {
    icon: Globe,
    label: "Online",
    value: "Todo o Brasil",
  },
] as const;

export function Location() {
  const contacts = [
    {
      icon: MapPin,
      label: "Endereço",
      value: siteConfig.address.full,
      href: siteConfig.mapsLinkUrl,
      ariaLabel: "Ver o endereço do escritório no Google Maps (abre em nova aba)",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: siteConfig.phoneDisplay,
      href: siteConfig.whatsappUrl,
      ariaLabel: "Conversar pelo WhatsApp (abre em nova aba)",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: siteConfig.instagram,
      href: siteConfig.instagramUrl,
      ariaLabel: "Visitar o Instagram da Dra. Fernanda (abre em nova aba)",
    },
  ] as const;

  return (
    <section
      id="atendimento"
      className="relative isolate overflow-hidden bg-paper py-24 md:py-36 lg:py-44"
    >
      <SectionCanvas curves="bottom-right" />
      <div className="container-luxe">
        <SectionHeading
          number={locationSection.number}
          eyebrow="Presencial e online"
          title={locationSection.title}
        />

        <div className="mt-16 grid gap-16 md:mt-20 lg:grid-cols-2 lg:gap-20">
          {/* ————— Coluna esquerda — texto, modos de atendimento e contato ————— */}
          <Reveal delay={0.1} y={32} className="flex flex-col">
            <p className="max-w-xl text-lg leading-relaxed text-slate text-justify hyphens-auto">
              {emphasize(locationSection.text, "todo o Brasil")}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {modes.map((mode) => (
                <div
                  key={mode.label}
                  className="group border border-ink/10 bg-cream p-6 shadow-[0_18px_48px_-36px_rgba(11,15,25,0.26)] transition-colors duration-700 ease-out-expo hover:border-gold/50"
                >
                  <mode.icon
                    aria-hidden
                    strokeWidth={1.5}
                    className="size-5 text-gold-dark"
                  />
                  <p className="mt-4 text-[0.6875rem] font-medium uppercase tracking-luxe text-gold-deep">
                    {mode.label}
                  </p>
                  <p className="mt-1.5 font-display text-xl font-medium tracking-tight text-ink">
                    {mode.value}
                  </p>
                </div>
              ))}
            </div>

            <ul className="mt-12 border-t border-ink/10">
              {contacts.map((contact) => (
                <li key={contact.label} className="border-b border-ink/10">
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={contact.ariaLabel}
                    className="group flex items-start gap-5 py-5 text-slate transition-colors duration-300 ease-out-expo hover:text-gold-deep focus-visible:text-gold-deep"
                  >
                    <contact.icon
                      aria-hidden
                      strokeWidth={1.5}
                      className="mt-0.5 size-5 shrink-0 text-gold-dark"
                    />
                    <span className="flex flex-col gap-1">
                      <span className="text-[0.6875rem] font-medium uppercase tracking-luxe text-slate transition-colors duration-300 group-hover:text-gold-deep">
                        {contact.label}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed">
                        {contact.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <WhatsAppCta label={locationSection.cta} />
            </div>
          </Reveal>

          {/* ————— Coluna direita — mapa em moldura editorial ————— */}
          <Reveal delay={0.3} y={32}>
            <figure className="relative">
              {/* Moldura dourada deslocada — detalhe editorial */}
              <div
                aria-hidden
                className="absolute inset-0 translate-x-4 translate-y-4 border border-gold/40"
              />
              <div className="relative aspect-[4/3] overflow-hidden border border-ink/10 bg-cream">
                <iframe
                  src={siteConfig.mapsEmbedUrl}
                  title="Mapa — escritório na Mooca, São Paulo"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-full w-full border-0 grayscale-[0.9] transition-[filter] duration-700 ease-out-expo hover:grayscale-0"
                />
              </div>
              <figcaption className="mt-8 text-xs leading-relaxed text-slate/70">
                {siteConfig.address.full}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
