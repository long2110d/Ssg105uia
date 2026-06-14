import { motion } from "motion/react";
import { Grain } from "./Grain";
import { Instagram, Youtube, Facebook } from "lucide-react";

const COLS = [
  {
    head: "Khám phá",
    links: ["Câu chuyện âm nhạc", "Dòng chảy lịch sử", "Tư liệu video", "Tường ký ức"],
  },
  {
    head: "Dự án",
    links: ["Về chúng tôi", "Đóng góp tư liệu", "Hợp tác", "Liên hệ"],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-[#1A1A1A] overflow-hidden">
      <Grain opacity={0.07} />

      {/* Masthead band */}
      <div
        className="border-b border-[rgba(194,164,126,0.1)] px-6 py-5 flex items-center justify-between"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-1 h-5 bg-[#8B0000]" />
          <p
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: "#4A4A4A", textTransform: "uppercase" }}
          >
            Giai Điệu Một Thời · Vol. 01 · Xuất bản 2024 · Hà Nội, Việt Nam
          </p>
        </div>
        <div className="flex gap-1">
          {[Instagram, Youtube, Facebook].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-8 h-8 flex items-center justify-center text-[#4A4A4A] hover:text-[#C2A47E] transition-colors"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>

      {/* Central quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="py-20 px-6 text-center border-b border-[rgba(194,164,126,0.08)]"
      >
        <p
          className="text-[#C2A47E] mx-auto mb-4"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(1.4rem, 3vw, 2.4rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1.45,
            maxWidth: "680px",
            fontVariationSettings: "'opsz' 72",
          }}
        >
          "Âm nhạc là ký ức không thể bị lãng quên — nó sống mãi trong từng nhịp đập của trái tim."
        </p>
        <p
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#4A4A4A", textTransform: "uppercase" }}
        >
          — Giai Điệu Một Thời
        </p>
      </motion.div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="mb-4">
            <p
              style={{ fontFamily: "'Fraunces', serif", fontSize: "1.6rem", fontWeight: 900, color: "#F5F1E8", lineHeight: 1, fontVariationSettings: "'opsz' 72" }}
            >
              Giai Điệu
            </p>
            <p
              style={{ fontFamily: "'Fraunces', serif", fontSize: "1.6rem", fontWeight: 400, fontStyle: "italic", color: "#C2A47E", lineHeight: 1, fontVariationSettings: "'opsz' 72" }}
            >
              Một Thời
            </p>
          </div>
          <p
            className="text-[#4A4A4A] leading-relaxed mb-6 max-w-xs"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.83rem", lineHeight: 1.7 }}
          >
            Dự án văn hoá phi lợi nhuận kết nối thế hệ trẻ Việt Nam với di sản âm nhạc qua câu chuyện, ký ức và tư liệu lịch sử.
          </p>
          {/* Newsletter */}
          <p
            className="text-[#C2A47E] mb-3"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
          >
            Nhận bản tin hàng tuần
          </p>
          <div className="flex">
            <input
              placeholder="email@example.com"
              className="flex-1 min-w-0 bg-[#1E1E1E] border border-[rgba(194,164,126,0.15)] px-4 py-2.5 text-[#F5F1E8] placeholder-[#3A3A3A] outline-none focus:border-[#C2A47E] transition-colors text-sm"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem" }}
            />
            <button
              className="flex-shrink-0 px-4 py-2.5 bg-[#8B0000] text-[#F5F1E8] hover:bg-[#6B0000] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              Đăng ký
            </button>
          </div>
        </div>

        {/* Link columns */}
        {COLS.map((col) => (
          <div key={col.head}>
            <p
              className="text-[#C2A47E] mb-5"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
            >
              {col.head}
            </p>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[#4A4A4A] hover:text-[#C2A47E] transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.83rem" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div
        className="border-t border-[rgba(194,164,126,0.08)] px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "#2A2A2A", letterSpacing: "0.08em" }}>
          © 2024 Giai Điệu Một Thời. Mọi quyền được bảo lưu.
        </p>
        <div className="flex gap-6">
          {["Chính sách", "Điều khoản", "Liên hệ"].map((t) => (
            <a
              key={t}
              href="#"
              className="text-[#2A2A2A] hover:text-[#4A4A4A] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.08em" }}
            >
              {t}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
