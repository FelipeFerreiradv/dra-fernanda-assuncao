"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Atraso em segundos antes da animação iniciar. */
  delay?: number;
  /** Duração em segundos. */
  duration?: number;
  /** Deslocamento vertical inicial em px. */
  y?: number;
  /** Anima imediatamente ao montar (para conteúdo acima da dobra). */
  immediate?: boolean;
  /** Quanto do elemento precisa estar visível para disparar (0–1). */
  amount?: number;
  as?: "div" | "section" | "span" | "li" | "p" | "figure" | "blockquote";
};

const EASE_LUXE = [0.16, 1, 0.3, 1] as const;

/**
 * Reveal cinematográfico: fade + blur + translate sutil ao entrar no viewport.
 * Respeita prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 1.1,
  y = 28,
  immediate = false,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  const variants: Variants = {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, y, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, delay, ease: EASE_LUXE },
    },
  };

  return (
    <Comp
      className={cn(className)}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, amount } })}
      variants={variants}
    >
      {children}
    </Comp>
  );
}
