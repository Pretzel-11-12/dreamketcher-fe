import Link from "next/link";
import SeriesCategorySelector from "../_component/SeriesCategorySelector";
import EpisodeSideBar from "../_component/EpisodeSideBar";

export default function CreatorMain() {
  return (
    <div className="grid grid-cols-[auto_1fr] mt-[80px] w-full h-full">
      <EpisodeSideBar />
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between px-3 pt-2">
          <span className="text-lg font-semibold">
            별종의 세계 - 회차 리스트
          </span>
          <Link
            className="w-[125px] h-[39px] flex items-center justify-center bg-brand-yellow text-white rounded-[5px]"
            href="/creator/episode/new"
          >
            신규 회차 등록
          </Link>
        </div>

        <SeriesCategorySelector />
      </div>
    </div>
  );
}
