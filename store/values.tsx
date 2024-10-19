import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type BearStore = {
  bears: number
}

export const useBearStore = create(
  persist<BearStore>(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
