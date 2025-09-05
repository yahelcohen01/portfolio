"use client";
import { EarthScene } from "../components/EarthScene";
// import dynamic from "next/dynamic";

// const ISSTracker3D = dynamic(() => import("../components/IssScene"), {
//   ssr: false,
//   loading: () => <div>Loading ISS Tracker...</div>,
// });

export default function Page() {
  return <EarthScene />;
}
