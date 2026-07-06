# Landing Page — Dra. Fernanda Assunção

Landing page premium para advogada previdenciária (aposentadoria negada pelo INSS,
aposentadoria especial e BPC/LOAS), construída dentro do Provimento nº 205/2021 da OAB.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens de design em `src/app/globals.css` via `@theme`)
- **Framer Motion 12** (reveals, parallax, microinterações) + **Lenis** (smooth scroll)
- **Embla Carousel** (depoimentos) · **React Hook Form + Zod** (formulário)
- Componentes no padrão **shadcn/ui** (`src/components/ui`)
- SEO: Metadata API, JSON-LD (`LegalService`, `Attorney`, `FAQPage`), sitemap, robots, OG image

## Rodando

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # build de produção
```

## Onde editar

| O quê | Onde |
|---|---|
| **Toda a copy** (títulos, cards, FAQ, depoimentos) | `src/lib/data.ts` |
| Contatos, endereço, links, WhatsApp | `src/lib/site-config.ts` |
| Cores, fontes, espaçamentos | `src/app/globals.css` (`@theme`) |
| Schemas JSON-LD | `src/lib/schema.ts` |
| Metadata / title / description | `src/app/layout.tsx` |

> ⚠️ A copy segue o Provimento nº 205/2021 da OAB (sem promessa de resultado,
> sem urgência artificial, sem "consulta grátis"). Não altere textos sem revisão jurídica.
> Os depoimentos em `data.ts` são modelos — troque pelos reais **com consentimento**
> e falando apenas da experiência de atendimento (nunca de resultado/valores).

## Trocando as fotos da Dra. Fernanda

O site **já aponta** para os arquivos finais — hoje eles são placeholders quentes
gerados. Basta **substituir os dois arquivos** (mesmos nomes, sem mexer em código):

1. **Hero** — `public/images/fernanda-hero.jpg` (retrato, ~1200×1500, proporção 4:5).
   Sugestão: a foto de tom mais caloroso/próximo.
2. **Sobre** — `public/images/fernanda-retrato.jpg` (retrato, ~900×1200, proporção 3:4).
   Sugestão: a foto mais formal/autoritária (com a estante ao fundo).
3. Os `alt` já estão corretos (definidos em `src/lib/data.ts`).

> As fotos recebem um tratamento editorial quente automático (leve tom dourado +
> vinheta) para casar com a paleta. Se quiser removê-lo, edite os overlays em
> `hero.tsx` / `about.tsx` (divs `mix-blend-multiply` sobre a `<Image>`).

> **Áreas de atuação (opcional):** os 3 cards são hoje tipográficos/ícones (estética
> minimalista). `areasSection.items[].alt` em `data.ts` já traz alts ricos em
> palavras-chave, prontos para quando/se você adicionar imagens ilustrativas a esses
> cards em `src/components/sections/practice-areas.tsx`.

## Estrutura

```
src/
  app/            layout (fontes, metadata, JSON-LD), page, globals.css, sitemap, robots
  components/
    layout/       header, footer, botão flutuante do WhatsApp
    sections/     hero, dores, áreas, sobre, processo, atendimento, depoimentos, faq, cta final
    shared/       section-heading, whatsapp-cta, contact-form
    motion/       reveal, text-reveal, stagger, parallax, scroll-progress
    ui/           button, accordion, input, textarea, label, sonner (padrão shadcn)
    providers/    smooth-scroll (Lenis)
  lib/            data (copy), site-config, schema (JSON-LD), utils
```
