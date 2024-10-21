import { Producto } from "@prisma/client"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
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

interface ProductoConCategoria extends Producto {
  categoria: {
    nombre: string
  }
}

interface PageProps {
  products: ProductoConCategoria[]
  totalPages: number
  currentPage: number
  minPrice?: number
  maxPrice?: number
}

const limit = 10 // Número de products por página

const Page = ({
  products,
  totalPages,
  currentPage,
  minPrice,
  maxPrice,
}: PageProps) => {
  const [filters, setFilters] = useState<{
    minPrice?: number
    maxPrice?: number
  }>({
    minPrice,
    maxPrice,
  })
  const router = useRouter()
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      router.push({
        pathname: "/products",
        query: {
          page: currentPage - 1, // Reiniciar a la página 1 al aplicar nuevos filtros
          minPrice: filters.minPrice || "",
          maxPrice: filters.maxPrice || "",
        },
      })
    }
  }
  const [loading, setLoading] = useState(false)
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      router.push({
        pathname: "/products",
        query: {
          page: currentPage + 1, // Reiniciar a la página 1 al aplicar nuevos filtros
          minPrice: filters.minPrice || "",
          maxPrice: filters.maxPrice || "",
        },
      })
    }
  }
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true) // Inicia la carga al cambiar de ruta
    }

    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setLoading(false) // Detén la carga después del retraso artificial para dar feedback
      }, 900)
    }

    router.events.on("routeChangeStart", handleRouteChangeStart)
    router.events.on("routeChangeComplete", handleRouteChangeComplete)

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart)
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [router])
  return (
    <>
      {loading ? (
        <div className="fixed z-40 flex h-full w-full items-center justify-center bg-black opacity-70">
          <p className="text-2xl text-white"> Cargando...</p>
        </div>
      ) : null}
      <div className="md:m-10">
        <div className="containerApp">
          <h1>Lista de products</h1>
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault()
              window.location.href = `/products?page=${currentPage}&minPrice=${filters.minPrice || ""}&maxPrice=${filters.maxPrice || ""}`
            }}
            className="mb-5 flex flex-wrap items-center justify-end gap-4"
          >
            <h4>
              <strong>Filtros</strong>
            </h4>

            <input
              className="w-[100px] rounded-md pl-2 pr-2"
              type="number"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({
                  minPrice: e.currentTarget.valueAsNumber,
                  maxPrice: filters.maxPrice,
                })
              }
              placeholder="Min price"
            />
            <input
              className="w-[105px] rounded-md pl-2 pr-2"
              type="number"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({
                  maxPrice: e.currentTarget.valueAsNumber,
                  minPrice: filters.minPrice,
                })
              }
              placeholder="Max price"
            />
            <button type="submit">Submit</button>
          </form>

          {products.length > 0 ? (
            <ul>
              {products.map((producto, index) => (
                <>
                  {index === 0 && (
                    <>
                      <li
                        key={producto.id_producto}
                        className="grid grid-cols-3 items-center"
                      >
                        <h5>
                          <strong>Nombre</strong>
                        </h5>
                        <h5 className="text-center">
                          <strong>Categoría</strong>
                        </h5>
                        <h5 className="text-right">
                          <strong>Precio</strong>
                        </h5>
                      </li>
                      <hr />
                    </>
                  )}

                  <div>
                    <li
                      key={producto.id_producto}
                      className="grid grid-cols-3 items-center pb-2 pt-2"
                    >
                      <p className="place-content-center">{producto.nombre}</p>
                      <p className="place-content-center text-center">
                        {producto.categoria.nombre}
                      </p>
                      <p className="place-content-center text-right">
                        {producto.precio} €
                      </p>
                    </li>
                    <hr className="w-[100%]" />
                  </div>
                </>
              ))}
            </ul>
          ) : (
            <h3>No hay products</h3>
          )}
        </div>
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
      </div>
    </>
  )
}

// Server-side rendering logic
export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string, 10) || 1
  const minPrice = parseFloat(context.query.minPrice as string) || undefined
  const maxPrice = parseFloat(context.query.maxPrice as string) || undefined

  // Lógica para obtener los products paginados desde Prisma
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/productos/paginated?page=${page}&limit=${limit}` +
      (minPrice ? `&minprice=${minPrice}` : "") +
      (maxPrice ? `&maxprice=${maxPrice}` : "")
  )
  const data: PaginatedResponse = await response.json()

  return {
    props: {
      products: data.productos,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
    },
  }
}

export default Page
