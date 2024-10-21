import GraficoVentas from "@/components/GraficSells"
import { useNotes } from "@/store/useNotes"
import { signIn, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Home() {
  const { data: session } = useSession()
  const { theme } = useTheme()
  const [isNotesOpen, setIsNotesOpen] = useState(true)
  const nVentas = useNotes((state) => state.nVentas)
  const setNVentas = useNotes((state) => state.setNVentas)

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
  return !session ? (
    <>
      <div className="w-100 relative flex h-[90vh] flex-col items-center justify-center gap-2">
        <h2>
          <strong>Hello!</strong>
        </h2>
        <h5>Welcome to the tech test!</h5>
        <p>You can sign by github</p>
        <button
          className={
            theme === "gold"
              ? "!rounded-full !bg-transparent !p-0 hover:!bg-[gold]"
              : "!rounded-full !bg-white !p-0 hover:!bg-gray-300"
          }
          onClick={(e) => {
            e.preventDefault()
            signIn("github")
          }}
        >
          <div className="flex flex-col items-center">
            <img
              role="singInGithub"
              width={40}
              height={40}
              src="/logos/github.png"
            />
          </div>
        </button>
      </div>
    </>
  ) : (
    <div className="containerApp">
      <GraficoVentas />
    </div>
  )
}
