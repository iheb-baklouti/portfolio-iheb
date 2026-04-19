# Portfolio — Iheb Baklouti

Site vitrine professionnel (full stack & data) construit avec **Next.js 16** (App Router), **Tailwind CSS v4**, **Framer Motion** et **next-themes** (thème clair / sombre).

## Fonctionnalités

- Page unique responsive : accueil, à propos, projets, compétences, contact  
- Contenu piloté par `src/data/cv.ts` (facile à mettre à jour)  
- Photo de profil : `public/portrait.png` (optimisée via `next/image`)  
- Formulaire de contact avec validation (action serveur + ouverture `mailto`)  
- SEO : métadonnées, Open Graph, JSON-LD `Person`

## Prérequis

- [Node.js](https://nodejs.org/) 20+ recommandé  
- npm (fourni avec Node)

## Installation et développement

À la racine de **ce dossier** (`portfolio-iheb`) :

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande      | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production    |
| `npm run start` | Lance le build en local |
| `npm run lint`  | ESLint                   |

## Structure utile

```
portfolio-iheb/
├── public/
│   └── portrait.png          # Photo hero (à remplacer si besoin)
├── src/
│   ├── app/                  # App Router, layout, styles globaux
│   ├── components/           # Sections du portfolio
│   ├── data/
│   │   └── cv.ts             # Textes : profil, expériences, projets, compétences…
│   └── lib/
│       └── motion.ts         # Variantes Framer Motion réutilisables
```

## Modifier le contenu

- **Textes, expériences, projets, compétences** : éditer `src/data/cv.ts`.  
- **Image d’accueil** : remplacer `public/portrait.png` (conserver le nom ou adapter `src/components/hero-section.tsx`).

## Variables d’environnement (optionnel)

Créer `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SITE_URL=https://ton-domaine.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
GMAIL_SMTP_USER=votre.email@gmail.com
GMAIL_SMTP_APP_PASSWORD=xxxx xxxx xxxx xxxx
CONTACT_RECEIVER_EMAIL=iheb.baklouti@polytechnicien.tn
```

- `NEXT_PUBLIC_SITE_URL` : utilisé pour canonical, robots, sitemap, JSON-LD.
- `NEXT_PUBLIC_GA_ID` : active Google Analytics (gtag).
- `GMAIL_SMTP_USER` : adresse Gmail utilisée pour l'envoi SMTP.
- `GMAIL_SMTP_APP_PASSWORD` : mot de passe d'application Google (obligatoire, pas le mot de passe normal).
- `CONTACT_RECEIVER_EMAIL` : adresse qui reçoit les messages du formulaire.

## Déploiement sur Vercel

Si sur **https://iheb-baklouti.vercel.app** (ou ton URL Vercel) tu vois encore la page par défaut *« To get started, edit the page.tsx file »*, le build ne pointe **pas** vers ce projet, mais vers un autre dépôt ou un autre dossier.

### Cas A — Le dépôt Git a `portfolio-iheb` à l’intérieur du repo

Exemple : racine du repo = `Portfolio Iheb/`, et l’app Next est dans `portfolio-iheb/`.

1. Vercel → ton projet → **Settings** → **General**  
2. **Root Directory** : indiquer `portfolio-iheb`  
3. **Save**, puis redéployer (**Deployments** → **⋯** → **Redeploy**)

### Cas B — Le dépôt Git est uniquement le contenu de `portfolio-iheb`

La racine du repo contient déjà `package.json`, `src/`, etc. Dans ce cas, laisser **Root Directory** vide (ou `.`) et vérifier que le bon repo est connecté.

### Vérifications rapides

- Le dépôt lié à Vercel contient bien les dossiers `src/components/`, `src/data/cv.ts`, etc.  
- Après changement du root, un nouveau déploiement doit afficher ton portfolio (hero avec dégradé, sections, photo).

## Licence

Usage personnel pour le portfolio d’Iheb Baklouti.
