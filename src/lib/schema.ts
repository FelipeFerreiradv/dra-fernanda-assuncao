import { siteConfig } from "@/lib/site-config";
import { faqSection } from "@/lib/data";

/**
 * JSON-LD — Attorney + LegalService + FAQPage (Schema.org).
 * Conecta com o Google Meu Negócio via NAP consistente.
 */

export function getLegalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${siteConfig.url}/#legalservice`,
    name: siteConfig.firm,
    url: siteConfig.url,
    image: [`${siteConfig.url}/og.png`],
    telephone: siteConfig.phone,
    email: siteConfig.email,
    slogan: siteConfig.tagline,
    hasMap: siteConfig.mapsLinkUrl,
    description:
      "Escritório de advocacia com atuação em Direito Previdenciário: aposentadoria negada pelo INSS, aposentadoria especial e BPC/LOAS. Atendimento presencial em São Paulo e online em todo o Brasil.",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.street}, ${siteConfig.address.neighborhood}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "São Paulo" },
      { "@type": "Country", name: "Brasil" },
    ],
    knowsAbout: [
      "Direito Previdenciário",
      "Aposentadoria negada pelo INSS",
      "Aposentadoria especial",
      "BPC/LOAS",
      "Benefício assistencial",
    ],
    sameAs: [siteConfig.instagramUrl],
    employee: { "@id": `${siteConfig.url}/#attorney` },
  };
}

export function getAttorneySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    "@id": `${siteConfig.url}/#attorney`,
    name: "Fernanda Assunção",
    honorificPrefix: "Dra.",
    jobTitle: "Advogada Previdenciária",
    identifier: siteConfig.oab,
    image: [`${siteConfig.url}/og.png`],
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    worksFor: { "@id": `${siteConfig.url}/#legalservice` },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidade Cruzeiro do Sul",
    },
    knowsAbout: [
      "Direito Previdenciário",
      "INSS",
      "Aposentadoria especial",
      "BPC/LOAS",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.street}, ${siteConfig.address.neighborhood}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: "BR",
    },
    sameAs: [siteConfig.instagramUrl],
  };
}

export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqSection.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
