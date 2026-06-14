import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Grain } from "./Grain";

const PERIODS = [
  {
    id: 1,
    frame: "01",
    years: "1954 – 1960",
    label: "Thời kỳ Tập Kết",
    color: "#8B0000",
    songs: ["Câu Hò Bên Bờ Hiền Lương", "Tiếng Hát Từ Thành Phố Mang Tên Người", "Xa Khơi"],
    body: "Đất nước chia đôi. Tiếng nhạc theo dòng người tập kết ra Bắc — một cuộc di cư văn hoá chưa từng có. Những bài ca sinh ra từ nỗi đau chia cắt và khát vọng thống nhất.",
    detail: "Âm nhạc giai đoạn này mang âm hưởng dân ca đồng bằng Bắc Bộ xen lẫn điệu hò miền Trung — một cuộc gặp gỡ giữa hai truyền thống.",
  },
  {
    id: 2,
    frame: "02",
    years: "1960 – 1975",
    label: "Nhạc Phản Chiến",
    color: "#6B3A1A",
    songs: ["Diễm Xưa", "Gia Tài Của Mẹ", "Nối Vòng Tay Lớn"],
    body: "Trịnh Công Sơn và thế hệ da vàng. Âm nhạc như tiếng khóc, như lời cầu nguyện — không bên nào, chỉ vì con người.",
    detail: "Trịnh viết hơn 600 ca khúc. Trong đó có những bài bị cấm ở cả hai miền, nhưng người ta vẫn hát trong bóng tối.",
  },
  {
    id: 3,
    frame: "03",
    years: "1975 – 1986",
    label: "Âm Nhạc Thống Nhất",
    color: "#2D4A3E",
    songs: ["Đất Nước Trọn Niềm Vui", "Thành Phố Hồ Chí Minh", "Mùa Xuân Đầu Tiên"],
    body: "Ngày 30/4/1975 — cánh cửa mở ra. Âm nhạc hoà bình đã đến nhưng mang theo nỗi trống rỗng khó gọi tên của thời hậu chiến.",
    detail: "Văn Cao viết Mùa Xuân Đầu Tiên trong những ngày đầu thống nhất — bài hát ông coi là đẹp nhất, nhưng cũng bị cấm dài nhất.",
  },
  {
    id: 4,
    frame: "04",
    years: "1986 – 1995",
    label: "Thời Kỳ Đổi Mới",
    color: "#4A3728",
    songs: ["Hoa Sữa", "Một Mình", "Hà Nội Mùa Vắng Những Cơn Mưa"],
    body: "Đổi mới mở cánh cửa. Nhạc pop, nhạc rock Việt bắt đầu tìm chỗ đứng bên cạnh những bản ballad mang hơi thở phố thị Hà Nội.",
    detail: "Thanh Lam, Hồng Nhung, Mỹ Linh — ba giọng ca định hình khẩu vị âm nhạc của cả thế hệ đô thị hóa đầu tiên.",
  },
  {
    id: 5,
    frame: "05",
    years: "1995 – 2007",
    label: "V-Pop Ra Đời",
    color: "#2C3A5A",
    songs: ["Bụi Bay Vào Mắt", "Nụ Hôn Đầu", "Đêm Nay Ai Khóc"],
    body: "Làn sóng nhạc trẻ từ hải ngoại tràn về. V-Pop ra đời giữa màu sắc MTV và khát vọng của thế hệ trẻ thành thị muốn có tiếng nói riêng.",
    detail: "Mắt Ngọc, Lam Trường, Mỹ Tâm — những gương mặt đầu tiên của ngành công nghiệp giải trí hiện đại Việt Nam.",
  },
  {
    id: 6,
    frame: "06",
    years: "2007 – nay",
    label: "Kỷ Nguyên Indie",
    color: "#1A1A2E",
    songs: ["Chạy Ngay Đi", "Ngày Chưa Giông Bão", "Có Chắc Yêu Là Đây"],
    body: "Gen Z dùng âm nhạc để kể lại ký ức cha ông — indie Việt, R&B, lo-fi và hoài cổ trở thành ngôn ngữ kết nối hai thế hệ.",
    detail: "Cá Hồi Hoang, Tăng Duy Tân, tlinh — nghệ sĩ trẻ hôm nay đang viết lại bản nhạc của ký ức dân tộc theo cách riêng của họ.",
  },
];

// Film sprocket hole component
function Sprocket({ count = 8 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-[22px] py-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-5 h-3.5 rounded-sm border border-[rgba(194,164,126,0.25)] bg-[#0D0D0D]"
        />
      ))}
    </div>
  );
}

