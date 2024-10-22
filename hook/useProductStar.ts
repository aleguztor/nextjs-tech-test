import { useProductStarStorage } from "@/store/useProductStar"
import { Producto } from "@prisma/client"
import { useEffect, useState } from "react"

// HE FORZADO ESTE HOOK PARA HACER ESTA FUNCiÖN, NO ES LA MANERA MÁS ÓPTIMA
export default function useProductStar() {
  const idproduct = useProductStarStorage((state) => state.idproduct)
  const setIdproduct = useProductStarStorage((state) => state.setIdproduct)

  const [product, setproduct] = useState<Producto>({
    id_categoria: 0,
    id_producto: 0,
    nombre: "",
    precio: 0,
  })

  useEffect(() => {
    const fetchProducto = async () => {
      let data: Producto
      try {
        const response = await fetch(`/api/productos/${idproduct}`)
        data = await response.json()
      } catch (error) {
        throw new Error("Error al obtener el producto")
      }
      return data
    }
    fetchProducto().then((res) => setproduct(res))
  }, [idproduct])

  return { product, setIdproduct }
}
