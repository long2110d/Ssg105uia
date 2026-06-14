import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Heart, PenLine } from "lucide-react";

const PALETTE = [
  { bg: "#FFFBEB", accent: "#B45309", tape: "#D97706" },
  { bg: "#FDF2F8", accent: "#9D174D", tape: "#BE185D" },
  { bg: "#F0FDF4", accent: "#065F46", tape: "#059669" },
  { bg: "#EFF6FF", accent: "#1E40AF", tape: "#2563EB" },
  { bg: "#FFF7ED", accent: "#9A3412", tape: "#EA580C" },
  { bg: "#F5F3FF", accent: "#5B21B6", tape: "#7C3AED" },
];

interface NoteData {
  id: number;
  author: string;
  city: string;
  text: string;
  song: string;
  palette: typeof PALETTE[0];
  rotate: number;
  likes: number;
}

const SEED_NOTES: NoteData[] = [
  { id: 1, author: "Nguyễn Minh Châu", city: "Hà Nội", text: "Mỗi lần nghe Diễm Xưa là tôi lại nhớ đến mùa hè năm 16 tuổi, khi ba tôi ngồi hát cho cả nhà nghe trên chiếc radio cũ bên hiên nhà...", song: "Diễm Xưa", palette: PALETTE[0], rotate: -2.5, likes: 47 },
  { id: 2, author: "Trần Bảo Ngọc", city: "Sài Gòn", text: "Phượng Hồng làm tôi nhớ năm lớp 12 — những buổi chiều chia tay bạn bè trước khi mỗi người một ngả. Âm nhạc là sợi dây duy nhất còn nối chúng tôi.", song: "Phượng Hồng", palette: PALETTE[1], rotate: 1.8, likes: 83 },
  { id: 3, author: "Lê Hoàng Anh", city: "Đà Nẵng", text: "Ông nội tôi là nhạc sĩ thời kháng chiến. Ông thường nói: 'Âm nhạc là thứ duy nhất không thể bị chiếm đóng.'", song: "Hà Nội Mùa Thu", palette: PALETTE[2], rotate: -1.2, likes: 112 },
  { id: 4, author: "Phạm Quỳnh Trang", city: "Huế", text: "Mẹ tôi hát ru bằng những bài bolero miền Nam. Bây giờ mỗi khi nghe lại, tôi cảm giác như được về nhà dù đang ở bất cứ đâu trên thế giới.", song: "Nỗi Buồn Hoa Phượng", palette: PALETTE[3], rotate: 2.2, likes: 65 },
  { id: 5, author: "Vũ Đức Hải", city: "Hải Phòng", text: "Ngày bố tôi đi xa, ông để lại một cuộn băng cassette những bài hát ông yêu. Đó là kho báu lớn nhất tôi có trong đời.", song: "Một Đời Người", palette: PALETTE[4], rotate: -2, likes: 94 },
  { id: 6, author: "Ngô Thanh Hương", city: "Cần Thơ", text: "Nhạc vàng miền Nam chứa cả một thế hệ sống trong xa cách và nhớ nhung. Nghe mà thấy lòng mình được thấu hiểu.", song: "Hoa Sứ Nhà Nàng", palette: PALETTE[5], rotate: 1, likes: 78 },
  { id: 7, author: "Bùi Thanh Tùng", city: "Hồ Chí Minh", text: "Hoa Sữa gắn với đêm Hà Nội mùa thu — mùi hương ấy và giai điệu ấy là một. Tôi ở Sài Gòn nhưng nghe là nhớ đến Hà Nội lạ lắm.", song: "Hoa Sữa", palette: PALETTE[0], rotate: -1.5, likes: 59 },
];

