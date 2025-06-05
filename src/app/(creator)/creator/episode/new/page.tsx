'use client';

import { useSearchParams } from 'next/navigation';
import EpisodeForm from '../_components/EpisodeForm';
import { useQuery } from '@tanstack/react-query';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import Header1200 from '../../_component/Header1200';

export default function EpisodeNew() {
  const searchParams = useSearchParams();
  const webtoonId = searchParams.get('webtoonId')!;
  const episodeId = searchParams.get('episodeId')!;

  const { data, isLoading, isError } = useQuery({
    queryKey: [webtoonId, episodeId],
    queryFn: () =>
      fetchWebtoonDetail.getEpisodeDetails({
        webtoonId,
        episodeId,
      }),
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header1200 />
      <div className="flex flex-col mt-[70px] w-full items-center">
        <div className="w-[1200px]">
          <div className="text-[22px] font-medium py-4 border-b">회차 등록</div>
          <div className="py-10">
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
      </div>
    </div>
  );
}
