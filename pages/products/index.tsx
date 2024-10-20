import { Producto } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"

interface PaginatedResponse {
  totalCount: number
  productos: ProductoConCategoria[]
  totalPages: number
  currentPage: number
}
interface ProductoConCategoria extends Producto {
  categoria: {
    nombre: string
  }
}
const Page = () => {
  const [productos, setProductos] = useState<ProductoConCategoria[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  const limit = 10 // Número de productos por página

  const fetchProductos = async (
    page: number,
    minPrice?: number,
    maxPrice?: number
  ) => {
    setLoading(true)
    const response = await fetch(
      `/api/productos/paginated?page=${page}&limit=${limit}` +
        (minPrice ? `&minprice=${minPrice}` : "") +
        (maxPrice ? `&maxprice=${maxPrice}` : "")
    )
    const data: PaginatedResponse = await response.json()

    setProductos(data.productos)
    setTotalPages(data.totalPages)
    setCurrentPage(data.currentPage)
    setLoading(false)
  }

  useEffect(() => {
    fetchProductos(currentPage, filers.minPrice, filers.maxPrice)
  }, [currentPage])

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  const [filers, setFilters] = useState<{
    minPrice?: number
    maxPrice?: number
  }>({ minPrice: undefined, maxPrice: undefined })

  return (
    <div className="md:m-10">
      <div className="containerApp">
        <h1>List of products</h1>
        <br />
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <form
              onSubmit={() =>
                fetchProductos(currentPage, filers.minPrice, filers.maxPrice)
              }
              className="mb-5 flex flex-wrap items-center justify-end gap-4"
            >
              <h4>
                <strong>Filtros</strong>
              </h4>

              <input
                className="w-[100px] rounded-md pl-2 pr-2"
                type="number"
                value={filers.minPrice}
                onChange={(e) =>
                  setFilters({
                    minPrice: e.currentTarget.valueAsNumber,
                    maxPrice: filers.maxPrice,
                  })
                }
                placeholder="Min price"
              />
              <input
                className="w-[105px] rounded-md pl-2 pr-2"
                max={20}
                value={filers.maxPrice}
                onChange={(e) =>
                  setFilters({
                    maxPrice: e.currentTarget.valueAsNumber,
                    minPrice: filers.minPrice,
                  })
                }
                type="number"
                placeholder="Max price"
              />
              <button
                onClick={() =>
                  fetchProductos(currentPage, filers.minPrice, filers.maxPrice)
                }
              >
                Submit
              </button>
            </form>
            {productos.length > 0 ? (
              <ul>
                {productos.map((producto, index) => (
                  <>
                    {index === 0 ? (
                      <>
                        <li
                          className="grid grid-cols-3"
                          key={producto.id_producto}
                        >
                          <h5>
                            <strong>Name</strong>
                          </h5>
                          <h5 className="text-center">
                            <strong>Category</strong>
                          </h5>
                          <h5 className="text-right">
                            <strong>Price</strong>
                          </h5>
                        </li>
                        <hr />
                      </>
                    ) : null}
                    <li
                      className="grid h-[40px] grid-cols-3 items-center"
                      key={producto.id_producto}
                    >
                      <p className="place-content-center"> {producto.nombre}</p>
                      <p className="place-content-center text-center">
                        {producto.categoria.nombre}
                      </p>
                      <p className="place-content-center text-right">
                        {producto.precio} €
                      </p>
                    </li>
                    <hr />
                  </>
                ))}
              </ul>
            ) : (
              <h3>No hay productos</h3>
            )}
          </>
        )}
      </div>
      {!loading ? (
        <div className="mt-5 flex items-center justify-center gap-5">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default Page
