// Renders the brand logo PNG. Place the file at: public/logo.png
export default function LogoSvg({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.png" alt="Moniket Technologies" className={className} />
  );
}
