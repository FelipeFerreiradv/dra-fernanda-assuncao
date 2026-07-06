import type Lenis from "lenis";

/**
 * Singleton de módulo com a instância ativa do Lenis, para que componentes
 * fora do provider (ex.: menu mobile) possam pausar/retomar o smooth scroll.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis(): Lenis | null {
  return instance;
}
