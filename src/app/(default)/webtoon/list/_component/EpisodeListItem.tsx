import Button from "@/app/_component/Button";
import Link from "next/link";

export interface EpisodeListItemInfo {
  id: number;
  title: string;
  like?: number;
  star?: number;
  views?: number;
  timestamp: number;
}
export default function EpisodeListItem({
  id,
  title,
  like,
  star,
  views,
  timestamp,
}: EpisodeListItemInfo) {
  const time = new Date(timestamp).getTime();
  const now = new Date().setHours(0, 0, 0, 0);
  const isNewEpisode = time >= now;

  const formatTime = new Date(timestamp).toISOString().split("T")[0];

  return (
    <Link
      href={{
        pathname: "/webtoon/detail",
        query: { titleId: "12345", no: id },
      }}
    >
      <div className="grid grid-cols-[auto_1fr] border-b gap-4 p-[20px] hover:bg-[#F8F8F8]">
        <div className="bg-[#DEE5EA] h-[60px] w-[100px]"></div>

        <div className="flex flex-col gap-1 justify-center">
          <div className="font-medium flex items-center gap-1 text-[16px]">
            {isNewEpisode && (
              <div className="flex bg-[#4C68B4] text-white w-[18px] text-[8px] rounded-sm font-semibold h-[15px] items-center justify-center">
                UP
              </div>
            )}
            {id}화 - {title}
          </div>
          <div className="flex gap-3 items-center text-[12px] text-[#9F9F9F]">
            <div className="flex gap-1 items-center">
              <span className="mdi mdi-star"></span>
              <div>{star || 0}</div>
            </div>
            <div className="flex gap-1 items-center">
              <span className="mdi mdi-thumb-up-outline"></span>
              <div>{like || 0}</div>
            </div>
            <div>조회 {views}</div>
            <div className="text-[#F2F2F2]">|</div>
            <div>{formatTime}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
