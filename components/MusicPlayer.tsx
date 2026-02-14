"use client";

import { useRef, useEffect, useCallback } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/audio/bgm.mp4");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const startMusic = useCallback(() => {
    if (startedRef.current || !audioRef.current) return;
    audioRef.current.play().then(() => {
      startedRef.current = true;
      // Clean up listeners after successful play
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
      window.removeEventListener("pointerdown", startMusic);
    }).catch(() => {
      // Silently ignore — will retry on next interaction
    });
  }, []);

  useEffect(() => {
    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);
    window.addEventListener("pointerdown", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
      window.removeEventListener("pointerdown", startMusic);
    };
  }, [startMusic]);

  return null;
}
