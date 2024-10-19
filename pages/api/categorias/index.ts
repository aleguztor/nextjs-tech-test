// pages/api/categorias/index.ts

import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === "GET") {
    try {
      const categorias = await prisma.categoriaProducto.findMany({
        include: {
          productos: true, // Incluir los productos relacionados
        },
      })

      res.status(200).json(categorias)
    } catch (error) {
      res.status(500).json({ error: "Error al obtener categorías" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Método ${method} no permitido`)
  }
}
