import { Navbar } from "@/components/Navbar"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { AppProps } from "next/app"
import "../styles/globals.css"
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}
