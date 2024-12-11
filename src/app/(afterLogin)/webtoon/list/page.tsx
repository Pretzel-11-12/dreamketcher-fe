import User, { UserInfo } from "../_component/User";
import Comment, { CommentInfo } from "../_component/Comment";
import Button from "@/app/_component/Button";
import Link from "next/link";
import List from "../_component/List";

export default async function Detail({
  params,
  searchParams,
}: {
  params: Promise<{ params: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { titleId } = await searchParams;

  const listItems = [
    {
      id: 1,
      title: `I'm like some kind of supernova, Watch out`,
      timestamp: 1730918078224,
    },
    {
      id: 2,
      title: `I'm like some kind of supernova, Watch out`,
      timestamp: 1730918078224,
    },
    {
      id: 3,
      title: `I'm like some kind of supernova, Watch out`,
      timestamp: 1730918078224,
    },
    {
      id: 4,
      title: `I'm like some kind of supernova, Watch out`,
      timestamp: 1730918078224,
    },
  ];

  return (
    <div className="flex flex-col gap-16 w-full items-center justify-center pt-[100px]">
      <div className="grid grid-cols-[1fr_20rem] w-[1100px]">
        <div className="h-[2000px] w-full border-r flex flex-col">
          <div className="grid grid-cols-[auto_1fr] gap-6 p-7">
            <div className="bg-[#D9D9D9] h-[300px] w-[200px]"></div>
            <div className="flex gap-2 flex-col">
              <div className="text-lg">괴담 출근</div>
              <div className="text-sm">바크베</div>
              <div className="text-sm">
                Stay in the middle, Like you a littleDon't want no riddle.
                말해줘 say it back, oh, say it ditto, 훌쩍 커버렸어 함께한
                기억처럼 널 보는 내 마음은 어느새 여름 지나 가을. 기다렸지 all
                this time. Do you want somebody? Like I want somebody?날 보고
                웃었지만 Do you think about me now? Yeah. All the time, yeah,
                all the time. I don't want to walk in this 미로
              </div>

              <div className="text-sm">tags</div>
              <div className="grid grid-cols-[1.5fr_1fr] gap-1">
                <Button size="S" variant="bg-blue" containerStyles="w-full">
                  <div className="flex gap-2 items-center justify-center">
                    <span className="mdi mdi-plus text-xl"></span>
                    관심 6,741
                  </div>
                </Button>

                <Button size="S" variant="bg-blue" containerStyles="w-full">
                  <Link
                    href={{
                      pathname: "/webtoon/detail",
                      query: { titleId: "12345", no: "1" },
                    }}
                  >
                    <div className="flex gap-2 items-center justify-center">
                      첫 화 보기
                    </div>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div>
            {listItems.map((item) => (
              <List
                title={item.title}
                index={item.id}
                timestamp={item.timestamp}
              ></List>
            ))}
          </div>
        </div>

        <div className="h-full w-full"></div>
      </div>
    </div>
  );
}
