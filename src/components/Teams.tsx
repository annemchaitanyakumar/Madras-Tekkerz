import { Reveal } from "./Reveal";
import team from "@/assets/mt-team.jpg";
import training from "@/assets/mt-training.jpg";
import action from "@/assets/turf-action.jpg";

const teams = [
  {
    name: "U13 Squad",
    img: team,
    record: "Unbeaten in AIFF & TNFA Leagues",
    detail: "16 players · 3 goalkeepers · 78 goals in AIFF sub-junior",
  },
  {
    name: "U15 Squad",
    img: training,
    record: "Reigning TNFA Youth League Champions",
    detail: "Table toppers of AIFF Junior League group stage",
  },
  {
    name: "U17 Squad",
    img: action,
    record: "AIFF Junior League Table Toppers",
    detail: "Reigning Champions of TNFA Youth League",
  },
];

export function Teams() {
  return (
    <section id="teams" className="relative py-20 md:py-28 px-5 md:px-10 bg-navy-deep">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="max-w-2xl mb-12" variant="fade-up">
          <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Our Teams</span>
          <h2 className="font-display text-white text-4xl md:text-6xl tracking-wide mt-4 leading-[1.05]">
            ONE ACADEMY. THREE SQUADS.
          </h2>
          <p className="mt-5 text-soft text-base md:text-lg">
            Every squad competes at the highest youth level in Indian football. Players train year-round
            with qualified coaches and play in national and state leagues.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {teams.map((t, i) => (
            <Reveal key={t.name} variant="scale" delay={i * 120}>
              <article className="news-card h-full">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.name}
                    loading="eager"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      console.warn(`Team image failed to load for ${t.name}:`, img.src);
                      img.src = training;
                    }}
                    onLoad={() => console.log(`Team image loaded for ${t.name}:`, t.img)}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-navy-deep to-transparent">
                    <h3 className="font-display text-white text-3xl tracking-wide">{t.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-gold">{t.record}</div>
                  <p className="mt-3 text-sm text-soft leading-relaxed">{t.detail}</p>
                  <a href="#fixtures" className="mt-5 inline-flex items-center gap-2 text-sm text-white hover:gap-3 transition-all">
                    View Fixtures <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
