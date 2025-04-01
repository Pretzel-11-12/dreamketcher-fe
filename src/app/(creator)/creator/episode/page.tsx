'use client';

import Link from 'next/link';
import EpisodeList from './_components/EpisodeList';
import CategoryTab from '@/app/_component/CategoryTab';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import SeriesSideBar from '../series/_components/SeriesSideBar';
import SeriesInfo from './_components/SeriesInfo';

export default function CreatorMain() {
  const searchParams = useSearchParams();
  const webtoonId = searchParams.get('webtoonId')!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['creator-episode', webtoonId],
    queryFn: () =>
      fetchWebtoonDetail.getWebtoonDetails({ param: { id: webtoonId } }),
  });

  const episodes = data?.episodes || [];
  const webtoonInfo = {
    title: data?.webtoonTitle || '',
    id: webtoonId,
    thumbnail: data?.webtoonThumbnail || '',
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (isError) {
    return <p>오류 발생</p>;
  }

  return (
    <div className="grid grid-cols-[auto_1fr] mt-[70px] w-full h-full border-r border-[#F2F2F2] bg-[#F9F9F9]">
      <SeriesSideBar />
      <div className="flex flex-col p-[30px] gap-[20px] pr-[165px]">
        <span className="text-[20px] font-medium leading-[24px] text-titleBlack">
          회차 리스트
        </span>

        <div className="bg-white flex flex-col p-[30px] border rounded-md border-brand-gray">
          {data && <SeriesInfo {...data} />}

          <div className="pt-4">
            <CategoryTab
              items={[
                { id: '1', label: '회차', subLabel: '(0)' },
                { id: '2', label: '공지', subLabel: '(0)' },
              ]}
              selectedId={'1'}
            />
          </div>
          <div className="w-full h-0 border-b" />

          <div className="transform scale-[0.8] origin-left">
            <CategoryTab
              activeColor="[#3F3F3F]"
              items={[
                { id: '1', label: '발행', subLabel: '(0)' },
                { id: '2', label: '임시저장', subLabel: '(0)' },
                { id: '3', label: '예약글', subLabel: '(0)' },
                { id: '4', label: '휴지통', subLabel: '(0)' },
              ]}
              selectedId={'1'}
            />
          </div>

          <div className="w-full h-0.1 border-b mt-[-5px]" />
          {<EpisodeList items={episodes} webtoonInfo={webtoonInfo} />}
        </div>
      </div>
    </div>
  );
}
