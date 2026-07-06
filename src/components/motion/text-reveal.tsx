"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  className?: string;
  /** Elemento semântico a renderizar. */
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  /** Intervalo entre palavras, em segundos. */
  stagger?: number;
  immediate?: boolean;
};

const EASE_LUXE = [0.16, 1, 0.3, 1] as const;

/**
 * Revela um texto palavra por palavra, com fade + blur + leve subida.
 * O texto completo permanece acessível a leitores de tela via aria-label
 * (as palavras visíveis ficam aria-hidden).
 *
 * A estrutura do DOM é idêntica com ou sem prefers-reduced-motion — só os
 * variants mudam — evitando mismatch de hidratação. O espaço entre palavras
 * é um nó de texto irmão (fora do inline-block com overflow), garantindo
 * espaçamento e quebra de linha corretos.
 */
export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.055,
  immediate = false,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={cn(className)}
      aria-label={text}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, amount: 0.4 } })}
      variants={{
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: delay,
          },
        },
        hidden: {},
      }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span aria-hidden className="inline-flex overflow-hidden align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: reduced
                  ? { opacity: 0 }
                  : { y: "110%", opacity: 0, filter: "blur(6px)" },
                visible: {
                  y: "0%",
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { duration: reduced ? 0.5 : 0.9, ease: EASE_LUXE },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </MotionTag>
  );
}
