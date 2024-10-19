import { useSession } from "next-auth/react"

export default function Page() {
  const { data } = useSession()
  return (
    <div className="flex-col">
      <p>
        <strong>{data?.user?.name}</strong>
      </p>
      <p>
        <strong>{data?.user?.email}</strong>
      </p>
    </div>
  )
}
