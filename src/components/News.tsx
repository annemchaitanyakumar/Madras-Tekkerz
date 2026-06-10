import { Reveal } from "./Reveal";
import { MarqueeTicker } from "./MarqueeTicker";
import news1 from "@/assets/mt-team.jpg";
import news2 from "@/assets/turf-trophy.jpg";
import news3 from "@/assets/turf-action.jpg";

const items = [
  {
    img: news1,
    tag: "Partnership",
    title: "Madras Tekkerz Signs Landmark Partnership with SRM University",
    date: "Mar 18, 2026",
  },
  {
    img: news2,
    tag: "Fixtures & Results",
    title: "Reigning Champions of TNFA Youth League and AIFF Toppers",
    date: "Mar 02, 2026",
  },
  {
    img: news3,
    tag: "Tournament",
    title: "Madras Tekkerz Invitational Cup — Registrations Open",
    date: "Feb 21, 2026",
  },
];

export function News() {
  return (
    <section id="news" className="relative pt-20 md:pt-28 pb-0 bg-navy-deep overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 mb-20">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14" variant="fade-up">
          <h2 className="font-display text-white text-4xl md:text-6xl tracking-wide">LATEST NEWS</h2>
          <a href="#news" className="text-sm text-soft hover:text-white transition-colors">View all news →</a>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((n, i) => (
            <Reveal key={n.title} variant="fade-up" delay={i * 120}>
              <a href="#news" className="news-card block h-full group">
                <div className="relative h-52 overflow-hidden">
                  <img src={n.img} alt={n.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 bg-white text-navy-dark text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-semibold">
                    {n.tag}
                  </span>
                </div>
                <div className="p-5 md:p-6">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-muted-w">{n.date}</div>
                  <h3 className="font-display text-xl md:text-2xl text-white mt-3 leading-tight tracking-wide">
                    {n.title}
                  </h3>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm text-white group-hover:gap-3 transition-all">
                    Know More <span aria-hidden>→</span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      
      {/* Flush marquee ticker banner */}
      <div className="w-full mt-12">
        <MarqueeTicker />
      </div>
    </section>
  );
}
