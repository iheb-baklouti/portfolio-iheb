import { type Locale } from "@/i18n/config";

type Profile = {
  name: string;
  title: string;
  headline: string;
  /** Short role words cycled in the hero. Each one is backed by the CV. */
  roles: string[];
  slogan: string;
  /**
   * Search-engine-facing description (meta description, Open Graph, JSON-LD).
   * Kept separate from `slogan` on purpose: the hero paragraph is written for
   * a human reader, this one is written for the terms a prospective client
   * actually types into Google ("développeur freelance", stack names,
   * availability) — the two don't need to read the same way.
   */
  metaDescription: string;
  bio: string;
  availability: string;
  location: string;
  contact: {
    phone: string;
    email: string;
    linkedin: string;
  };
  languages: Array<{ name: string; level: string }>;
};

type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  current: boolean;
};

type Education = { degree: string; school: string; period: string };
type Volunteering = { org: string; role: string; period: string };
type Internship = { title: string; org: string; period: string; stack: string[] };

export type ProjectCategory = "product" | "data" | "business" | "mobile";

type Project = {
  name: string;
  client: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  year: string;
  featured: boolean;
};

type SkillGroup = { title: string; items: string[] };
type FaqItem = { question: string; answer: string };

type Labels = {
  nav: { home: string; about: string; projects: string; skills: string; faq: string; contact: string };
  localeName: { fr: string; en: string };
  a11y: {
    toggleTheme: string;
    toggleMenu: string;
    backToTop: string;
    switchLanguage: string;
    skipToContent: string;
    scrollHint: string;
  };
  hero: {
    contactCta: string;
    projectsCta: string;
    rolePrefix: string;
  };
  stats: {
    experience: string;
    experienceSuffix: string;
    projects: string;
    technologies: string;
    internships: string;
  };
  about: {
    title: string;
    subtitle: string;
    intro: string;
    experienceTitle: string;
    educationTitle: string;
    internshipsTitle: string;
    volunteeringTitle: string;
    languagesTitle: string;
    present: string;
  };
  projects: {
    title: string;
    heading: string;
    subtitle: string;
    featured: string;
    all: string;
    categories: Record<ProjectCategory, string>;
    empty: string;
  };
  skills: { title: string; heading: string; subtitle: string; marqueeLabel: string };
  faq: { title: string; heading: string; subtitle: string };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    responseTime: string;
    charactersLeft: string;
  };
  footer: { tagline: string; nav: string; elsewhere: string; builtWith: string };
};

export type PortfolioContent = {
  profile: Profile;
  experiences: Experience[];
  education: Education[];
  volunteering: Volunteering[];
  internships: Internship[];
  projects: Project[];
  skillGroups: SkillGroup[];
  faq: FaqItem[];
  labels: Labels;
};

const sharedContact = {
  phone: "+216 22 868 180",
  email: "iheb.baklouti@polytechnicien.tn",
  linkedin: "https://www.linkedin.com/in/iheb-baklouti/",
};

/** First month of professional (non-internship) experience — used for the live counter. */
export const CAREER_START = new Date("2022-09-01T00:00:00Z");

