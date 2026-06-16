import Icon from "@/components/Icon";
import AboutSkills from "@/components/AboutSkills";
import { ABOUT_VALUES } from "@/lib/data/home";
import type { SiteContent } from "@/lib/sections";

export default function AboutSection({ about }: { about: SiteContent["about"] }) {
  return (
    <section id="about" className="about-section">
      <div className="about-bg" aria-hidden>
        <span className="aurora ab1" />
        <span className="aurora ab2" />
        <span className="dots abd1" />
        <span className="dots abd2" />
        <span className="ab-ring" />
        <span className="ab-sphere sp1" />
        <span className="ab-sphere sp2" />
      </div>
      <div className="wrap about2-grid">
        <div className="reveal">
          <span className="ab-eyebrow">About Me</span>
          <h2 className="ab-h2">
            From a single server to full platforms<span className="pd">.</span>
          </h2>
          <span className="ab-underline" />
          <p className="ab-p">
            I learned by doing — racking servers, fixing what broke at 3 a.m., automating the boring
            parts, hardening systems, and growing into someone who designs and runs reliable platforms
            end to end. Not a paper architect; a hands-on engineer.
          </p>
          <p className="ab-p">
            I&apos;m an <span className="accent">open-source advocate</span>: I&apos;d rather hand you
            something you fully own than lock you into expensive licences. Independent now under{" "}
            <span className="accent">Moniket Technologies</span> — no long client list yet, just two
            decades of real experience and a habit of writing everything down.
          </p>
          <div className="ab-values">
            {ABOUT_VALUES.map((v) => (
              <div className="ab-value" key={v.title}>
                <div className="ab-vic">
                  <Icon path={v.icon} size={24} stroke={1.8} />
                </div>
                <div className="ab-vtext">
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AboutSkills
          skills={about.skills.length ? about.skills.map((skill) => ({ ...skill, pct: skill.percentage })) : undefined}
        />
      </div>
    </section>
  );
}
