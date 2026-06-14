import { create } from "zustand";

interface HouseState {
  selectedHouseId: string | null;

  setSelectedHouseId: (
    houseId: string
  ) => void;
}

export const useHouseStore =
  create<HouseState>((set) => ({
    selectedHouseId: null,

    setSelectedHouseId: (
      houseId: string
    ) =>
      set({
        selectedHouseId: houseId,
      }),
  }));