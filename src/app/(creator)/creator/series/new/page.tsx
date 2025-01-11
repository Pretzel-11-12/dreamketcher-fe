'use client';

import SeriesForm, { SeriesFormInfo } from '../_components/SeriesForm';
import EpisodeSideBar from '../../episode/_components/EpisodeSideBar';
import { useQuery } from '@tanstack/react-query';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import { useSearchParams } from 'next/navigation';

export default function SeriesNew() {
  const seriesId = useSearchParams().get('seriesId');
  const isExist = !!seriesId;

  const { data, isLoading, isError } = useQuery({
    queryKey: [seriesId],
    queryFn: () =>
      fetchWebtoonDetail.getWebtoonDetails({ param: { id: seriesId! } }),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: isExist,
  });
  const _data = data as fetchWebtoonDetail.Model.WebtoonDetailUnit;

  console.log(_data);

  return (
    <div
      className={`grid grid-cols-[${
        isExist ? 'auto_1fr' : '1fr'
      }] mt-[80px] w-full h-full`}
    >
      {isExist && <EpisodeSideBar />}

      <div className="flex flex-col w-full px-8">
        <div className="text-xl font-semibold py-4 border-b">
          {isExist ? data?.webtoonTitle || '데이터 없음' : '새 작품 등록'}
        </div>
        <div className="py-8">
          <SeriesForm item={_data} />
        </div>
      </div>
    </div>
  );
}
