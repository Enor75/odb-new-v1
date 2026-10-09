# Orange Decibel — odb-new-v1

Site vitrine d'**Orange Decibel**, High-End Sound System conçu en France, basé à
Paris & Milan — sonorisation et identité sonore pour événements musicaux et
culturels : activations de marque, festivals & lives, listening, tournage vidéo.

**Site en ligne (beta)** : <https://enor75.github.io/odb-new-v1/>

Refonte du site [orangedecibel.com](https://www.orangedecibel.com/) — direction
**éditorial sombre** : brun/crème/orange `#E36631`, serif Fraunces, grain film,
structure minimaliste.

## Stack

Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui + React Router +
Supabase. Compatible éditeur/preview **Lovable** et tout outil Vite standard.

## Pages

| Route | Rôle | Contenu |
|---|---|---|
| `/` | **production** | Hero vidéo plein écran · Philosophy (3 ¶) · mur de 18 marques partenaires · ticker · CTA |
| `/activity` | **production** | Vitrine des 4 activités — grille à filets centrée (Brand events · Festivals & lives · Listening · Tournage), flèches ↓ → extension « stacking cards » des déclinaisons + carrousel ; mobile : exemples + photos en scroll horizontal |
| `/custom` | **production** | Parcours sur mesure · article 3 colonnes · carrousel des 4 enceintes (fiches specs, flèches aux bords) |
| `/about` | **production** | Bio Sébastien · The system (3 piliers) · CTA · polaroids « Moments » |
| `/contact` | **production** | Emails France/Italia · estimateur multi-étapes « Estimate my event » · formulaire (Supabase) |
| `/custom-2`, `/activity-2`, `/about-2` | **test — à supprimer en prod** | Bancs d'essai de présentations (parcours 6 phases, propositions de layouts) |

Header EN/FR/IT complet (`src/contexts/LanguageContext.tsx`), footer une ligne
(© · Instagram — IT · Instagram — FR · LinkedIn · Designed in France).

## Développement

```bash
npm install
npm run dev        # http://localhost:8080 (ou 5173)
npm run build      # build production
npm run build:pages # build GitHub Pages (base /odb-new-v1/ + 404.html)
```

### Variables d'environnement

Le formulaire de contact nécessite un projet Supabase. Créer `.env.local`
(non versionné) :

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...
```

Et déployer l'edge function `send-contact-email` côté Supabase. La clé
publishable est publique par design — la sécurité repose sur les RLS et
l'edge function.

## Déploiement GitHub Pages

- **`main`** = code source (cette branche).
- **`gh-pages`** = build statique généré (`npm run build:pages` puis push du
  contenu de `dist/`) — c'est lui que sert l'URL enor75.github.io. Le
  `BrowserRouter` utilise `basename={import.meta.env.BASE_URL}` pour que les
  routes profondes fonctionnent sous `/odb-new-v1/`.

## Notes design (résumé)

- Fond brun `hsl(25 16% 17%)`, crème, **orange ODB `#E36631`** (primaire).
- Titres Fraunces (serif light), corps sans-serif fin, labels mono espacés —
  mode typo 4 · Fraunces + Inter (+ Source Code Pro).
- Grain film sur les images + grain animé newformcap sur les menus mobiles.
- Bouton « Contact us » au même gabarit sur toutes les pages (64-85px sous le
  dernier bloc) ; scrollbar thématisée crème, aucun débordement horizontal.
- Sélecteurs flottants **temporaires** (fond, typo, header ANUC) + colonne de
  box de test : à retirer avant la mise en production.

## Assets & médias

Photos client dans `src/assets/` (pool partagé `src/data/sectionPhotos.ts`
pour Activity), vidéo hero dans `public/videos/`, logos partenaires dans
`src/assets/logos/`. Emplacements vides restants : photos Tournage (3),
tuiles Custom, portrait définitif, polaroids — convention croix fine +
« Photo to come ».

---

© Orange Decibel — code interne, ne pas redistribuer.
