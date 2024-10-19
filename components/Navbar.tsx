import { signIn, signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import Link from "next/link"
const themes = [{ name: "Light" }, { name: "Dark" }, { name: "Gold" }]

export function Navbar() {
  const { data: session } = useSession()
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <>
      <nav className="flex items-center justify-between pb-4 pl-2 pr-2 pt-4 shadow-lg">
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
        <div>
          <div className="flex h-[100%] items-center gap-2">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => setTheme(theme.name.toLowerCase())}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex h-[100%] items-center gap-2">
          {!session ? (
            <button
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
              Sign in
            </button>
          ) : (
            <button onClick={() => signOut()}>sign Out</button>
          )}
        </div>
      </nav>
    </>
  )
}
