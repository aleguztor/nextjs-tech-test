import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface ProductStar {
  idproduct: number | null
  setIdproduct: (idproduct: number) => void
}

export const useProductStarStorage = create(
  persist<ProductStar>(
    (set) => ({
      idproduct: null,
      setIdproduct: (idproduct: number) =>
        set((state) => ({ ...state, idproduct })),
    }),
    {
      name: "product-star",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
