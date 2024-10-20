import { signIn, signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import Link from "next/link"
const themes = [{ name: "Light" }, { name: "Dark" }, { name: "Gold" }]

export function Navbar() {
  const { data: session } = useSession()
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <>
      <nav className="flex flex-col flex-wrap items-center justify-between gap-2 pb-4 pl-[120px] pr-[120px] pt-4 shadow-lg sm:flex-row">
        {session ? (
          <div className="flex h-[100%] items-center gap-2">
            <Link className="hover: h-min font-semibold" href="/">
              Home
            </Link>
            <Link className="hover: h-min font-semibold" href="/products">
              Products
            </Link>
            <Link className="h-min font-semibold" href="/profile">
              Profile
            </Link>
          </div>
        ) : null}

        <div className="flex h-[100%] flex-wrap items-center justify-center gap-2">
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
              role="signInButon"
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
