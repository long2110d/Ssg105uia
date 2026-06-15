import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { Grain, filmFilter } from "./Grain";

export const FEATURE = {
  id: 1,
  era: "1960s",
  song: "Diễm Xưa",
  artist: "Trịnh Công Sơn",
  tag: "Tình ca phản chiến",
  desc: "Viết năm 1960 cho một cô gái tên Diễm, bài hát trở thành biểu tượng của tình yêu trong thời chiến — nơi mưa, ký ức và nỗi nhớ hoà làm một. Khánh Ly hát bài này lần đầu ở sân trường Văn Khoa và không ai trong số 5.000 khán giả có thể quên được khoảnh khắc đó.",
  img: "https://images.unsplash.com/photo-1699762707215-9f5bea5f6179?w=900&h=700&fit=crop&auto=format",
  readTime: "8 phút đọc",
};

export const STORIES = [
  {
    id: 2,
    era: "1970s",
    song: "Nối Vòng Tay Lớn",
    artist: "Trịnh Công Sơn",
    tag: "Nhạc thống nhất",
    desc: "Bài ca về một dân tộc khao khát hoà bình, vang lên ngay trong khoảnh khắc lịch sử 30/4/1975.",
    img: "https://images.unsplash.com/photo-1763741218869-c36c3d6b3227?w=600&h=400&fit=crop&auto=format",
    readTime: "5 phút",
  },
  {
    id: 3,
    era: "1980s",
    song: "Hoa Sữa",
    artist: "Hồng Đăng",
    tag: "Nhạc Hà Nội",
    desc: "Mùi hoa sữa và tiếng đàn piano trong đêm Hà Nội — một bài hát viết về khoảnh khắc chia tay không bao giờ quên.",
    img: "https://images.unsplash.com/photo-1725357599001-00709d50d32e?w=600&h=400&fit=crop&auto=format",
    readTime: "6 phút",
  },
  {
    id: 4,
    era: "1990s",
    song: "Phượng Hồng",
    artist: "Vũ Hoàng",
    tag: "Nhạc học trò",
    desc: "Hoa phượng đỏ và những kỳ thi — ký ức tuổi học trò gắn với tiếng chuông trường và lời tạm biệt.",
    img: "https://images.unsplash.com/photo-1593407741958-59550f282621?w=600&h=400&fit=crop&auto=format",
    readTime: "4 phút",
  },
];

