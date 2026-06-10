import React from "react";
import { Reveal } from "./Reveal";
import "./gallery.css";
import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-2.jpg";
import player3 from "@/assets/player-3.jpg";
import mtTeam from "@/assets/mt-team.jpg";
import mtStadium from "@/assets/mt-stadium.jpg";
import turfAction from "@/assets/turf-action.jpg";
import heroVideo from "@/assets/The weekend is finally here, and what better way to celebrate than with a thrilling game of foot.mp4";

const images: string[] = [player1, player2, player3, mtTeam, mtStadium, turfAction];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-20 md:py-28 bg-navy-dark overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <Reveal variant="fade-up" className="mb-10 md:mb-14">
          <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Moments</span>
          <h2 className="font-display text-white text-4xl md:text-6xl tracking-wide mt-4">GALLERY</h2>
        </Reveal>

        <div className="gallery-grid">
          {images.map((src, i) => (
            <Reveal 
              key={i} 
              as="div" 
              variant="scale" 
              delay={i * 80} 
              className="gallery-item"
              threshold={0.05}
            >
              <img src={src as unknown as string} alt={`sports-${i + 1}`} />
            </Reveal>
          ))}
          <Reveal 
            as="div" 
            variant="scale" 
            delay={images.length * 80} 
            className="gallery-item gallery-video"
            threshold={0.05}
          >
            <video
              src={heroVideo as unknown as string}
              controls
              playsInline
              preload="metadata"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
