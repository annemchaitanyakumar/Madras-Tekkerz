import { Reveal } from "./Reveal";

const fixtures = [
  { date: "MAR 22", day: "SAT", team: "U17", opp: "Chennai City FC", venue: "Home · Arena 1", time: "4:30 PM", comp: "AIFF Junior League" },
  { date: "MAR 29", day: "SAT", team: "U15", opp: "Bengaluru FC Youth", venue: "Away · Bengaluru", time: "5:00 PM", comp: "TNFA Youth League" },
  { date: "APR 05", day: "SAT", team: "U13", opp: "Sporting Goa", venue: "Home · Arena 1", time: "4:00 PM", comp: "AIFF Sub-Junior" },
  { date: "APR 12", day: "SAT", team: "U17", opp: "Kerala Blasters Youth", venue: "Away · Kochi", time: "5:30 PM", comp: "AIFF Junior League" },
];

export function Fixtures() {
  return (
    <section id="fixtures" className="relative py-20 md:py-28 px-5 md:px-10 bg-navy-dark">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-10" variant="fade-up">
          <div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Match Center</span>
            <h2 className="font-display text-white text-4xl md:text-6xl tracking-wide mt-4">UPCOMING FIXTURES</h2>
          </div>
          <a href="#fixtures" className="text-sm text-soft hover:text-white">Full schedule →</a>
        </Reveal>

        <div className="rounded-xl border border-faint overflow-hidden bg-navy">
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 md:px-6 py-4 text-[11px] tracking-[0.25em] uppercase text-muted-w border-b border-faint">
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Team</div>
            <div className="col-span-4">Opponent</div>
            <div className="col-span-3">Venue</div>
            <div className="col-span-1">Time</div>
            <div className="col-span-1 text-right">Tickets</div>
          </div>
          {fixtures.map((f, i) => (
            <Reveal 
              key={i} 
              variant={i % 2 === 0 ? "fade-left" : "fade-right"} 
              delay={i * 60}
              threshold={0.05}
            >
              <div className="grid grid-cols-12 gap-4 px-5 md:px-6 py-5 md:py-6 border-b border-faint last:border-0 hover:bg-white/[0.03] transition-colors items-center">
                <div className="col-span-4 md:col-span-2">
                  <div className="font-display text-2xl md:text-3xl text-white tracking-wide">{f.date}</div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-muted-w">{f.day}</div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <span className="text-[10px] font-bold tracking-widest text-navy-dark bg-white px-2 py-1 rounded">{f.team}</span>
                </div>
                <div className="col-span-6 md:col-span-4">
                  <div className="text-white font-semibold text-sm md:text-base">vs {f.opp}</div>
                  <div className="text-xs text-muted-w mt-1">{f.comp}</div>
                </div>
                <div className="col-span-8 md:col-span-3 text-sm text-soft">{f.venue}</div>
                <div className="col-span-2 md:col-span-1 text-sm text-white">{f.time}</div>
                <div className="col-span-2 md:col-span-1 text-right">
                  <a href="#contact" className="text-xs font-semibold text-gold hover:underline">Tickets →</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
