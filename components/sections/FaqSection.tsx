import Faq from "@/components/Faq";

export default function FaqSection() {
  return (
    <section>
      <div className="wrap">
        <div className="head">
          <span className="eyebrow">FAQ</span>
          <h2>Common questions</h2>
        </div>
        <Faq />
      </div>
    </section>
  );
}
