import { useEffect, useRef, type ReactNode, type ElementType } from "react";

type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "scale" | "clip-up";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  variant?: RevealVariant;
  duration?: number;
  threshold?: number;
}

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  variant = "fade-up",
  duration,
  threshold = 0.02,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply duration override via CSS var if provided
    if (duration) el.style.setProperty("--reveal-duration", `${duration}ms`);

    // Safety fallback: reveal element after a maximum of 1500ms + delay if observer doesn't fire
    const fallbackTimeout = setTimeout(() => {
      if (!el.classList.contains("is-visible")) {
        el.classList.add("is-visible");
      }
    }, 1500 + delay);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(fallbackTimeout);
            setTimeout(() => el.classList.add("is-visible"), delay);
            obs.unobserve(el);
          }
        });
      },
      { threshold },
    );

    // If the element is already within the viewport (e.g., above-the-fold), reveal it immediately
    // This avoids elements being invisible on initial load when IntersectionObserver fires later.
    try {
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < (window.innerHeight || document.documentElement.clientHeight) * (1 - (threshold || 0));
      if (inViewport) {
        clearTimeout(fallbackTimeout);
        setTimeout(() => el.classList.add("is-visible"), delay);
        return () => {};
      }
    } catch (e) {
      // If accessing layout throws (e.g., during SSR), fall back to observer normally.
    }

    obs.observe(el);
    return () => {
      clearTimeout(fallbackTimeout);
      obs.disconnect();
    };
  }, [delay, duration, threshold]);

  return (
    <Tag ref={ref as never} className={`reveal reveal--${variant} ${className}`}>
      {children}
    </Tag>
  );
}
