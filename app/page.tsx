import Image from "next/image";
import Header from "./components/Header";
import Vitejte from "./components/Vitejte";
import Nase from "./components/Nase";
import Speciality from "./components/Speciality";
import Galerie from "./components/Galerie";
import Navstivte from "./components/Navstivte";

export default function Home() {
  return (
    <main>
      <Header />
      <Vitejte />
      <Nase />
      <Speciality />
      <Galerie />
      <Navstivte />
    </main>
  );
}
