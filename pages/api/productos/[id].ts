import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query // Obtener el id de los parámetros de la URL

  if (req.method === "GET") {
    try {
      // Buscar el producto por id
      const producto = await prisma.producto.findUnique({
        where: {
          id_producto: parseInt(id as string),
        },
      })

      // Verificar si el producto existe
      if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" })
      }

      // Responder con el producto encontrado
      res.status(200).json(producto)
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el producto", error })
    }
  } else {
    res.status(405).json({ message: "Método no permitido" })
  }
}
