'use client';

import CategorySelector from '@/app/(default)/main/_component/CategorySelector';
import GenreSelector from '@/app/(default)/main/_component/GenreSelector';
import WebtoonInfo from './_component/WebtoonInfo';
import EpisodeList from './_component/EpisodeList';
import NoticeList from './_component/NoticeList';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import RankingWebtoons from './_component/RankingWebtoons';
import useAuthStore from '@/app/store/authStore';

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
  console.log(useAuthStore.getState());
  const searchParams = useSearchParams();
  const id = searchParams.get('id')!;

  const { data, isLoading, isError } = useQuery({
    queryKey: [id],
    queryFn: () => fetchWebtoonDetail.getWebtoonDetails({ param: { id } }),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <p className="text-gray-500 text-center">로딩 중...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">데이터를 불러오지 못했습니다.</p>
    );
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
            <EpisodeList
              episodeItems={data?.episodes || []}
              episodeCount={data?.episode_count || 0}
              webtoonId={data?.webtoonId}
            />
          </div>

          <div className="flex flex-col w-[300px] p-3 gap-1">
            <RankingWebtoons genre={data?.genreNames[0]} />
          </div>
        </div>
      </div>
    </div>
  );
}
