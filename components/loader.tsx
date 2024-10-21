import style from "@/components/loader.module.css"
import { CSSProperties } from "react"
export default function LoaderPage({ loading = false }: { loading?: boolean }) {
  /* HTML: <div class="loader"></div> */

  return loading ? (
    <div
      className={
        "absolute z-50 flex h-full w-full items-center justify-center bg-black"
      }
    >
      <div className={style.loader} />
    </div>
  ) : null
}
/* HTML: <div class="loader"></div> */
