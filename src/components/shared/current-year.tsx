"use client";

import { useEffect, useState } from "react";

/**
 * Renderiza o ano corrente atualizado no cliente. Numa página estática,
 * `new Date()` no servidor congelaria o ano no momento do build — aqui o
 * `fallback` (ano de lançamento) é corrigido para o ano real após montar.
 */
export function CurrentYear({ fallback }: { fallback: number }) {
  const [year, setYear] = useState(fallback);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}
