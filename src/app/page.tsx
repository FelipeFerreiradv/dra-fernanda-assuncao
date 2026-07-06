import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { ScrollProgress } from "@/components/motion/scroll-progress";

/*
 * Seções abaixo da dobra entram via dynamic import (code splitting),
 * mantendo a renderização no servidor para SEO.
 */
const PainPoints = dynamic(() =>
  import("@/components/sections/pain-points").then((m) => m.PainPoints)
);
const PracticeAreas = dynamic(() =>
  import("@/components/sections/practice-areas").then((m) => m.PracticeAreas)
);
const About = dynamic(() =>
  import("@/components/sections/about").then((m) => m.About)
);
const Process = dynamic(() =>
  import("@/components/sections/process").then((m) => m.Process)
);
const Location = dynamic(() =>
  import("@/components/sections/location").then((m) => m.Location)
);
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials)
);
const Faq = dynamic(() =>
  import("@/components/sections/faq").then((m) => m.Faq)
);
const FinalCta = dynamic(() =>
  import("@/components/sections/final-cta").then((m) => m.FinalCta)
);
const Footer = dynamic(() =>
  import("@/components/layout/footer").then((m) => m.Footer)
);
const WhatsAppFloat = dynamic(() =>
  import("@/components/layout/whatsapp-float").then((m) => m.WhatsAppFloat)
);

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="conteudo">
        <Hero />
        <PainPoints />
        <PracticeAreas />
        <About />
        <Process />
        <Location />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
