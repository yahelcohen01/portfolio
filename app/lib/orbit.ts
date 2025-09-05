// lib/orbit.ts
import * as satellite from "satellite.js";

export type IssTle = { tle1: string; tle2: string };

export function ecefFromTleNow(tle: IssTle, date = new Date()) {
  const satrec = satellite.twoline2satrec(tle.tle1, tle.tle2);

  // Propagate to 'date' (returns position/velocity in ECI)
  const pv = satellite.propagate(satrec, date);
  if (!pv || !pv.position) return null;

  // Convert ECI to ECEF using GMST for 'date'
  const gmst = satellite.gstime(date);
  const ecef = satellite.eciToEcf(pv.position, gmst); // km

  // Return meters for rendering
  return {
    x: ecef.x * 1000,
    y: ecef.y * 1000,
    z: ecef.z * 1000,
  };
}

// Radius constants (meters)
export const EARTH_RADIUS_M = 6371_000;
