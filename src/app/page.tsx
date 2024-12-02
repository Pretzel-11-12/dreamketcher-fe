import Image from "next/image";
import Carousel from "@/app/_component/Carousel";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-[80px] bg-white">
      <Carousel />
      <div className="w-full max-w-[1024px] px-4">
    <div className="mx-auto my-4 max-w-[1024px] px-4">
      
    </div>
      </div>
      <div className="fixed right-4 bottom-4 p-4">
        <button
          className="flex items-center justify-center transition-transform transform hover:scale-105"
        >
          <img
            src={`/assets/images/arrow-top.png`}
            alt="arrow-top"
            className="h-[50px] w-[50px]"
          />
        </button>
      </div>
    </div>
  );
}
