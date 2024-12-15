import Link from "next/link";
import SeriesCategorySelector from "../_component/SeriesCategorySelector";
import EpisodeSideBar from "../_component/EpisodeSideBar";
import EpisodeList from "../_component/EpisodeList";
import CategoryTab from "@/app/_component/CategoryTab";

export default function CreatorMain() {
  return (
    <div className="grid grid-cols-[auto_1fr] mt-[80px] w-full h-full">
      <EpisodeSideBar />
      <div className="flex flex-col px-4">
        <div className="flex items-center justify-between px-2 pt-2">
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

        <CategoryTab
          items={[
            { id: "1", label: "회차", subLabel: "(0)" },
            { id: "2", label: "공지", subLabel: "(0)" },
          ]}
          selectedId={"1"}
        />
        <div className="w-full h-0.1 border-b" />

        <CategoryTab
          items={[
            { id: "1", label: "발행", subLabel: "(0)" },
            { id: "2", label: "임시저장", subLabel: "(0)" },
            { id: "3", label: "예약글", subLabel: "(0)" },
            { id: "4", label: "휴지통", subLabel: "(0)" },
          ]}
          selectedId={"1"}
        />
        <div className="w-full h-0.1 border-b" />
        <EpisodeList />
      </div>
    </div>
  );
}
