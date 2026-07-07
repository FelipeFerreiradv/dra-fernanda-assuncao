import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { legalNotice } from "@/lib/data";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { CurrentYear } from "@/components/shared/current-year";

const telHref = `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`;

/** Ano de lançamento — usado como fallback antes do cliente atualizar. */
const LAUNCH_YEAR = 2026;

export function Footer() {
  return (
    <footer className="border-t border-gold/30 bg-ink text-ivory">
      <div className="container-luxe pt-20 pb-10 md:pt-28 md:pb-12">
        {/* Grid editorial */}
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Coluna 1 — tagline e OAB */}
          <div className="lg:col-span-5">
            <p className="font-display text-lg italic text-gold md:text-xl">
              {siteConfig.tagline}
            </p>
            <p className="mt-5 text-[0.6875rem] font-medium uppercase tracking-luxe text-ivory/50">
              {siteConfig.oab}
            </p>
          </div>

          {/* Coluna 2 — contato (NAP) */}
          <div className="lg:col-span-4">
            <h3 className="text-[0.6875rem] font-medium uppercase tracking-luxe text-gold">
              Contato
            </h3>
            <address className="mt-7 space-y-5 text-sm not-italic leading-relaxed text-ivory/70">
              <p className="flex gap-3">
                <MapPin
                  aria-hidden
                  strokeWidth={1.5}
                  className="mt-0.5 size-4 shrink-0 text-gold"
                />
                <span>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.neighborhood} — {siteConfig.address.city}/
                  {siteConfig.address.state}
                  <br />
                  CEP {siteConfig.address.zip}
                </span>
              </p>
              <p>
                <a
                  href={telHref}
                  className="inline-flex items-center gap-3 transition-colors duration-500 ease-out-expo hover:text-ivory"
                >
                  <Phone aria-hidden strokeWidth={1.5} className="size-4 text-gold" />
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-3 break-all transition-colors duration-500 ease-out-expo hover:text-ivory"
                >
                  <Mail aria-hidden strokeWidth={1.5} className="size-4 shrink-0 text-gold" />
                  {siteConfig.email}
                </a>
              </p>
            </address>
          </div>

          {/* Coluna 3 — navegação e redes */}
          <div className="lg:col-span-3">
            <h3 className="text-[0.6875rem] font-medium uppercase tracking-luxe text-gold">
              Navegação
            </h3>
            <nav aria-label="Navegação do rodapé" className="mt-7">
              <ul className="space-y-3 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-ivory/70 transition-colors duration-500 ease-out-expo hover:text-ivory"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-9 flex flex-col items-start gap-4">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${siteConfig.instagram} (abre em nova aba)`}
                className="inline-flex items-center gap-3 text-sm text-ivory/70 transition-colors duration-500 ease-out-expo hover:text-ivory"
              >
                <Instagram aria-hidden strokeWidth={1.5} className="size-4 text-gold" />
                {siteConfig.instagram}
              </a>
              <a
                href={siteConfig.instagramFirmUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${siteConfig.instagramFirm} — escritório (abre em nova aba)`}
                className="inline-flex items-center gap-3 text-sm text-ivory/70 transition-colors duration-500 ease-out-expo hover:text-ivory"
              >
                <Instagram aria-hidden strokeWidth={1.5} className="size-4 text-gold" />
                {siteConfig.instagramFirm}
              </a>
              <WhatsAppCta
                label="Falar no WhatsApp"
                variant="link"
                size="none"
                className="text-sm text-gold after:bg-gold"
              />
            </div>
          </div>
        </div>

        {/* Aviso legal e créditos */}
        <div className="mt-16 border-t border-ivory/10 pt-8 md:mt-20">
          <p className="max-w-3xl text-xs leading-relaxed text-ivory/50">{legalNotice}</p>
          <p className="mt-8 text-xs text-ivory/50">
            © <CurrentYear fallback={LAUNCH_YEAR} /> {siteConfig.name} ·{" "}
            {siteConfig.oab}
          </p>
        </div>
      </div>
    </footer>
  );
}
