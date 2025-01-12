'use client';

import { useSearchParams } from 'next/navigation';
import EpisodeForm from '../_components/EpisodeForm';
import { useQuery } from '@tanstack/react-query';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';

export default function EpisodeNew() {
  const searchParams = useSearchParams();
  const webtoonId = searchParams.get('webtoonId')!;
  const episodeId = searchParams.get('episodeId')!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['creator-episode'],
    queryFn: () =>
      fetchWebtoonDetail.getEpisodeDetails({
        webtoonId,
        episodeId,
      }),
  });

  return (
    <div className="flex flex-col mt-[80px] w-full px-12">
      <div className="text-xl font-semibold py-4 border-b">회차 등록</div>
      <div className="py-8">
        {isLoading ? (
          <>로딩중</>
        ) : (
          <EpisodeForm
            item={data}
            episodeId={episodeId}
            webtoonId={webtoonId}
          />
        )}
      </div>
    </div>
  );
}
