"use client";
import React, { useEffect, useState, useRef } from "react";
import { useMedia } from "react-use";

const CRAWL_TEXT = `A long time ago in a galaxy far,
far away....


Episode IV

A NEW HOPE

It is a period of civil war. Rebel
spaceships, striking from a hidden
base, have won their first victory
against the evil Galactic Empire.

During the battle, Rebel spies managed
to steal secret plans to the Empire's
ultimate weapon, the DEATH STAR,
an armored space station with enough
power to destroy an entire planet.

Pursued by the Empire's sinister agents,
Princess Leia races home aboard her
starship, custodian of the stolen plans
that can save her people and restore
freedom to the galaxy....`;

export const StarWarsCrawl = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMedia("(max-width: 768px)");
  const maxScroll = 4000; // Maximum scroll distance

  // Handle scroll events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrollPosition((prev) => {
        const newPosition = prev + e.deltaY * (isMobile ? 1.5 : 0.5); // Adjust scroll speed
        return Math.max(0, Math.min(maxScroll, newPosition));
      });
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      containerRef.current?.setAttribute(
        "data-touch-start",
        touch.clientY.toString()
      );
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const startY = parseFloat(
        containerRef.current?.getAttribute("data-touch-start") || "0"
      );
      const deltaY = startY - touch.clientY;

      setScrollPosition((prev) => {
        const newPosition = prev + deltaY * (isMobile ? 1.5 : 0.5);
        return Math.max(0, Math.min(maxScroll, newPosition));
      });

      containerRef.current?.setAttribute(
        "data-touch-start",
        touch.clientY.toString()
      );
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [maxScroll]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden font-mono"
    >
      {/* Perspective container */}
      <div
        className="absolute flex items-end justify-center inset-0"
        style={{
          perspective: "400px",
          perspectiveOrigin: "50% 100%",
        }}
      >
        <div
          className="h-[100px] text-yellow-400 text-center leading-relaxed font-bold tracking-wider whitespace-pre-line transition-transform duration-100 ease-out"
          style={{
            transform: `rotateX(25deg) translateY(${
              100 - (scrollPosition / maxScroll) * 300
            }vh)`,
            transformOrigin: "50% 100%",
            fontSize: "clamp(1rem, 4vw, 2.5rem)",
            textShadow: "0 0 10px rgba(255, 255, 0, 0.5)",
          }}
        >
          {CRAWL_TEXT}
        </div>
      </div>

      {/* Title Shrink */}
      {scrollPosition < 100 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-yellow-400 pointer-events-none"
          style={{
            transform: `scale(${Math.max(0, 1 - scrollPosition / 100)})`, // shrink as scrolls
            opacity: 1, // keep fully visible (optional: you can still combine with opacity)
            textShadow: "0 0 20px rgba(255, 255, 0, 0.8)",
            // transition: "transform 0.1s linear", // smooth scaling
          }}
        >
          <img src="/logo.png" alt="Star Wars Logo" className="w-1/2" />
          <p className="text-yellow-400 text-sm md:text-lg flex justify-center">
            Im a big fan of Star Wars.
          </p>
          <p className="text-yellow-400 text-sm md:text-lg flex justify-self-center content-center">
            This is a tribute page. Keep scrolling!
          </p>
        </div>
      )}
    </div>
  );
};
