/**
 * Single source of truth for everything rendered on the portfolio.
 * Sections stay presentational and just consume these structures.
 *
 * NOTE: some project links point to the GitHub profile as a placeholder —
 * replace the `TODO` URLs with the exact repository / demo links.
 */

export type SocialKind = "github" | "linkedin" | "mail";

export interface SocialLink {
  label: string;
  href: string;
  kind: SocialKind;
}

export interface Stat {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  detail: string;
}

export interface SkillGroup {
  key: string;
  title: string;
  icon: "code" | "server" | "monitor" | "layers" | "database" | "tools";
  items: string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  meta: string;
  description: string;
  points: string[];
  tags: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: "github" | "live";
}

export interface Project {
  index: string;
  title: string;
  subtitle: string;
  year: string;
  status?: string;
  highlights: string[];
  tags: string[];
  links: ProjectLink[];
}

export const profile = {
  name: "Abdelrahman Ali Kamel",
  firstName: "Abdelrahman",
  monogram: "AK",
  role: "Full-Stack .NET Developer",
  location: "Giza, Egypt",
  email: "abdelrahman.kamel.dev@gmail.com",
  phone: "+20 101 420 2765",
  github: "https://github.com/realKamel",
  linkedin: "https://www.linkedin.com/in/real-kamel",
  resume: "/abdelrahman-ali-kamel-resume.pdf",
  availability: "Open to full-stack & backend roles",
  bio: "I’m a computer-science graduate based in Giza, Egypt, focused on backend engineering and thoughtful system design. I like problems that reward structure — clean boundaries, explicit contracts, and code another developer can pick up without a guide.",
  summary:
    "Full-Stack Web Developer specializing in scalable web applications with ASP.NET Core, Angular, Clean Architecture, and PostgreSQL / SQL Server.",
  summaryExtended:
    "I build secure REST APIs, AI-powered features, cloud integrations, and responsive frontends — and I care about writing maintainable, high-quality software.",
} as const;

