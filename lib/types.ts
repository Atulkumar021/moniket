export type ArticleType = "blog" | "tutorial";
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
  /** Show the "Hire Me" CTA button in the site header. Defaults to true. */
  hireMe?: boolean;
}

export interface Analytics {
  visitors: number[];
  sources: [string, number][];
  topPages: [string, number][];
}

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
}

/** Tool tuple: [name, category, license, description] */
export type Tool = [string, string, string, string];
/** Domain tuple: [name, description, svgPath] */
export type Domain = [string, string, string];
