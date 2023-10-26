'use client'
import { useSession } from "next-auth/react";
import Header from "./components/Header";
import SpacesTabs from "./components/SpacesTabs";


export default function Home() {

  const {data:session, status } = useSession()

  return (
    <main className="p-4">
      <Header/>
      { status ==="authenticated" ?  <SpacesTabs/> 
      : status == "unauthenticated" ? <p>Sign in to see your notes</p>
      : <p>loading...</p> }
    </main>
  )
}
