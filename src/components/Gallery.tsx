import React from "react";
import { Reveal } from "./Reveal";
import "./gallery.css";
import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-2.jpg";
import player3 from "@/assets/player-3.jpg";
import mtTeam from "@/assets/mt-team.jpg";
import mtStadium from "@/assets/mt-stadium.mp4";
import turfAction from "@/assets/turf-action.jpg";
import dar6551 from "@/assets/DAR_6551.JPG";
import img1068 from "@/assets/IMG_1068.JPG";
import img2847 from "@/assets/IMG_2847.JPG";
import img2941 from "@/assets/IMG_2941.JPG";

const images: string[] = [
  player1,     // Column 1
  mtTeam,      // Column 1
  player2,     // Column 1
  player3,     // Column 2
  mtStadium,   // Column 2
  img2941,     // Column 2 (Center Column)
  dar6551,     // Column 2
  img1068,     // Column 3
  turfAction,  // Column 3
  img2847,     // Column 3
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-20 md:py-28 bg-navy-dark overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <Reveal variant="fade-up" className="mb-10 md:mb-14">
          <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Moments</span>
          <h2 className="font-display text-white text-4xl md:text-6xl tracking-wide mt-4">GALLERY</h2>
        </Reveal>

        <div className="gallery-grid">
          {images.map((src, i) => {
            const isVideo = typeof src === "string" && src.includes(".mp4");
            return (
              <Reveal 
                key={i} 
                as="div" 
                variant="scale" 
                delay={i * 80} 
                className={`gallery-item ${isVideo ? "video-item" : ""}`}
                threshold={0.05}
              >
                {isVideo ? (
                  <video
                    src={src as unknown as string}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img src={src as unknown as string} alt={`sports-${i + 1}`} />
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
