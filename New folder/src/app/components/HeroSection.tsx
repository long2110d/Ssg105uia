import { motion } from "motion/react";
import { Grain, Scanlines, filmFilter } from "./Grain";

// Hero: split-canvas editorial — left panel solid red with nav/text, right panel cinematic photo
const HERO_PHOTO = "https://images.unsplash.com/photo-1676047871081-733dc414cbac?w=1400&h=900&fit=crop&auto=format";

const ticker = "Khúc nhạc \"Long Ngâm\" · Điệu \"Trống Cơm\" · Giã bạn · Tiến quân ca · Hướng về Hà Nội · Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng · Như Có Bác Trong Ngày Vui Đại Thắng · Trường Sơn Đông, Trường Sơn Tây · Nối Vòng Tay Lớn · Mùa Xuân Trên Thành Phố Hồ Chí Minh · Hà Nội mùa này vắng những cơn mưa · Thương Về Miền Trung · Việt Nam ơi · Thịnh vượng Việt Nam sáng ngời · Dòng sông lời thề · ";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[680px] overflow-hidden flex flex-col">

      {/* ── Ticker strip at very top ── */}
      <div
        className="relative z-20 bg-[#8B0000] overflow-hidden flex items-center"
        style={{ height: "34px", borderBottom: "1px solid rgba(194,164,126,0.25)" }}
      >
        <motion.div
          className="flex whitespace-nowrap gap-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "#C2A47E",
            textTransform: "uppercase",
          }}
        >
          {Array(8).fill(ticker).map((t, i) => (
            <span key={i} className="pr-0">{t}</span>
          ))}
        </motion.div>
      </div>

      {/* ── Main split canvas ── */}
      <div className="flex flex-1 relative flex-col lg:flex-row">

        {/* RIGHT: Cinematic photo (Background on mobile, Right panel on desktop) */}
        <div className="absolute inset-0 lg:relative lg:inset-auto lg:flex-1 bg-[#1A0A00]">
          <img
            src={HERO_PHOTO}
            alt="Hà Nội xưa — người bán rong trên phố cổ"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: filmFilter }}
          />
          {/* Desktop gradient fade into red panel */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#8B0000]/50 via-transparent to-[#1A1A1A]/60" />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-transparent" />
          
          {/* Mobile gradient overlay */}
          <div className="block lg:hidden absolute inset-0 bg-gradient-to-b from-[#8B0000]/95 via-[#3b0a0a]/80 to-[#100500]/90" />
          
          <Grain opacity={0.18} blend="overlay" />
          <Scanlines opacity={0.06} />

          {/* Desktop Float caption */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="hidden lg:block absolute bottom-8 left-8"
          >
            <p
              className="text-[#C2A47E]"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.1rem", opacity: 0.85 }}
            >
              "Đường phố Hà Nội — những năm 1970"
            </p>
          </motion.div>

          {/* Desktop VHS timestamp */}
          <div
            className="hidden lg:block absolute top-6 right-6 text-[#C2A47E] opacity-60"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em" }}
          >
            REC ● 19:24:07
          </div>
        </div>

        {/* LEFT: Red editorial panel (Foreground on mobile, Left panel on desktop) */}
        <div
          className="relative z-10 flex flex-col justify-between px-6 py-8 lg:px-10 lg:py-10 flex-shrink-0 w-full lg:w-[42%] flex-1 lg:flex-none bg-transparent lg:bg-[#8B0000] pointer-events-none"
        >
          {/* Grain only on desktop */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <Grain opacity={0.07} blend="multiply" />
          </div>

          <div className="pointer-events-auto h-full flex flex-col justify-between">
            {/* Logo / masthead and REC */}
            <div className="flex justify-between items-start">
              <div>
                <div
                  className="mb-1 text-[#F5F1E8]"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", opacity: 0.6 }}
                >
                  Dự án văn hoá · Vol. 01 · 2026
                </div>
                <div
                  className="hidden lg:block"
                  style={{ fontFamily: "'Fraunces', serif", fontSize: "1.05rem", fontWeight: 600, color: "#F5F1E8", fontVariationSettings: "'opsz' 9" }}
                >
                  Giai Điệu Một Thời
                </div>
              </div>
              
              {/* Mobile VHS timestamp */}
              <div
                className="block lg:hidden text-[#C2A47E] opacity-60 mt-0.5"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em" }}
              >
                REC ● 19:24:07
              </div>
            </div>

            {/* Headline */}
            <div className="flex-1 flex flex-col justify-center mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mb-4 lg:mb-6"
              >
                <span
                  className="bg-[#8B0000] lg:bg-transparent px-3 py-1.5 lg:px-0 lg:py-0 text-[#C2A47E]"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  Âm nhạc · Ký ức · Lịch sử
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="text-[#F5F1E8]"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(3.2rem, 12vw, 4.2rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  fontVariationSettings: "'opsz' 144",
                  marginBottom: "1.5rem",
                }}
              >
                Giai điệu
                <br />
                <em style={{ fontWeight: 400, fontVariationSettings: "'opsz' 144" }}>một thời,</em>
                <br />
                ký ức
                <br />
                <em style={{ fontWeight: 400, fontVariationSettings: "'opsz' 144" }}>một đời.</em>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex items-center gap-4 mb-10"
              >
                <div className="h-px flex-1 bg-[#C2A47E] opacity-40 hidden lg:block" />
                <p
                  className="text-[#F5F1E8] opacity-70 lg:text-center text-left"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", maxWidth: "250px", lineHeight: 1.6 }}
                >
                  Kết nối thế hệ trẻ với di sản âm nhạc Việt Nam
                </p>
                <div className="h-px flex-1 bg-[#C2A47E] opacity-40" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex flex-col gap-3"
              >
                <button
                  onClick={() => document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full py-3.5 text-[#8B0000] bg-[#F5F1E8] hover:bg-[#C2A47E] transition-colors duration-300 pointer-events-auto"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  Khám phá câu chuyện
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("memories");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                      // Wait for scroll to finish, then trigger open form
                      setTimeout(() => {
                        window.dispatchEvent(new CustomEvent("open-memory-form"));
                      }, 800);
                    }
                  }}
                  className="w-full py-3.5 text-[#C2A47E] border border-[#C2A47E] hover:bg-[#C2A47E]/10 transition-colors duration-300 pointer-events-auto"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 400,
                  }}
                >
                  Để lại ký ức
                </button>
              </motion.div>
            </div>
            
            {/* Mobile Float caption */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="block lg:hidden mt-8"
            >
              <p
                className="text-[#C2A47E]"
                style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.1rem", opacity: 0.85 }}
              >
                "Đường phố Hà Nội — những năm 1970"
              </p>
            </motion.div>
          </div>

          {/* Issue number bottom-right */}
          <div
            className="hidden lg:block absolute bottom-8 right-10 text-[#C2A47E] opacity-30 select-none pointer-events-none"
            style={{ fontFamily: "'Fraunces', serif", fontSize: "6rem", fontWeight: 900, lineHeight: 1, fontVariationSettings: "'opsz' 144" }}
          >
            01
          </div>
        </div>
      </div>
    </section>
  );
}
