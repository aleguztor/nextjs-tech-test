import { signIn, signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import LoaderPage from "./loader"
const themes = [{ name: "Light" }, { name: "Dark" }, { name: "Gold" }]

export function Navbar() {
  const { data: session } = useSession()
  const { setTheme } = useTheme()

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleNavigation = (url: string) => {
    setLoading(true)
    router.push(url).finally(() =>
      setTimeout(() => {
        setLoading(false)
      }, 500)
    )
  }

  return (
    <>
      <LoaderPage loading={loading} />
      <nav className="flex flex-col flex-wrap items-center justify-between gap-2 pb-4 pl-[120px] pr-[120px] pt-4 shadow-lg sm:flex-row">
        {session ? (
          <div className="flex h-[100%] items-center gap-2">
            <Link
              className="hover: h-min font-semibold"
              onClick={() => handleNavigation("/")}
              href="/"
            >
              Home
            </Link>
            <Link
              className="hover: h-min font-semibold"
              onClick={() => handleNavigation("/products")}
              href="/products"
            >
              Productos
            </Link>
            <Link
              className="h-min font-semibold"
              onClick={() => handleNavigation("/profile")}
              href="/profile"
            >
              Perfil
            </Link>
          </div>
        ) : null}

        <div
          className={
            (session ? "" : "w-[100%] ") +
            "flex h-[100%] flex-wrap items-center justify-center gap-2"
          }
        >
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setTheme(theme.name.toLowerCase())}
            >
              {theme.name}
            </button>
          ))}
          {!session ? (
            <button
              className="!bg-green-200 !text-black hover:!bg-green-500 hover:!text-green-50"
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
              Sign in
            </button>
          ) : (
            <button
              className="!bg-red-300 !text-white hover:!bg-red-600"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          )}
        </div>
      </nav>
    </>
  )
}
