import Image from "next/image";
import Navbar from "./NavBar/NavBar";
import MainPage from "./MainPage/MainPage";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <MainPage/>
    </main>
  );
}
