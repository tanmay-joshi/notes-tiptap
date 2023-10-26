import Header from "./components/Header";
import HomeTabs from "./components/HomeTabs";
import SpacesTabs from "./components/SpacesTabs";


export default function Home() {
  return (
    <main className="p-4">
      <Header/>
      <SpacesTabs/>
      {/* <HomeTabs/> */}
    </main>
  )
}
