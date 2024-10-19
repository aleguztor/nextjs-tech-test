import GraficoVentas from "@/components/GraficSells"
import { signIn, signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import localFont from "next/font/local"
import Image from "next/image"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export default function Home() {
  const { data: session } = useSession()
  const { theme } = useTheme()
  return !session ? (
    <>
      <div className="w-100 flex h-[90vh] flex-col items-center justify-center gap-2">
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
          onClick={() => signIn("github")}
        >
          <div className="flex flex-col items-center">
            <img width={40} height={40} src="/logos/github.png" />
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