function StorySmall({ story, index, onClick }: { story: typeof STORIES[0]; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.13 }}
      onClick={onClick}
      className="group cursor-pointer flex gap-4 items-start border-b border-[rgba(26,26,26,0.1)] pb-6 last:border-0 last:pb-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-24 h-24 bg-[#2A1A0A] overflow-hidden">
        <img
          src={story.img}
          alt={story.song}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ filter: filmFilter, opacity: 0.85 }}
        />
        <Grain opacity={0.14} />
        <div
          className="absolute top-1 left-1 px-1.5 py-0.5 text-[#F5F1E8]"
          style={{ backgroundColor: "#8B0000", fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
        >
          {story.era}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[#C2A47E] mb-1 truncate"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          {story.tag}
        </p>
        <h3
          className="text-[#1A1A1A] mb-2 leading-tight group-hover:text-[#8B0000] transition-colors duration-200"
          style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", fontWeight: 600, fontVariationSettings: "'opsz' 36" }}
        >
          {story.song}
          <span className="text-[#6B5F4E] text-sm font-normal italic"> — {story.artist}</span>
        </h3>
        <p
          className="text-[#6B5F4E] line-clamp-2"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", lineHeight: 1.55 }}
        >
          {story.desc}
        </p>
        <p
          className="mt-2 text-[#C2A47E]"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em" }}
        >
          {story.readTime}
        </p>
      </div>

      <ArrowUpRight
        size={14}
        className={`flex-shrink-0 mt-1 transition-all duration-200 ${hovered ? "text-[#8B0000] opacity-100" : "text-[#C2A47E] opacity-40"}`}
      />
    </motion.article>
  );
}

export function StoryCards() {
  const handleCardClick = (id: number) => {
    window.open(`/?story=${id}`, "_blank");
  };

  return (
    <section className="bg-[#F5F1E8] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section label row */}
        <div className="flex items-center gap-6 mb-14">
          <div className="w-2 h-8 bg-[#8B0000]" />
          <p
            className="text-[#1A1A1A]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase" }}
          >
            Kho tàng câu chuyện
          </p>
          <div className="flex-1 h-px bg-[rgba(26,26,26,0.1)]" />
          <button
            className="flex items-center gap-1.5 text-[#8B0000] hover:gap-3 transition-all duration-200"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Tất cả câu chuyện <ArrowUpRight size={12} />
          </button>
        </div>

        {/* Magazine grid: feature left (2/3) + stack right (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Feature card ── */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onClick={() => handleCardClick(FEATURE.id)}
            className="lg:col-span-2 group cursor-pointer"
          >
            {/* Full-bleed image */}
            <div className="relative bg-[#1A0A00] overflow-hidden mb-6" style={{ aspectRatio: "16/10" }}>
              <img
                src={FEATURE.img}
                alt={FEATURE.song}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                style={{ filter: filmFilter, opacity: 0.78 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/75 via-[#1A1A1A]/20 to-transparent" />
              <Grain opacity={0.15} blend="overlay" />

              {/* Corner brackets — VHS aesthetic */}
              {[["top-4 left-4", "border-t border-l"], ["top-4 right-4", "border-t border-r"], ["bottom-4 left-4", "border-b border-l"], ["bottom-4 right-4", "border-b border-r"]].map(([pos, border]) => (
                <div key={pos} className={`absolute ${pos} w-5 h-5 ${border} border-[#C2A47E]/50`} />
              ))}

              {/* Badge */}
              <div className="absolute top-4 left-4 ml-6">
                <span
                  className="px-2.5 py-1 bg-[#8B0000] text-[#F5F1E8]"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                >
                  Bài nổi bật
                </span>
              </div>

              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full border border-[#F5F1E8]/70 flex items-center justify-center bg-[#1A1A1A]/30 backdrop-blur-sm">
                  <Play size={20} fill="#F5F1E8" className="ml-1 text-[#F5F1E8]" />
                </div>
              </div>

              {/* Bottom caption overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6">
                <p
                  className="text-[#C2A47E] mb-1"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
                >
                  {FEATURE.era} · {FEATURE.tag}
                </p>
                <h2
                  className="text-[#F5F1E8] mb-0.5"
                  style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", fontWeight: 900, lineHeight: 1.1, fontVariationSettings: "'opsz' 72" }}
                >
                  {FEATURE.song}
                </h2>
                <p
                  className="text-[#D9D3C4]"
                  style={{ fontFamily: "'Fraunces', serif", fontSize: "0.95rem", fontStyle: "italic", fontVariationSettings: "'opsz' 9" }}
                >
                  — {FEATURE.artist}
                </p>
              </div>
            </div>

            {/* Feature body text */}
            <div className="flex gap-6 items-start">
              <div
                className="flex-shrink-0 text-[#8B0000] opacity-20 select-none leading-none"
                style={{ fontFamily: "'Fraunces', serif", fontSize: "4rem", fontWeight: 900, lineHeight: 0.85 }}
              >
                "
              </div>
              <div>
                <p
                  className="text-[#1A1A1A] leading-relaxed mb-4"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.75 }}
                >
                  {FEATURE.desc}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-[rgba(26,26,26,0.1)]" />
                  <span
                    className="text-[#6B5F4E]"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    {FEATURE.readTime}
                  </span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* ── Right column: stacked small cards ── */}
          <div className="flex flex-col gap-6 lg:border-l lg:border-[rgba(26,26,26,0.1)] lg:pl-8">
            <p
              className="text-[#6B5F4E] mb-2"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
            >
              Thêm câu chuyện
            </p>
            {STORIES.map((story, i) => (
              <StorySmall key={story.id} story={story} index={i} onClick={() => handleCardClick(story.id)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
