import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealInit from "@/components/RevealInit";
import HashRedirect from "@/components/HashRedirect";
import ArticleCard from "@/components/ArticleCard";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import ServicesSection from "@/components/sections/ServicesSection";
import TracksSection from "@/components/sections/TracksSection";
import { getSiteContent } from "@/lib/sections";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { hero, serviceSection, serviceCards, knowledge, tracks, blogs, tutorials, marquee } =
    await getSiteContent();

  return (
    <>
      <HashRedirect />
      <SiteHeader />

      <Hero hero={hero} />
      {marquee.length > 0 && <Marquee items={marquee} />}

      {/* SERVICES — preview */}
      <ServicesSection serviceSection={serviceSection} serviceCards={serviceCards} preview />

      {/* LEARNING TRACKS — preview */}
      <TracksSection knowledge={knowledge} tracks={tracks} preview />

      {/* OPEN-SOURCE TOOLBOX — teaser */}
      <section className="tb-section">
        <div className="tb-bg" aria-hidden>
          <span className="aurora t1" />
          <span className="aurora t2" />
          <span className="dots td1" />
          <span className="dots td2" />
        </div>
        <div className="wrap">
          <div className="svc-head">
            <span className="eyebrow-line">Open-Source Toolbox</span>
            <h2 style={{ marginTop: 12 }}>The tools I build with</h2>
            <p>Working knowledge of 70+ open-source projects across the whole stack — explore them all.</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Link className="btn btn-primary" href="/toolbox">
              Browse the toolbox →
            </Link>
          </div>
        </div>
      </section>

      {/* FROM THE BLOG — preview */}
      <section id="blogPreview" className="blog-section">
        <div className="blog-bg" aria-hidden>
          <span className="aurora bl1" />
          <span className="aurora bl2" />
          <span className="dots bld1" />
          <span className="dots bld2" />
          <span className="ab-ring" />
          <span className="ab-sphere sp2" />
        </div>
        <div className="wrap">
          <div className="svc-head">
            <span className="eyebrow-dotline">From the Blog</span>
            <h2 style={{ marginTop: 12 }}>
              In-depth write-ups<span style={{ color: "var(--primary)" }}>.</span>
            </h2>
            <p>Opinion and deep-dives across DevOps, SecOps, networking, cloud and more.</p>
          </div>
          <div className="blog-grid">
            {blogs.map((a) => (
              <BlogPreviewCard key={a.slug ?? a.id} a={a} />
            ))}
          </div>
          <div className="blog-cta">
            <Link href="/blog">View all posts →</Link>
          </div>
        </div>
      </section>

      {/* TUTORIALS — preview */}
      <section className="alt">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Step-by-Step Tutorials</span>
            <h2>Follow-along guides with commands</h2>
            <p>Copy-paste-ready tutorials for building things the right way.</p>
          </div>
          <div className="grid g3">
            {tutorials.map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 26 }}>
            <Link className="btn btn-soft" href="/tutorials">
              View all tutorials →
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT — CTA */}
      <section className="alt">
        <div className="wrap">
          <div className="cta reveal">
            <h2>Ready when you are</h2>
            <p>Tell me what you&apos;re dealing with — I&apos;ll be honest about whether I can help, and how.</p>
            <Link className="btn btn-primary" href="/contact">
              Get in touch →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <RevealInit />
    </>
  );
}
