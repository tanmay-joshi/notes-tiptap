'use client'
import { useSession } from "next-auth/react";
import Header from "./components/Header";
import SpacesTabs from "./components/SpacesTabs";


export default function Home() {

  const {data:session } = useSession()

  return (
    <main className="p-4">
      <Header/>
      { session ?  <SpacesTabs/> : <p>You are signed out</p> }
    </main>
  )
}