const fr: PortfolioContent = {
  profile: {
    name: "Iheb Baklouti",
    title: "Ingénieur génie informatique",
    headline: "Développeur Full Stack & Data",
    roles: [
      "Développeur Full Stack",
      "Ingénieur Data & ETL",
      "React / Next.js",
      "PHP / Symfony",
      "Intégration & API",
    ],
    slogan:
      "Je conçois des applications web robustes et des pipelines de données fiables, du produit jusqu'à l'industrialisation.",
    metaDescription:
      "Développeur Full Stack & Data freelance (React, Next.js, PHP/Symfony, ETL/Talend). Disponible pour missions courtes ou longues, remote ou hybride.",
    bio: "Ingénieur en génie informatique, je combine développement applicatif (PHP, React, APIs) et projets data : collecte, transformation, traitement des données, outils intranet et intégrations (Talend, passerelles d'import/export).",
    availability: "Disponible pour des missions freelance — court ou long terme, en remote ou hybride.",
    location: "Tunisie · Remote / hybride",
    contact: sharedContact,
    languages: [
      { name: "Français", level: "Diplôme DELF B2" },
      { name: "Anglais", level: "Niveau B2" },
    ],
  },
  experiences: [
    {
      company: "La Boîte Immo",
      role: "Développeur Full Stack & Data",
      period: "Septembre 2023 — présent",
      current: true,
      summary:
        "Participation à la refonte majeure de Hektor, logiciel leader des agences immobilières indépendantes. J'ai rejoint l'équipe data au sein de la même entreprise : développement orienté données, intégration et industrialisation.",
      highlights: [
        "Refonte et modernisation d'une application legacy (React, Tailwind, PHP).",
        "Développement de fonctionnalités métier, collaboration Agile (Scrum, Jira).",
        "API GraphQL, qualité de code et revues (Git, Bitbucket, Figma).",
        "Projets data : récupération, transformation et traitement des données.",
        "Participation au développement d'outils intranet.",
        "Utilisation de Talend, configuration et mise en place de passerelles d'import et d'export.",
      ],
      stack: ["React", "Tailwind CSS", "PHP", "GraphQL", "Git", "Bitbucket", "Figma", "Jira", "Talend"],
    },
    {
      company: "GCS",
      role: "Développeur Full Stack PHP",
      period: "Septembre 2022 — Octobre 2023",
      current: false,
      summary: "Développement d'applications métiers complètes : RH, marketing et supervision temps réel.",
      highlights: [
        "Application RH : employés, recrutement, congés, présences, performances.",
        "Système de landing pages (Laravel) : pages tarifaires dynamiques, responsive, analytics.",
        "Dashboard admin pour application de chat privé : stats, logging, rapports, WebSocket.",
      ],
      stack: ["Symfony", "Laravel", "Angular", "API Platform", "WebSocket", "MySQL"],
    },
  ],
  education: [
    {
      degree: "Diplôme national d'ingénieur en génie informatique",
      school: "École Polytechnique Sousse",
      period: "Septembre 2019 — Juin 2022",
    },
    {
      degree: "Licence fondamentale en électronique, électrotechnique et automatique",
      school: "ISSAT Kairouan",
      period: "Septembre 2016 — Juin 2019",
    },
    {
      degree: "Baccalauréat sciences techniques",
      school: "Lycée Dar Lamen",
      period: "2016",
    },
  ],
  volunteering: [
    { org: "Club DSC Polytechnique", role: "Responsable logistique", period: "Octobre 2020 — Mai 2021" },
    { org: "Club Microsoft Polytechnique", role: "Responsable logistique", period: "Octobre 2019 — Mai 2020" },
    { org: "Club Google EPS", role: "Responsable média", period: "Octobre 2019 — Mai 2020" },
  ],
  internships: [
    {
      title: "Stage fin d'études — plateforme web & mobile location de voitures",
      org: "ETC Tunisie",
      period: "Février 2022 — Juin 2022",
      stack: ["Symfony", "Angular", "Ionic", "MySQL"],
    },
    { title: "Stage — automatisation des e-mails", org: "SDI", period: "Septembre 2021", stack: ["Symfony", "MySQL"] },
    {
      title: "Stage — gestion des stagiaires",
      org: "ITGate groupe",
      period: "Juillet 2021",
      stack: ["Spring Boot", "Angular", "MongoDB"],
    },
    {
      title: "Stage — application mobile agences de voyage (front)",
      org: "Media Web Service",
      period: "Septembre 2020",
      stack: ["Ionic 5", "MySQL"],
    },
    { title: "Stage — gestion documentaire", org: "SDI", period: "Août 2020", stack: ["Symfony 5", "MySQL"] },
  ],
  projects: [
    {
      name: "Hektor — refonte produit",
      client: "La Boîte Immo",
      category: "product",
      year: "2023 — présent",
      description:
        "Participation à la refonte majeure du logiciel phare des agences immobilières indépendantes : modernisation legacy, nouvelles fonctionnalités, qualité UX.",
      tags: ["React", "Tailwind CSS", "PHP", "GraphQL", "Agile"],
      featured: true,
    },
    {
      name: "Pipelines & intégration data",
      client: "La Boîte Immo — équipe Data",
      category: "data",
      year: "2023 — présent",
      description:
        "Récupération, transformation et traitement des données ; Talend ; passerelles d'import/export ; contribution aux outils intranet.",
      tags: ["Talend", "ETL", "Intégration", "Intranet"],
      featured: true,
    },
    {
      name: "Application RH complète",
      client: "GCS",
      category: "business",
      year: "2022 — 2023",
      description: "Couverture du cycle RH : employés, recrutement, congés, présences et suivi des performances.",
      tags: ["Symfony", "Angular", "MySQL"],
      featured: true,
    },
    {
      name: "Système de landing pages",
      client: "GCS",
      category: "product",
      year: "2022 — 2023",
      description: "Landing pages orientées conversion : tarification dynamique, responsive, suivi et analyse.",
      tags: ["Laravel", "Marketing", "Analytics"],
      featured: false,
    },
    {
      name: "Dashboard admin — chat privé",
      client: "GCS",
      category: "data",
      year: "2022 — 2023",
      description: "Supervision avancée : statistiques, logging, rapports de vente, monitoring temps réel.",
      tags: ["Symfony", "API Platform", "Angular", "WebSocket"],
      featured: false,
    },
    {
      name: "Plateforme location de véhicules",
      client: "ETC Tunisie (stage PFE)",
      category: "mobile",
      year: "2022",
      description: "Plateforme web et application mobile de gestion de location.",
      tags: ["Symfony", "Angular", "Ionic", "MySQL"],
      featured: false,
    },
  ],
  skillGroups: [
    { title: "Langages & runtimes", items: ["Java / JEE", "PHP", "JavaScript / TypeScript"] },
    { title: "Front-end", items: ["React", "Angular", "Tailwind CSS"] },
    { title: "Back-end & APIs", items: ["Symfony", "Laravel", "API Platform", "GraphQL", "REST"] },
    { title: "Bases de données", items: ["MySQL", "MongoDB", "Firebase"] },
    { title: "Data & BI", items: ["Talend", "ETL / intégration", "Passerelles import-export", "Power BI"] },
    { title: "Outils & méthodes", items: ["Git", "UML", "Agile / Scrum", "Jira", "Figma", "Photoshop"] },
  ],
  faq: [
    {
      question: "Es-tu disponible actuellement pour une mission freelance ?",
      answer:
        "Oui, je suis disponible pour des missions freelance — courtes ou longues, en remote ou en hybride.",
    },
    {
      question: "Quelles technologies maîtrises-tu ?",
      answer:
        "Principalement React, Next.js, Angular et Tailwind CSS côté front, PHP (Symfony, Laravel) et GraphQL côté back, et Talend / ETL pour la partie data et intégration.",
    },
    {
      question: "Peux-tu intervenir sur des missions ponctuelles ou seulement des contrats longs ?",
      answer: "Les deux : une intervention ponctuelle ou un engagement plus long, selon les besoins du projet.",
    },
    {
      question: "Sous combien de temps réponds-tu à une demande ?",
      answer: "En général sous 24 à 48 heures, via le formulaire de contact, e-mail ou LinkedIn.",
    },
  ],
  labels: {
    nav: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      skills: "Compétences",
      faq: "FAQ",
      contact: "Contact",
    },
    localeName: { fr: "FR", en: "EN" },
    a11y: {
      toggleTheme: "Basculer le thème clair / sombre",
      toggleMenu: "Ouvrir ou fermer le menu",
      backToTop: "Revenir en haut de la page",
      switchLanguage: "Changer de langue",
      skipToContent: "Aller au contenu principal",
      scrollHint: "Faites défiler",
    },
    hero: {
      contactCta: "Me contacter",
      projectsCta: "Voir les projets",
      rolePrefix: "Je suis",
    },
    stats: {
      experience: "Ans d'expérience",
      experienceSuffix: "+",
      projects: "Projets livrés",
      technologies: "Technologies",
      internships: "Stages",
    },
    about: {
      title: "À propos",
      subtitle: "Parcours, expérience & engagements",
      intro: "Un parcours d'ingénieur, deux métiers complémentaires : le produit web et la donnée.",
      experienceTitle: "Expérience professionnelle",
      educationTitle: "Formation",
      internshipsTitle: "Stages",
      volunteeringTitle: "Bénévolat",
      languagesTitle: "Langues",
      present: "En poste",
    },
    projects: {
      title: "Projets",
      heading: "Réalisations sélectionnées",
      subtitle: "Produits SaaS, data & intégration, applications métiers — extraits représentatifs du parcours.",
      featured: "Vedette",
      all: "Tout",
      categories: {
        product: "Produit & SaaS",
        data: "Data & intégration",
        business: "Applications métiers",
        mobile: "Web & mobile",
      },
      empty: "Aucun projet dans cette catégorie pour le moment.",
    },
    skills: {
      title: "Compétences",
      heading: "Stack technique & outils",
      subtitle: "Développement full stack, données et intégration — aligné sur le terrain et le CV.",
      marqueeLabel: "Technologies utilisées au quotidien",
    },
    faq: {
      title: "FAQ",
      heading: "Questions fréquentes",
      subtitle: "Ce que les clients me demandent le plus souvent avant de démarrer une mission.",
    },
    contact: {
      title: "Contact",
      subtitle: "Parlons de votre projet",
      name: "Nom",
      email: "E-mail",
      subject: "Objet",
      message: "Message",
      send: "Envoyer l'e-mail",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès. Je reviens vers vous rapidement.",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "vous@exemple.com",
      subjectPlaceholder: "Ex : Mission freelance Next.js / Data",
      messagePlaceholder: "Décrivez votre besoin, délais, stack...",
      responseTime: "Réponse sous 24 à 48 h en général.",
      charactersLeft: "caractères restants",
    },
    footer: {
      tagline: "Ingénieur génie informatique — Full Stack & Data.",
      nav: "Navigation",
      elsewhere: "Ailleurs",
      builtWith: "Conçu avec Next.js, Tailwind CSS et Motion.",
    },
  },
};

