"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight, ExternalLink, Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { testimonialsSection } from "@/lib/data";
import { SectionHeading } from "@/components/shared/section-heading";
import { SectionCanvas } from "@/components/shared/section-canvas";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Seção de depoimentos — carrossel Embla com autoplay discreto.
 * Conformidade OAB: renderiza somente o texto exato de data.ts,
 * sem estrelas, notas ou menções a resultados.
 */
export function Testimonials() {
  const autoplay = useRef(
    Autoplay({ delay: 7000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay.current]
  );
  const reduced = useReducedMotion();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Espelha o estado de reprodução para os handlers imperativos (reInit)
  // sem recriá-los a cada mudança.
  const playingRef = useRef(true);
  playingRef.current = isPlaying && !reduced;

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    // A cada reInit (resize/rotação) o Embla reinicializa os plugins e o
    // autoplay volta a rodar; reaplicamos o stop se estiver pausado/reduzido.
    const onReInit = (api: EmblaCarouselType) => {
      onSelect(api);
      if (!playingRef.current) autoplay.current.stop();
    };
    emblaApi.on("select", onSelect).on("reInit", onReInit);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onReInit);
    };
  }, [emblaApi, onSelect]);

  // Autoplay desativado para quem prefere movimento reduzido.
  useEffect(() => {
    if (reduced) {
      autoplay.current.stop();
      setIsPlaying(false);
    }
  }, [reduced]);

  const stopAutoplay = useCallback(() => {
    autoplay.current.stop();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) autoplay.current.play();
      else autoplay.current.stop();
      return next;
    });
  }, []);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
    stopAutoplay();
  }, [emblaApi, stopAutoplay]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
    stopAutoplay();
  }, [emblaApi, stopAutoplay]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      stopAutoplay();
    },
    [emblaApi, stopAutoplay]
  );

  const total = testimonialsSection.items.length;

  return (
    <section
      id="depoimentos"
      className="relative isolate overflow-hidden bg-cream py-24 md:py-36 lg:py-44"
    >
      <SectionCanvas curves="horizontal" />
      <div className="container-luxe">
        <SectionHeading
          number={testimonialsSection.number}
          eyebrow="Experiência de atendimento"
          title={testimonialsSection.title}
        />

        <Reveal delay={0.2} className="mt-16 md:mt-20">
          <div
            role="region"
            aria-roledescription="carrossel"
            aria-label="Depoimentos de clientes"
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex touch-pan-y">
                {testimonialsSection.items.map((item, index) => (
                  <div
                    key={item.author}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`depoimento ${index + 1} de ${total}`}
                    className="min-w-0 shrink-0 grow-0 basis-full pr-6 md:pr-10"
                  >
                    <figure className="h-full max-w-3xl border border-ink/8 bg-paper p-10 shadow-[0_28px_70px_-44px_rgba(11,15,25,0.32)] md:p-14">
                      <span
                        aria-hidden
                        className="block font-display text-8xl leading-none text-gold/30 select-none"
                      >
                        &rdquo;
                      </span>
                      <blockquote className="-mt-4 font-display text-2xl leading-snug text-ink italic md:text-3xl">
                        {item.quote}
                      </blockquote>
                      <figcaption className="mt-10">
                        <span className="block text-xs font-medium tracking-wide-plus text-gold-deep uppercase">
                          {item.author}
                        </span>
                        <span className="mt-2 block text-xs text-slate/70">
                          {item.context}
                        </span>
                      </figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </div>

            {/* Controles: setas + dots em barra fina */}
            <div className="mt-10 flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  aria-label="Depoimento anterior"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-500 ease-out-expo hover:border-gold hover:text-gold-deep disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft aria-hidden strokeWidth={1.5} className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  aria-label="Próximo depoimento"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-500 ease-out-expo hover:border-gold hover:text-gold-deep disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronRight aria-hidden strokeWidth={1.5} className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-pressed={isPlaying}
                  aria-label={
                    isPlaying
                      ? "Pausar rotação automática dos depoimentos"
                      : "Retomar rotação automática dos depoimentos"
                  }
                  className="ml-1 inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-500 ease-out-expo hover:border-gold hover:text-gold-deep"
                >
                  {isPlaying ? (
                    <Pause aria-hidden strokeWidth={1.5} className="size-4" />
                  ) : (
                    <Play aria-hidden strokeWidth={1.5} className="size-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => scrollTo(index)}
                    aria-label={`Ir para o depoimento ${index + 1}`}
                    aria-current={index === selectedIndex ? "true" : undefined}
                    className="group flex items-center py-2"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "block h-0.5 transition-all duration-500 ease-out-expo",
                        index === selectedIndex
                          ? "w-10 bg-gold-dark"
                          : "w-6 bg-ink/40 group-hover:bg-ink/60"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Avaliações públicas no Google */}
        <Reveal delay={0.15} className="mt-16 md:mt-20">
          <div className="hairline-gold flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs tracking-wide-plus text-slate/70 uppercase">
              Avaliações públicas de clientes
            </p>
            <Button asChild variant="outline">
              <a
                href={testimonialsSection.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink aria-hidden strokeWidth={1.5} />
                <span>{testimonialsSection.googleCta}</span>
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
