import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req

  const authObtain =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token"

  const session = cookies.get(authObtain)?.value
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/products"],
}
