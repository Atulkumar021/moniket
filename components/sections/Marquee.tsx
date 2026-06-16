export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="strip">
      <div className="marquee">
        {items.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
