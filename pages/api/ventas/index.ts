import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

interface VentasPorMes {
  mes: number
  año: number
  totalVentas: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === "GET") {
    const { year } = req.query

    try {
      const ventas = await prisma.venta.groupBy({
        by: ["fecha_venta"],
        _sum: {
          cantidad: true, // Cambia 'total' por el nombre correcto de tu campo de monto de ventas
        },
      })

      const resultados: VentasPorMes[] = ventas.map((item) => {
        const fecha = new Date(item.fecha_venta)
        return {
          mes: fecha.getMonth() + 1, // Mes (1-12)
          año: fecha.getFullYear(), // Año
          totalVentas: item._sum.cantidad || 0,
        }
      })

      // Filtrar por año si se proporciona
      const ventasFiltradas = year
        ? resultados.filter((item) => item.año === parseInt(year as string))
        : resultados

      // Agrupar por mes
      const ventasAgrupadas = ventasFiltradas.reduce(
        (
          acc: Record<
            number,
            { mes: number; año: number; totalVentas: number }
          >,
          item: VentasPorMes
        ) => {
          const key = item.mes // Agrupar por mes
          if (!acc[key]) {
            acc[key] = {
              mes: item.mes,
              año: item.año,
              totalVentas: item.totalVentas || 0,
            }
          } else {
            acc[key].totalVentas += item.totalVentas || 0 // Sumar total de ventas
          }
          return acc
        },
        {}
      )
      res.status(200).send(Object.values(ventasAgrupadas))
    } catch (error) {
      res.status(500).json({ error })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Método ${method} no permitido`)
  }
}
