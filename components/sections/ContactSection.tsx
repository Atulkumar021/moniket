import LeadForm from "@/components/LeadForm";

export default function ContactSection() {
  return (
    <section id="contact" className="alt">
      <div className="wrap">
        <div className="cta reveal" style={{ marginBottom: 46 }}>
          <h2>Ready when you are</h2>
          <p>Tell me what you&apos;re dealing with — I&apos;ll be honest about whether I can help, and how.</p>
          <a className="btn btn-soft" href="#leadForm">
            Send a message →
          </a>
        </div>
        <div className="contact-grid">
          <div className="reveal">
            <div className="info-row">
              <div className="ic">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 6L2 7" />
                </svg>
              </div>
              <div>
                <div className="l">Email</div>
                <div className="v">hello@moniket.tech</div>
              </div>
            </div>
            <div className="info-row">
              <div className="ic">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="l">Based in</div>
                <div className="v">Delhi, India · Remote worldwide</div>
              </div>
            </div>
            <div className="info-row">
              <div className="ic">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <div className="l">Response time</div>
                <div className="v">Usually within a day</div>
              </div>
            </div>
            <p style={{ fontSize: ".88rem", color: "var(--muted)", marginTop: ".8rem" }}>
              Tip: send a message and watch it appear instantly in the admin <strong>Hire Me</strong> panel.
            </p>
          </div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
