"use client";
import { StarfieldBackground } from "./components/StarFieldBackground";
import { StarWarsCrawl } from "./components/StarWarsCrawl";
import { ToggleMusicButton } from "./components/ToggleMusicButton";
import Link from "next/link";

export default function StarWarsSecretPage() {
  return (
    <div className="relative">
      <Link
        href="/"
        className="flex items-center hover:underline transition absolute mt-4 left-4 z-20 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Home
      </Link>
      <ToggleMusicButton />
      <StarfieldBackground>
        <StarWarsCrawl />
      </StarfieldBackground>
    </div>
  );
}
