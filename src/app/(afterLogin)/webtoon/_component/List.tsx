import Button from "@/app/_component/Button";
import Link from "next/link";

export interface CommentInfo {
  index: number;
  title: string;
  like?: number;
  star?: number;
  views?: number;
  timestamp: number;
}
export default function List({
  index,
  title,
  like,
  star,
  views,
  timestamp,
}: CommentInfo) {
  const time = new Date(timestamp).toLocaleString();
  return (
    <Link
      href={{
        pathname: "/webtoon/detail",
        query: { titleId: "12345", no: index },
      }}
    >
      <div className="grid grid-cols-[auto_1fr] p-7 border-b gap-5">
        <div className="bg-[#D9D9D9] h-[100px] w-[100px]"></div>

        <div className="flex flex-col gap-2 justify-between pb-2">
          <div className="font-bold">
            {index}화 - {title}
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex gap-0.5 items-center">
              <span className="mdi mdi-star text-sm"></span>
              <div>{star || 0}</div>
            </div>
            <div className="flex gap-0.5 items-center">
              <span className="mdi mdi-thumb-up-outline text-sm"></span>
              <div>{like || 0}</div>
            </div>
            <div className="text-sm">조회 {views}</div>
            <div>{time}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
