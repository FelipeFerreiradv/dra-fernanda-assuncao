"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Linha fina dourada no topo indicando o progresso de leitura.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Estrutura sempre renderizada (sem branch estrutural que quebre a
  // hidratação); em prefers-reduced-motion o elemento é ocultado via CSS.
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-gold-dark via-gold to-sand motion-reduce:hidden"
      style={reduced ? undefined : { scaleX }}
    />
  );
}
