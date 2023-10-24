import Header from "./components/Header";
import HomeTabs from "./components/HomeTabs";
import Tiptapeditor from "./components/TipTapEditor";


export default function Home() {
  return (
    <main className="p-4">
      <Header/>
      <Tiptapeditor/>
      <HomeTabs/>
    </main>
  )
}
