"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Variants,
} from "framer-motion";
import { Instagram, Mail, Phone, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { getLenis } from "@/lib/smooth-scroll-store";
import { cn } from "@/lib/utils";

const EASE_LUXE = [0.16, 1, 0.3, 1] as const;

/** No desktop o wordmark já leva ao início — evita link duplicado no menu. */
const desktopLinks = navLinks.filter((link) => link.href !== "#inicio");

const telHref = `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  // Sincroniza o estado caso a página carregue já rolada (refresh com hash).
  useEffect(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  // Trava o scroll da página enquanto o menu mobile está aberto — inclusive
  // o smooth scroll do Lenis, que ignora overflow:hidden por rolar via JS.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const lenis = getLenis();
    lenis?.stop();
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      lenis?.start();
    };
  }, [open]);

  // Devolve o foco ao botão que abriu o menu quando ele fecha.
  useEffect(() => {
    if (open) return;
    menuTriggerRef.current?.focus?.({ preventScroll: true });
  }, [open]);

  // Fecha com Escape e mantém o foco preso dentro do overlay (focus trap).
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const overlay = overlayRef.current;
      if (!overlay) return;
      const focusables = overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Fecha o menu se a viewport crescer até o breakpoint desktop (lg),
  // onde o overlay fica oculto — evita deixar o scroll travado sem saída.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    if (mq.matches) {
      setOpen(false);
      return;
    }
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  const menuItem: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE_LUXE },
    },
  };

  return (
    <>
      {/* Skip-link — visível apenas ao receber foco via teclado */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[70] focus:bg-ink focus:px-5 focus:py-3 focus:text-[0.6875rem] focus:font-medium focus:uppercase focus:tracking-wide-plus focus:text-ivory"
      >
        Pular para o conteúdo
      </a>

      <motion.header
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_LUXE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-out-expo",
          scrolled
            ? "border-b border-ink/10 bg-ivory/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-luxe flex items-center justify-between gap-6 transition-[height] duration-700 ease-out-expo",
            scrolled ? "h-16 md:h-18" : "h-20 md:h-24",
          )}
        >
          {/* Wordmark textual em duas linhas */}
          <a
            href="#inicio"
            aria-label="Fernanda Assunção — Advocacia Previdenciária, voltar ao início"
            className="flex flex-col"
          >
            <span className="font-display text-xl font-medium leading-none tracking-tight text-ink">
              Fernanda Assunção
            </span>
            <span className="mt-1.5 text-[0.5625rem] font-medium uppercase tracking-luxe text-gold-deep">
              Advocacia Previdenciária
            </span>
          </a>

          {/* Navegação desktop */}
          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {desktopLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative py-1 text-[0.8125rem] font-medium text-ink/75 transition-colors duration-500 ease-out-expo after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gold-dark after:transition-transform after:duration-500 after:ease-out-expo hover:text-ink hover:after:origin-left hover:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <WhatsAppCta
              label="Falar no WhatsApp"
              size="sm"
              variant="outline"
            />
          </div>

          {/* Hambúrguer — mobile */}
          <button
            ref={menuTriggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label="Abrir menu de navegação"
            className="-mr-2 flex size-11 flex-col items-center justify-center gap-[7px] lg:hidden"
          >
            <span aria-hidden className="h-px w-6 bg-ink" />
            <span aria-hidden className="h-px w-4 self-end bg-gold-dark" />
          </button>
        </div>
      </motion.header>

      {/* Menu mobile — overlay full-screen */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-mobile"
            id="menu-mobile"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.4, ease: EASE_LUXE },
            }}
            transition={{ duration: 0.6, ease: EASE_LUXE }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink lg:hidden"
          >
            <div className="container-luxe flex h-20 shrink-0 items-center justify-between">
              <span className="flex flex-col">
                <span className="font-display text-xl font-medium leading-none tracking-tight text-ivory">
                  Fernanda Assunção
                </span>
                <span className="mt-1.5 text-[0.5625rem] font-medium uppercase tracking-luxe text-gold">
                  Advocacia Previdenciária
                </span>
              </span>
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                aria-label="Fechar menu de navegação"
                className="flex size-11 items-center justify-center border border-ivory/20 text-ivory transition-colors duration-500 ease-out-expo hover:border-gold hover:text-gold"
              >
                <X aria-hidden strokeWidth={1.5} className="size-5" />
              </button>
            </div>

            <nav
              aria-label="Navegação principal"
              className="flex flex-1 items-center overflow-y-auto"
            >
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
                  },
                }}
                className="container-luxe w-full space-y-1 py-8"
              >
                {navLinks.map((link, index) => (
                  <motion.li key={link.href} variants={menuItem}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 py-2"
                    >
                      <span
                        aria-hidden
                        className="text-[0.625rem] font-medium tracking-luxe text-gold/70"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-4xl font-light tracking-tight text-ivory transition-colors duration-500 ease-out-expo group-hover:text-gold">
                        {link.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* Contatos — base do overlay */}
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE_LUXE }}
              className="container-luxe shrink-0 border-t border-ivory/10 py-7"
            >
              <ul className="flex flex-col gap-3 text-sm text-ivory/70">
                <li>
                  <a
                    href={telHref}
                    className="inline-flex items-center gap-3 transition-colors duration-500 hover:text-ivory"
                  >
                    <Phone
                      aria-hidden
                      strokeWidth={1.5}
                      className="size-4 text-gold"
                    />
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-3 break-all transition-colors duration-500 hover:text-ivory"
                  >
                    <Mail
                      aria-hidden
                      strokeWidth={1.5}
                      className="size-4 shrink-0 text-gold"
                    />
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram ${siteConfig.instagram} (abre em nova aba)`}
                    className="inline-flex items-center gap-3 transition-colors duration-500 hover:text-ivory"
                  >
                    <Instagram
                      aria-hidden
                      strokeWidth={1.5}
                      className="size-4 text-gold"
                    />
                    {siteConfig.instagram}
                  </a>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
