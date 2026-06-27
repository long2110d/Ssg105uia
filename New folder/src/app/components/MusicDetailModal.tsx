import React, { useState, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import { Play, Pause, X, SkipForward, SkipBack, Volume2, VolumeX, Sparkles, Music } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Grain } from "./Grain";

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
  } = usePlayer();

  // Mouse position tracker for parallax effect
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

  // Safe artist string extraction
  const artistText = currentTrack.artist.split("/")[0].trim();
  const composerText = currentTrack.artist.split("/")[1]?.trim();

  return (
    <AnimatePresence>
      {isDetailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop Blur layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-[#060606]/85 backdrop-blur-xl transition-all cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-4xl bg-[#0F0F0F] border border-[#C2A47E]/15 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_80px_rgba(194,164,126,0.08)] z-10 flex flex-col md:grid md:grid-cols-12 min-h-[500px]"
          >
            {/* Fine grain overlay */}
            <Grain opacity={0.05} />

            {/* Floating Decorative Elements with Mouse Parallax */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
              {/* Mini Album Cover 1 */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [12, 16, 8, 12],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                style={{
                  x: mousePos.x * -15,
                  y: mousePos.y * -15,
                }}
                className="absolute -top-8 -left-8 w-20 h-20 rounded-xl bg-[#8B0000] border border-white/5 shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center font-serif text-[#F5F1E8] text-2xl font-black blur-[0.3px] rotate-12 hidden md:flex"
              >
                01
              </motion.div>

              {/* Mini Album Cover 2 */}
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [-15, -10, -20, -15],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 7,
                  ease: "easeInOut",
                  delay: 1,
                }}
                style={{
                  x: mousePos.x * 20,
                  y: mousePos.y * 20,
                }}
                className="absolute -bottom-8 -right-8 w-24 h-24 rounded-xl bg-[#4A3728] border border-white/5 shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center font-serif text-[#F5F1E8] text-3xl font-black blur-[0.5px] -rotate-15 hidden md:flex"
              >
                04
              </motion.div>

              {/* Floating Music Note 1 */}
              <motion.div
                animate={{
                  y: [0, -22, 0],
                  x: [0, 12, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                }}
                style={{
                  x: mousePos.x * -25,
                  y: mousePos.y * -25,
                }}
                className="absolute top-1/4 -right-12 text-[#C2A47E]/30 blur-[0.8px] hidden sm:block"
              >
                <Music className="w-8 h-8" />
              </motion.div>

              {/* Floating Sparkle */}
              <motion.div
                animate={{
                  y: [0, 18, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5.5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                style={{
                  x: mousePos.x * 15,
                  y: mousePos.y * 15,
                }}
                className="absolute bottom-1/4 -left-12 text-[#C2A47E]/35 blur-[0.3px] hidden sm:block"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>

              {/* Floating Musical Clef Symbol */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                style={{
                  x: mousePos.x * -10,
                  y: mousePos.y * -10,
                }}
                className="absolute -bottom-12 left-1/4 text-[#C2A47E]/20 blur-[1px]"
              >
                <span className="text-4xl font-serif">♫</span>
              </motion.div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsDetailOpen(false)}
              className="absolute top-5 right-5 z-30 text-[#F5F1E8]/50 hover:text-[#F5F1E8] hover:scale-105 active:scale-95 bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Visual Centerpiece (Turntable) + Extra Player Controls */}
            <div className="relative col-span-5 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#C2A47E]/10 z-10 bg-[#0A0A0A]/40">
              
              {/* Radial glow background behind turntable */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${currentTrack.color} 0%, transparent 70%)`,
                }}
              />

              {/* RETRO TURNTABLE PLAYER */}
              <div className="relative w-full max-w-[270px] md:max-w-[300px] aspect-square rounded-2xl bg-gradient-to-br from-[#2D1B10] to-[#120A06] border border-[#3A2214] shadow-[inset_0_2px_8px_rgba(255,255,255,0.06),0_15px_35px_rgba(0,0,0,0.7)] p-5 flex items-center justify-center overflow-hidden mb-6 group">
                
                {/* Turntable Brass Corner Bracket details */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C2A47E]/40" />
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C2A47E]/40" />
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C2A47E]/40" />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C2A47E]/40" />

                {/* Turntable Platter Plate */}
                <div className="w-[84%] h-[84%] rounded-full bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-900 border-[2px] border-[#C2A47E]/15 shadow-inner flex items-center justify-center relative">
                  
                  {/* VINYL RECORD */}
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 7 }}
                    className="w-[92%] h-[92%] rounded-full bg-black relative flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.6)] border border-neutral-800"
                    style={{
                      backgroundImage: "repeating-radial-gradient(circle, #181818, #0e0e0e 1.5px, #181818 3px)",
                    }}
                  >
                    {/* Vinyl Center Sticker */}
                    <div
                      className="w-[33%] h-[33%] rounded-full flex flex-col items-center justify-center text-center relative border border-black/30 shadow-[inset_0_1px_3px_rgba(255,255,255,0.2)]"
                      style={{ backgroundColor: currentTrack.color }}
                    >
                      {/* Subtle circular accents on sticker */}
                      <div className="absolute inset-1 rounded-full border border-white/10" />
                      <span className="text-[7px] text-white/50 tracking-wider font-bold font-sans uppercase">
                        VINTAGE
                      </span>
                      <span
                        className="text-lg font-black text-[#F5F1E8] leading-none my-0.5"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        {currentTrack.coverNum}
                      </span>
                      <span className="text-[6px] text-white/30 tracking-tight font-sans">
                        MEMORIES
                      </span>
                      {/* Spindle Pin hole */}
                      <div className="w-2 h-2 rounded-full bg-[#0F0F0F] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-neutral-700 shadow-inner" />
                    </div>
                  </motion.div>
                </div>

                {/* TONEARM ASSEMBLY */}
                <div className="absolute top-3 right-3 w-20 h-36 pointer-events-none z-20">
                  {/* Pivot Pin */}
                  <div className="absolute top-2 right-4 w-7 h-7 rounded-full bg-gradient-to-br from-zinc-400 via-zinc-600 to-zinc-800 border border-zinc-700 shadow-md flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-zinc-900 border border-zinc-950 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C2A47E]" />
                    </div>
                  </div>

                  {/* Arm Rod + Headshell */}
                  <motion.div
                    animate={{ rotate: isPlaying ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 70, damping: 14 }}
                    style={{
                      originX: "calc(100% - 20px)",
                      originY: "14px",
                    }}
                    className="absolute top-2 right-4 w-6 h-32 origin-top-right flex flex-col items-center"
                  >
                    {/* Counterweight back element */}
                    <div className="absolute -top-3 w-3.5 h-4 bg-zinc-800 border border-zinc-900 rounded shadow" />
                    
                    {/* Metal Rod */}
                    <div className="w-1 h-20 bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-200 shadow-sm rounded-full mt-1.5" />
                    
                    {/* Headshell/Stylus cartridge */}
                    <div className="w-3.5 h-6 bg-zinc-800 rounded-sm shadow-md border border-zinc-955 -rotate-[10deg] translate-x-[-1px] translate-y-[-1px] flex flex-col items-center justify-end p-0.5">
                      {/* Gold Cartridge head */}
                      <div className="w-1.5 h-2.5 bg-[#C2A47E] rounded-xs" />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Slim Progress Bar */}
              <div className="w-full mt-2 relative z-10 px-2">
                <div
                  className="w-full h-1 bg-white/10 rounded-full cursor-pointer relative group flex items-center"
                  onClick={handleProgressBarClick}
                >
                  {/* Glowing progress filling */}
                  <div
                    className="h-full bg-gradient-to-r from-[#C2A47E] to-[#E5C79E] rounded-full shadow-[0_0_8px_rgba(194,164,126,0.6)]"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Micro-handle */}
                  <div
                    className="absolute w-2 h-2 rounded-full bg-[#F5F1E8] shadow-md border border-[#C2A47E] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    style={{ left: `calc(${progress}% - 4px)` }}
                  />
                </div>
                {/* Time values */}
                <div className="flex justify-between items-center text-[10px] text-[#6B5F4E] font-mono mt-2 uppercase tracking-widest font-semibold">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Volume Controller Bar */}
              <div className="w-full flex items-center justify-center gap-2.5 mt-5 relative z-10">
                <button
                  onClick={handleVolumeClick}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 md:w-24 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C2A47E] focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #C2A47E ${isMuted ? 0 : volume}%, rgba(255,255,255,0.1) ${isMuted ? 0 : volume}%)`,
                  }}
                />
              </div>

            </div>

            {/* Right Column: Song Editorial Info + Main Controls */}
            <div className="col-span-7 p-6 md:p-10 flex flex-col justify-between z-10">
              
              {/* Top Meta info */}
              <div>
                {/* Epoch Badge */}
                <div className="flex items-center gap-2 mb-6">
                  <div
                    className="w-1.5 h-4 flex-shrink-0"
                    style={{ backgroundColor: currentTrack.color }}
                  />
                  <span
                    className="text-[#6B5F4E] font-semibold tracking-[0.25em] uppercase"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem" }}
                  >
                    {currentTrack.periodName} ({currentTrack.coverNum})
                  </span>
                </div>

                {/* Song Title */}
                <h2
                  className="text-[#F5F1E8] mb-1.5 font-black leading-[1.15]"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                    fontVariationSettings: "'opsz' 72",
                  }}
                >
                  {currentTrack.title}
                </h2>

                {/* Artist & Details */}
                <div
                  className="text-[#C2A47E] font-medium mb-1"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem" }}
                >
                  {artistText}
                  {composerText && (
                    <span className="text-[#6B5F4E] font-normal text-xs ml-2">
                      (Sáng tác: {composerText})
                    </span>
                  )}
                </div>

                {/* Album & Year */}
                {(currentTrack.album || currentTrack.year) && (
                  <p
                    className="text-[#6B5F4E] uppercase tracking-widest font-semibold font-sans mb-6 text-[10px]"
                  >
                    {currentTrack.album && <span>Album: {currentTrack.album}</span>}
                    {currentTrack.album && currentTrack.year && <span className="mx-2">•</span>}
                    {currentTrack.year && <span>Năm phát hành: {currentTrack.year}</span>}
                  </p>
                )}

                {/* Story Description (Nostalgic context) */}
                {currentTrack.story && (
                  <div className="relative mt-2 p-5 bg-[#141414]/70 border border-white/5 rounded-2xl overflow-hidden shadow-inner">
                    <span className="absolute -top-3 left-4 text-7xl font-serif text-[#C2A47E]/10 select-none pointer-events-none">
                      “
                    </span>
                    <p
                      className="text-[#A09080] italic leading-relaxed relative z-10"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: "0.92rem",
                        fontVariationSettings: "'opsz' 9",
                        textIndent: "1.2rem",
                      }}
                    >
                      {currentTrack.story}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Playback buttons */}
              <div className="flex items-center gap-6 mt-8 border-t border-white/5 pt-6 select-none">
                
                {/* Prev Button */}
                <button
                  onClick={prevTrack}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#C2A47E] hover:text-[#F5F1E8] hover:bg-white/5 active:scale-90 transition-all cursor-pointer"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>

                {/* Main Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-[#C2A47E] hover:bg-[#D4B893] text-[#0F0F0F] flex items-center justify-center shadow-[0_6px_20px_rgba(194,164,126,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current translate-x-[1px]" />
                  )}
                </button>

                {/* Next Button */}
                <button
                  onClick={nextTrack}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#C2A47E] hover:text-[#F5F1E8] hover:bg-white/5 active:scale-90 transition-all cursor-pointer"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>

                <div className="flex-1" />

                {/* Decorative retro vibes note signature */}
                <div
                  className="text-right text-[#C2A47E]/40 italic pr-1 hidden sm:block select-none"
                  style={{ fontFamily: "'Caveat', cursive", fontSize: "1.3rem" }}
                >
                  nhạc ký ức Việt
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