export function TimelineSection() {
  const [active, setActive] = useState(0);
  const period = PERIODS[active];

  return (
    <section className="bg-[#0D0D0D] py-24 overflow-hidden">
      {/* Header */}
      <div className="px-6 max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-2 h-8 bg-[#8B0000]" />
          <p
            className="text-[#6B5F4E]"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase" }}
          >
            Dòng chảy lịch sử
          </p>
        </div>
        <h2
          className="text-[#F5F1E8]"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            fontVariationSettings: "'opsz' 144",
          }}
        >
          Âm nhạc Việt Nam
          <br />
          <em className="text-[#C2A47E]" style={{ fontWeight: 400, fontVariationSettings: "'opsz' 144" }}>
            qua từng thời đại
          </em>
        </h2>
      </div>

      {/* Film strip layout */}
      <div className="flex">
        {/* Left sprocket strip */}
        <div
          className="flex-shrink-0 w-10 flex flex-col items-center py-4 relative"
          style={{ backgroundColor: "#1A1A1A", borderRight: "1px solid rgba(194,164,126,0.1)" }}
        >
          <Sprocket count={12} />
          <Grain opacity={0.1} />
        </div>

        {/* Period selector — film frames */}
        <div
          className="flex-shrink-0 overflow-y-auto"
          style={{ width: "280px", backgroundColor: "#141414", scrollbarWidth: "none" }}
        >
          {PERIODS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className="w-full text-left border-b border-[rgba(194,164,126,0.08)] relative overflow-hidden group transition-all duration-200"
              style={{
                padding: "1.25rem 1.5rem",
                backgroundColor: i === active ? "#1E1E1E" : "transparent",
                borderLeft: i === active ? `3px solid #8B0000` : "3px solid transparent",
              }}
            >
              {/* Frame number */}
              <div
                className="absolute top-3 right-4 opacity-20"
                style={{ fontFamily: "'Fraunces', serif", fontSize: "1.8rem", fontWeight: 900, color: "#C2A47E", lineHeight: 1, fontVariationSettings: "'opsz' 72" }}
              >
                {p.frame}
              </div>

              <p
                className="mb-1"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: i === active ? "#C2A47E" : "#4A4A4A",
                  transition: "color 0.2s",
                }}
              >
                {p.years}
              </p>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "0.95rem",
                  fontWeight: i === active ? 600 : 400,
                  color: i === active ? "#F5F1E8" : "#5A5A5A",
                  fontVariationSettings: "'opsz' 36",
                  lineHeight: 1.3,
                  transition: "color 0.2s",
                }}
              >
                {p.label}
              </p>
            </button>
          ))}
        </div>

        {/* Right sprocket strip */}
        <div
          className="flex-shrink-0 w-10 flex flex-col items-center py-4 relative"
          style={{ backgroundColor: "#1A1A1A", borderRight: "1px solid rgba(194,164,126,0.1)" }}
        >
          <Sprocket count={12} />
          <Grain opacity={0.1} />
        </div>

        {/* Detail panel */}
        <div className="flex-1 px-10 py-8 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Period badge */}
              <div
                className="inline-flex items-center gap-3 px-4 py-2 mb-8"
                style={{ backgroundColor: period.color }}
              >
                <span
                  className="text-[#F5F1E8]"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
                >
                  {period.years}
                </span>
                <span className="w-px h-3 bg-[#F5F1E8]/30" />
                <span
                  className="text-[#F5F1E8]"
                  style={{ fontFamily: "'Fraunces', serif", fontSize: "0.85rem", fontStyle: "italic", fontVariationSettings: "'opsz' 9" }}
                >
                  {period.label}
                </span>
              </div>

              <h3
                className="text-[#F5F1E8] mb-4"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  fontVariationSettings: "'opsz' 72",
                }}
              >
                {period.label}
              </h3>

              <p
                className="text-[#A09080] mb-6 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "560px" }}
              >
                {period.body}
              </p>

              {/* Italic detail */}
              <div className="border-l-2 border-[#8B0000] pl-5 mb-8">
                <p
                  className="text-[#6B5F4E] italic"
                  style={{ fontFamily: "'Fraunces', serif", fontSize: "0.9rem", fontVariationSettings: "'opsz' 9", lineHeight: 1.65 }}
                >
                  {period.detail}
                </p>
              </div>

              {/* Songs list */}
              <div>
                <p
                  className="text-[#4A4A4A] mb-4"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
                >
                  Những bài hát tiêu biểu
                </p>
                <div className="flex flex-col gap-2">
                  {period.songs.map((song, j) => (
                    <motion.div
                      key={song}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.09 + 0.2 }}
                      className="flex items-center gap-4 py-3 border-b border-[rgba(255,255,255,0.05)] group cursor-pointer hover:border-[#8B0000]/30 transition-colors"
                    >
                      <span
                        className="w-8 text-[#8B0000] text-right flex-shrink-0"
                        style={{ fontFamily: "'Fraunces', serif", fontSize: "0.75rem", fontVariationSettings: "'opsz' 9" }}
                      >
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="text-[#D9D3C4] group-hover:text-[#F5F1E8] transition-colors"
                        style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", fontWeight: 400, fontVariationSettings: "'opsz' 36" }}
                      >
                        {song}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Nav arrows */}
              <div className="flex gap-3 mt-10">
                <button
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="px-5 py-2.5 border border-[rgba(194,164,126,0.2)] text-[#6B5F4E] hover:text-[#C2A47E] hover:border-[#C2A47E] transition-all disabled:opacity-20 disabled:pointer-events-none"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                >
                  ← Trước
                </button>
                <button
                  onClick={() => setActive(Math.min(PERIODS.length - 1, active + 1))}
                  disabled={active === PERIODS.length - 1}
                  className="px-5 py-2.5 border border-[rgba(194,164,126,0.2)] text-[#6B5F4E] hover:text-[#C2A47E] hover:border-[#C2A47E] transition-all disabled:opacity-20 disabled:pointer-events-none"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                >
                  Tiếp →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
