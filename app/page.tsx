import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ShopRitual from "@/components/ShopRitual";
import Journey from "@/components/Journey";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      {/* Section 1 — announcement marquee + header */}
      <AnnouncementBar />
      <Header />
      <main id="main">
        {/* Section 2 — hero */}
        <Hero />
        {/* Section 3 — about */}
        <About />
        {/* Section 4 — shop the ritual */}
        <ShopRitual />
        {/* Section 5 — how it wears (scroll story) */}
        <Journey />
      </main>
    </>
  );
}
