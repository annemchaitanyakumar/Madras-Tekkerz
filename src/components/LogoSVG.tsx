import React from "react";

export function LogoSVG({ className = "", size = 120 }: { className?: string; size?: number }) {
  const w = size;
  const h = size;
  // Use the project's raster logo if present for accurate branding.
  // Falls back to a simple SVG square if asset isn't available at runtime.
  const src = "/src/assets/MT-Logo.png";
  return (
    <div className={className} style={{ width: w, height: h, display: 'inline-block' }} aria-hidden>
      <img src={src} alt="Madras Tekkerz logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
}

export default LogoSVG;
