import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X, Clock, Tag } from "lucide-react";
import { Grain, filmFilter } from "./Grain";

const VIDEOS = [
  {
    id: "v1",
    title: "Diễm Xưa — Khánh Ly (1968)",
    subtitle: "Thu âm đầu tiên tại Sài Gòn trong không khí chiến tranh",
    duration: "4 phút 32",
    tag: "Tư liệu lịch sử",
    thumb: "https://images.unsplash.com/photo-1780402373446-e9884cab0bcd?w=900&h=506&fit=crop&auto=format",
    ytId: "VN-fLFYYrGw",
  },
  {
    id: "v2",
    title: "Nối Vòng Tay Lớn — Hoà nhạc 30/4/1975",
    subtitle: "Khoảnh khắc lịch sử khi cả nước cất tiếng hát trong ngày thống nhất",
    duration: "6 phút 14",
    tag: "Sự kiện lịch sử",
    thumb: "https://images.unsplash.com/photo-1663489587403-793b6eb814cd?w=900&h=506&fit=crop&auto=format",
    ytId: "RyeYKJMkvCM",
  },
  {
    id: "v3",
    title: "Âm nhạc Hà Nội thập niên 80",
    subtitle: "Phim tư liệu về đời sống âm nhạc Hà Nội những năm đầu Đổi Mới",
    duration: "12 phút 05",
    tag: "Phim tư liệu",
    thumb: "https://images.unsplash.com/photo-1746645855907-092a323bb3eb?w=900&h=506&fit=crop&auto=format",
    ytId: "dQw4w9WgXcQ",
  },
];

export function VideoSection() {
  const [active, setActive] = useState<string | null>(null);
  const activeVideo = VIDEOS.find((v) => v.id === active);

  return (
    <section className="bg-[#F5F1E8] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-6 mb-14">
          <div className="w-2 h-8 bg-[#8B0000]" />
          <p
            className="text-[#1A1A1A]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase" }}
          >
            Trải nghiệm nghe — nhìn
          </p>
          <div className="flex-1 h-px bg-[rgba(26,26,26,0.1)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left: large featured video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:row-span-2"
          >
            <VideoCard video={VIDEOS[0]} large onPlay={setActive} />
          </motion.div>

          {/* Right: two smaller */}
          {VIDEOS.slice(1).map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <VideoCard video={video} large={false} onPlay={setActive} />
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p
            className="text-[#6B5F4E] mx-auto"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              maxWidth: "600px",
              lineHeight: 1.5,
            }}
          >
            "Âm nhạc là cách duy nhất để giữ lại những gì thời gian muốn lấy đi..."
          </p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && activeVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: "rgba(10,5,0,0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="w-full max-w-5xl px-4"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Meta */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p
                    className="text-[#C2A47E] mb-1"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
                  >
                    {activeVideo.tag}
                  </p>
                  <h3
                    className="text-[#F5F1E8]"
                    style={{ fontFamily: "'Fraunces', serif", fontSize: "1.2rem", fontWeight: 600, fontVariationSettings: "'opsz' 36" }}
                  >
                    {activeVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="text-[#6B5F4E] hover:text-[#F5F1E8] transition-colors p-1"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Player */}
              <div className="relative bg-[#0D0D0D]" style={{ aspectRatio: "16/9" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.ytId}?autoplay=1&rel=0&modestbranding=1`}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="w-full h-full absolute inset-0"
                  title={activeVideo.title}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function VideoCard({ video, large, onPlay }: { video: typeof VIDEOS[0]; large: boolean; onPlay: (id: string) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative group cursor-pointer bg-[#1A0A00] overflow-hidden"
      style={{ aspectRatio: large ? "4/3" : "16/9", height: "100%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(video.id)}
    >
      <img
        src={video.thumb}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: filmFilter, opacity: hovered ? 0.55 : 0.72 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-transparent to-transparent" />
      <Grain opacity={0.14} blend="overlay" />

      {/* Play ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="rounded-full border flex items-center justify-center backdrop-blur-sm"
          style={{
            width: large ? "72px" : "52px",
            height: large ? "72px" : "52px",
            borderColor: hovered ? "#C2A47E" : "rgba(245,241,232,0.5)",
            backgroundColor: "rgba(26,26,26,0.25)",
            transition: "border-color 0.3s",
          }}
          animate={{ scale: hovered ? 1.06 : 1 }}
        >
          <Play
            fill={hovered ? "#C2A47E" : "#F5F1E8"}
            className="ml-0.5"
            size={large ? 24 : 16}
            style={{ color: hovered ? "#C2A47E" : "#F5F1E8", transition: "color 0.3s" }}
          />
        </motion.div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 inset-x-0 p-5">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="flex items-center gap-1.5 text-[#C2A47E]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            <Tag size={10} /> {video.tag}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#6B5F4E]" />
          <span
            className="flex items-center gap-1.5 text-[#6B5F4E]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem" }}
          >
            <Clock size={10} /> {video.duration}
          </span>
        </div>
        <h3
          className="text-[#F5F1E8]"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: large ? "clamp(1.1rem, 1.8vw, 1.6rem)" : "0.95rem",
            fontWeight: 600,
            lineHeight: 1.2,
            fontVariationSettings: "'opsz' 36",
          }}
        >
          {video.title}
        </h3>
        {large && (
          <p
            className="text-[#A09080] mt-2"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", lineHeight: 1.55 }}
          >
            {video.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
