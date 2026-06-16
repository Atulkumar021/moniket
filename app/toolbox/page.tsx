import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import ToolboxSection from "@/components/sections/ToolboxSection";
import { getSiteContent } from "@/lib/sections";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Open-Source Toolbox — Moniket Technologies" };

export default async function ToolboxPage() {
  const { tools } = await getSiteContent();
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/">
            ← Back to home
          </Link>
          <h1 style={{ fontSize: "1.9rem" }}>Open-Source Toolbox</h1>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>
            The 70+ open-source projects I build with, across the whole stack.
          </p>
        </div>
      </div>
      <ToolboxSection tools={tools} />
      <SiteFooter />
      <RevealInit />
    </>
  );
}
