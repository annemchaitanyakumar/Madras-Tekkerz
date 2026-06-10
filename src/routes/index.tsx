import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { News } from "@/components/News";
import { About } from "@/components/About";
import { Teams } from "@/components/Teams";
import { Fixtures } from "@/components/Fixtures";
import { Venue } from "@/components/Venue";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import Gallery from "@/components/Gallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Madras Tekkerz Football Academy — Chennai" },
      { name: "description", content: "Football is our passion, Madras is our emotion. Chennai's premier football academy and arena — youth squads, fixtures, news and venue hire." },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/src/assets/mt-stadium.jpg" },
      { property: "og:title", content: "Madras Tekkerz Football Academy — Chennai" },
      { property: "og:description", content: "Football is our passion, Madras is our emotion." },
    ],
  }),
  component: Index,
});

function Index() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsActivityLocation",
        "name": "Madras Tekkerz Turf — Kovilambakkam",
        "telephone": "+91 94446 43197",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4, 123A, Sunnambu Kolathur Main Rd, Rajam Nagar",
          "addressLocality": "Kovilambakkam",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600129",
          "addressCountry": "IN"
        },
        "sameAs": "https://www.google.com/maps/search/?api=1&query=W6W2%2BC6%20Chennai%20Tamil%20Nadu",
        "openingHours": "Mo-Su 00:00-23:59"
      },
      {
        "@type": "SportsActivityLocation",
        "name": "Madras Tekkerz Turf — Medavakkam",
        "telephone": "+91 94446 43197",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1/401 Thiruvalluvar Street, Vadakkupattu Main Rd",
          "addressLocality": "Medavakkam",
          "addressRegion": "Tamil Nadu",
          "postalCode": "600100",
          "addressCountry": "IN"
        },
        "sameAs": "https://www.google.com/maps/search/?api=1&query=W5MQ%2B8R%20Chennai%20Tamil%20Nadu",
        "openingHours": "Mo-Su 00:00-23:59"
      },
      {
        "@type": "Organization",
        "name": "Madras Tekkerz Football Academy",
        "url": "https://your-domain.example",
        "logo": "/src/assets/MT-Logo.png"
      }
    ]
  };

  return (
    <>
      <Nav />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <Hero />
          <About />
          <Teams />
          <News />
          <Fixtures />
          <Gallery />
          <Venue />
          <Contact />
        <Footer />
      </main>
    </>
  );
}
