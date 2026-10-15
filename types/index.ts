export type IconName =
  | "react"
  | "angular"
  | "next"
  | "typescript"
  | "tailwind"
  | "motion"
  | "node"
  | "express"
  | "mongodb"
  | "mysql"
  | "php"
  | "rest"
  | "firebase"
  | "git"
  | "github"
  | "vscode"
  | "figma"
  | "wordpress"
  | "sap";

export interface SkillItem {
  name: string;
  icon: IconName;
}

export interface SkillGroup {
  title: string;
  eyebrow: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  location: string;
  current?: boolean;
  bullets: string[];
}

export interface ProjectItem {
  slug: "dabb-tech" | "kickarena" | "tamr" | "kingdom-land";
  index: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  accent: "cyan" | "green" | "orange" | "violet";
}

export interface GitHubResponse {
  configured: boolean;
  username?: string;
  profileUrl?: string;
  avatarUrl?: string;
  stats?: {
    repositories: number;
    recentCommits: number;
    stars: number;
    followers: number;
  };
  activity?: Array<{
    date: string;
    count: number;
  }>;
  message?: string;
}
