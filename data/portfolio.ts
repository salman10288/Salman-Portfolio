import type { ExperienceItem, ProjectItem, SkillGroup } from "@/types";

export const siteConfig = {
  name: "Salman Saeed",
  role: "Full Stack Developer",
  roleDetail: "Frontend-focused full stack developer",
  location: "Karachi, Pakistan",
  email: "its.salmansaeed07@gmail.com",
  phone: "+92 330 2963342",
  phoneHref: "tel:+923302963342",
  whatsappLabel: "03302963342",
  whatsapp:
    "https://wa.me/923302963342?text=Hi%20Salman%2C%20I%20would%20like%20to%20discuss%20a%20project.",
  linkedin: "https://www.linkedin.com/in/salman--saeed/",
  resume: "/Salman-Saeed-CV.pdf",
  description:
    "I build modern, scalable and immersive digital experiences with a strong focus on responsive interfaces, performance and maintainable frontend architecture.",
  availability: "Open to selected opportunities",
} as const;

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Lab", href: "#lab" },
  { label: "Contact", href: "#contact" },
] as const;

export const stats = [
  { value: 3.5, decimals: 1, suffix: "+", label: "Years of experience" },
  { value: 4, decimals: 0, suffix: "", label: "Featured case studies" },
  { value: 3, decimals: 0, suffix: "", label: "Professional roles" },
  { value: 18, decimals: 0, suffix: "+", label: "Technologies & tools" },
] as const;

export const skillGroups: SkillGroup[] = [
  {
    eyebrow: "01 / Interface systems",
    title: "Frontend",
    description:
      "Responsive, component-driven interfaces with expressive motion and maintainable architecture.",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "next" },
      { name: "Angular", icon: "angular" },
      { name: "Three.js", icon: "three" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Framer Motion", icon: "motion" },
    ],
  },
  {
    eyebrow: "02 / Product foundations",
    title: "Backend & data",
    description:
      "Practical API integration, authentication, data modelling and deployment-ready application flows.",
    skills: [
      { name: "Node.js", icon: "node" },
      { name: "Express", icon: "express" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "MySQL", icon: "mysql" },
      { name: "REST APIs", icon: "rest" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    eyebrow: "03 / Delivery workflow",
    title: "Tools & platforms",
    description:
      "From design handoff to production monitoring, performance optimization and ongoing maintenance.",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "vscode" },
      { name: "Figma", icon: "figma" },
      { name: "WordPress", icon: "wordpress" },
      { name: "Elementor", icon: "elementor" },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    period: "Jan 2025 — Present",
    title: "Frontend Developer",
    company: "101 Dev Company",
    location: "Part of 101 Group, Saudi Arabia",
    current: true,
    bullets: [
      "Develop and maintain frontend web applications for enterprise use cases.",
      "Build reusable UI components and translate design specifications into pixel-precise interfaces.",
      "Collaborate with cross-functional teams to deliver clean, reliable and maintainable solutions.",
      "Support database work and optimize application performance for speed, stability and growth.",
    ],
  },
  {
    period: "Jan 2022 — Dec 2024",
    title: "Frontend Developer",
    company: "360 Tech Solution",
    location: "Karachi, Pakistan",
    bullets: [
      "Built responsive web applications using Angular, JavaScript, HTML5, CSS3, Bootstrap and Tailwind CSS.",
      "Created reusable UI components and responsive layouts for business and client projects.",
      "Integrated RESTful APIs and worked with MongoDB and MySQL data flows.",
      "Handled deployment, DNS configuration, FTP, cPanel, maintenance and performance troubleshooting.",
    ],
  },
  {
    period: "Jan 2020 — Feb 2020",
    title: "Web Development Intern",
    company: "Suntastic Solar Solution",
    location: "Karachi, Pakistan",
    bullets: [
      "Assisted with web development tasks and backend integration activities.",
      "Supported troubleshooting, testing and implementation of technical fixes.",
    ],
  },
];

