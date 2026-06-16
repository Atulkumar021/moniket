// Direct-DB helpers used by server components (no HTTP round-trip).
import { connectToDatabase } from "./db";
import { Section } from "./models/Section";
import { NavMenu } from "./models/NavMenu";
import { Theme } from "./models/Theme";

export type CmsSection = {
  _id: string;
  page: string;
  type: string;
  name: string;
  order: number;
  enabled: boolean;
  data: Record<string, unknown>;
};

export type CmsNavItem = {
  label: string;
  href: string;
  order: number;
  enabled?: boolean;
};

// Legacy homepage anchors → their dedicated pages. Keeps the site working even
// if the database still has the old single-page nav (e.g. "/#tracks").
const LEGACY_HREFS: Record<string, string> = {
  "/#services": "/services",
  "/#tracks": "/tracks",
  "/#toolbox": "/toolbox",
  "/#about": "/about",
  "/#contact": "/contact",
};

export function normalizeHref(href: string): string {
  if (!href) return href;
  if (LEGACY_HREFS[href]) return LEGACY_HREFS[href];
  // tolerate full URLs like "http://localhost:3000/#tracks"
  const hashAnchor = href.match(/#(\w+)$/);
  if (hashAnchor && href.includes("#")) {
    const candidate = `/#${hashAnchor[1]}`;
    if (LEGACY_HREFS[candidate]) return LEGACY_HREFS[candidate];
  }
  return href;
}

// Public enabled sections for a page, ordered — mirrors GET /api/sections.
export async function fetchPublicSections(page = "home"): Promise<CmsSection[]> {
  try {
    await connectToDatabase();
    const docs = await Section.find({ page, enabled: true }).sort({ order: 1 }).lean();
    return docs.map((d) => ({
      _id: String(d._id),
      page: d.page,
      type: d.type,
      name: d.name,
      order: d.order,
      enabled: d.enabled,
      data: (d.data as Record<string, unknown>) || {},
    }));
  } catch {
    return [];
  }
}

// Nav items for a key (main | footer) — mirrors GET /api/nav/:key.
export async function fetchNavItems(key: "main" | "footer"): Promise<CmsNavItem[]> {
  try {
    await connectToDatabase();
    const menu = await NavMenu.findOne({ key }).lean();
    const items = ((menu?.items as CmsNavItem[]) || []).filter((i) => i.enabled !== false);
    return items.sort((a, b) => a.order - b.order).map((i) => ({ ...i, href: normalizeHref(i.href) }));
  } catch {
    return [];
  }
}

export async function fetchTheme(): Promise<Record<string, unknown> | null> {
  try {
    await connectToDatabase();
    const theme = await Theme.findOne({ key: "default" }).lean();
    return theme ? (JSON.parse(JSON.stringify(theme)) as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}
