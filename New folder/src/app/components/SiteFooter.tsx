import { motion } from "motion/react";
import { Grain } from "./Grain";
import { Instagram, Youtube, Facebook } from "lucide-react";

const COLS = [
  {
    head: "Khám phá",
    links: [
      { name: "Câu chuyện âm nhạc", href: "#stories" },
      { name: "Dòng chảy lịch sử", href: "#timeline" },
      { name: "Tư liệu video", href: "#videos" },
      { name: "Tường ký ức", href: "#memories" },
    ],
  },
  {
    head: "Dự án",
    links: [
      { name: "Về chúng tôi", href: "#" },
      { name: "Đóng góp tư liệu", href: "#" },
      { name: "Hợp tác", href: "#" },
      { name: "Liên hệ", href: "#" },
    ],
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
            Giai Điệu Một Thời · Vol. 01 · Xuất bản 2026 · Hà Nội, Việt Nam
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
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#4A4A4A] hover:text-[#C2A47E] transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.83rem" }}
                  >
                    {link.name}
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
          © 2026 Giai Điệu Một Thời. Mọi quyền được bảo lưu.
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
