"use client";

import CategorySelector from "@/app/main/_component/CategorySelector";
import GenreSelector from "@/app/main/_component/GenreSelector";
import WebtoonInfo, { Tag } from "./_component/WebtoonInfo";
import EpisodeList from "./_component/EpisodeList";
import NoticeList from "./_component/NoticeList";

const categories = [
  { name: "추천" },
  { name: "로맨스" },
  { name: "판타지" },
  { name: "무협" },
  { name: "일상" },
  { name: "스릴러" },
  { name: "공포" },
  { name: "액션" },
  { name: "스포츠" },
  { name: "개그" },
  { name: "소년" },
];
const announcements = [
  {
    id: 1,
    title: "드림케쳐 서비스 오픈 안내",
    link: "/announcements/dreamcatcher-launch",
  },
  {
    id: 2,
    title: "개인정보처리 방침에 대한 안내사항",
    link: "/announcements/privacy-policy",
  },
  {
    id: 3,
    title: "2025년 설 연 서비스 운영 안내사항",
    link: "/announcements/2025-new-year",
  },
  {
    id: 4,
    title: "01/03(금) 23:00 ~ 24:00 서버 점검 안내",
    link: "/announcements/server-maintenance-0103",
  },
];

const webtoonInfo = {
  id: 1,
  image: "/assets/images/webtoonthumbnail-1.jpg",
  title: "괴담 출근",
  writer: "바크베",
  genre: "판타지",
  description: `Stay in the middle, Like you a littleDon't want no riddle. 말해줘 say
  it back, oh, say it ditto, 훌쩍 커버렸어 함께한 기억처럼 널 보는 내
  마음은 어느새 여름 지나 가을. 기다렸지 all this time. Do you want
  somebody? Like I want somebody?날 보고 웃었지만 Do you think about me
  now? Yeah. All the time, yeah, all the time. I don't want to walk in
  this 미로`,
  interest: 6741,
  tags: [Tag.HORROR, Tag.ROMANCE, Tag.SCARED],
};

export default function Detail({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const handleCategoryClick = () => {
    return null;
  };

  const handleGenreClick = () => {
    return null;
  };

  return (
    <div className="flex flex-col items-center mt-[80px] w-full bg-white text-black pb-32">
      <hr className="border-line border-solid" />
      <CategorySelector
      // handleCategoryClick={handleCategoryClick}
      />
      <hr className="border-line border-solid" />
      <GenreSelector
        selectedGenre={"추천"}
        categories={categories}
        // handleGenreClick={handleGenreClick}
      />
      <hr className="border-line border-solid" />
      <div className="w-full flex justify-center">
        <div className="flex w-[1024px]">
          <div className="flex flex-col w-full gap-6 border-r border-r-line pt-8">
            <WebtoonInfo webtoon={webtoonInfo} />
            <NoticeList />
            <EpisodeList />
          </div>

          <div className="flex flex-col w-[346px] pt-8 gap-1 ml-2">
            <div className="flex flex-col gap-4">
              <p>공지사항</p>
              <hr className="-ml-2"></hr>
              <div className="flex flex-col gap-1">
                {announcements.map((announcement) => (
                  <div className="flex" key={announcement.id}>
                    <p className="text-[#3F3F3F] text-[12px]">
                      · {announcement.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
