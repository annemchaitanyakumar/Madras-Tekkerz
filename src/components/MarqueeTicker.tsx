export function MarqueeTicker() {
  const items = [
    "FOOTBALL IS OUR PASSION",
    "MADRAS IS OUR EMOTION",
    "YOUTH ACADEMY TRIALS OPEN",
    "BOOK CHENNAI'S FINEST TURF",
    "EST. 2020",
    "TRAIN WITH CERTIFIED COACHES",
  ];

  return (
    <div className="marquee-ticker">
      <div className="marquee-content font-display text-[11px] md:text-[13px] text-white/90 tracking-[0.2em]">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-4 flex-shrink-0">
            <span>{item}</span>
            <svg className="w-2.5 h-2.5 text-gold fill-gold" viewBox="0 0 8 8" aria-hidden="true">
              <circle cx="4" cy="4" r="2.5" />
            </svg>
          </div>
        ))}
      </div>
      {/* Duplicate for infinite loop scroll */}
      <div className="marquee-content font-display text-[11px] md:text-[13px] text-white/90 tracking-[0.2em]" aria-hidden="true">
        {items.map((item, i) => (
          <div key={`dup-${i}`} className="flex items-center gap-4 flex-shrink-0">
            <span>{item}</span>
            <svg className="w-2.5 h-2.5 text-gold fill-gold" viewBox="0 0 8 8" aria-hidden="true">
              <circle cx="4" cy="4" r="2.5" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
