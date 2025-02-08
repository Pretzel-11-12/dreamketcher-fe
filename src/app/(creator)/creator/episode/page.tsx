'use client';

import Link from 'next/link';
import EpisodeSideBar from './_components/EpisodeSideBar';
import EpisodeList from './_components/EpisodeList';
import CategoryTab from '@/app/_component/CategoryTab';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';

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
    <div className="grid grid-cols-[auto_1fr] mt-[80px] w-full h-full">
      <EpisodeSideBar webtoonInfo={webtoonInfo} />
      <div className="flex flex-col">
        <div className="flex items-center justify-between pt-2 px-3">
          <span className="text-lg font-semibold pl-4">
            {data?.webtoonTitle}
          </span>
          <Link
            className="w-[125px] h-[39px] flex items-center justify-center bg-brand-yellow text-white rounded-[5px]"
            href={{
              pathname: '/creator/episode/new',
              query: { webtoonId, no: episodes.length + 1 },
            }}
          >
            신규 회차 등록
          </Link>
        </div>

        <div className="pl-4">
          <CategoryTab
            items={[
              { id: '1', label: '회차', subLabel: '(0)' },
              { id: '2', label: '공지', subLabel: '(0)' },
            ]}
            selectedId={'1'}
          />
        </div>
        <div className="w-full h-0.1 border-b" />

        <div className="pl-4 transform scale-[0.8] origin-left">
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
  );
}
