# Orange Decibel — odb-new-v1

Website for **Orange Decibel**, a High-End Sound System designed in France,
based in Paris & Milan — sound systems and sonic identity for musical and
cultural events: brand activations, festivals & lives, listening sessions,
film shoots.

**Live site (beta)**: <https://enor75.github.io/odb-new-v1/> ·
[Documentation en français](./README-fr.md)

Redesign of [orangedecibel.com](https://www.orangedecibel.com/) — **dark
editorial** direction: brown/cream/orange `#E36631`, Fraunces serif, film
grain, minimalist structure.

## Stack

Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui + React Router +
Supabase. Compatible with the **Lovable** editor/preview and any standard
Vite tooling.

## Pages

| Route | Status | Content |
|---|---|---|
| `/` | **production** | Full-screen video hero · Philosophy (3 paragraphs) · wall of 18 partner brands · ticker · CTA |
| `/activity` | **production** | The 4 activities showcase — centered hairline grid (Brand events · Festivals & lives · Listening · Filming), ↓ arrows → "stacking cards" extension of sub-types + photo carousel; mobile: examples + horizontally scrolling photos |
| `/custom` | **production** | Custom build journey · 3-column article · 4-speaker carousel (spec sheets, edge arrows) |
| `/about` | **production** | Sébastien's bio · The system (3 pillars) · CTA · "Moments" polaroids |
| `/contact` | **production** | France/Italia emails · multi-step "Estimate my event" estimator · contact form (Supabase) |
| `/custom-2`, `/activity-2`, `/about-2` | **test — remove before production** | Layout experimentation pages (6-phase journey, layout propositions) |

Full EN/FR/IT i18n (`src/contexts/LanguageContext.tsx`), single-line footer
(© · Instagram — IT · Instagram — FR · LinkedIn · Designed in France).

## Development

```bash
npm install
npm run dev         # http://localhost:8080 (or 5173)
npm run build       # production build
npm run build:pages # GitHub Pages build (base /odb-new-v1/ + 404.html)
```

### Environment variables

The contact form requires a Supabase project. Create a `.env.local` file
(not versioned):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...
```

Also deploy the `send-contact-email` edge function on the Supabase side. The
publishable key is public by design — security relies on Row Level Security
and the edge function.

## GitHub Pages deployment

- **`main`** = source code (this branch).
- **`gh-pages`** = generated static build (`npm run build:pages`, then push
  the contents of `dist/`) — this is what the enor75.github.io URL serves.
  The `BrowserRouter` uses `basename={import.meta.env.BASE_URL}` so deep
  links work under `/odb-new-v1/`.

## Design notes (summary)

- Brown background `hsl(25 16% 17%)`, cream, **ODB orange `#E36631`** (primary).
- Fraunces serif titles (light), thin sans-serif body, spaced mono labels —
  typography mode 4 · Fraunces + Inter (+ Source Code Pro).
- Film grain on images + animated newformcap grain on mobile menus.
- "Contact us" button follows the same rhythm on every page (64-85px below
  the last block); cream-themed scrollbar, no horizontal overflow.
- **Temporary** floating selectors (background, typography, ANUC header) and
  a test-boxes column: remove before going to production.

## Assets & media

Client photos in `src/assets/` (shared pool `src/data/sectionPhotos.ts` for
Activity), hero video in `public/videos/`, partner logos in
`src/assets/logos/`. Remaining empty slots: Filming photos (3), Custom
tiles, definitive portrait, polaroids — convention: thin cross + "Photo to
come".

---

© Orange Decibel — internal code, do not redistribute.
