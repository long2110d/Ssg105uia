import "../styles/fonts.css";
import { motion } from "motion/react";
import { SiteNav } from "./components/SiteNav";
import { HeroSection } from "./components/HeroSection";
import { StoryCards } from "./components/StoryCards";
import { TimelineSection } from "./components/TimelineSection";
import { VideoSection } from "./components/VideoSection";
import { MemoryWall } from "./components/MemoryWall";
import { SiteFooter } from "./components/SiteFooter";
import { Grain } from "./components/Grain";

function RedQuoteBand() {
  return (
    <div className="relative bg-[#8B0000] py-20 px-6 overflow-hidden">
      <Grain opacity={0.06} blend="multiply" />
      {/* Watermark numeral */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.06]"
        style={{ fontFamily: "'Fraunces', serif", fontSize: "22rem", fontWeight: 900, color: "#F5F1E8", lineHeight: 1, fontVariationSettings: "'opsz' 144" }}
      >
        &
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <p
          className="text-[#C2A47E] mb-6"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase" }}
        >
          Trịnh Công Sơn · 1939 – 2001
        </p>
        <blockquote
          className="text-[#F5F1E8]"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.4,
            fontVariationSettings: "'opsz' 72",
          }}
        >
          "Người ta có thể mất đi tất cả — nhà cửa, quê hương, người thân — nhưng không ai có thể lấy đi được giai điệu đã khắc vào trái tim."
        </blockquote>
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F5F1E8" }}
    >
      <SiteNav />

      <main>
        <section id="hero">
          <HeroSection />
        </section>

        <section id="stories">
          <StoryCards />
        </section>

        <RedQuoteBand />

        <section id="timeline">
          <TimelineSection />
        </section>

        <section id="videos">
          <VideoSection />
        </section>

        <section id="memories">
          <MemoryWall />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
