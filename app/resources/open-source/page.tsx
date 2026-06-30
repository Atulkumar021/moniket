import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import Toolbox from "@/components/Toolbox";
import { readStore } from "@/lib/store";
import type { Tool } from "@/lib/types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Open-Source Toolbox — Resources | Moniket Technologies" };

export default function ResourcesOpenSourcePage() {
  const { tools: stored } = readStore();
  const published = (stored || []).filter((t) => t.status === "published");
  const tools: Tool[] | undefined = published.length
    ? published.map((t) => [t.name, t.category, t.license, t.description] as Tool)
    : undefined;

  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/resources/">← Resources</Link>
          <h1>Open-Source</h1>
          <p>The open-source tools I build with, across the whole infrastructure and DevOps stack.</p>
        </div>
      </div>
      <section id="toolbox" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Toolbox tools={tools} />
        </div>
      </section>
      <SiteFooter />
      <RevealInit />
    </>
  );
}
