"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_LUXE = [0.16, 1, 0.3, 1] as const;

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Intervalo entre filhos, em segundos. */
  interval?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "ol" | "section";
};

/**
 * Container que orquestra a entrada dos filhos <StaggerItem /> em cascata.
 */
export function Stagger({
  children,
  className,
  interval = 0.12,
  delay = 0,
  amount = 0.2,
  as = "div",
}: StaggerProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: interval, delayChildren: delay } },
      }}
    >
      {children}
    </Comp>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article" | "blockquote";
};

export function StaggerItem({ children, className, y = 32, as = "div" }: StaggerItemProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  const variants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: EASE_LUXE },
    },
  };

  return (
    <Comp className={cn(className)} variants={variants}>
      {children}
    </Comp>
  );
}
