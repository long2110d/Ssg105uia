import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { PERIODS, Song } from "../data/periods";

export interface Track extends Song {
  periodId: number;
  periodName: string;
  coverNum: string;
  color: string;
}

// Flatten all tracks for simple next/prev queue navigation
export const ALL_TRACKS: Track[] = PERIODS.flatMap((period) =>
  period.songs.map((song) => ({
    ...song,
    periodId: period.id,
    periodName: period.label,
    coverNum: period.frame,
    color: period.color,
  }))
);

interface PlayerContextType {
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  deviceConnected: string;
  playTrack: (track: Song, periodId: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (percentage: number) => void;
  activePeriodId: number;
  setActivePeriodId: (id: number) => void;
  hasPlayed: boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with the very first song of the first period
  const [currentTrack, setCurrentTrack] = useState<Track>(ALL_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activePeriodId, setActivePeriodId] = useState<number>(1);
  const [hasPlayed, setHasPlayed] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const duration = currentTrack.duration;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const deviceConnected = "BEATSPILL+";

  // Handle timer simulation for playing audio
  useEffect(() => {
    if (isPlaying) {
      // Tick every 1 second
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration - 1) {
            // Track finished - play next track
            clearInterval(timerRef.current!);
            // Handle transition asynchronously to prevent state update cycle issues
            setTimeout(() => {
              nextTrack();
            }, 0);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, currentTrack]);

  // Sync active period id with current track
  useEffect(() => {
    setActivePeriodId(currentTrack.periodId);
  }, [currentTrack]);

  const playTrack = (song: Song, periodId: number) => {
    const period = PERIODS.find((p) => p.id === periodId);
    if (!period) return;

    const track: Track = {
      ...song,
      periodId,
      periodName: period.label,
      coverNum: period.frame,
      color: period.color,
    };

    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
    setHasPlayed(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!hasPlayed) {
      setHasPlayed(true);
    }
  };

  const nextTrack = () => {
    const currentIndex = ALL_TRACKS.findIndex(
      (t) => t.title === currentTrack.title && t.periodId === currentTrack.periodId
    );
    const nextIndex = (currentIndex + 1) % ALL_TRACKS.length;
    setCurrentTrack(ALL_TRACKS[nextIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    const currentIndex = ALL_TRACKS.findIndex(
      (t) => t.title === currentTrack.title && t.periodId === currentTrack.periodId
    );
    const prevIndex = (currentIndex - 1 + ALL_TRACKS.length) % ALL_TRACKS.length;
    setCurrentTrack(ALL_TRACKS[prevIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const seek = (percentage: number) => {
    const newTime = Math.max(0, Math.min(duration, Math.round((percentage / 100) * duration)));
    setCurrentTime(newTime);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        progress,
        deviceConnected,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        seek,
        activePeriodId,
        setActivePeriodId,
        hasPlayed,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
