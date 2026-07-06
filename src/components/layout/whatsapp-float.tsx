"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const EASE_LUXE = [0.16, 1, 0.3, 1] as const;

/**
 * Botão flutuante de WhatsApp — aparece após ~600px de scroll.
 * Link direto (não usa WhatsAppCta por ser um botão circular apenas com ícone).
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 600);
  });

  // Sincroniza o estado caso a página carregue já rolada.
  useEffect(() => {
    setVisible(window.scrollY > 600);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="whatsapp-float"
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.6, ease: EASE_LUXE }}
          className="fixed bottom-6 right-6 z-50"
        >
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar com a Dra. Fernanda no WhatsApp"
            className="group relative flex size-14 items-center justify-center rounded-full bg-gold text-ink shadow-sm transition-colors duration-500 ease-out-expo hover:bg-gold-dark"
          >
            {/* Anel pulsante sutil — desativado com prefers-reduced-motion */}
            <span
              aria-hidden
              className="absolute inset-0 animate-ping rounded-full bg-gold/30 [animation-duration:2.8s] motion-reduce:hidden"
            />
            <MessageCircle
              aria-hidden
              strokeWidth={1.5}
              className="relative size-6"
            />

            {/* Tooltip discreto — apenas desktop */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-full top-1/2 mr-4 hidden -translate-y-1/2 whitespace-nowrap bg-ink px-3.5 py-2 text-[0.6875rem] font-medium uppercase tracking-wide-plus text-ivory opacity-0 transition-opacity duration-500 ease-out-expo group-hover:opacity-100 group-focus-visible:opacity-100 lg:block"
            >
              Fale com a Dra. Fernanda
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
