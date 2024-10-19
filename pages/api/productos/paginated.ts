import {
  CategoriaProducto,
  Prisma,
  PrismaClient,
  Producto,
  Venta,
} from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()
interface ProductoConCategoria extends Producto {
  categoria: {
    nombre: string
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = 1, limit = 10 } = req.query

  const pageNumber = Number(page)
  const pageLimit = Number(limit)

  if (isNaN(pageNumber) || isNaN(pageLimit)) {
    return res.status(400).json({ error: "Page and limit must be numbers" })
  }

  try {
    const totalCount = await prisma.producto.count()
    const productos: ProductoConCategoria[] = await prisma.producto.findMany({
      skip: (pageNumber - 1) * pageLimit,
      take: pageLimit,
      include: {
        categoria: true,
      },
    })
    res.status(200).json({
      totalCount,
      productos,
      totalPages: Math.ceil(totalCount / pageLimit),
      currentPage: pageNumber,
    })
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" })
  }
}
