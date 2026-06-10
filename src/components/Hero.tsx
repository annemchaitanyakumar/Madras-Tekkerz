import { useEffect, useRef } from "react";
import aerial from "@/assets/mt-aerial-day.jpg";
import heroVideo from "@/assets/The weekend is finally here, and what better way to celebrate than with a thrilling game of foot.mp4";

export function Hero() {
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const videoWrapper = videoWrapperRef.current;
          if (videoWrapper) {
            const scrollY = window.scrollY;
            // Subtly shift video downward to create depth and scale slightly
            videoWrapper.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0) scale(${1 + scrollY * 0.0003})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="top" className="relative w-full min-h-screen overflow-hidden">
      {/* Background with Parallax wrapper */}
      <div 
        ref={videoWrapperRef}
        className="absolute inset-x-0 -top-[10%] -bottom-[10%] w-full h-[120%] will-change-transform z-0"
      >
        <video
          src={heroVideo as unknown as string}
          poster={aerial}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,20,72,0.55) 0%, rgba(6,20,72,0.45) 40%, rgba(6,20,72,0.95) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-5 md:px-10 pt-28 pb-20">
        <h1 className="font-display text-white leading-[0.9] tracking-wide text-[18vw] md:text-[10vw]">
          <span className="block">WE ARE</span>
          <span className="block text-outline-w mt-2">MADRAS TEKKERZ</span>
        </h1>
        <p className="mt-8 md:mt-10 text-base md:text-2xl text-white font-light tracking-wide">
          Football is our passion, Madras is our emotion
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#about" className="btn-primary">Discover the Academy <span aria-hidden>→</span></a>
          <a href="#venue" className="btn-outline">Book the Venue</a>
        </div>
      </div>

      {/* Premium Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 text-[10px] tracking-[0.4em] uppercase text-white/50 font-medium">
        <span className="animate-pulse">Scroll</span>
        <div className="w-[18px] h-[28px] rounded-full border border-white/20 flex justify-center pt-1.5 shadow-[0_0_8px_rgba(255,255,255,0.05)]">
          <div className="w-[3px] h-[5px] bg-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
