import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import TracksSection from "@/components/sections/TracksSection";
import { getSiteContent } from "@/lib/sections";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Learning Tracks — Moniket Technologies" };

export default async function TracksPage() {
  const { knowledge, tracks } = await getSiteContent();
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/">
            ← Back to home
          </Link>
          <h1 style={{ fontSize: "1.9rem" }}>Learning Tracks</h1>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>
            Free, detailed guides organised by domain. Pick a track to see every tutorial in it.
          </p>
        </div>
      </div>
      <TracksSection knowledge={knowledge} tracks={tracks} />
      <SiteFooter />
      <RevealInit />
    </>
  );
}
