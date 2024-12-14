"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EpisodeSideBar: React.FC<{}> = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-2 w-[220px] border-r h-full items-center min-h-[1200px] px-6">
      <div className="bg-gray-500/20 w-full h-[250px] rounded-sm"></div>
      <span>별종의 세계</span>

      <div className="flex flex-col w-full pt-[100px] text-md">
        <Link href={"/creator/episode"}>
          <button
            className={`w-full h-[50px] ${
              pathname === "/creator/episode" && "bg-[#E4EBFF] text-brand-blue"
            }`}
          >
            <div className="flex items-center justify-center gap-2 w-full h-full">
              <span className="mdi mdi-list-box"></span>
              회차 리스트
            </div>
          </button>
        </Link>

        <Link
          href={{
            pathname: "/creator/series/new",
            query: { seriesId: 5 },
          }}
        >
          <button
            className={`w-full h-[50px] ${
              pathname === "/creator/series/new" &&
              "bg-[#E4EBFF] text-brand-blue"
            }`}
          >
            <div className="flex items-center justify-center gap-2 w-full h-full">
              <span className="mdi mdi-information"></span>
              작품 정보
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EpisodeSideBar;
