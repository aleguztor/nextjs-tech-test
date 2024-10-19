import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req

  console.log(cookies.get("next-auth.session-token")?.value)

  const session = cookies.get("next-auth.session-token")?.value
  console.log(session)
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile"],
}
