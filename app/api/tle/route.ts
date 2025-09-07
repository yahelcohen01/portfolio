import { getTleData } from "./controllers";

export async function GET() {
  return getTleData();
}
