// Resolves CMS sections (with static fallbacks) into ready-to-render view models
// shared by the homepage and the dedicated section pages.
import { getCmsSections, getMarquee, sectionData } from "@/lib/cms";
import { getPublishedArticles, toCard } from "@/lib/queries";
import { fetchPublishedBlogCards } from "@/lib/server/blog";
import { MARQUEE_TECH, FAQS } from "@/lib/data/static";
import { SERVICE_CARDS, TRACKS, PROCESS, STAT_ICONS, TRUST } from "@/lib/data/home";
import { readStore } from "@/lib/store";
import type { Tool } from "@/lib/types";

export async function getSiteContent() {
  const sections = await getCmsSections();
  const store = readStore();

  // Helper: returns true when MongoDB returned a real document for this section type.
  const hasCmsSection = (type: string) => sections.some((s) => s.type === type);

  const hero = sectionData(sections, "hero", {
    badge: "Available for projects & consulting",
    title: "Infrastructure, DevOps & SecOps —",
    titleAccent: "open-source, end to end.",
    description:
      "I'm Manish — 20+ years hands-on across Linux, virtualization, cloud, containers, networking, security, automation and monitoring. I design, build, secure and run platforms with the best open-source tools.",
    primaryButton: { text: "View My Work →", link: "/tracks" },
    secondaryButton: { text: "Book Consultation", link: "/contact" },
    stats: [
      { value: "20+", label: "Years" },
      { value: "74", label: "OSS tools" },
      { value: "20", label: "Guides" },
    ],
  });

  const serviceSection = sectionData(sections, "services", {
    eyebrow: "Consulting Services",
    heading: "Every layer of the stack",
    description:
      "Strategy, build, hardening and ongoing operations — across infrastructure, platform, DevOps, SecOps and networking.",
    items: SERVICE_CARDS,
  });
  const serviceCards = hasCmsSection("services")
    ? serviceSection.items.map((item: Record<string, unknown>, index: number) => ({
        ...SERVICE_CARDS[index % SERVICE_CARDS.length],
        ...item,
      }))
    : store.serviceCards?.length > 0
      ? store.serviceCards.sort((a, b) => a.order - b.order)
      : SERVICE_CARDS;

  const knowledge = sectionData(sections, "knowledgeHub", {
    eyebrow: "Knowledge Hub",
    heading: "Learning tracks by domain",
    description:
      "Detailed, free guides organised by area. Pick a track to see every tutorial and article in it.",
    tracks: TRACKS,
  });
  const tracks = hasCmsSection("knowledgeHub")
    ? knowledge.tracks.map((item: Record<string, unknown>, index: number) => ({ ...TRACKS[index % TRACKS.length], ...item }))
    : store.tracks?.length > 0
      ? store.tracks.sort((a, b) => a.order - b.order)
      : TRACKS;

  const processSection = sectionData(sections, "process", {
    eyebrow: "How I Work",
    heading: "A simple, honest process.",
    description:
      "No fluff. No games. Just a straightforward process to deliver reliable, secure and maintainable systems.",
    steps: PROCESS,
  });
  const processSteps = hasCmsSection("process")
    ? processSection.steps.map((item: Record<string, unknown>, index: number) => ({ ...PROCESS[index % PROCESS.length], ...item }))
    : store.processSteps?.length > 0
      ? store.processSteps
      : PROCESS;

  const about = sectionData(sections, "about", {
    paragraphs: [] as string[],
    skills: [] as { name: string; level: string; percentage: number; icon?: string }[],
  });

  const toolbox = sectionData(sections, "toolbox", {
    tools: [] as { name: string; category: string; license: string; description: string }[],
  });
  const tools: Tool[] | undefined = toolbox.tools.length
    ? toolbox.tools.map((tool: { name: string; category: string; license: string; description: string }) => [tool.name, tool.category, tool.license, tool.description] as Tool)
    : undefined;

  const statistics = sectionData(sections, "statistics", {
    items: [] as { value: number; suffix: string; title: string; desc?: string }[],
  });
  const stats = hasCmsSection("statistics")
    ? statistics.items.map((item: { value: number; suffix: string; title: string; desc?: string }, index: number) => ({
        icon: STAT_ICONS[index % STAT_ICONS.length],
        value: item.value,
        suffix: item.suffix,
        label: item.title,
        desc: item.desc || "",
      }))
    : store.siteStats?.length > 0
      ? store.siteStats.sort((a, b) => a.order - b.order).map((s) => ({
          icon: s.icon,
          value: s.value,
          suffix: s.suffix,
          label: s.label,
          desc: s.desc,
        }))
      : undefined;

  const blogs = await fetchPublishedBlogCards(3);
  const tutorials = getPublishedArticles("tutorial").slice(0, 3).map(toCard);

  // Marquee: CMS-managed when a section exists; falls back to the static list
  // when none is configured. A configured-but-disabled section hides the strip.
  const marqueeDoc = await getMarquee("home");
  const marqueeItems = marqueeDoc
    ? marqueeDoc.enabled
      ? marqueeDoc.items
      : []
    : MARQUEE_TECH;
  // Duplicated for a seamless scroll loop (matches the original behaviour).
  const marquee = marqueeItems.length ? [...marqueeItems, ...marqueeItems] : [];

  // FAQs: from store if available, else fall back to static FAQS
  const faqs = store.faqs?.length > 0
    ? store.faqs.filter((f) => f.status === "published").sort((a, b) => a.order - b.order)
    : FAQS.map(([question, answer], i) => ({ id: i + 1, question, answer, order: i + 1, status: "published" as const }));

  // Trust items: from store if available, else fall back to static TRUST
  const trustItems = store.trustItems?.length > 0
    ? store.trustItems.sort((a, b) => a.order - b.order)
    : TRUST;

  // Skills: from store if available, else empty (AboutSkills has its own defaults)
  const skills = store.skills?.length > 0
    ? store.skills.sort((a, b) => a.order - b.order)
    : [];

  return {
    hero,
    serviceSection,
    serviceCards,
    knowledge,
    tracks,
    processSection,
    processSteps,
    about,
    tools,
    stats,
    blogs,
    tutorials,
    marquee,
    faqs,
    trustItems,
    skills,
  };
}

export type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;
