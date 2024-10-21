import { useNotes } from "@/hook/useNotes"
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

  const nVentas = useNotes((state) => state.nVentas)
  const setNVentas = useNotes((state) => state.setNVentas)
  const [isNotesOpen, setIsNotesOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: { clientX: number; clientY: number }) => {
    setDragging(true)
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    if (dragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      })
    }
  }

  const handleMouseUp = () => {
    setDragging(false)
  }
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
  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging])

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
      <button
        onClick={() => setIsNotesOpen(!isNotesOpen)}
        className="!bg-transparent !text-[--terciary-color] hover:!text-gray-400"
      >
        {isNotesOpen ? "CERRAR" : "ABRIR"} NOTAS
      </button>
      {isNotesOpen ? (
        <div
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          className="absolute box-border h-[300px] w-[300px] overflow-hidden bg-[--backgroundcolor] shadow-xl"
          id="nVentas"
        >
          <header className="flex items-center justify-between bg-[--terciary-color]">
            <div
              style={{ cursor: dragging ? "grabbing" : "grab" }}
              className="h-full w-full text-white"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <span className="ml-4 select-none">You can move this window</span>
            </div>
            <button
              onClick={() => setIsNotesOpen(false)}
              className="!rounded-none"
            >
              <span className="select-none">X</span>
            </button>
          </header>

          <div className="box-border h-full p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3>Notas</h3>
            </div>
            <textarea
              className="box-border h-[170px] max-h-[100%] w-full resize-none"
              placeholder="Escribe tus notas de venta aquí"
              value={nVentas}
              onChange={(e) => setNVentas(e.target.value)}
              name="nVentasText"
              id="nVentasText"
            />
          </div>
        </div>
      ) : null}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <canvas
            style={{
              maxHeight: window.innerHeight - 305 + "px", // Establece la altura máxima
              width: "100%", // Ajusta el ancho según sea necesario
            }}
            ref={canvasRef}
          />
        </>
      )}
    </div>
  )
}

export default GraficoVentas
