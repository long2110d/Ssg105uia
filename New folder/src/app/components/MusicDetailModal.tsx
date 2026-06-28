import React, { useState, useEffect } from "react";
import { usePlayer, ALL_TRACKS } from "../context/PlayerContext";
import {
  Play,
  Pause,
  X,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Sparkles,
  Music,
  Share2,
  Calendar,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  Radio,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Grain, Scanlines } from "./Grain";
import { getSongDetail, Annotation } from "../data/songDetails";
import { toast } from "sonner";

export const MusicDetailModal: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progress,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    isDetailOpen,
    setIsDetailOpen,
    playTrack
  } = usePlayer();

  // Mode and Tab States
  const [mode, setMode] = useState<"read" | "listen">("listen");
  const [activeTab, setActiveTab] = useState<"story" | "lyrics" | "media" | "sources">("story");
  const [openMilestone, setOpenMilestone] = useState<number | null>(0);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Retrieve rich history detail for the current track
  const detail = getSongDetail(currentTrack.title);

  // Mouse position tracker for parallax effect in background
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };

    if (isDetailOpen) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDetailOpen]);

  // Deep linking initial check on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const songTitle = params.get("song");
    if (songTitle) {
      const decoded = decodeURIComponent(songTitle);
      const matchedTrack = ALL_TRACKS.find(
        (t) => t.title.toLowerCase() === decoded.toLowerCase()
      );
      if (matchedTrack) {
        playTrack(matchedTrack, matchedTrack.periodId);
        setIsDetailOpen(true);
      }
    }
  }, []);

  // Update query params in the URL when the modal opens/closes
  useEffect(() => {
    if (isDetailOpen && currentTrack) {
      const newUrl = `${window.location.origin}${window.location.pathname}?song=${encodeURIComponent(currentTrack.title)}`;
      window.history.pushState(null, "", newUrl);
    } else if (!isDetailOpen) {
      const newUrl = `${window.location.origin}${window.location.pathname}`;
      window.history.pushState(null, "", newUrl);
    }
  }, [isDetailOpen, currentTrack]);

  // Local volume state
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleVolumeClick = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (val > 0) {
      setIsMuted(false);
    }
  };

  // Seek bar click handler
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = (clickX / width) * 100;
    seek(percentage);
  };

  // Close helper
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsDetailOpen(false);
    }
  };

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Share handler
  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?song=${encodeURIComponent(currentTrack.title)}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Đã sao chép liên kết chia sẻ!");
    }).catch(() => {
      toast.error("Không thể sao chép liên kết!");
    });
  };

  // Render annotated lyrics with interactive tooltips
  const renderAnnotatedLyrics = (lyricsText: string, annotations: Annotation[]) => {
    if (!annotations || annotations.length === 0) {
      return <p className="whitespace-pre-line leading-relaxed text-[#D9D3C4]">{lyricsText}</p>;
    }

    let parts: { text: string; isAnnotation: boolean; note?: string }[] = [{ text: lyricsText, isAnnotation: false }];

    annotations.forEach((anno) => {
      const newParts: typeof parts = [];
      parts.forEach((part) => {
        if (part.isAnnotation) {
          newParts.push(part);
        } else {
          const regex = new RegExp(`(${anno.word})`, "gi");
          const splitText = part.text.split(regex);
          splitText.forEach((t) => {
            if (t.toLowerCase() === anno.word.toLowerCase()) {
              newParts.push({ text: t, isAnnotation: true, note: anno.note });
            } else if (t) {
              newParts.push({ text: t, isAnnotation: false });
            }
          });
        }
      });
      parts = newParts;
    });

    return (
      <div className="whitespace-pre-line leading-loose text-[#D9D3C4]">
        {parts.map((part, index) => {
          if (part.isAnnotation) {
            const isOpened = activeTooltip === part.text;
            return (
              <span
                key={index}
                className="relative inline group cursor-pointer border-b border-dashed border-[#C2A47E] text-[#C2A47E] font-medium px-0.5"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTooltip(isOpened ? null : part.text);
                }}
                onMouseEnter={() => setActiveTooltip(part.text)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                {part.text}
                <AnimatePresence>
                  {(isOpened || activeTooltip === part.text) && (
                    <motion.span
                      initial={{ opacity: 0, y: 10, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: 10, x: "-50%" }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-1/2 mb-2 w-64 p-3 rounded-xl bg-[#1E1E1E] border border-[#C2A47E]/30 text-xs text-[#F5F1E8] font-normal leading-relaxed z-50 shadow-[0_15px_30px_rgba(0,0,0,0.5)] block text-center"
                    >
                      <span className="font-semibold text-[#C2A47E] block mb-1">Chú giải lịch sử</span>
                      {part.note}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1E1E1E]" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            );
          }
          return part.text;
        })}
      </div>
    );
  };

  const artistText = currentTrack.artist.split("/")[0].trim();
  const composerText = currentTrack.artist.split("/")[1]?.trim();

  // Tab configurations
  const tabs = [
    { id: "story", label: "Lịch sử", icon: Calendar },
    { id: "lyrics", label: "Lời bài hát", icon: FileText },
    { id: "media", label: "Tư liệu ảnh", icon: ImageIcon },
    { id: "sources", label: "Nguồn tham khảo", icon: LinkIcon }
  ] as const;

  return (
    <AnimatePresence>
      {isDetailOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto"
          onClick={() => setActiveTooltip(null)}
        >
          {/* Backdrop Blur Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-[#060606]/90 backdrop-blur-md transition-all cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-[92%] sm:w-full h-auto max-h-[90vh] sm:max-h-none sm:max-w-5xl bg-[#0F0F0F] border border-[#C2A47E]/15 rounded-3xl overflow-y-auto sm:overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] z-10 flex flex-col min-h-[400px] sm:min-h-[600px] md:grid md:grid-cols-12"
          >
            <Grain opacity={0.04} />

            {/* HEADER FOR BOTH MODES */}
            <div className="col-span-12 border-b border-[#C2A47E]/10 px-6 py-4 flex items-center justify-between z-20 bg-[#0A0A0A]/80 sticky top-0 sm:relative backdrop-blur-md">
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Mini Album Cover */}
                <div
                  className="w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center font-bold text-white relative shadow-md overflow-hidden"
                  style={{
                    backgroundColor: currentTrack.color,
                    fontFamily: "'Fraunces', serif"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-white/10" />
                  <span className="text-lg font-black tracking-tighter" style={{ color: "#F5F1E8" }}>
                    {parseInt(currentTrack.coverNum)}
                  </span>
                </div>
                {/* Song Text info */}
                <div className="flex flex-col min-w-0">
                  <h3 className="text-white text-sm font-semibold truncate font-sans">
                    {currentTrack.title}
                  </h3>
                  <p className="text-[#C2A47E] text-[11px] truncate font-sans">
                    {artistText} {composerText ? `· Sáng tác: ${composerText}` : ""}
                  </p>
                </div>
              </div>

              {/* Mode Toggle Buttons */}
              <div className="flex items-center gap-2">
                {/* Mode Selectors */}
                <div className="hidden md:flex bg-[#1A1A1A] p-0.5 rounded-lg border border-white/5 mr-4">
                  <button
                    onClick={() => setMode("listen")}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                      mode === "listen"
                        ? "bg-[#C2A47E] text-black shadow-md"
                        : "text-[#C2A47E]/60 hover:text-white"
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5 inline mr-1 -translate-y-[1px]" /> Nghe
                  </button>
                  <button
                    onClick={() => setMode("read")}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                      mode === "read"
                        ? "bg-[#C2A47E] text-black shadow-md"
                        : "text-[#C2A47E]/60 hover:text-white"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 inline mr-1 -translate-y-[1px]" /> Đọc
                  </button>
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="text-[#F5F1E8]/50 hover:text-[#F5F1E8] bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer"
                  title="Chia sẻ bài hát"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Close button */}
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="text-[#F5F1E8]/50 hover:text-[#F5F1E8] bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* LEFT COLUMN: VISUAL AND VINYL PLAYER CONTROLLER */}
            <AnimatePresence mode="wait">
              {mode === "listen" && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="hidden md:flex md:col-span-5 p-4 md:p-8 flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#C2A47E]/10 z-10 bg-[#0A0A0A]/40 overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${currentTrack.color} 0%, transparent 70%)`
                    }}
                  />

                  {/* TURNTABLE ASSEMBLY */}
                  <div className="hidden md:flex relative w-full max-w-[240px] md:max-w-[275px] aspect-square rounded-2xl bg-gradient-to-br from-[#2D1B10] to-[#120A06] border border-[#3A2214] shadow-[0_15px_35px_rgba(0,0,0,0.7)] p-4 items-center justify-center overflow-hidden mb-6 group">
                    <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C2A47E]/30" />
                    <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C2A47E]/30" />
                    <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C2A47E]/30" />
                    <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C2A47E]/30" />

                    {/* Platter Plate */}
                    <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-900 border-[2px] border-[#C2A47E]/15 flex items-center justify-center relative">
                      {/* Vinyl Record */}
                      <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 7 }}
                        className="w-[92%] h-[92%] rounded-full bg-black relative flex items-center justify-center shadow-lg border border-neutral-800"
                        style={{
                          backgroundImage: "repeating-radial-gradient(circle, #181818, #0e0e0e 1.5px, #181818 3px)"
                        }}
                      >
                        {/* Center Sticker */}
                        <div
                          className="w-[33%] h-[33%] rounded-full flex flex-col items-center justify-center text-center relative border border-black/30 shadow-inner"
                          style={{ backgroundColor: currentTrack.color }}
                        >
                          <div className="absolute inset-1 rounded-full border border-white/10" />
                          <span className="text-[6px] text-white/50 tracking-wider font-bold font-sans uppercase">
                            VINTAGE
                          </span>
                          <span
                            className="text-sm font-black text-[#F5F1E8] leading-none my-0.5"
                            style={{ fontFamily: "'Fraunces', serif" }}
                          >
                            {currentTrack.coverNum}
                          </span>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0F0F0F] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-neutral-700 shadow-inner" />
                        </div>
                      </motion.div>
                    </div>

                    {/* TONEARM ASSEMBLY */}
                    <div className="absolute top-3 right-3 w-16 h-32 pointer-events-none z-20">
                      <div className="absolute top-2 right-4 w-6 h-6 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-800 border border-zinc-700 shadow flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-950 flex items-center justify-center">
                          <div className="w-1 h-1 bg-[#C2A47E]" />
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: isPlaying ? 22 : 0 }}
                        transition={{ type: "spring", stiffness: 70, damping: 14 }}
                        style={{
                          originX: "calc(100% - 16px)",
                          originY: "12px"
                        }}
                        className="absolute top-2 right-4 w-5 h-28 origin-top-right flex flex-col items-center"
                      >
                        <div className="w-1 h-16 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-200 mt-1" />
                        <div className="w-3 h-5 bg-zinc-800 rounded-sm shadow border border-zinc-955 -rotate-[10deg] p-0.5">
                          <div className="w-1 h-2 bg-[#C2A47E] rounded-xs" />
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Progress Slider */}
                  <div className="w-full relative z-10 px-2 mt-2">
                    <div
                      className="w-full h-1 bg-white/10 rounded-full cursor-pointer relative group flex items-center"
                      onClick={handleProgressBarClick}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-[#C2A47E] to-[#E5C79E] rounded-full shadow-[0_0_8px_rgba(194,164,126,0.6)]"
                        style={{ width: `${progress}%` }}
                      />
                      <div
                        className="absolute w-2 h-2 rounded-full bg-[#F5F1E8] shadow-md border border-[#C2A47E] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        style={{ left: `calc(${progress}% - 4px)` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-[#6B5F4E] font-mono mt-2 uppercase tracking-widest font-semibold">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Volume Control */}
                  <div className="w-full hidden md:flex items-center justify-center gap-2.5 mt-5 relative z-10">
                    <button
                      onClick={handleVolumeClick}
                      className="text-white/40 hover:text-white transition-colors cursor-pointer"
                    >
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 md:w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C2A47E] focus:outline-none"
                      style={{
                        background: `linear-gradient(to right, #C2A47E ${isMuted ? 0 : volume}%, rgba(255,255,255,0.1) ${isMuted ? 0 : volume}%)`
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* RIGHT COLUMN: RICH EDITORIAL HISTORY & TABS AREA */}
            <div
              className={`col-span-12 ${
                mode === "read" ? "md:col-span-12" : "md:col-span-7"
              } p-6 md:p-8 flex flex-col justify-between z-10 transition-all duration-300`}
            >
              <div>
                {/* Historical Summary Box */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-[#6B5F4E] font-semibold tracking-[0.25em] uppercase text-[10px]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {currentTrack.periodName}
                    </span>
                  </div>
                  <h2
                    className="text-[#F5F1E8] mb-3 font-black leading-tight"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                      fontVariationSettings: "'opsz' 72"
                    }}
                  >
                    {currentTrack.title}
                  </h2>
                  <p
                    className="text-[#A09080] italic leading-relaxed text-sm md:text-base border-l-2 border-[#8B0000] pl-4 font-serif"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {detail.summary}
                  </p>
                </div>

                {/* TABS SELECTOR */}
                <div className="flex items-center gap-1.5 border-b border-white/5 mb-6 overflow-x-auto select-none no-scrollbar">
                  {tabs.map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                          isActive
                            ? "border-[#C2A47E] text-[#F5F1E8]"
                            : "border-transparent text-[#4A4A4A] hover:text-[#A09080]"
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <TabIcon className="w-3.5 h-3.5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* TAB CONTENT WITH ANIMATION */}
                <div className="min-h-[220px] max-h-[350px] overflow-y-auto pr-2 no-scrollbar">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* TAB 1: STORY/TIMELINE */}
                      {activeTab === "story" && (
                        <div className="relative pl-4 border-l border-[#C2A47E]/10 space-y-5">
                          {detail.timeline.map((item, idx) => {
                            const isOpened = openMilestone === idx;
                            return (
                              <div key={idx} className="relative group">
                                {/* Dot indicator */}
                                <div
                                  className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border border-neutral-900 transition-all duration-300 ${
                                    isOpened ? "bg-[#8B0000] scale-125" : "bg-[#4A4A4A]"
                                  }`}
                                />

                                {/* Header trigger */}
                                <button
                                  onClick={() => setOpenMilestone(isOpened ? null : idx)}
                                  className="w-full text-left flex items-start justify-between cursor-pointer focus:outline-none"
                                >
                                  <div>
                                    <span
                                      className="text-[#C2A47E] font-bold text-xs tracking-wider font-mono mr-2"
                                    >
                                      {item.year}
                                    </span>
                                    <h4
                                      className="inline-block text-[#D9D3C4] group-hover:text-[#F5F1E8] transition-colors text-sm font-semibold font-sans"
                                    >
                                      {item.title}
                                    </h4>
                                  </div>
                                  {isOpened ? (
                                    <ChevronUp className="w-4 h-4 text-white/30" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-white/30" />
                                  )}
                                </button>

                                {/* Collapsible details content */}
                                <AnimatePresence initial={false}>
                                  {isOpened && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <p className="text-xs text-[#8A8A8A] leading-relaxed mt-2 pl-4 border-l border-white/5 font-sans">
                                        {item.desc}
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* TAB 2: ANNOTATED LYRICS */}
                      {activeTab === "lyrics" && (
                        <div className="font-serif px-2 max-w-xl text-center md:text-left">
                          {renderAnnotatedLyrics(detail.lyrics, detail.annotations)}
                        </div>
                      )}

                      {/* TAB 3: MEDIA VIEWPORTS */}
                      {activeTab === "media" && (
                        <div className="space-y-6">
                          {detail.media.map((med, idx) => (
                            <div
                              key={idx}
                              className="relative rounded-2xl overflow-hidden border border-white/5 bg-[#141414]"
                            >
                              <div className="relative aspect-video bg-black overflow-hidden">
                                <img
                                  src={med.url}
                                  alt={med.caption}
                                  className="w-full h-full object-cover grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                  style={{ filter: "sepia(0.3) contrast(1.05)" }}
                                />
                                <Grain opacity={0.1} />
                                <Scanlines opacity={0.03} />
                              </div>
                              <div className="p-3.5 bg-[#0D0D0D] border-t border-white/5">
                                <p className="text-xs text-[#8A8A8A] italic leading-relaxed font-sans">
                                  {med.caption}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* TAB 4: SOURCES & REFERENCING */}
                      {activeTab === "sources" && (
                        <div className="space-y-4">
                          <p className="text-xs text-[#8A8A8A] font-sans">
                            Các tài liệu, bài nghiên cứu và ấn phẩm tham chiếu chính về bài hát:
                          </p>
                          <ul className="space-y-2">
                            {detail.sources.map((src, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <LinkIcon className="w-3.5 h-3.5 text-[#C2A47E] flex-shrink-0" />
                                <a
                                  href={src.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-[#D9D3C4] hover:text-[#C2A47E] hover:underline transition-colors font-sans truncate"
                                >
                                  {src.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* BOTTOM PLAYER AREA (CONTROLS & PROGRESS BAR) */}
              <div className="mt-6 border-t border-white/5 pt-5 select-none z-10">
                {/* Progress Slider (Mobile Only) */}
                <div className="w-full relative z-10 px-2 mb-4 block md:hidden">
                  <div
                    className="w-full h-1 bg-white/10 rounded-full cursor-pointer relative group flex items-center"
                    onClick={handleProgressBarClick}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-[#C2A47E] to-[#E5C79E] rounded-full shadow-[0_0_8px_rgba(194,164,126,0.6)]"
                      style={{ width: `${progress}%` }}
                    />
                    <div
                      className="absolute w-2 h-2 rounded-full bg-[#F5F1E8] shadow-md border border-[#C2A47E] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      style={{ left: `calc(${progress}% - 4px)` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-[#6B5F4E] font-mono mt-2 uppercase tracking-widest font-semibold">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* BOTTOM PLAYER ACTION BUTTONS */}
                <div className="flex items-center justify-center sm:justify-start gap-6 mt-0 select-none">
                  <button
                    onClick={prevTrack}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#C2A47E] hover:text-[#F5F1E8] hover:bg-white/5 active:scale-90 transition-all cursor-pointer animate-none"
                  >
                    <SkipBack className="w-4.5 h-4.5 fill-current" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-[#C2A47E] hover:bg-[#D4B893] text-[#0F0F0F] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current translate-x-[1px]" />
                    )}
                  </button>

                  <button
                    onClick={nextTrack}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#C2A47E] hover:text-[#F5F1E8] hover:bg-white/5 active:scale-90 transition-all cursor-pointer"
                  >
                    <SkipForward className="w-4.5 h-4.5 fill-current" />
                  </button>

                  <div className="flex-1 hidden sm:block" />

                  <div
                    className="text-right text-[#C2A47E]/40 italic pr-1 hidden sm:block select-none"
                    style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.2rem" }}
                  >
                    nhạc ký ức Việt
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
