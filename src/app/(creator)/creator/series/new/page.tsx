'use client';

import SeriesForm from '../_components/SeriesForm';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';
import SeriesSideBar from '../_components/SeriesSideBar';

export default function SeriesNew() {
  const webtoonId = useSearchParams().get('webtoonId');
  const isExist = !!webtoonId;

  const { data, isLoading, isError } = useQuery({
    queryKey: [webtoonId],
    queryFn: () =>
      fetchCreatorWebtoon.getCreatorsWebtoonDetail({
        param: { id: webtoonId! },
      }),

    staleTime: 0,
    gcTime: 0,
    enabled: isExist,
  });

  return (
    <>
      {isExist ? (
        <div className="grid grid-cols-[auto_1fr] mt-[70px] w-full h-full bg-[#F9F9F9]">
          <SeriesSideBar />
          <div className="flex flex-col w-full p-[30px]">
            <span className="text-[20px] font-medium leading-[24px] text-titleBlack pb-[20px]">
              {'작품 정보 수정'}
            </span>
            <div
              className={`px-8 py-[40px] bg-white rounded-lg border border-brand-gray`}
            >
              <SeriesForm item={data} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 mt-[70px] w-full h-full bg-white">
          <div className="flex flex-col items-center">
            <div className="w-[1200px]">
              <div
                className={`text-[22px] font-medium py-[20px] border-b border-[#E0E0E0] h-[70px] w-full`}
              >
                {'새 작품 등록'}
              </div>
              <div className={`py-[40px] w-full`}>
                <SeriesForm item={data} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
