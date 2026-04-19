export const profile = {
  name: "Iheb Baklouti",
  title: "Ingénieur génie informatique",
  headline: "Développeur Full Stack & Data",
  slogan:
    "Je conçois des applications web robustes et des pipelines de données fiables, du produit jusqu’à l’industrialisation.",
  bio: "Ingénieur en génie informatique, je combine développement applicatif (PHP, React, APIs) et projets data : collecte, transformation, traitement des données, outils intranet et intégrations (Talend, passerelles d’import/export).",
  availability:
    "Disponible pour des missions freelance — court ou long terme, en remote ou hybride.",
  contact: {
    phone: "+216 22 868 180",
    email: "iheb.baklouti@polytechnicien.tn",
    linkedin: "https://www.linkedin.com/in/iheb-baklouti/",
  },
  languages: [
    { name: "Français", level: "DELF B2" },
    { name: "Anglais", level: "B1" },
  ],
} as const;

export const experiences = [
  {
    company: "La Boîte Immo",
    role: "Développeur Full Stack & Data",
    period: "Septembre 2023 — présent",
    location: "France (remote / hybride)",
    summary:
      "Participation à la refonte majeure de Hektor, logiciel leader des agences immobilières indépendantes. J’ai rejoint l’équipe data au sein de la même entreprise : développement orienté données, intégration et industrialisation.",
    highlights: [
      "Refonte et modernisation d’une application legacy (React, Tailwind, PHP).",
      "Développement de fonctionnalités métier, collaboration Agile (Scrum, Jira).",
      "API GraphQL, qualité de code et revues (Git, Bitbucket, Figma).",
      "Projets data : récupération, transformation et traitement des données.",
      "Participation au développement d’outils intranet.",
      "Utilisation de Talend ; configuration et mise en place de passerelles d’import et d’export.",
    ],
    stack: ["React", "Tailwind CSS", "PHP", "GraphQL", "Git", "Bitbucket", "Figma", "Jira", "Talend"],
  },
  {
    company: "GCS",
    role: "Développeur Full Stack PHP",
    period: "Septembre 2022 — Octobre 2023",
    location: "",
    summary:
      "Développement d’applications métiers complètes : RH, marketing et supervision temps réel.",
    highlights: [
      "Application RH : employés, recrutement, congés, présences, performances.",
      "Système de landing pages (Laravel) : pages tarifaires dynamiques, responsive, analytics.",
      "Dashboard admin pour application de chat privé : stats, logging, rapports, WebSocket.",
    ],
    stack: ["Symfony", "Laravel", "Angular", "API Platform", "WebSocket", "MySQL"],
  },
] as const;

export const education = [
  {
    degree: "Diplôme national d’ingénieur en génie informatique",
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
] as const;

export const volunteering = [
  {
    org: "Club DSC Polytechnique",
    role: "Responsable logistique",
    period: "Octobre 2020 — Mai 2021",
  },
  {
    org: "Club Microsoft Polytechnique",
    role: "Responsable logistique",
    period: "Octobre 2019 — Mai 2020",
  },
  {
    org: "Club Google EPS",
    role: "Responsable média",
    period: "Octobre 2019 — Mai 2020",
  },
] as const;

export const internships = [
  {
    title: "Stage fin d’études — plateforme web & mobile location de voitures",
    org: "ETC Tunisie",
    period: "Février 2022 — Juin 2022",
    stack: ["Symfony", "Angular", "Ionic", "MySQL"],
  },
  {
    title: "Stage — automatisation des e-mails",
    org: "SDI",
    period: "Septembre 2021",
    stack: ["Symfony", "MySQL"],
  },
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
  {
    title: "Stage — gestion documentaire",
    org: "SDI",
    period: "Août 2020",
    stack: ["Symfony 5", "MySQL"],
  },
] as const;

export const projects = [
  {
    name: "Hektor — refonte produit",
    client: "La Boîte Immo",
    description:
      "Participation à la refonte majeure du logiciel phare des agences immobilières indépendantes : modernisation legacy, nouvelles fonctionnalités, qualité UX.",
    tags: ["React", "Tailwind CSS", "PHP", "GraphQL", "Agile"],
    featured: true,
  },
  {
    name: "Pipelines & intégration data",
    client: "La Boîte Immo — équipe Data",
    description:
      "Récupération, transformation et traitement des données ; Talend ; passerelles d’import/export ; contribution aux outils intranet.",
    tags: ["Talend", "ETL", "Intégration", "Intranet"],
    featured: true,
  },
  {
    name: "Application RH complète",
    client: "GCS",
    description:
      "Couverture du cycle RH : employés, recrutement, congés, présences et suivi des performances.",
    tags: ["Symfony", "Angular", "MySQL"],
    featured: true,
  },
  {
    name: "Système de landing pages",
    client: "GCS",
    description:
      "Landing pages orientées conversion : tarification dynamique, responsive, suivi et analyse.",
    tags: ["Laravel", "Marketing", "Analytics"],
    featured: false,
  },
  {
    name: "Dashboard admin — chat privé",
    client: "GCS",
    description:
      "Supervision avancée : statistiques, logging, rapports de vente, monitoring temps réel.",
    tags: ["Symfony", "API Platform", "Angular", "WebSocket"],
    featured: false,
  },
  {
    name: "Plateforme location de véhicules",
    client: "ETC Tunisie (stage)",
    description: "Plateforme web et application mobile de gestion de location.",
    tags: ["Symfony", "Angular", "Ionic", "MySQL"],
    featured: false,
  },
] as const;

export const skillGroups = [
  {
    title: "Langages & runtimes",
    items: ["Java / JEE", "PHP", "JavaScript / TypeScript"],
  },
  {
    title: "Front-end",
    items: ["React", "Angular", "Tailwind CSS"],
  },
  {
    title: "Back-end & APIs",
    items: ["Symfony", "Laravel", "API Platform", "GraphQL", "REST"],
  },
  {
    title: "Bases de données",
    items: ["MySQL", "MongoDB", "Firebase"],
  },
  {
    title: "Data & BI",
    items: ["Talend", "ETL / intégration", "Passerelles import-export", "Power BI"],
  },
  {
    title: "Outils & méthodes",
    items: ["Git", "UML", "Agile / Scrum", "Jira", "Figma", "Photoshop"],
  },
] as const;
