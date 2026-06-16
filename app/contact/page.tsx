import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import ContactSection from "@/components/sections/ContactSection";
import FaqSection from "@/components/sections/FaqSection";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Contact — Moniket Technologies" };

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <div className="subhero">
        <div className="wrap">
          <Link className="backlink" href="/">
            ← Back to home
          </Link>
          <h1 style={{ fontSize: "1.9rem" }}>Contact</h1>
          <p style={{ color: "var(--muted)", marginTop: 6 }}>
            Tell me about your project — I usually reply within a day.
          </p>
        </div>
      </div>
      <ContactSection />
      <FaqSection />
      <SiteFooter />
      <RevealInit />
    </>
  );
}
