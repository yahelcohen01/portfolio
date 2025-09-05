"use client";

import React, { PropsWithChildren, useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
}

interface StaticStar {
  x: number;
  y: number;
  brightness: number;
  size: number;
}

export const StarfieldBackground = ({ children }: PropsWithChildren) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);
  const starsRef = useRef<Star[]>([]);
  const staticStarsRef = useRef<StaticStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Re-initialize static stars when canvas resizes
      const numStaticStars = 200;
      const staticStars: StaticStar[] = [];

      for (let i = 0; i < numStaticStars; i++) {
        staticStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          brightness: Math.random() * 0.8 + 0.2, // 0.2 to 1.0
          size: Math.random() * 1.5 + 0.5, // 0.5 to 2.0
        });
      }
      staticStarsRef.current = staticStars;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize moving stars
    const numStars = 600;
    const stars: Star[] = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * 1600 - 800,
        y: Math.random() * 900 - 450,
        z: Math.random() * 1000,
        prevX: 0,
        prevY: 0,
      });
    }

    starsRef.current = stars;

    // Animation function
    const animate = () => {
      const stars = starsRef.current;
      const staticStars = staticStarsRef.current;

      // Clear canvas with slight fade for trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw static background stars first
      staticStars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * 0.4})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw moving stars
      stars.forEach((star) => {
        // Store previous position for trail effect
        star.prevX = (star.x / star.z) * canvas.width + centerX;
        star.prevY = (star.y / star.z) * canvas.height + centerY;

        // Move star towards viewer - MUCH SLOWER NOW
        star.z -= 0.3;

        // Reset star if it goes past the viewer
        if (star.z <= 0) {
          star.x = Math.random() * 1600 - 800;
          star.y = Math.random() * 900 - 450;
          star.z = 1000;
        }

        // Calculate screen position
        const x = (star.x / star.z) * canvas.width + centerX;
        const y = (star.y / star.z) * canvas.height + centerY;

        // Calculate star size and opacity based on distance
        const size = (1 - star.z / 1000) * 2;
        const opacity = 1 - star.z / 1000;

        // Only draw stars that are on screen
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          // Draw trail line
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
          ctx.lineWidth = size * 0.5;
          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(x, y);
          ctx.stroke();

          // Draw star
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10"
        style={{ background: "black" }}
      />

      {/* Your page content - now properly visible */}
      <div className="flex items-center justify-center min-h-screen">
        {children}
      </div>
    </>
  );
};
