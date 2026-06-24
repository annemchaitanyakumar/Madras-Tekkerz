import { Reveal } from "./Reveal";
import arena from "@/assets/turf-arena.jpg";
import mtStadium from "@/assets/mt-stadium11.jpg";

const perks = [
  "FIFA quality artificial turf",
  "Professional floodlighting",
  "Players lounge & locker rooms",
  "Covered parking & cafe",
  "Match officials available",
  "Live streaming on request",
];

const locations = [
  {
    name: "Madras Tekkerz Turf — Kovilambakkam",
    address: "4, 123A, Sunnambu Kolathur Main Rd, Rajam Nagar, Kovilambakkam, Chennai, Tamil Nadu 600129",
    phone: "+91 94446 43197",
    plusCode: "W6W2+C6",
    mapQuery: "W6W2+C6 Chennai Tamil Nadu",
    tag: "Arena 1",
  },
  {
    name: "Madras Tekkerz Turf — Medavakkam",
    address: "1/401 Thiruvalluvar Street, Vadakkupattu Main Rd, Medavakkam, Chennai, Tamil Nadu 600100",
    phone: "+91 94446 43197",
    plusCode: "W5MQ+8R",
    mapQuery: "W5MQ+8R Chennai Tamil Nadu",
    tag: "Arena 2",
  },
];

export function Venue() {
  return (
    <section id="venue" className="relative py-20 md:py-28 px-5 md:px-10 bg-navy-deep overflow-hidden">
      <div className="max-w-[1400px] mx-auto space-y-24">
        
        {/* Row 1: Arena Presentation */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Content Column (Left on desktop) */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <Reveal variant="fade-up">
              <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Hire the Arena</span>
              <h2 className="font-display text-white text-4xl md:text-5xl tracking-wide mt-4 leading-[1.05]">
                BOOK CHENNAI&apos;S FINEST FOOTBALL ARENA.
              </h2>
              <p className="mt-5 text-soft text-base">
                Open for tournaments, corporate events, league matches and private practice sessions.
                Hourly slots available 6 AM — 1 AM, seven days a week.
              </p>
            </Reveal>

            <Reveal variant="fade-up" delay={100}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-soft">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="fade-up" delay={200}>
              <div className="flex gap-4 flex-wrap pt-2">
                <a href="#contact" className="btn-primary">Enquire Now <span aria-hidden>→</span></a>
                <a href="#contact" className="btn-outline">Download Brochure</a>
              </div>
            </Reveal>
          </div>

          {/* Large Image Column (Right on desktop) */}
          <Reveal className="lg:col-span-7 order-1 lg:order-2" variant="clip-up">
            <div className="relative rounded-xl overflow-hidden border border-faint shadow-2xl group">
              <img
                src={arena}
                alt="Arena"
                loading="eager"
                className="w-full h-[320px] md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.src = mtStadium;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">Premium Facilities</div>
                  <div className="font-display text-white text-2xl md:text-3xl mt-2 tracking-wide">The Madras Tekkerz Arena</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Row 2: Location and Map Cards (Full width split layout) */}
        <div className="space-y-12 pt-16 border-t border-faint">
          <Reveal variant="fade-up" className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Our Venues</span>
            <h3 className="font-display text-white text-3xl md:text-5xl tracking-wide mt-2">FIND YOUR NEAREST TURF</h3>
            <p className="mt-4 text-soft text-base">
              We operate two state-of-the-art facilities in Chennai. Select your location to book or get directions.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {locations.map((loc, idx) => (
              <Reveal
                key={loc.name}
                variant="scale"
                delay={idx * 150}
                className="bg-black-card rounded-2xl border border-faint overflow-hidden shadow-xl flex flex-col justify-between"
              >
                {/* Details Header */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="bg-gold/15 text-gold border border-gold/30 text-[10px] tracking-[0.25em] font-bold uppercase px-3 py-1 rounded-full">
                      {loc.tag}
                    </span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-gold hover:underline flex items-center gap-1.5"
                    >
                      Open in Google Maps ↗
                    </a>
                  </div>
                  <h4 className="font-display text-white text-2xl md:text-3.5xl tracking-wide leading-tight">
                    {loc.name}
                  </h4>
                  <p className="text-soft text-sm md:text-base leading-relaxed min-h-[3rem]">
                    {loc.address}
                  </p>
                  
                  <div className="pt-4 border-t border-faint/60 grid grid-cols-2 gap-4 text-xs text-muted-w">
                    <div>
                      <span className="block font-semibold uppercase tracking-wider text-[10px] text-white/50 mb-1">Phone</span>
                      <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} className="text-white font-medium hover:text-gold transition-colors">{loc.phone}</a>
                    </div>
                    <div>
                      <span className="block font-semibold uppercase tracking-wider text-[10px] text-white/50 mb-1">Plus Code</span>
                      <span className="text-white font-medium">{loc.plusCode}</span>
                    </div>
                  </div>
                </div>

                {/* Map iframe - highly responsive and clear */}
                <div className="relative w-full h-[320px] md:h-[400px] bg-navy border-t border-faint overflow-hidden">
                  <iframe
                    title={loc.name}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(loc.mapQuery)}&output=embed`}
                    className="absolute inset-0 w-full h-full border-0"
                    style={{ filter: "invert(90%) hue-rotate(180deg) contrast(1.2)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
