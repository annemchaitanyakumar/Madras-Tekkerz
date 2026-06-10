import { useEffect, useState } from "react";
import { LogoSVG } from "./LogoSVG";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onLoad = () => setVisible(false);
    if (document.readyState === "complete") {
      setVisible(false);
    } else {
      window.addEventListener("load", onLoad);
      const t = setTimeout(() => setVisible(false), 3000);
      return () => {
        window.removeEventListener("load", onLoad);
        clearTimeout(t);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div id="preloader-overlay" className="fixed inset-0 z-50 grid place-items-center preloader-overlay">
      <div className="preloader-inner">
        <div className="preloader-logo" aria-hidden>
          <LogoSVG className="preloader-svg" size={96} />
          <span className="preloader-ring" />
        </div>
      </div>
    </div>
  );
}
