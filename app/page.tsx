import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-zinc-900">
      <Navbar />
      <div className="image_tokyo w-full h-full flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold backdrop-blur-xs p-4 bg-blue-700/50">Tokyo</h1>
      </div>
    </div>
  );
}
