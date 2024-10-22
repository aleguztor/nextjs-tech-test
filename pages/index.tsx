import GraficoVentas from "@/components/GraficSells"
import useProductStar from "@/hook/useProductStar"
import { signIn, useSession } from "next-auth/react"
import { useTheme } from "next-themes"

export default function Home() {
  const { data: session } = useSession()
  const { theme } = useTheme()
  const { product } = useProductStar()

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
      {product.nombre ? (
        <p>
          El mejor producto es <strong>{product.nombre}</strong>
        </p>
      ) : (
        <p>No ha elegido mejor producto todavía</p>
      )}
      <GraficoVentas />
    </div>
  )
}