export const socials: SocialLink[] = [
  { label: "GitHub", href: profile.github, kind: "github" },
  { label: "LinkedIn", href: profile.linkedin, kind: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, kind: "mail" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

export const stats: Stat[] = [
  {
    value: 3.74,
    decimals: 2,
    suffix: "",
    label: "GPA / 4.0",
    detail: "B.Sc. Computer Science",
  },
  {
    value: 6,
    decimals: 0,
    suffix: "",
    label: "Months at ITI",
    detail: "Full-stack & GenAI program",
  },
  {
    value: 3,
    decimals: 0,
    suffix: "",
    label: "Projects shipped",
    detail: "Team & solo builds",
  },
  {
    value: 15,
    decimals: 0,
    suffix: "+",
    label: "Technologies",
    detail: "From API to cloud",
  },
];

/** Technology names for the infinite marquee. */
export const marqueeItems: string[] = [
  ".NET",
  "C#",
  "ASP.NET Core",
  "EF Core",
  "Angular",
  "TypeScript",
  "PostgreSQL",
  "SQL Server",
  "Docker",
  "Redis",
  "Hangfire",
  "MediatR",
  "Clean Architecture",
  "Tailwind CSS",
  "Microsoft Agent Framework",
  "OpenAI",
];

export const skillGroups: SkillGroup[] = [
  {
    key: "languages",
    title: "Languages",
    icon: "code",
    items: ["C#", "TypeScript", "JavaScript", "SQL"],
  },
  {
    key: "backend",
    title: "Backend",
    icon: "server",
    items: [
      "ASP.NET Core",
      ".NET Web API",
      "MVC",
      "EF Core",
      "ASP.NET Core Identity",
      "JWT",
      "Hangfire",
      "Redis",
    ],
  },
  {
    key: "frontend",
    title: "Frontend",
    icon: "monitor",
    items: [
      "Angular",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "SSR",
      "Responsive Design",
    ],
  },
  {
    key: "architecture",
    title: "Architecture",
    icon: "layers",
    items: [
      "Clean Architecture",
      "N-Tier",
      "CQRS",
      "MediatR",
      "Repository",
      "Unit of Work",
      "Specification",
    ],
  },
  {
    key: "cloud",
    title: "Data & Cloud",
    icon: "database",
    items: ["PostgreSQL", "SQL Server", "Docker", "OpenAI", "Microsoft Agents Framework"],
  },
  {
    key: "tools",
    title: "Tools",
    icon: "tools",
    items: [
      "Visual Studio",
      "Rider",
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "SSMS",
      "Figma",
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    period: "Jan 2026 — Jun 2026",
    title: "Full-Stack Web & Generative AI Development using .NET",
    org: "Information Technology Institute (ITI)",
    meta: "Intensive Training Program (ITP) · Egypt",
    description:
      "Selected for ITI’s intensive training program, building production-style web applications while specializing in .NET backend engineering and generative-AI integration.",
    points: [
      "Built web applications using Angular / ASP.NET Core MVC, N-Tier architecture, EF Core, and SQL Server.",
    ],
    tags: ["Angular", "ASP.NET Core MVC", "N-Tier", "EF Core", "SQL Server"],
  },
  {
    period: "Sep 2021 — Jun 2025",
    title: "Bachelor of Computer Science",
    org: "Misr University for Science and Technology",
    meta: "Giza, Egypt · GPA 3.74 / 4.0",
    description:
      "Graduated with a 3.74 GPA and shipped an AI-powered career-guidance platform as a capstone project.",
    points: [
      "Graduation project: an AI-powered career-guidance platform providing personalized roadmaps and skill-based job recommendations.",
    ],
    tags: ["Computer Science", "Artificial Intelligence", "Capstone"],
  },
];

export const projects: Project[] = [
  {
    index: "01",
    title: "Prisma LMS",
    subtitle: "A learning management system for independent teachers",
    year: "2026",
    status: "Ongoing",
    highlights: [
      "Built with a team to help independent teachers run their online teaching business — lessons, students, assistants, assessments, payments, and AI-assisted learning workflows.",
      "Owned the backend architecture and infrastructure, designing the .NET 10 application around Clean Architecture, CQRS/MediatR, the Result pattern, FluentValidation, Repository, Unit of Work, and Specification patterns, backed by PostgreSQL and EF Core.",
      "Implemented authentication and authorization with JWT / refresh tokens, role- and permission-based access control, and assistant-specific permissions — plus background processing, caching, rate limiting, structured logging, health checks, and observability.",
      "Built AI workflows for RAG-based lesson chat, lesson summarization, and student reporting on the Microsoft Agent Framework, and containerized the backend and supporting infrastructure with Docker.",
    ],
    tags: [
      ".NET 10",
      "Clean Architecture",
      "CQRS / MediatR",
      "PostgreSQL",
      "Docker",
      "Microsoft Agent Framework",
    ],
    links: [
      // TODO: replace with the exact repository URLs
      { label: "Backend", href: profile.github, kind: "github" },
      { label: "Frontend", href: profile.github, kind: "github" },
    ],
  },
  {
    index: "02",
    title: "Talabat WebAPI",
    subtitle: "An e-commerce API from catalog to checkout",
    year: "2025",
    highlights: [
      "Developed an e-commerce API supporting product browsing, shopping carts, orders, and customer accounts.",
      "Architected the backend with Onion Architecture, a generic repository, Unit of Work, and Specification patterns — securing it with JWT / ASP.NET Core Identity and using Redis caching to keep shopping carts fast.",
    ],
    tags: [
      "ASP.NET Core",
      "Onion Architecture",
      "Unit of Work",
      "Redis",
      "JWT",
      "SQL Server",
    ],
    links: [
      // TODO: replace with the exact repository URL
      { label: "Source", href: profile.github, kind: "github" },
    ],
  },
  {
    index: "03",
    title: "FreshCart",
    subtitle: "A responsive, SEO-friendly e-commerce frontend",
    year: "2025",
    highlights: [
      "Built a responsive storefront with Angular 20, Tailwind CSS 4, and SSR to improve SEO and application performance.",
      "Implemented JWT authentication, HTTP interceptors, global error handling, and route guards to secure navigation.",
      "Developed a dynamic product catalog, cart and wishlist, and an intuitive checkout pipeline.",
    ],
    tags: ["Angular 20", "Tailwind CSS 4", "SSR", "TypeScript", "RxJS"],
    links: [
      // TODO: replace with the exact repository / demo URLs
      { label: "Source", href: profile.github, kind: "github" },
    ],
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "What kind of role are you looking for?",
    a: "Full-stack or backend roles where I can work with .NET and a modern frontend, ideally on products with real architectural depth.",
  },
  {
    q: "Where are you based?",
    a: "Giza, Egypt. I’m comfortable working remotely with distributed teams and across time zones.",
  },
  {
    q: "What’s your main stack?",
    a: "ASP.NET Core and .NET Web APIs on the backend, Angular on the frontend, PostgreSQL or SQL Server for data, and Docker for packaging and deployment.",
  },
  {
    q: "Do you use AI in your work?",
    a: "Yes — I’ve built RAG-based chat, summarization, and reporting workflows with the Microsoft Agent Framework and OpenAI, and I use AI tooling day to day.",
  },
];
