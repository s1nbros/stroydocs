export default function Marquee({
  items,
  className = "",
  speed = "40s",
  separator = "✦",
}: {
  items: string[];
  className?: string;
  speed?: string;
  separator?: string;
}) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 sm:px-10">{t}</span>
          <span className="text-accent">{separator}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track" style={{ "--speed": speed } as React.CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
