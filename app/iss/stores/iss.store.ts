import { IssInfo } from "@shared/types";
import { create } from "zustand";

interface IssStore {
  info: IssInfo;
  setInfo: (info: IssInfo) => void;
}

export const useIssStore = create<IssStore>((set) => ({
  info: {
    lat: 0,
    lon: 0,
    altKm: 0,
    speedKmh: 0,
    positionKm: { x: 0, y: 0, z: 0 },
  },
  setInfo: (info) => set({ info }),
}));
