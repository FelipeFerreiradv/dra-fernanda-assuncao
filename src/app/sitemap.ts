import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Data da última alteração real de conteúdo — atualize junto com mudanças
 * de copy. Evita um lastmod novo a cada build (que o Google ignora).
 */
const LAST_CONTENT_UPDATE = "2026-07-03";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