function StickyNote({ note, liked, onLike }: { note: NoteData; liked: boolean; onLike: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: note.rotate * 0.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: note.rotate }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 20 }}
      transition={{ duration: 0.55, type: "spring", stiffness: 200, damping: 20 }}
      className="relative break-inside-avoid mb-6 cursor-default select-none"
      style={{ transformOrigin: "center top" }}
    >
      {/* Tape strip at top */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 opacity-70"
        style={{ backgroundColor: note.palette.tape, transform: "translateX(-50%) rotate(-1deg)" }}
      />

      <div
        className="p-5 pt-6 shadow-lg"
        style={{ backgroundColor: note.palette.bg, minHeight: "160px" }}
      >
        {/* Song label */}
        <div className="flex items-center gap-1.5 mb-3">
          <span style={{ color: note.palette.accent, fontSize: "0.7rem" }}>♪</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: note.palette.accent,
              opacity: 0.8,
            }}
          >
            {note.song}
          </span>
        </div>

        {/* Handwritten text */}
        <p
          className="text-[#1A1A1A] leading-relaxed mb-4"
          style={{ fontFamily: "'Caveat', cursive", fontSize: "1rem", lineHeight: 1.55 }}
        >
          {note.text}
        </p>

        {/* Footer */}
        <div className="flex items-end justify-between border-t pt-3" style={{ borderColor: `${note.palette.accent}20` }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 500, color: "#1A1A1A" }}>
              {note.author}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.62rem", color: "#6B5F4E" }}>
              {note.city}
            </p>
          </div>
          <button
            onClick={onLike}
            className="flex items-center gap-1.5 transition-transform active:scale-90"
            style={{ color: liked ? "#DC2626" : "#9CA3AF" }}
          >
            <Heart size={13} fill={liked ? "#DC2626" : "none"} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem" }}>{note.likes}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function MemoryWall() {
  const [notes, setNotes] = useState<NoteData[]>(SEED_NOTES);
  const [liked, setLiked] = useState(new Set<number>());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author: "", city: "", text: "", song: "" });

  const toggleLike = useCallback((id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      const delta = next.has(id) ? -1 : 1;
      next.has(id) ? next.delete(id) : next.add(id);
      setNotes((ns) => ns.map((n) => n.id === id ? { ...n, likes: n.likes + delta } : n));
      return next;
    });
  }, []);

  const submitNote = useCallback(() => {
    if (!form.text.trim() || !form.author.trim()) return;
    const p = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    setNotes((prev) => [{
      id: Date.now(),
      author: form.author,
      city: form.city || "Việt Nam",
      text: form.text,
      song: form.song || "Không đề",
      palette: p,
      rotate: (Math.random() - 0.5) * 5,
      likes: 0,
    }, ...prev]);
    setForm({ author: "", city: "", text: "", song: "" });
    setShowForm(false);
  }, [form]);

  return (
    <section className="bg-[#EDE9DF] py-20 px-6 relative">
      {/* Torn paper top edge */}
      <div className="absolute top-0 inset-x-0 h-6 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1440 24" preserveAspectRatio="none" className="w-full h-full" fill="#F5F1E8">
          <path d="M0,0 Q40,20 80,8 Q120,0 160,16 Q200,24 240,10 Q280,0 320,14 Q360,24 400,8 Q440,0 480,18 Q520,24 560,6 Q600,0 640,16 Q680,24 720,8 Q760,0 800,14 Q840,24 880,6 Q920,0 960,18 Q1000,24 1040,8 Q1080,0 1120,16 Q1160,24 1200,8 Q1240,0 1280,14 Q1320,24 1360,6 Q1400,0 1440,10 L1440,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="w-2 h-8 bg-[#8B0000]" />
            <p
              className="text-[#1A1A1A]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase" }}
            >
              Tường ký ức
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#8B0000] text-[#F5F1E8] hover:bg-[#6B0000] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            <PenLine size={13} /> Viết ký ức
          </button>
        </div>

        <div className="mb-14">
          <h2
            className="text-[#1A1A1A] mb-3"
            style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 3.5vw, 3.2rem)", fontWeight: 900, lineHeight: 1.05, fontVariationSettings: "'opsz' 144" }}
          >
            Nơi ký ức
            <em className="text-[#8B0000]" style={{ fontWeight: 400, fontVariationSettings: "'opsz' 144" }}> được ghim lại</em>
          </h2>
          <p
            className="text-[#6B5F4E]"
            style={{ fontFamily: "'Caveat', cursive", fontSize: "1.3rem" }}
          >
            "Mỗi người một câu chuyện — mỗi bài hát một cuộc đời..."
          </p>
        </div>

        {/* Masonry columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {notes.map((note) => (
            <StickyNote
              key={note.id}
              note={note}
              liked={liked.has(note.id)}
              onLike={() => toggleLike(note.id)}
            />
          ))}
        </div>
      </div>

      {/* Torn paper bottom edge */}
      <div className="absolute bottom-0 inset-x-0 h-6 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1440 24" preserveAspectRatio="none" className="w-full h-full" fill="#1A1A1A">
          <path d="M0,24 Q40,4 80,16 Q120,24 160,8 Q200,0 240,14 Q280,24 320,10 Q360,0 400,16 Q440,24 480,6 Q520,0 560,18 Q600,24 640,8 Q680,0 720,16 Q760,24 800,10 Q840,0 880,18 Q920,24 960,6 Q1000,0 1040,16 Q1080,24 1120,8 Q1160,0 1200,14 Q1240,24 1280,8 Q1320,0 1360,18 Q1400,24 1440,14 L1440,24 Z" />
        </svg>
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: "rgba(26,10,0,0.85)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="w-full max-w-md relative pt-8"
              style={{ backgroundColor: "#FFFBEB" }}
              initial={{ scale: 0.88, rotate: -3, opacity: 0 }}
              animate={{ scale: 1, rotate: -1.5, opacity: 1 }}
              exit={{ scale: 0.88, rotate: -3, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tape */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#D97706] opacity-70" />

              <div className="p-7">
                <div className="flex items-center justify-between mb-6">
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.5rem", fontWeight: 700, color: "#1A1A1A", fontVariationSettings: "'opsz' 36" }}>
                    Ký ức của bạn
                  </h3>
                  <button onClick={() => setShowForm(false)} className="text-[#9CA3AF] hover:text-[#1A1A1A]">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-5">
                  {[
                    { placeholder: "Tên của bạn *", key: "author" as const },
                    { placeholder: "Thành phố", key: "city" as const },
                    { placeholder: "Bài hát gắn liền với ký ức", key: "song" as const },
                  ].map(({ placeholder, key }) => (
                    <input
                      key={key}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full bg-transparent border-b border-[#D97706]/30 pb-2 outline-none focus:border-[#B45309] text-[#1A1A1A] placeholder-[#C2A47E]/70 transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}
                    />
                  ))}
                  <textarea
                    placeholder="Ký ức của bạn về âm nhạc... *"
                    value={form.text}
                    onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                    rows={4}
                    className="w-full bg-transparent border-b border-[#D97706]/30 pb-2 outline-none focus:border-[#B45309] text-[#1A1A1A] placeholder-[#C2A47E]/70 transition-colors resize-none"
                    style={{ fontFamily: "'Caveat', cursive", fontSize: "1.05rem", lineHeight: 1.6 }}
                  />
                </div>

                <button
                  onClick={submitNote}
                  className="mt-7 w-full py-3 bg-[#8B0000] text-[#F5F1E8] hover:bg-[#6B0000] transition-colors flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                >
                  <Plus size={13} /> Ghim ký ức
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
