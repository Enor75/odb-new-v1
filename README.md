# Orange Décibel — Nouveau site (stack Lovable)

Refonte du site [orangedecibel.com](https://www.orangedecibel.com/) :
**éditorial sombre** — identité de l'ancien site (bois sombre, crème, orange #E36A2E)
× structure minimaliste de [garciamateo.com](https://www.garciamateo.com/),
mur de marques partenaires inspiré de [hstories.fr](https://www.hstories.fr/).

**Stack Lovable standard, inchangée** : Vite + React 18 + TypeScript + Tailwind CSS +
shadcn/ui + React Router + TanStack Query + Supabase. Directement compatible avec
l'éditeur et la preview Lovable.

## Décisions design (verrouillées)

- **Direction** : éditorial sombre (fond bois marron moyen `--background: 25 16% 17%`,
  crème, orange #E36A2E) + **grain** : fond global statique très léger
  (`body::before`, opacité 0.06) et **grain film animé sur les images**
  (`.film-grain`, opacité 0.10, 10 sauts/s — réplique de l'effet "Film Grain"
  Squarespace de garciamateo.com). Tout vit dans `src/index.css`,
  respecte `prefers-reduced-motion`, structure
  minimaliste façon garciamateo.
- **Typographie** : Fraunces (serif léger) pour les titres en taille modérée,
  Archivo fine pour le corps et les labels majuscules espacées. Pas de grosse
  typo display.
- **Hero** : image nue plein écran + micro-légende + indicateur de scroll.
  Photo actuelle : `modular-1.jpeg` (en attente d'une photo plus claire/lumineuse).
- **Rythme & espacement** (pack « modéré », façon garciamateo) : sections home
  `py-16/24/28` (au lieu de 24/36/44), marges internes resserrées
  (`mt-6`/`mb-8-10`), entrées de page `pt-24/28`, footer `py-10/12`,
  mur de logos `gap-y-10/12` — la home tient en ~4 écrans. Conteneur
  global **`max-w-[1200px]`** ( magazine serré). Mesuré : aucune traversée
  de vide supérieure à un demi-écran.
- **Home** : hero → déclaration serif → **4 activités en grille collée façon
  Friendly Pressure** (images carrées serrées, filets 1px ; au survol : cercle
  overlay crème, swap d'image sur les blocs 2 et 4, fiche polaroid crème qui
  se déplie sous l'image — 96px, 250ms) → aperçu galerie →
  **mur de marques en bas** → footer.
- **Page /custom** : intro magazine (3 colonnes façon Stone Acoustic
  « Concepteurs ») → 3 blocs Matériaux/Design/Système son (fiche polaroid
  au survol, sans cercle) → carnet de caractéristiques (specs aux lignes
  épaisses + 2 encarts images en attente).
- **Ticker** : un seul, en bas de page au-dessus du footer (toutes les pages),
  séparateurs orange discrets.
- **Animations** : AUCUNE animation au scroll sur la home (par convention) ;
  apparitions au scroll sur galerie / philosophie / contact via `Reveal`.
  Hovers sophistiqués partout (zoom lents, flèches qui glissent, accents orange).
- **Galerie** : grille épurée 2 colonnes alignées (ratio 4/5, images
  panoramiques 21/9 en rupture) + **carrousel de polaroids épinglé** au
  milieu de page (350vh, éventail façon Monolith) + **lightbox plein écran**
  (flèches, clavier, Échap, compteur).
- **Page /about** : portrait + bio de Sébastien, puis carrousel horizontal
  « Selected Work » épinglé (scroll vertical → rail d'images, façon
  Editorial Portfolio).
- **Langues** : EN par défaut / FR / IT (mémorisé en localStorage).

## Structure

```
src/
├── pages/
│   ├── Index.tsx        → Home (hero, déclaration, activités, aperçu galerie, marques)
│   ├── Gallery.tsx      → Grille 2 col. alignée + carrousel polaroids + lightbox
│   ├── Custom.tsx       → Sur mesure : magazine + 3 blocs + caractéristiques
│   ├── Philosophy.tsx   → Manifeste + 3 piliers (Handcrafted / Precision / Modularity)
│   ├── About.tsx        → Bio Sébastien + carrousel « Selected Work »
│   ├── Contact.tsx      → Formulaire d'abord + estimateur dépliable
│   └── NotFound.tsx     → 404
├── components/
│   ├── Header.tsx       → Header fixe + nav + switcher de langue + menu mobile
│   ├── Ticker.tsx       → Bandeau défilant (bas de page uniquement)
│   ├── PartnerLogos.tsx → Mur de logos partenaires
│   ├── ContactForm.tsx  → Formulaire branché sur l'Edge Function Supabase
│   ├── Estimator.tsx    → Estimateur 5 étapes (accordéon, 7 types d'événement)
│   ├── PolaroidCarousel.tsx → Carrousel polaroids épinglé (galerie)
│   └── WorkCarousel.tsx → Rail horizontal épinglé (about)
│   ├── Reveal.tsx       → Apparition au scroll (INTERDIT sur la home, par convention)
│   ├── Footer.tsx       → Ticker + wordmark serif + réseaux + mentions
│   └── ScrollToTop.tsx
├── config/
│   └── partners.ts      → ⚠️ Liste PLACEHOLDER des marques partenaires (à remplacer)
├── contexts/
│   └── LanguageContext.tsx → Toutes les traductions (EN / FR / IT)
└── integrations/supabase/ → Client Supabase (ne pas modifier)
```

## Développement local

```bash
npm install
npm run dev        # → http://localhost:8080
```

Le fichier `.env.local` contient des placeholders (jamais de vraies clés dans le
repo). Pour tester le formulaire en local, remplace les valeurs par les vraies
(onglet **Cloud** du projet Lovable, ou réglages Supabase) :

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

## À personnaliser (en attente)

1. **Marques partenaires** : 15 logos intégrés (UGG, Dr. Martens, Nike,
   Salomon, Super Bock — roundel vectoriel, Netflix, Block Party,
   Halfpipe Records, Hors Sol, Loophole, Like Fire, Dissidence
   Production, Provoke Lab, Dock B, 6B Paris — PNG transparents
   recolorisés crème dans `src/assets/logos/`). 2 structures en wordmark
   typographique en attendant leurs logos officiels : Urban Outfighter,
   Vibrason — déposer les fichiers dans `src/assets/logos/` et compléter
   `logoFiles` dans `src/components/PartnerLogos.tsx`. Tailles spécifiques
   via `imgClass` dans `src/config/partners.ts`.
2. **Tarifs du calculateur** : ⚠️ les valeurs de `src/config/pricing.ts` sont des
   PLACEHOLDERS en € (bases par type d'événement, multiplicateurs durée/audience,
   transports, options). À ajuster aux vrais tarifs Orange Décibel.
3. **Légendes galerie** : placeholders EN dans `src/pages/Gallery.tsx`
   (tableau `photos`) — à remplacer par les vraies descriptions.
4. **Photos** : nouvelles photos à ajouter dans `src/assets/` (hero actuel :
   `modular-1.jpeg`, la plus claire du set avec `hero-main`).

## Page contact — formulaire d'abord, estimateur dépliable

- **Titre « Contact »** + lien « Estimer mon événement » (accordéon) ; une fois
  ouvert : « Tell us about your event. » puis directement les 5 étapes.
- **Estimateur multi-étapes** (`src/components/Estimator.tsx`) : 7 types
  d'événement (Festival, DJ set/live, Corporate, Scène live, Acoustique/groupe,
  Listening, Autre) → durée → audience → lieu → options → fourchette (±20 %).
  Placeholders beta dans `src/config/pricing.ts`. Le bouton final
  « Demander un devis précis » replie l'accordéon et injecte l'estimation dans
  le formulaire (incluse dans l'email).
- **Coordonnées** : Email — France (orangedecibel@gmail.com) et Email — Italia
  (orangedecibelita@gmail.com), réseaux, « Based in Paris & Milan — Designed
  in France ».
- **Formulaire avancé** (`src/components/ContactForm.tsx`) : nom, email, téléphone,
  date d'événement, lieu, audience, type, budget + message.
- **Edge Function** (`supabase/functions/send-contact-email/index.ts`) : mise à
  jour pour inclure tous les champs + bloc estimation dans l'email (Resend →
  orangedecibelita@gmail.com). Après le ship, vérifier dans Lovable que la
  fonction est bien redéployée à jour.
- **Typographie** : Fraunces (titres) + Archivo (corps) + **Source Code Pro**
  (labels, kickers, captions, ticker, calculateur — l'ADN monospace de
  garciamateo.com).

## Ship vers Lovable

1. Sur [lovable.dev](https://lovable.dev), créer un **nouveau projet** avec un prompt
   minimal (ex. *« create a blank page saying hello »*).
2. **Project settings → Git → GitHub** : connecter un compte → Lovable crée un repo
   privé.
3. Cloner le repo créé par Lovable, puis remplacer son contenu par ce code :

   ```bash
   git clone <url-du-repo-lovable> odb-lovable
   cd odb-lovable
   # supprimer tout sauf .git, copier le contenu de site-odb-new ici
   git add -A
   git commit -m "Nouveau site Orange Décibel — refonte éditoriale sombre"
   git push origin main
   ```

   (Ou depuis ce dossier : `git init`, commit initial, puis
   `git remote add lovable <url>` et `git push lovable main --force`.)

4. Si la synchro ne se déclenche pas :
   `git commit --allow-empty -m "Trigger sync" && git push`.
5. Dans Lovable, connecter le **même projet Supabase** que l'ancien site (l'Edge
   Function `send-contact-email` et les secrets suivent). Sinon, ajouter
   `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` dans **Cloud → Secrets**.
6. **Publish**. Le domaine custom se gère dans les réglages du projet.

## Notes techniques

- L'Edge Function `supabase/functions/send-contact-email` envoie les messages via
  Resend (secret `RESEND_API_KEY` côté Supabase) vers orangedecibelita@gmail.com.
  Aucun changement nécessaire si le même Supabase est reconnecté.
- `lovable-tagger` est actif en mode development uniquement (tags d'édition
  visuelle dans Lovable) — ne pas retirer.
- Le lightbox respecte `prefers-reduced-motion` et verrouille le scroll.

## Déploiement beta — GitHub Pages

- Repo : https://github.com/Enor75/odb-new-v1 (public)
- Site beta : https://enor75.github.io/odb-new-v1/
- Build : `npm run build:pages` (base `/odb-new-v1/` + fallback `dist/404.html`
  pour le routage SPA au rafraîchissement des pages internes)
- Publication : source poussé sur `main` ; build poussé sur la branche
  `gh-pages` (source configurée dans Settings → Pages)
- Le lancement final sur Lovable utilisera `npm run build` (base `/`)
