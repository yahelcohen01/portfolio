import { getTleData } from "./controllers";

export async function GET() {
  console.log("TLE GET request received");
  return getTleData();
}
