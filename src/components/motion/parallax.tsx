"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Intensidade do deslocamento em px (positivo = move mais devagar que o scroll). */
  strength?: number;
};

/**
 * Parallax vertical suave ao scroll — para imagens e elementos decorativos.
 */
export function Parallax({ children, className, strength = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  const y = useSpring(raw, { stiffness: 90, damping: 28, mass: 0.6 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={reduced ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

type ParallaxImageProps = {
  children: React.ReactNode;
  className?: string;
  /** Escala interna para a imagem "vazar" dentro da moldura durante o parallax. */
  scale?: number;
};

/**
 * Moldura com máscara: a imagem interna se move mais devagar que o scroll,
 * criando profundidade sem revelar bordas.
 */
export function ParallaxImage({ children, className, scale = 1.15 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={reduced ? undefined : { y, scale }}
        className="absolute inset-0 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
