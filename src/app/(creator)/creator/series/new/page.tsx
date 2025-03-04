'use client';

import SeriesForm from '../_components/SeriesForm';
import EpisodeSideBar from '../../episode/_components/EpisodeSideBar';
import { useQuery } from '@tanstack/react-query';
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
      }] mt-[70px] w-full h-full`}
    >
      {isExist && <EpisodeSideBar webtoonInfo={webtoonInfo} />}

      <div className="flex flex-col w-full">
        <div
          className={`${
            isExist && 'px-6'
          } text-[22px] font-medium py-[20px] border-b border-[#E0E0E0] h-[70px]`}
        >
          {isExist ? data?.title || '데이터 없음' : '새 작품 등록'}
        </div>
        <div className={`${isExist && 'px-8'} py-[40px]`}>
          <SeriesForm item={data} />
        </div>
      </div>
    </div>
  );
}
