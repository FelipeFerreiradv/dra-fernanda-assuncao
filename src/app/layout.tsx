import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/site-config";
import {
  getAttorneySchema,
  getFaqSchema,
  getLegalServiceSchema,
} from "@/lib/schema";
import "./globals.css";

// Serif de display — alto contraste e caráter editorial/artístico.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Advogada Previdenciária | Aposentadoria e BPC — Dra. Fernanda",
  description:
    "Benefício negado pelo INSS? Advogada previdenciária com atendimento humano em SP e online no Brasil. Aposentadoria, especial e BPC/LOAS. Fale no WhatsApp.",
  keywords: [
    "advogada previdenciária",
    "aposentadoria negada pelo INSS",
    "aposentadoria especial",
    "BPC LOAS",
    "benefício assistencial",
    "advogada previdenciária São Paulo",
    "advogada previdenciária online",
    "recurso INSS",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.firm,
    title: "Advogada Previdenciária | Aposentadoria e BPC — Dra. Fernanda",
    description:
      "Benefício negado pelo INSS? Advogada previdenciária com atendimento humano em SP e online no Brasil. Aposentadoria, especial e BPC/LOAS.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Dra. Fernanda Assunção — Advogada Previdenciária",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advogada Previdenciária | Aposentadoria e BPC — Dra. Fernanda",
    description:
      "Benefício negado pelo INSS? Advogada previdenciária com atendimento humano em SP e online no Brasil. Aposentadoria, especial e BPC/LOAS.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schemas = [getLegalServiceSchema(), getAttorneySchema(), getFaqSchema()];

  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <body>
        {/* JSON-LD como <script> nativo: presente no HTML do servidor,
            legível por crawlers e validadores sem execução de JS. */}
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <SmoothScroll>{children}</SmoothScroll>
        <Toaster />
      </body>
    </html>
  );
}
