'use client';

import CategorySelector from '@/app/(default)/main/_component/CategorySelector';
import GenreSelector from '@/app/(default)/main/_component/GenreSelector';
import WebtoonInfo, { Tag } from './_component/WebtoonInfo';
import EpisodeList from './_component/EpisodeList';
import NoticeList from './_component/NoticeList';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';

const announcements = [
  {
    id: 1,
    title: '드림케쳐 서비스 오픈 안내',
    link: '/announcements/dreamcatcher-launch',
  },
  {
    id: 2,
    title: '개인정보처리 방침에 대한 안내사항',
    link: '/announcements/privacy-policy',
  },
  {
    id: 3,
    title: '2025년 설 연 서비스 운영 안내사항',
    link: '/announcements/2025-new-year',
  },
  {
    id: 4,
    title: '01/03(금) 23:00 ~ 24:00 서버 점검 안내',
    link: '/announcements/server-maintenance-0103',
  },
];

export default function Detail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id')!;

  let { data, isLoading, isError } = useQuery({
    queryKey: [id],
    queryFn: () => fetchWebtoonDetail.getWebtoonDetails({ param: { id } }),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <p className="text-gray-500 text-center">로딩 중...</p>;
  }

  if (isError) {
    // return (
    //   <p className="text-red-500 text-center">데이터를 불러오지 못했습니다.</p>
    // );
    data = {
      webtoonId: Number(id),
      webtoonThumbnail: '/assets/images/webtoonthumbnail-1.jpg',
      webtoonTitle: '괴담 출근',
      genreNames: ['판타지'],
      webtoonStory: `Stay in the middle, Like you a littleDon't want no riddle. 말해줘 say
      it back, oh, say it ditto, 훌쩍 커버렸어 함께한 기억처럼 널 보는 내
      마음은 어느새 여름 지나 가을. 기다렸지 all this time. Do you want
      somebody? Like I want somebody?날 보고 웃었지만 Do you think about me
      now? Yeah. All the time, yeah, all the time. I don't want to walk in
      this 미로`,
      episode_count: 5,
      currentPage: 0,
      totalPages: 0,
      episodes: [],
    };
  }

  return (
    <div className="flex flex-col items-center mt-[80px] w-full bg-white text-black pb-32">
      <hr className="border-line border-solid" />
      <CategorySelector />
      <hr className="border-line border-solid" />
      <GenreSelector />
      <hr className="border-line border-solid" />
      <div className="w-full flex justify-center">
        <div className="flex w-[1024px]">
          <div className="flex flex-col w-full gap-6 border-r border-r-line pt-8">
            {data && <WebtoonInfo webtoon={{ ...data }} />}
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