export const education = {
  period: "Oct 2019 — Sep 2024",
  degree: "Bachelor of Science in Computer Science",
  school: "Karachi Institute of Economics and Technology (KIET)",
  location: "Karachi, Pakistan",
} as const;

export const projects: ProjectItem[] = [
  {
    slug: "dabb-tech",
    index: "01",
    title: "DABB Tech",
    category: "Product engineering studio",
    description:
      "A high-impact digital presence for a product engineering studio building custom software, mobile apps, AI systems and live games. The experience brings the studio's capabilities, selected work and international footprint into one polished, performance-minded platform.",
    tags: ["Product Design", "Web Development", "Game Development", "AI"],
    liveUrl: "https://www.dabb.co/",
    accent: "orange",
  },
  {
    slug: "kickarena",
    index: "02",
    title: "KickArena",
    category: "Football gaming experience",
    description:
      "A cinematic football-game web experience shaped around stadium energy, game modes, rewards, community and platform discovery. The portfolio treatment presents it as an immersive product case study rather than a conventional marketing page.",
    tags: ["Next.js", "Three.js", "GSAP", "Game UI"],
    liveUrl: "https://kickarena.net/",
    accent: "cyan",
  },
  {
    slug: "tamr",
    index: "03",
    title: "TAMR — The Date Farm",
    category: "Farming game experience",
    description:
      "A characterful browser-based farming game centered on growing and managing a date farm. The experience pairs playful world-building with an approachable interface and a distinctive regional identity.",
    tags: ["Web Game", "Game UI", "Responsive Design", "Interactive Experience"],
    liveUrl: "https://tamr.net/",
    accent: "green",
  },
  {
    slug: "kingdom-land",
    index: "04",
    title: "Kingdom Land",
    category: "Fantasy game experience",
    description:
      "A fantasy-themed browser game presented through an immersive landing experience. Strong world-building, game-focused calls to action and responsive interaction invite players to step into its kingdom.",
    tags: ["Web Game", "Fantasy UI", "Responsive Design", "Interactive Experience"],
    liveUrl: "https://kingdomland.net/",
    accent: "violet",
  },
];

export const services = [
  {
    title: "Frontend Development",
    description: "Responsive interfaces, design systems and performance-minded component architecture.",
    icon: "layout",
  },
  {
    title: "Backend Development",
    description: "Node.js services, REST APIs, authentication flows and practical data integration.",
    icon: "server",
  },
  {
    title: "Full Stack Products",
    description: "End-to-end product implementation from interaction design to production deployment.",
    icon: "stack",
  },
  {
    title: "UI/UX Implementation",
    description: "Pixel-precise delivery from Figma with accessible interaction and responsive behavior.",
    icon: "pen",
  },
  {
    title: "API Integration",
    description: "Reliable frontend-to-backend workflows, errors, loading states and secure token handling.",
    icon: "api",
  },
  {
    title: "Performance Optimization",
    description: "Bundle, rendering and interaction improvements focused on real user experience.",
    icon: "performance",
  },
] as const;

export const recognition = [
  {
    title: "SAP Certified Associate",
    subtitle: "Backend Developer — ABAP Cloud",
    meta: "Professional certification",
  },
  {
    title: "Best Employee",
    subtitle: "Web Developer — 360 Tech Solution",
    meta: "Professional recognition",
  },
  {
    title: "Web Design & Development",
    subtitle: "Udemy",
    meta: "Continuing education",
  },
  {
    title: "IELTS Academic",
    subtitle: "Band 6.0 — 2026",
    meta: "English proficiency",
  },
  {
    title: "Reusable UI Systems",
    subtitle: "Component-led delivery across business applications",
    meta: "Delivery strength",
  },
  {
    title: "Performance & Deployment",
    subtitle: "Monitoring, DNS, cPanel, FTP and ongoing optimization",
    meta: "Operational capability",
  },
] as const;
