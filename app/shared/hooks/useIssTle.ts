import { useEffect, useRef, useState } from "react";
import * as satellite from "satellite.js";
import axiosInstance from "@/app/shared/lib/axios";

interface UseIssTleResult {
  tleLoaded: boolean;
  tleLines: string[] | null;
  satrec: satellite.SatRec | null;
}

const LOCAL_TLE_URL = "/tle/iss.txt"; // place a fallback file in /public/tle/iss.txt
const API_TLE_URL = "/api/tle"; // Next.js API proxy endpoint
const LOCAL_FALLBACK_TLE = [
  "2 25544  51.6332 270.8228 0004213 301.3502  58.7074 15.50112942527561",
  "1 25544U 98067A   25248.13333647  .00010878  00000+0  19750-3 0  9999",
];
const LOCALSTORAGE_KEY = "iss_tle_cached_v1";

export function useIssTle(): UseIssTleResult {
  const [tleLoaded, setTleLoaded] = useState(false);
  const [tleLines, setTleLines] = useState<string[] | null>(null);
  const satrecRef = useRef<satellite.SatRec | null>(null);

  useEffect(() => {
    let mounted = true;

    const saveCached = (lines: string[]) => {
      try {
        localStorage.setItem(
          LOCALSTORAGE_KEY,
          JSON.stringify({ t: Date.now(), lines })
        );
      } catch {}
    };

    const readCached = (): string[] | null => {
      try {
        const raw = localStorage.getItem(LOCALSTORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed.t && Date.now() - parsed.t < 1000 * 60 * 60 * 12) {
          // the cached TLE is fresh for 12 hours
          return parsed.lines;
        }
        return null;
      } catch {
        return null;
      }
    };

    const parseAndSet = (text: string) => {
      const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      for (let i = 0; i < lines.length; i++) {
        const nameLine = lines[i];
        if (/ISS|ZARYA/i.test(nameLine)) {
          const line1 = lines[i + 1];
          const line2 = lines[i + 2];
          if (line1?.startsWith("1 ") && line2?.startsWith("2 ")) {
            if (mounted) {
              setTleLines([line1, line2]);
              satrecRef.current = satellite.twoline2satrec(line1, line2);
              setTleLoaded(true);
              saveCached([line1, line2]);
            }
            return; // stop once ISS found
          }
        }
      }

      console.warn("Could not find ISS block in TLE file.");
    };

    const attempt = async () => {
      // 0) cached
      const cached = readCached();
      if (cached) {
        setTleLines(cached);
        satrecRef.current = satellite.twoline2satrec(cached[0], cached[1]);
        setTleLoaded(true);
        return;
      }

      // 1) API route
      try {
        const res = await axiosInstance.get(API_TLE_URL);
        if (res.status === 200) {
          parseAndSet(res.data);
          return;
        }
      } catch (err) {
        console.warn("API fetch failed:", err);
      }

      // 2) local file
      try {
        const res2 = await axiosInstance.get(LOCAL_TLE_URL);
        if (res2.status === 200) {
          parseAndSet(res2.data);
          return;
        }
      } catch {}

      // 3) hardcoded
      if (mounted) {
        const [l1, l2] = LOCAL_FALLBACK_TLE;
        setTleLines([l1, l2]);
        satrecRef.current = satellite.twoline2satrec(l1, l2);
        setTleLoaded(true);
        saveCached([l1, l2]);
      }
    };

    attempt();
    return () => {
      mounted = false;
    };
  }, []);

  return { tleLoaded, tleLines, satrec: satrecRef.current };
}
