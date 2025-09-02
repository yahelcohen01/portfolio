"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxOverlap() {
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const yFast = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div className="relative h-[200vh] overflow-hidden">
      <motion.img
        src="/layer1.jpg"
        className="absolute top-0 left-0 w-full h-screen object-cover"
        style={{ y: ySlow }}
      />
      <motion.img
        src="/layer2.png"
        className="absolute top-0 left-0 w-full h-screen object-cover"
        style={{ y: yFast }}
      />
      <div className="relative z-10 h-screen flex items-center justify-center text-white text-3xl">
        Your Content Here
      </div>
    </div>
  );
}
