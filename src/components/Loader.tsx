import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import mtLogo from '../assets/MT-Logo.png';

const textPrimary = "MADRAS";
const textSecondary = "TEKKERZ";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [showContent, setShowContent] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [fastSkip, setFastSkip] = useState(false);
  const [logoLaunched, setLogoLaunched] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem('quinzex_loader_seen_v1');
      if (seen) {
        setFastSkip(true);
        setShowContent(true);
      }
    } catch (e) {}
  }, [onComplete]);

  useEffect(() => {
    if (!fastSkip) return;
    let t: number | undefined;
    const onLoad = () => {
      try { localStorage.setItem('quinzex_loader_seen_v1', '1'); } catch {}
      window.dispatchEvent(new CustomEvent("mt-loader-complete"));
      setShowContent(false);
      onComplete && onComplete();
      if (t) clearTimeout(t);
    };
    if (document.readyState === 'complete') { onLoad(); return; }
    window.addEventListener('load', onLoad);
    t = window.setTimeout(onLoad, 800);
    return () => {
      window.removeEventListener('load', onLoad);
      if (t) clearTimeout(t);
    };
  }, [fastSkip, onComplete]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setUserInteracted(true);
        setShowStartButton(false);
      }
    };
    checkMobile();
  }, []);

  const handleStartExperience = () => {
    if ('vibrate' in navigator) (navigator as any).vibrate(150);
    setUserInteracted(true);
    setShowStartButton(false);
    try { localStorage.setItem('quinzex_loader_seen_v1', '1'); } catch {}
    window.dispatchEvent(new CustomEvent("mt-loader-complete"));
    setTimeout(() => { setShowContent(false); onComplete && onComplete(); }, 360);
  };

  // Cinematic launch sequence
  useEffect(() => {
    if (!userInteracted) return;

    // Step 1: after 1.6s → logo "launches" (scale + glow burst)
    const launchTimer = setTimeout(() => {
      setLogoLaunched(true);
    }, 1600);

    // Step 2: after 2.4s → overlay fades out, logo finishes flying to nav
    const completeTimer = setTimeout(() => {
      try { localStorage.setItem('quinzex_loader_seen_v1', '1'); } catch {}
      window.dispatchEvent(new CustomEvent("mt-loader-complete"));
      setShowContent(false);
      setTimeout(onComplete, 350);
    }, 2400);

    return () => {
      clearTimeout(launchTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, userInteracted]);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--background)', color: 'var(--gold)', willChange: 'opacity, transform' }}
        >
          {/* Subtle radial glow background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,166,98,0.07) 0%, transparent 70%)',
            }}
          />

          {/* Animated grid lines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(196,166,98,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(196,166,98,0.4) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--gold)" />
                <stop offset="50%" stopColor="var(--gold-light)" />
                <stop offset="100%" stopColor="var(--gold)" />
              </linearGradient>
              <filter id="logo-glow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>

          <div className="relative z-10 flex flex-col items-center justify-center gap-6 w-full px-8">

            {showStartButton && isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-4 left-4 right-4 z-50 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-md sm:bottom-8"
              >
                <div className="bg-[#0A0A0A]/95 backdrop-blur-xl border border-[#C4A662]/20 rounded-2xl p-4 sm:p-6 shadow-[0_8px_32px_rgba(196,166,98,0.15)]">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="text-[#C4A662] font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2">🍪 We value your privacy</h3>
                      <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">
                        We use cookies to enhance your experience and provide personalized content. By continuing, you agree to our use of cookies.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                    <button onClick={handleStartExperience} className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-[#C4A662] to-[#FAE19D] text-[#050505] font-semibold text-[10px] sm:text-xs tracking-wide uppercase rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(196,166,98,0.4)] active:scale-95">Accept All</button>
                    <button onClick={handleStartExperience} className="px-3 py-2 sm:px-4 sm:py-2.5 border border-[#C4A662]/30 text-[#C4A662] font-semibold text-[10px] sm:text-xs tracking-wide uppercase rounded-lg transition-all duration-300 hover:bg-[#C4A662]/10 active:scale-95">Decline</button>
                  </div>
                </div>
              </motion.div>
            )}

            {userInteracted && (
              <>
                {/* Logo — breathes in, then launches toward navbar */}
                <motion.div
                  className="w-full flex justify-center mb-4 relative"
                  initial={{ opacity: 0, y: 20, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {/* Gold glow ring that flares on launch */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={logoLaunched
                      ? { opacity: [0, 0.9, 0], scale: [0.6, 2.2, 3.5] }
                      : { opacity: [0, 0.15, 0.08], scale: [0.8, 1.1, 1.0] }
                    }
                    transition={logoLaunched
                      ? { duration: 0.6, ease: 'easeOut' }
                      : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                    }
                  >
                    <div style={{
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(196,166,98,0.55) 0%, transparent 70%)',
                    }} />
                  </motion.div>

                  <motion.img
                    layoutId="mt-shared-logo"
                    src={mtLogo}
                    alt="Madras Tekkerz logo"
                    className="object-contain relative z-10"
                    style={{ width: 160, height: 'auto' }}
                    animate={logoLaunched
                      ? { scale: [1, 1.18, 1.05], filter: ['drop-shadow(0 0 0px rgba(196,166,98,0))', 'drop-shadow(0 0 28px rgba(196,166,98,0.9))', 'drop-shadow(0 0 10px rgba(196,166,98,0.4))'] }
                      : { scale: [1, 1.03, 1], filter: 'drop-shadow(0 0 12px rgba(196,166,98,0.3))' }
                    }
                    transition={logoLaunched
                      ? { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }
                      : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                    }
                  />
                </motion.div>

                {/* Wordmark */}
                <motion.h1
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: logoLaunched ? 0 : 1, y: logoLaunched ? -8 : 0, scale: 1 }}
                  transition={{ delay: logoLaunched ? 0 : 0.4, duration: logoLaunched ? 0.3 : 0.9, ease: 'circOut' }}
                  className="mx-auto text-center font-display font-extrabold tracking-widest"
                  style={{
                    fontSize: 'clamp(2rem,6vw,6rem)',
                    maxWidth: '60%',
                    color: 'transparent',
                    WebkitTextStroke: '2px var(--gold-dark)',
                  }}
                >
                  {textPrimary} {textSecondary}
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: logoLaunched ? 0 : 1, y: logoLaunched ? 5 : 0 }}
                  transition={{ delay: logoLaunched ? 0 : 0.85, duration: 0.5, ease: 'easeOut' }}
                  className="text-[11px] tracking-[0.4em] uppercase text-gold/60 font-medium"
                >
                  Chennai's Premier Football Academy
                </motion.p>

                {/* Loading bar */}
                <motion.div
                  className="relative w-48 h-[2px] mt-4 rounded-full overflow-hidden"
                  style={{ background: 'rgba(196,166,98,0.12)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: logoLaunched ? 0 : 1 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-light), var(--gold-dark))' }}
                    initial={{ width: '0%' }}
                    animate={{ width: logoLaunched ? '100%' : '85%' }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />
                </motion.div>
              </>
            )}
          </div>

          {/* Trail streak when logo launches — horizontal light swipe */}
          {logoLaunched && (
            <motion.div
              className="absolute inset-x-0 pointer-events-none"
              style={{ top: '42%', height: 2 }}
              initial={{ scaleX: 0, opacity: 0, transformOrigin: 'center' }}
              animate={{ scaleX: [0, 1, 0], opacity: [0, 0.7, 0] }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(196,166,98,0.8), transparent)',
              }} />
            </motion.div>
          )}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
