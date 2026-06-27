import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Grain } from "./Grain";
import { PERIODS, Song } from "../data/periods";
import { usePlayer } from "../context/PlayerContext";
import { Heart, ArrowDownCircle, MoreHorizontal, Clock, Play, Pause, SkipBack, SkipForward } from "lucide-react";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1676047871081-733dc414cbac?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1699762707215-9f5bea5f6179?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1763741218869-c36c3d6b3227?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1725357599001-00709d50d32e?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1593407741958-59550f282621?w=600&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1780402373446-e9884cab0bcd?w=600&h=400&fit=crop&auto=format",
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

// Soundwave animation icon for active track
function SoundwaveIcon() {
  return (
    <div className="flex items-end gap-[2px] w-3.5 h-3.5 pb-[2px]">
      <motion.div
        animate={{ height: [4, 12, 4] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className="w-[3px] bg-[#1DB954] rounded-full"
      />
      <motion.div
        animate={{ height: [6, 14, 6] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="w-[3px] bg-[#1DB954] rounded-full"
      />
      <motion.div
        animate={{ height: [3, 9, 3] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="w-[3px] bg-[#1DB954] rounded-full"
      />
    </div>
  );
}

export function TimelineSection() {
  const [active, setActive] = useState(0);
  const [activeTab, setActiveTab] = useState<"content" | "album">("content");
  const [likedPeriods, setLikedPeriods] = useState<Record<number, boolean>>({});

  const { currentTrack, isPlaying, playTrack, togglePlay, progress, nextTrack, prevTrack } = usePlayer();
  const period = PERIODS[active];

  const toggleLike = (id: number) => {
    setLikedPeriods((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePeriodPlayClick = () => {
    const isThisPeriodPlaying = currentTrack.periodId === period.id;
    if (isThisPeriodPlaying) {
      togglePlay();
    } else {
      // Play first song of this period
      playTrack(period.songs[0], period.id);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Check if any track of current period is playing
  const isCurrentPeriodPlaying = isPlaying && currentTrack.periodId === period.id;

  return (
    <section className="bg-[#0D0D0D] py-16 md:py-24 overflow-hidden relative">
      {/* Mobile Grain Background */}
      <div className="md:hidden">
        <Grain opacity={0.05} />
      </div>

      {/* Header */}
      <div className="px-6 max-w-7xl mx-auto mb-10 md:mb-16 relative z-10">
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
      <div className="flex flex-col md:flex-row">
        {/* Left sprocket strip */}
        <div
          className="hidden md:flex flex-shrink-0 w-10 flex-col items-center py-4 relative"
          style={{ backgroundColor: "#1A1A1A", borderRight: "1px solid rgba(194,164,126,0.1)" }}
        >
          <Sprocket count={12} />
          <Grain opacity={0.1} />
        </div>

        {/* Desktop Period selector — film frames */}
        <div
          className="hidden md:flex flex-shrink-0 overflow-y-auto overflow-x-hidden flex-col w-[280px]"
          style={{ backgroundColor: "#141414", scrollbarWidth: "none" }}
        >
          {PERIODS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className="w-full text-left border-b border-[rgba(194,164,126,0.08)] relative overflow-hidden group transition-all duration-200 cursor-pointer"
              style={{
                padding: "1.25rem 1.5rem",
                backgroundColor: i === active ? "#1E1E1E" : "transparent",
              }}
            >
              <div 
                className={`absolute inset-y-0 left-0 w-[3px] transition-colors ${i === active ? 'bg-current' : 'bg-transparent'}`} 
                style={{ color: p.color }} 
              />
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

        {/* Mobile Period selector — horizontal carousel */}
        <div 
          className="md:hidden w-full overflow-x-auto flex flex-nowrap border-b border-[rgba(194,164,126,0.1)] mb-4 [&::-webkit-scrollbar]:hidden" 
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {PERIODS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className="flex-shrink-0 text-left relative px-5 py-4 transition-colors border-r border-[rgba(194,164,126,0.05)]"
              style={{ backgroundColor: i === active ? "rgba(30,30,30,0.5)" : "transparent" }}
            >
              <div 
                className={`absolute bottom-0 left-0 right-0 h-[2px] transition-colors ${i === active ? 'bg-current' : 'bg-transparent'}`} 
                style={{ color: p.color }} 
              />
              <div
                className="absolute top-2 right-3 opacity-10"
                style={{ fontFamily: "'Fraunces', serif", fontSize: "1.4rem", fontWeight: 900, color: "#C2A47E", lineHeight: 1 }}
              >
                {p.frame}
              </div>
              <p
                className="mb-1 relative z-10"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: i === active ? "#C2A47E" : "#8A8A8A",
                  transition: "color 0.2s",
                }}
              >
                {p.years}
              </p>
              <p
                className="relative z-10"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "1rem",
                  fontWeight: i === active ? 600 : 400,
                  color: i === active ? "#F5F1E8" : "#8A8A8A",
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
          className="hidden md:flex flex-shrink-0 w-10 flex-col items-center py-4 relative"
          style={{ backgroundColor: "#1A1A1A", borderRight: "1px solid rgba(194,164,126,0.1)" }}
        >
          <Sprocket count={12} />
          <Grain opacity={0.1} />
        </div>

        {/* Detail panel */}
        <div className="flex-1 px-4 md:px-10 py-2 md:py-8 min-w-0">
          {/* Tab Switcher */}
          <div className="hidden md:flex items-center gap-6 mb-8 border-b border-[rgba(194,164,126,0.1)] pb-3 select-none">
            <button
              onClick={() => setActiveTab("content")}
              className="relative py-2 px-1 text-sm font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: activeTab === "content" ? "#F5F1E8" : "#4A4A4A",
              }}
            >
              Nội dung
              {activeTab === "content" && (
                <motion.div
                  layoutId="timelineActiveTabLine"
                  className="absolute bottom-[-13px] left-0 right-0 h-0.5"
                  style={{ backgroundColor: period.color }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("album")}
              className="relative py-2 px-1 text-sm font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: activeTab === "album" ? "#F5F1E8" : "#4A4A4A",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
              Album
              {activeTab === "album" && (
                <motion.div
                  layoutId="timelineActiveTabLine"
                  className="absolute bottom-[-13px] left-0 right-0 h-0.5"
                  style={{ backgroundColor: period.color }}
                />
              )}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${active}-${activeTab}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "content" ? (
                /* Tab 1: Editorial Content */
                <div>
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
                      {period.songs.map((song, j) => {
                        const isCurrentTrack = currentTrack.title === song.title && currentTrack.periodId === period.id;
                        return (
                          <motion.div
                            key={song.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.09 + 0.2 }}
                            onClick={() => playTrack(song, period.id)}
                            className="flex items-center gap-4 py-3 border-b border-[rgba(255,255,255,0.05)] group cursor-pointer hover:border-[#8B0000]/30 transition-colors"
                          >
                            <span
                              className={`w-8 text-right flex-shrink-0 transition-colors ${isCurrentTrack ? "text-[#1DB954]" : "text-[#8B0000]"}`}
                              style={{ fontFamily: "'Fraunces', serif", fontSize: "0.75rem", fontVariationSettings: "'opsz' 9" }}
                            >
                              {isCurrentTrack && isPlaying ? <SoundwaveIcon /> : String(j + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`transition-colors ${isCurrentTrack ? "text-[#1DB954] font-medium" : "text-[#D9D3C4] group-hover:text-[#F5F1E8]"}`}
                              style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", fontWeight: 400, fontVariationSettings: "'opsz' 36" }}
                            >
                              {song.title}
                              <span className="text-xs text-[#6B5F4E] ml-2 block sm:inline font-sans">
                                ({song.artist.split("/")[0].trim()})
                              </span>
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* Tab 2: Spotify Album Player */
                <div
                  className="rounded-2xl overflow-hidden shadow-2xl p-6 relative border"
                  style={{
                    background: `linear-gradient(to bottom, ${period.color}25 0%, #121212 50%, #0d0d0d 100%)`,
                    borderColor: `${period.color}20`,
                  }}
                >
                  {/* Grain layer for paper texture inside the dark spotify panel */}
                  <Grain opacity={0.03} />

                  {/* Album Header Info */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 mb-6 pb-6 border-b border-white/5 relative z-10">
                    {/* Big Album Cover */}
                    <div
                      className="w-36 h-36 md:w-40 md:h-40 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex-shrink-0 flex items-center justify-center font-bold text-[#F5F1E8] relative select-none"
                      style={{ backgroundColor: period.color }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-white/10" />
                      <div className="absolute top-2.5 left-3 text-[8px] uppercase tracking-[0.25em] opacity-50 font-mono">
                        VINTAGE EP
                      </div>
                      <span className="text-7xl font-black tracking-tighter" style={{ fontFamily: "'Fraunces', serif" }}>
                        {parseInt(period.frame)}
                      </span>
                    </div>

                    {/* Meta Text details */}
                    <div className="flex flex-col">
                      <span
                        className="text-[10px] md:text-xs font-bold uppercase text-white/50 tracking-widest font-sans"
                      >
                        Album
                      </span>
                      <h3
                        className="text-2xl md:text-3xl font-black text-white mt-1 mb-2 tracking-tight"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        {period.label} (EP)
                      </h3>
                      <div
                        className="text-xs text-white/70 flex flex-wrap items-center gap-1.5 font-sans"
                      >
                        <span className="font-semibold text-white">Nghệ sĩ tiêu biểu</span>
                        <span className="text-white/40">•</span>
                        <span>{period.years}</span>
                        <span className="text-white/40">•</span>
                        <span>{period.songs.length} bài hát</span>
                      </div>
                    </div>
                  </div>

                  {/* Album Controls Row */}
                  <div className="flex items-center gap-5 mb-6 relative z-10">
                    {/* Spotify Play/Pause Button */}
                    <button
                      onClick={handlePeriodPlayClick}
                      className="w-12 h-12 rounded-full bg-[#1DB954] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                    >
                      {isCurrentPeriodPlaying ? (
                        <Pause className="w-5 h-5 fill-black text-black" />
                      ) : (
                        <Play className="w-5 h-5 fill-black text-black translate-x-[1px]" />
                      )}
                    </button>

                    {/* Heart button */}
                    <button
                      onClick={() => toggleLike(period.id)}
                      className="text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      <Heart
                        className="w-7 h-7 transition-all active:scale-82"
                        fill={likedPeriods[period.id] ? "#1DB954" : "none"}
                        color={likedPeriods[period.id] ? "#1DB954" : "currentColor"}
                      />
                    </button>

                    {/* Download Icon */}
                    <button className="text-white/50 hover:text-white transition-colors cursor-pointer">
                      <ArrowDownCircle className="w-7 h-7" />
                    </button>

                    {/* More menu */}
                    <button className="text-white/50 hover:text-white transition-colors cursor-pointer">
                      <MoreHorizontal className="w-7 h-7" />
                    </button>
                  </div>

                  {/* Songs Table List */}
                  <div className="w-full text-left border-collapse font-sans text-sm select-none relative z-10">
                    {/* Table Headers */}
                    <div className="flex items-center text-white/40 border-b border-white/5 pb-2 mb-2 px-3 text-[10px] uppercase tracking-widest font-bold">
                      <div className="w-8 flex-shrink-0 text-center">#</div>
                      <div className="flex-1 min-w-0">Tiêu đề</div>
                      <div className="w-16 flex-shrink-0 text-right pr-2">
                        <Clock className="w-4 h-4 inline-block" />
                      </div>
                    </div>

                    {/* Rows */}
                    {period.songs.map((song, idx) => {
                      const isCurrent = currentTrack.title === song.title && currentTrack.periodId === period.id;
                      return (
                        <div
                          key={song.title}
                          onClick={() => playTrack(song, period.id)}
                          className="flex items-center py-2.5 px-3 rounded-md hover:bg-white/5 group cursor-pointer transition-colors"
                        >
                          {/* Index / Soundwave */}
                          <div className="w-8 flex-shrink-0 flex items-center justify-center text-white/50 group-hover:text-white">
                            {isCurrent && isPlaying ? (
                              <SoundwaveIcon />
                            ) : (
                              <span className={`text-xs ${isCurrent ? "text-[#1DB954] font-bold" : ""}`}>
                                {idx + 1}
                              </span>
                            )}
                          </div>

                          {/* Song Title and Artist info */}
                          <div className="flex-1 min-w-0 pr-4">
                            <div className={`truncate font-medium transition-colors ${isCurrent ? "text-[#1DB954]" : "text-white/90 group-hover:text-white"}`}>
                              {song.title}
                            </div>
                            <div className="text-xs text-white/40 truncate mt-0.5 group-hover:text-white/60 transition-colors">
                              {song.artist}
                            </div>
                          </div>

                          {/* Duration */}
                          <div className="w-16 flex-shrink-0 text-right pr-2 text-xs text-white/40 group-hover:text-white/80 transition-colors">
                            {formatDuration(song.duration)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Nav arrows */}
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="px-4 py-2.5 border border-[rgba(194,164,126,0.2)] text-[#6B5F4E] hover:text-[#C2A47E] hover:border-[#C2A47E] transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                >
                  &lt; Trước
                </button>
                
                <div className="flex items-center gap-2">
                  {PERIODS.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`block rounded-full transition-all duration-300 ${idx === active ? "w-5 h-1.5 bg-[#8B0000]" : "w-1.5 h-1.5 bg-[#4A4A4A]"}`} 
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActive(Math.min(PERIODS.length - 1, active + 1))}
                  disabled={active === PERIODS.length - 1}
                  className="px-4 py-2.5 border border-[rgba(194,164,126,0.2)] text-[#6B5F4E] hover:text-[#C2A47E] hover:border-[#C2A47E] transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
                >
                  Tiếp &gt;
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
