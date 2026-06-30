export type ArticleType = "blog" | "tutorial" | "case-study" | "documentation" | "service";
export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";
export type PublishStatus = "published" | "draft";

export type Block =
  | { t: "p"; c: string }
  | { t: "h"; c: string }
  | { t: "note"; c: string }
  | { t: "code"; c: string }
  | { t: "ul"; c: string[] }
  | { t: "ol"; c: string[] };

export interface Article {
  id: number;
  type: ArticleType;
  title: string;
  category: string;
  domain: string;
  status: PublishStatus;
  views: number;
  date: string;
  read: number;
  excerpt: string;
  difficulty?: string;
  tools?: string[];
  body: Block[];
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  service: string;
  status: LeadStatus;
  date: string;
}

export interface PageRow {
  id: number;
  title: string;
  slug: string;
  visibility: string;
  menu: boolean;
}

export interface Sub {
  email: string;
  date: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
}

export interface MediaItem {
  n: string;
  t: string;
}

export interface Settings {
  siteTitle: string;
  tagline: string;
  email: string;
  hireMe?: boolean;
}

export interface Analytics {
  visitors: number[];
  sources: [string, number][];
  topPages: [string, number][];
}

export interface SolutionItem {
  id: number;
  title: string;
  slug: string;
  icon: string;
  excerpt: string;
  status: "published" | "draft";
  order: number;
}

export interface ToolItem {
  id: number;
  name: string;
  category: string;
  license: string;
  description: string;
  link?: string;
  status: "published" | "draft";
}

export interface FaqItem { id: number; question: string; answer: string; order: number; status: "published" | "draft"; }
export interface SiteStatItem { id: number; value: number; suffix: string; label: string; desc: string; icon: string; order: number; }
export interface SkillItem { id: number; name: string; level: string; pct: number; icon: string; order: number; }
export interface ProcessStep { id: number; num: string; title: string; desc: string; icon: string; order: number; }
export interface TrustItem { id: number; title: string; desc: string; icon: string; order: number; }
export interface ServiceCard { id: number; title: string; desc: string; icon: string; order: number; }
export interface TrackItem { id: number; name: string; desc: string; guides: number; hours: number; color: string; tint: string; icon: string; order: number; }

export interface Store {
  uid: number;
  articles: Article[];
  leads: Lead[];
  pages: PageRow[];
  subs: Sub[];
  users: User[];
  media: MediaItem[];
  settings: Settings;
  analytics: Analytics;
  tools: ToolItem[];
  solutions: SolutionItem[];
  faqs: FaqItem[];
  siteStats: SiteStatItem[];
  skills: SkillItem[];
  processSteps: ProcessStep[];
  trustItems: TrustItem[];
  serviceCards: ServiceCard[];
  tracks: TrackItem[];
}

/** Tool tuple: [name, category, license, description] */
export type Tool = [string, string, string, string];
/** Domain tuple: [name, description, svgPath] */
export type Domain = [string, string, string];
