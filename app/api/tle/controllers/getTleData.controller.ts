import { getTextWithRevalidation } from "@shared/lib";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const CELESTRAK_URL =
  process.env.TLE_UPSTREAM_URL ||
  "https://celestrak.com/NORAD/elements/stations.txt";
const LOCAL_TLE_PATH = path.join(process.cwd(), "public", "tle", "iss.txt");
const REVALIDATE_SECONDS = 60 * 60 * 2; // 2 hours

export const runtime = "nodejs"; // ensures fs is available

export const getTleData = async () => {
  console.log("Fetching TLE data...");
  try {
    const text = await getTextWithRevalidation({
      url: CELESTRAK_URL,
      revalidateSeconds: REVALIDATE_SECONDS,
    });
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
};
