import React from "react";
import { usePlayer } from "../context/PlayerContext";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const getDarkenedColor = (hex: string) => {
  const colorMap: Record<string, string> = {
    "#8B0000": "#220406", // Period 1
    "#6B3A1A": "#1E1007", // Period 2
    "#2D4A3E": "#0D1814", // Period 3
    "#4A3728": "#140F0A", // Period 4
    "#2C3A5A": "#0B101A", // Period 5
    "#1A1A2E": "#070714", // Period 6
  };
  return colorMap[hex] || "#161616";
};

export const MusicPlayerBar: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    progress,
    deviceConnected,
    togglePlay,
    seek,
  } = usePlayer();

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = (clickX / width) * 100;
    seek(percentage);
  };

  // Format active artist (extract first part before '/')
  const artistText = currentTrack.artist.split("/")[0].trim();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-6 left-1/2 z-50 w-[90%] sm:w-[500px] md:w-[600px] h-[72px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border flex items-center justify-between px-4 overflow-hidden select-none"
        style={{
          backgroundColor: getDarkenedColor(currentTrack.color),
          borderColor: `${currentTrack.color}30`,
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Ambient glow inside */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-500"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${currentTrack.color} 0%, transparent 60%)`,
          }}
        />

        {/* Left Section: Cover Art + Text Info */}
        <div className="flex items-center gap-3.5 min-w-0 z-10">
          {/* Mini Album Art */}
          <div
            className="w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center font-bold text-white relative shadow-md overflow-hidden"
            style={{
              backgroundColor: currentTrack.color,
              fontFamily: "'Fraunces', serif",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-white/10" />
            <span className="text-xl font-black tracking-tighter" style={{ color: "#F5F1E8" }}>
              {parseInt(currentTrack.coverNum)}
            </span>
          </div>

          {/* Song Info */}
          <div className="flex flex-col min-w-0">
            <span
              className="text-white text-sm font-semibold truncate max-w-[200px] sm:max-w-[300px]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {currentTrack.title}{" "}
              <span className="text-white/30 mx-1.5 font-normal">•</span>{" "}
              <span className="text-white/60 font-normal text-xs">{artistText}</span>
            </span>

            {/* Device connected info */}
            <span className="flex items-center gap-1.5 mt-0.5 text-[11px] font-semibold text-[#1DB954] tracking-wide">
              {deviceConnected}
            </span>
          </div>
        </div>

        {/* Right Section: Bluetooth symbol + Play/Pause Button */}
        <div className="flex items-center gap-4.5 z-10 pr-2">
          {/* Play/Pause Circle */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-black text-black" />
            ) : (
              <Play className="w-5 h-5 fill-black text-black translate-x-[1px]" />
            )}
          </button>
        </div>

        {/* Progress Bar Container at the bottom edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 cursor-pointer group hover:h-1.5 transition-all duration-150"
          onClick={handleProgressBarClick}
        >
          <div
            className="h-full bg-white/60 group-hover:bg-[#1DB954] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
