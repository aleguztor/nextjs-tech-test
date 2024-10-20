import { signOut, useSession } from "next-auth/react"

export default function Profile() {
  const { data } = useSession()
  return (
    <div className="containerApp">
      <h1>
        <strong>PROFILE</strong>
      </h1>
      <br />
      <br />

      <p>Name</p>
      <h5>
        <strong>{data?.user?.name}</strong>
      </h5>
      <br />
      <p>Email</p>
      <h5>
        <strong>{data?.user?.email}</strong>
      </h5>
      <br />
      <br />
      <div className="flex w-[100%] justify-end">
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  )
}
