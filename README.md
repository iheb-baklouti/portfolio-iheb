# Portfolio — Iheb Baklouti

Site vitrine professionnel (full stack & data) construit avec **Next.js 16** (App Router), **Tailwind CSS v4**, **Framer Motion** et **next-themes**.

Bilingue **FR / EN**, thème clair / sombre, animations pilotées au scroll, et contenu entièrement centralisé dans un seul fichier.

## Fonctionnalités

- **Bilingue** : routes `/fr` et `/en`, détection automatique de la langue du navigateur (`src/proxy.ts`), choix mémorisé en cookie
- **Page unique responsive** : accueil, à propos, projets, compétences, contact
- **Interactions** : barre de progression de lecture, nav avec section active, timeline animée au scroll, filtres de projets, onglets parcours, boutons magnétiques, cartes 3D, marquee de technologies, compteurs animés
- **Thème clair / sombre** avec transition via la View Transitions API (là où le navigateur la supporte)
- **Accessibilité** : lien d'évitement, `aria-*` sur les contrôles, respect de `prefers-reduced-motion`
- **SEO** : métadonnées par langue, `hreflang`, canonical, JSON-LD (`Person` + `ProfilePage` + `WebSite`), sitemap, robots, manifest
- **Image Open Graph générée** par langue (`src/app/[locale]/opengraph-image.tsx`)
- **Formulaire de contact** : server action, validation, anti-spam (honeypot + délai + rate limit), envoi SMTP Gmail

## Prérequis

- [Node.js](https://nodejs.org/) 20+ recommandé
- npm (fourni avec Node)

## Installation et développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) — la racine redirige vers `/fr` ou `/en` selon le navigateur.

## Scripts

| Commande        | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Serveur de développement |
| `npm run build` | Build de production      |
| `npm run start` | Lance le build en local  |
| `npm run lint`  | ESLint                   |

## Structure

```
portfolio-iheb/
├── public/
│   └── portrait.png                 # Photo hero
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx           # Layout racine (<html lang>), métadonnées, header/footer
│   │   │   ├── page.tsx             # Assemblage des sections
│   │   │   └── opengraph-image.tsx  # Image sociale générée
│   │   ├── actions/contact.ts       # Server action du formulaire
│   │   ├── globals.css              # Design system (tokens, utilitaires, keyframes)
│   │   ├── manifest.ts, robots.ts, sitemap.ts
│   │   └── providers.tsx            # next-themes + MotionConfig
│   ├── components/
│   │   ├── *-section.tsx            # Sections du portfolio
│   │   └── ui/                      # Primitives réutilisables (tilt, magnetic, marquee…)
│   ├── data/
│   │   └── portfolio-content.ts     # ⭐ Tout le contenu FR + EN
│   ├── hooks/                       # useActiveSection, useMounted
│   ├── i18n/config.ts               # Locales + négociation Accept-Language
│   ├── lib/                         # Variantes Motion, helpers cookies
│   └── proxy.ts                     # Redirection de langue (ex-middleware)
```

## Modifier le contenu

Tout passe par **`src/data/portfolio-content.ts`** : profil, expériences, formation, stages, bénévolat, projets, compétences et libellés d'interface — en français et en anglais.

Les chiffres du hero (années d'expérience, nombre de projets, technologies, stages) sont **calculés** à partir de ces données : pas besoin de les maintenir à la main. La page est revalidée toutes les 24 h pour que le compteur d'années reste juste.

- **Image d'accueil** : remplacer `public/portrait.png`
- **Couleurs et rayons** : les tokens en haut de `src/app/globals.css`

## Variables d'environnement

Créer `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SITE_URL=https://ton-domaine.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
GMAIL_SMTP_USER=votre.email@gmail.com
GMAIL_SMTP_APP_PASSWORD=xxxx xxxx xxxx xxxx
CONTACT_RECEIVER_EMAIL=iheb.baklouti@polytechnicien.tn
ALLOWED_ORIGIN=https://ton-domaine.com
```

- `NEXT_PUBLIC_SITE_URL` : utilisé pour canonical, robots, sitemap, JSON-LD et images OG.
- `NEXT_PUBLIC_GA_ID` : active Google Analytics (gtag). Optionnel.
- `GMAIL_SMTP_USER` / `GMAIL_SMTP_APP_PASSWORD` : compte d'envoi SMTP. Le mot de passe doit être un **mot de passe d'application** Google, pas le mot de passe du compte.
- `CONTACT_RECEIVER_EMAIL` : adresse qui reçoit les messages du formulaire.
- `ALLOWED_ORIGIN` : origine attendue des soumissions du formulaire. Optionnel (déduit des en-têtes sinon).

Sans `GMAIL_SMTP_USER` / `GMAIL_SMTP_APP_PASSWORD`, le formulaire s'affiche normalement mais renvoie un message d'erreur de configuration à l'envoi.

## Déploiement sur Vercel

Si la page par défaut *« To get started, edit the page.tsx file »* s'affiche encore, le build ne pointe pas vers ce dossier.

### Cas A — `portfolio-iheb` est un sous-dossier du dépôt

1. Vercel → projet → **Settings** → **General**
2. **Root Directory** : `portfolio-iheb`
3. **Save**, puis **Deployments** → **⋯** → **Redeploy**

### Cas B — Le dépôt contient directement le contenu de `portfolio-iheb`

Laisser **Root Directory** vide (ou `.`) et vérifier que le bon dépôt est connecté.

Penser à renseigner les variables d'environnement ci-dessus dans **Settings → Environment Variables**.

## Licence

Usage personnel pour le portfolio d'Iheb Baklouti.
