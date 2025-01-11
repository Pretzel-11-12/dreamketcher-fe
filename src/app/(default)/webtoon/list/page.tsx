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

export default function Detail() {
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
  console.log(data);
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
