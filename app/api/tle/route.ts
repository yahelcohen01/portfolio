import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getTextWithRevalidation } from "@/app/lib/axios";

const CELESTRAK_URL =
  process.env.TLE_UPSTREAM_URL ||
  "https://celestrak.com/NORAD/elements/stations.txt";
const LOCAL_TLE_PATH = path.join(process.cwd(), "public", "tle", "iss.txt");
const REVALIDATE_SECONDS = 60 * 60 * 2; // 2 hours

export const runtime = "nodejs"; // ensures fs is available

export async function GET() {
  // Try upstream using axios with revalidation

  console.log("Fetching TLE data...");
  try {
    const text = await getTextWithRevalidation(
      CELESTRAK_URL,
      REVALIDATE_SECONDS
    );
    // Return the raw TLE file text
    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.warn("TLE upstream fetch failed:", err);
  }

  // Fallback: local file in public/tle/iss.txt
  try {
    const local = await fs.readFile(LOCAL_TLE_PATH, "utf-8");
    return new Response(local, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("Local fallback TLE read failed:", err);
  }

  // Last resort: 503
  return new NextResponse("TLE not available", { status: 503 });
}
