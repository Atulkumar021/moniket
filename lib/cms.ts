// Server-side CMS data access. These run inside server components and read
// MongoDB directly via lib/server (no HTTP round-trip to a separate backend).
import { fetchPublicSections, fetchNavItems, fetchMarquee, type CmsSection, type CmsNavItem } from "@/lib/server/cms";

export type { CmsSection, CmsNavItem };

export async function getCmsSections(page = "home"): Promise<CmsSection[]> {
  return fetchPublicSections(page);
}

export async function getMarquee(page = "home") {
  return fetchMarquee(page);
}

export async function getCmsNav(key: "main" | "footer"): Promise<CmsNavItem[]> {
  return fetchNavItems(key);
}

export function sectionData<T extends Record<string, unknown>>(
  sections: CmsSection[],
  type: string,
  fallback: T
): T {
  const section = sections.find((item) => item.type === type);
  return section ? ({ ...fallback, ...section.data } as T) : fallback;
}
