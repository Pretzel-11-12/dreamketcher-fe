import Link from "next/link";
import SeriesCategorySelector from "../_component/SeriesCategorySelector";
import SeriesSideBar from "../_component/SeriesSideBar";

export default function CreatorMain() {
  return (
    <div className="grid grid-cols-[auto_1fr] mt-[80px] w-full h-full">
      <SeriesSideBar />
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between px-3 pt-2">
          <span className="text-lg font-semibold">내 작품</span>
          <Link
            className="w-[125px] h-[39px] flex items-center justify-center bg-brand-yellow text-white rounded-[5px]"
            href="/creator/series/new"
          >
            작품 등록
          </Link>
        </div>

        <SeriesCategorySelector />
      </div>
    </div>
  );
}
