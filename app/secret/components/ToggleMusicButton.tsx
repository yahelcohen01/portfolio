"use client";
import { useEffect, useRef, useState } from "react";

export function ToggleMusicButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="flex items-center gap-2 absolute mt-4 right-4 z-20">
      {/* Hidden audio element */}
      <audio ref={audioRef} loop>
        <source src="/star-wars-opening.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Toggle button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="hover:scale-125 transition"
      >
        {isPlaying ? (
          // Speaker (playing)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        ) : (
          // Muted speaker
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </button>
    </div>
  );
}
