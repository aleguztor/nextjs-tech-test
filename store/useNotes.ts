import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface Notes {
  nVentas: string
  nProfile: string
  setNVentas: (notes: string) => void
  setNProfile: (notes: string) => void
}

export const useNotes = create(
  persist<Notes>(
    (set) => ({
      nVentas: "",
      nProfile: "",
      setNVentas: (nVentas: string) => set((state) => ({ ...state, nVentas })),
      setNProfile: (nProfile: string) =>
        set((state) => ({ ...state, nProfile })),
    }),
    {
      name: "notes",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