const en: PortfolioContent = {
  profile: {
    name: "Iheb Baklouti",
    title: "Computer Engineering Graduate",
    headline: "Full Stack & Data Developer",
    roles: [
      "Full Stack Developer",
      "Data & ETL Engineer",
      "React / Next.js",
      "PHP / Symfony",
      "Integration & APIs",
    ],
    slogan:
      "I design robust web applications and reliable data pipelines, from product build to industrialization.",
    metaDescription:
      "Freelance Full Stack & Data developer (React, Next.js, PHP/Symfony, ETL/Talend). Available for short or long-term missions, remote or hybrid.",
    bio: "Computer engineering graduate combining application development (PHP, React, APIs) with data projects: collection, transformation, processing, intranet tools, and integrations (Talend, import/export gateways).",
    availability: "Available for freelance missions — short or long term, remote or hybrid.",
    location: "Tunisia · Remote / hybrid",
    contact: sharedContact,
    languages: [
      { name: "French", level: "DELF B2 Certificate" },
      { name: "English", level: "B2 Level" },
    ],
  },
  experiences: [
    {
      company: "La Boîte Immo",
      role: "Full Stack & Data Developer",
      period: "September 2023 — present",
      current: true,
      summary:
        "Contributing to the major revamp of Hektor, a leading software platform for independent real estate agencies. Joined the internal data team: data-driven development, integration and industrialization.",
      highlights: [
        "Revamp and modernization of a legacy application (React, Tailwind, PHP).",
        "Business feature development with Agile collaboration (Scrum, Jira).",
        "GraphQL API work, code quality and peer reviews (Git, Bitbucket, Figma).",
        "Data projects: retrieval, transformation and processing of datasets.",
        "Contribution to internal intranet tool development.",
        "Talend usage, setup and configuration of import/export gateways.",
      ],
      stack: ["React", "Tailwind CSS", "PHP", "GraphQL", "Git", "Bitbucket", "Figma", "Jira", "Talend"],
    },
    {
      company: "GCS",
      role: "Full Stack PHP Developer",
      period: "September 2022 — October 2023",
      current: false,
      summary: "Built complete business applications for HR, marketing and real-time monitoring use cases.",
      highlights: [
        "HR platform: employees, recruitment, leave, attendance and performance tracking.",
        "Landing page system (Laravel): dynamic pricing pages, responsive UI, analytics.",
        "Private chat admin dashboard: stats, logging, reports, WebSocket monitoring.",
      ],
      stack: ["Symfony", "Laravel", "Angular", "API Platform", "WebSocket", "MySQL"],
    },
  ],
  education: [
    {
      degree: "National Engineering Degree in Computer Engineering",
      school: "Polytechnic School of Sousse",
      period: "September 2019 — June 2022",
    },
    {
      degree: "Bachelor in Electronics, Electrical Engineering and Automation",
      school: "ISSAT Kairouan",
      period: "September 2016 — June 2019",
    },
    { degree: "Technical Sciences Baccalaureate", school: "Lycée Dar Lamen", period: "2016" },
  ],
  volunteering: [
    { org: "DSC Polytechnic Club", role: "Logistics Lead", period: "October 2020 — May 2021" },
    { org: "Microsoft Polytechnic Club", role: "Logistics Lead", period: "October 2019 — May 2020" },
    { org: "Google EPS Club", role: "Media Lead", period: "October 2019 — May 2020" },
  ],
  internships: [
    {
      title: "Final-year internship — web & mobile car rental platform",
      org: "ETC Tunisia",
      period: "February 2022 — June 2022",
      stack: ["Symfony", "Angular", "Ionic", "MySQL"],
    },
    { title: "Internship — email automation app", org: "SDI", period: "September 2021", stack: ["Symfony", "MySQL"] },
    {
      title: "Internship — intern management application",
      org: "ITGate Group",
      period: "July 2021",
      stack: ["Spring Boot", "Angular", "MongoDB"],
    },
    {
      title: "Internship — travel agencies mobile app (front-end)",
      org: "Media Web Service",
      period: "September 2020",
      stack: ["Ionic 5", "MySQL"],
    },
    { title: "Internship — document management app", org: "SDI", period: "August 2020", stack: ["Symfony 5", "MySQL"] },
  ],
  projects: [
    {
      name: "Hektor — product revamp",
      client: "La Boîte Immo",
      category: "product",
      year: "2023 — present",
      description:
        "Contributed to the major revamp of the flagship software for independent real estate agencies: legacy modernization, new features, and UX quality.",
      tags: ["React", "Tailwind CSS", "PHP", "GraphQL", "Agile"],
      featured: true,
    },
    {
      name: "Data pipelines & integration",
      client: "La Boîte Immo — Data Team",
      category: "data",
      year: "2023 — present",
      description: "Data retrieval, transformation and processing; Talend; import/export gateways; intranet tooling.",
      tags: ["Talend", "ETL", "Integration", "Intranet"],
      featured: true,
    },
    {
      name: "Complete HR application",
      client: "GCS",
      category: "business",
      year: "2022 — 2023",
      description: "End-to-end HR workflows: employees, recruitment, leave, attendance and performance.",
      tags: ["Symfony", "Angular", "MySQL"],
      featured: true,
    },
    {
      name: "Landing page system",
      client: "GCS",
      category: "product",
      year: "2022 — 2023",
      description: "Conversion-focused landing pages with dynamic pricing, responsive UI, and tracking analytics.",
      tags: ["Laravel", "Marketing", "Analytics"],
      featured: false,
    },
    {
      name: "Admin dashboard — private chat",
      client: "GCS",
      category: "data",
      year: "2022 — 2023",
      description: "Advanced monitoring with statistics, logging, sales reports and real-time tracking.",
      tags: ["Symfony", "API Platform", "Angular", "WebSocket"],
      featured: false,
    },
    {
      name: "Vehicle rental platform",
      client: "ETC Tunisia (final-year internship)",
      category: "mobile",
      year: "2022",
      description: "Web platform and mobile application for rental management.",
      tags: ["Symfony", "Angular", "Ionic", "MySQL"],
      featured: false,
    },
  ],
  skillGroups: [
    { title: "Languages & runtimes", items: ["Java / JEE", "PHP", "JavaScript / TypeScript"] },
    { title: "Front-end", items: ["React", "Angular", "Tailwind CSS"] },
    { title: "Back-end & APIs", items: ["Symfony", "Laravel", "API Platform", "GraphQL", "REST"] },
    { title: "Databases", items: ["MySQL", "MongoDB", "Firebase"] },
    { title: "Data & BI", items: ["Talend", "ETL / integration", "Import-export gateways", "Power BI"] },
    { title: "Tools & methods", items: ["Git", "UML", "Agile / Scrum", "Jira", "Figma", "Photoshop"] },
  ],
  faq: [
    {
      question: "Are you currently available for a freelance mission?",
      answer: "Yes, I'm available for freelance missions — short or long term, remote or hybrid.",
    },
    {
      question: "What technologies do you work with?",
      answer:
        "Mainly React, Next.js, Angular and Tailwind CSS on the front end, PHP (Symfony, Laravel) and GraphQL on the back end, and Talend / ETL for data and integration work.",
    },
    {
      question: "Can you take on short, one-off missions, or only long contracts?",
      answer: "Both: a one-off engagement or a longer-term commitment, depending on the project's needs.",
    },
    {
      question: "How quickly do you reply to a request?",
      answer: "Usually within 24 to 48 hours, via the contact form, email, or LinkedIn.",
    },
  ],
  labels: {
    nav: { home: "Home", about: "About", projects: "Projects", skills: "Skills", faq: "FAQ", contact: "Contact" },
    localeName: { fr: "FR", en: "EN" },
    a11y: {
      toggleTheme: "Toggle light / dark theme",
      toggleMenu: "Open or close the menu",
      backToTop: "Back to top",
      switchLanguage: "Switch language",
      skipToContent: "Skip to main content",
      scrollHint: "Scroll",
    },
    hero: {
      contactCta: "Contact me",
      projectsCta: "View projects",
      rolePrefix: "I am a",
    },
    stats: {
      experience: "Years of experience",
      experienceSuffix: "+",
      projects: "Projects delivered",
      technologies: "Technologies",
      internships: "Internships",
    },
    about: {
      title: "About",
      subtitle: "Journey, experience & commitments",
      intro: "One engineering background, two complementary crafts: web product and data.",
      experienceTitle: "Professional experience",
      educationTitle: "Education",
      internshipsTitle: "Internships",
      volunteeringTitle: "Volunteering",
      languagesTitle: "Languages",
      present: "Current role",
    },
    projects: {
      title: "Projects",
      heading: "Selected work",
      subtitle: "SaaS products, data integration and business apps — selected highlights from my journey.",
      featured: "Featured",
      all: "All",
      categories: {
        product: "Product & SaaS",
        data: "Data & integration",
        business: "Business apps",
        mobile: "Web & mobile",
      },
      empty: "No project in this category yet.",
    },
    skills: {
      title: "Skills",
      heading: "Technical stack & tools",
      subtitle: "Full stack development, data and integration — aligned with real-world project delivery.",
      marqueeLabel: "Technologies used day to day",
    },
    faq: {
      title: "FAQ",
      heading: "Frequently asked questions",
      subtitle: "What clients ask me most often before kicking off a mission.",
    },
    contact: {
      title: "Contact",
      subtitle: "Let's talk about your project",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send email",
      sending: "Sending...",
      success: "Message sent successfully. I will get back to you shortly.",
      namePlaceholder: "Your full name",
      emailPlaceholder: "you@example.com",
      subjectPlaceholder: "Ex: Freelance mission Next.js / Data",
      messagePlaceholder: "Describe your needs, timeline, stack...",
      responseTime: "I usually reply within 24 to 48 hours.",
      charactersLeft: "characters left",
    },
    footer: {
      tagline: "Computer Engineering Graduate — Full Stack & Data.",
      nav: "Navigation",
      elsewhere: "Elsewhere",
      builtWith: "Built with Next.js, Tailwind CSS and Motion.",
    },
  },
};

const contentByLocale: Record<Locale, PortfolioContent> = { fr, en };

export function getPortfolioContent(locale: Locale): PortfolioContent {
  return contentByLocale[locale];
}

/** Full years elapsed since {@link CAREER_START}, recomputed on every render. */
export function getYearsOfExperience(now: Date = new Date()): number {
  const diff = now.getTime() - CAREER_START.getTime();
  return Math.max(1, Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000)));
}

/** Figures derived from the CV data itself, so they never drift from the content. */
export function getPortfolioStats(content: PortfolioContent, now: Date = new Date()) {
  const technologies = new Set<string>();
  for (const group of content.skillGroups) for (const item of group.items) technologies.add(item);
  for (const experience of content.experiences) for (const tech of experience.stack) technologies.add(tech);

  return {
    years: getYearsOfExperience(now),
    projects: content.projects.length,
    technologies: technologies.size,
    internships: content.internships.length,
  };
}

/** Flat, de-duplicated technology list used by the skills marquee. */
export function getTechMarquee(content: PortfolioContent): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const group of content.skillGroups) {
    for (const item of group.items) {
      if (seen.has(item)) continue;
      seen.add(item);
      out.push(item);
    }
  }
  return out;
}
