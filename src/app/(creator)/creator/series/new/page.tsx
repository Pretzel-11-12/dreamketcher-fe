'use client';

import SeriesForm, { SeriesFormInfo } from '../_components/SeriesForm';
import EpisodeSideBar from '../../episode/_components/EpisodeSideBar';
import { useQuery } from '@tanstack/react-query';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import { useSearchParams } from 'next/navigation';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';

export default function SeriesNew() {
  const webtoonId = useSearchParams().get('webtoonId');
  const isExist = !!webtoonId;

  const { data, isLoading, isError } = useQuery({
    queryKey: [webtoonId],
    queryFn: () =>
      fetchCreatorWebtoon.getCreatorsWebtoonDetail({
        param: { id: webtoonId! },
      }),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: isExist,
  });

  const webtoonInfo = {
    title: data?.title || '',
    id: webtoonId!,
    thumbnail: data?.thumbnail || '',
  };

  return (
    <div
      className={`grid grid-cols-[${
        isExist ? 'auto_1fr' : '1fr'
      }] mt-[80px] w-full h-full`}
    >
      {isExist && <EpisodeSideBar webtoonInfo={webtoonInfo} />}

      <div className="flex flex-col w-full px-8">
        <div className="text-xl font-semibold py-4 border-b">
          {isExist ? data?.title || '데이터 없음' : '새 작품 등록'}
        </div>
        <div className="py-8">
          <SeriesForm item={data} />
        </div>
      </div>
    </div>
  );
}
