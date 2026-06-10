import { Reveal } from "./Reveal";
import { AnimatedCounter } from "./AnimatedCounter";
import training from "@/assets/mt-training.jpg";

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 px-5 md:px-10 bg-navy-dark overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <Reveal className="lg:col-span-6 order-2 lg:order-1" variant="fade-up">
          <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">About Us</span>
          <h2 className="font-display text-white text-4xl md:text-6xl tracking-wide mt-4 leading-[1.05]">
            BUILT FOR THE NEXT GENERATION OF CHENNAI FOOTBALL.
          </h2>
          <p className="mt-6 text-base md:text-lg text-soft leading-relaxed max-w-xl">
            Madras Tekkerz is a Chennai-based football academy and arena dedicated to developing
            young talent and giving the city a home for the beautiful game. From grassroots coaching
            to competitive squads in AIFF and TNFA leagues — every player has a path forward here.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              { num: 150, suffix: "+", label: "Academy Players" },
              { num: 8, suffix: "", label: "Coaching Staff" },
              { num: 3, suffix: "", label: "Age Groups" },
            ].map((s) => (
              <div key={s.label}>
                <AnimatedCounter
                  target={s.num}
                  suffix={s.suffix}
                  className="font-display text-3xl md:text-4xl text-white"
                  duration={2000}
                />
                <div className="mt-2 text-[11px] tracking-[0.2em] uppercase text-muted-w">{s.label}</div>
              </div>
            ))}
          </div>

          <a href="#teams" className="btn-outline mt-10">Meet the Teams →</a>
        </Reveal>

        <Reveal className="lg:col-span-6 order-1 lg:order-2" variant="clip-up" delay={150}>
          <div className="relative rounded-xl overflow-hidden border border-faint">
            <img src={training} alt="Academy training" loading="lazy" className="w-full h-[420px] md:h-[520px] object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
