import { useRef } from "react";
import Link from "next/link";

export const Secret = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };
  return (
    <div
      className="w-24 cursor-pointer absolute bottom-0.5 left-3 z-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href="/secret">
        <video
          ref={videoRef}
          src="/star-wars.mp4"
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
        />
      </Link>
    </div>
  );
};
