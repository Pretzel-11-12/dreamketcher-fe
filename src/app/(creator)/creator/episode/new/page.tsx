'use client';
import { useSearchParams } from 'next/navigation';
import EpisodeForm, { EpisodeFormInfo } from '../_components/EpisodeForm';
import { useQuery } from '@tanstack/react-query';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';

export default function EpisodeNew() {
  const searchParams = useSearchParams();
  const webtoonId = searchParams.get('webtoonId')!;
  const episodeId = searchParams.get('episodeId')!;

  console.log({ webtoonId, episodeId });
  const { data, isLoading, isError } = useQuery({
    queryKey: [],
    queryFn: () =>
      fetchWebtoonDetail.getEpisodeDetails({ webtoonId, episodeId }),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <div className="flex flex-col mt-[80px] w-full px-12">
      <div className="text-xl font-semibold py-4 border-b">회차 등록</div>
      <div className="py-8">
        {isLoading ? <>로딩중</> : <EpisodeForm {...data} />}
      </div>
    </div>
  );
}
