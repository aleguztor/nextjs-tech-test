import { signIn, signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import Link from "next/link"
const themes = [{ name: "Light" }, { name: "Dark" }, { name: "Gold" }]

export function Navbar() {
  const { data: session } = useSession()
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <>
      <nav className="flex h-10 justify-between pl-2 pr-2">
        {session ? (
          <div className="flex h-[100%] items-center gap-2">
            <Link className="h-min" href="/profile">
              Profile
            </Link>
            <Link className="h-min" href="/">
              Home
            </Link>
          </div>
        ) : null}
        <div className="flex h-[100%] items-center gap-2">
          <div>
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
            <button onClick={() => signIn()}>Sign in</button>
          ) : (
            <button onClick={() => signOut()}>sign Out</button>
          )}
        </div>
      </nav>
    </>
  )
}
