import { Chart, registerables } from "chart.js"
import { useEffect, useRef, useState } from "react"

Chart.register(...registerables)

const GraficoVentas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ventas, setVentas] = useState<
    { mes: number; año: number; totalVentas: number }[]
  >([])
  const [year, setYear] = useState<number>(2024) // Establecer el año predeterminado
  const [loading, setLoading] = useState<boolean>(true)

  const fetchVentas = async (year: number) => {
    setLoading(true)
    const response = await fetch(`/api/ventas?year=${year}`)
    const data = await response.json()
    setVentas(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchVentas(year)
  }, [year])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (ctx) {
      const labels = Array.from({ length: 12 }, (_, i) => i + 1) // Meses de 1 a 12
      const totalVentasPorMes = Array(12).fill(0)
      console.log(ventas)
      ventas.forEach((venta) => {
        totalVentasPorMes[venta.mes - 1] += venta.totalVentas
      })

      new Chart(ctx, {
        type: "bar", // Cambia a 'line' si prefieres un gráfico de líneas
        data: {
          labels,
          datasets: [
            {
              label: "Total Ventas",
              data: totalVentasPorMes,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Mes",
              },
            },
            y: {
              title: {
                display: true,
                text: "Total Ventas",
              },
            },
          },
        },
      })
    }
  }, [ventas])

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(e.target.value))
  }

  return (
    <div>
      <h2>Gráfico de Ventas por Mes</h2>
      <label htmlFor="year">Selecciona el año: </label>
      <select id="year" value={year} onChange={handleYearChange}>
        {/* Cambia los años según tus datos */}
        <option value={2024}>2024</option>
        <option value={2023}>2023</option>
        <option value={2022}>2022</option>
        <option value={2021}>2021</option>
      </select>
      {loading ? <p>Cargando...</p> : <canvas ref={canvasRef} />}
    </div>
  )
}

export default GraficoVentas
