import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#stories", label: "Câu chuyện" },
  { href: "#timeline", label: "Lịch sử" },
  { href: "#videos", label: "Tư liệu" },
  { href: "#memories", label: "Ký ức" },
];

export function SiteNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: solid ? "rgba(10,5,0,0.96)" : "transparent",
          backdropFilter: solid ? "blur(16px)" : "none",
          borderBottom: solid ? "1px solid rgba(194,164,126,0.12)" : "none",
          transition: "background-color 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        }}
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Wordmark */}
          <a href="#" className="flex flex-col leading-none">
            <span
              style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", fontWeight: 600, color: "#F5F1E8", fontVariationSettings: "'opsz' 36" }}
            >
              Giai Điệu Một Thời
            </span>
            <span
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", color: "#C2A47E", textTransform: "uppercase" }}
            >
              Cultural Archive · 2026
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative group text-[#A09080] hover:text-[#F5F1E8] transition-colors duration-200"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C2A47E] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <a
              href="#memories"
              className="px-5 py-2 text-[#8B0000] bg-[#C2A47E] hover:bg-[#D9BF9A] transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}
            >
              Để lại ký ức
            </a>
          </div>

          {/* Mobile */}
          <button className="md:hidden text-[#F5F1E8]" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatedDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function AnimatedDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 md:hidden flex flex-col"
      style={{ backgroundColor: "#0A0500", pointerEvents: open ? "auto" : "none" }}
      initial={false}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="pt-20 px-8">
        {LINKS.map((l, i) => (
          <motion.a
            key={l.href}
            href={l.href}
            onClick={onClose}
            className="block py-5 text-[#F5F1E8] border-b border-[rgba(194,164,126,0.1)]"
            style={{ fontFamily: "'Fraunces', serif", fontSize: "1.6rem", fontWeight: 400, fontVariationSettings: "'opsz' 36" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: open ? 1 : 0, x: open ? 0 : -20 }}
            transition={{ delay: i * 0.07 }}
          >
            {l.label}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
