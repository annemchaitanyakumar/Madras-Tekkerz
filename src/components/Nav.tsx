import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import mtLogo from "../assets/MT-Logo.png";

const links = [
  { label: "Home",        href: "#top",      id: "top" },
  { label: "About Us",   href: "#about",    id: "about" },
  { label: "Teams",      href: "#teams",    id: "teams" },
  { label: "Fixtures",   href: "#fixtures", id: "fixtures" },
  { label: "News",       href: "#news",     id: "news" },
  { label: "Gallery",    href: "#gallery",  id: "gallery" },
  { label: "Venue",      href: "#venue",    id: "venue" },
  { label: "Contact",    href: "#contact",  id: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("top");
  const [showLogo, setShowLogo] = useState(() => {
    try {
      return !!localStorage.getItem("quinzex_loader_seen_v1");
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const handleComplete = () => setShowLogo(true);
    window.addEventListener("mt-loader-complete", handleComplete);
    return () => window.removeEventListener("mt-loader-complete", handleComplete);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Track which section is in view */
  useEffect(() => {
    const targets = links
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1500px] mx-auto flex items-center justify-between px-5 md:px-10 py-3 md:py-4">

        {/* Logo */}
        <a href="#top" className="flex items-center gap-3 group">
          {showLogo && (
            <div className="relative">
              {/* Landing glow burst — fires once when logo arrives */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                initial={{ opacity: 0.9, scale: 1.8 }}
                animate={{ opacity: 0, scale: 3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  background: 'radial-gradient(circle, rgba(196,166,98,0.75) 0%, transparent 70%)',
                }}
              />
              <motion.img
                layoutId="mt-shared-logo"
                src={mtLogo}
                alt="Madras Tekkerz Football Academy"
                className="w-11 h-11 md:w-12 md:h-12 object-contain relative z-10"
                style={{ filter: 'drop-shadow(0 0 8px rgba(196,166,98,0.45))' }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 14,
                  mass: 0.6,
                }}
              />
            </div>
          )}
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display tracking-widest text-white text-sm md:text-base">MADRAS TEKKERZ</span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-soft">Football Academy</span>
          </div>
        </a>

        {/* Glass-pill nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.label}
                href={l.href}
                className={`nav-pill ${isActive ? "nav-pill--active" : ""}`}
              >
                <span className="nav-pill__text">{l.label}</span>
                <span className="nav-pill__glow" />
              </a>
            );
          })}
        </nav>

        {/* Mobile-only wordmark — centred between logo and hamburger */}
        <a
          href="#top"
          className="lg:hidden flex-1 text-center leading-none select-none"
          style={{
            fontFamily: '"Black Ops One", system-ui',
            fontWeight: 400,
            fontSize: 'clamp(1.05rem, 4.5vw, 1.35rem)',
            letterSpacing: '0.12em',
            background: 'linear-gradient(135deg, #F5A800 0%, #FFD966 42%, #1a1a1a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          MADRAS TEKKERZ
        </a>

        {/* Hamburger */}
        <div className="flex items-center">
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 grid place-items-center rounded-md border border-faint text-white"
          >
            <div className="space-y-[5px]">
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/90 backdrop-blur-xl border-t border-white/[0.06] px-6 py-5 flex flex-col gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`mobile-nav-pill ${active === l.id ? "mobile-nav-pill--active" : ""}`}
            >
              {l.label}
            </a>
          ))}

        </div>
      </div>
    </header>
  );
}
