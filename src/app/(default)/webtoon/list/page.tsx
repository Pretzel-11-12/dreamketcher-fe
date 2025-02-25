'use client';
import _ from 'lodash';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';

import ListCategorySelector from './_component/ListCategorySelector';
import GenreSelector from '@/app/(default)/main/_component/GenreSelector';
import WebtoonInfo from './_component/WebtoonInfo';
import NoticeList from './_component/NoticeList';
import RankingWebtoons from './_component/RankingWebtoons';
import EpisodeListItem from './_component/EpisodeListItem';
import Pagination from '@/app/_component/Pagination';

export default function Detail() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id')!;

  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');
  const totalPage = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: [id, sortDirection, 'episode', currentPage - 1],
    queryFn: () =>
      fetchWebtoonDetail.getWebtoonDetails({
        param: { id },
        query: {
          fromFirst: sortDirection === 'asc',
          page: currentPage - 1,
          size: 30,
        },
      }),
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

  return (
    <div className="flex flex-col items-center mt-[70px] w-full bg-white text-black pb-32">
      <hr className="border-line border-solid" />
      <ListCategorySelector selectedCategory="전체" />
      <hr className="border-line border-solid" />
      <GenreSelector />
      <hr className="border-line border-solid" />
      <div className="w-full flex justify-center">
        <div className="flex w-[1200px] pt-[40px]">
          <div className="flex flex-col w-[894px] gap-6 border-r border-r-line pr-[24px]">
            {data && <WebtoonInfo webtoon={{ ...data }} />}
            <NoticeList />
            <div>
              <div className="flex justify-between">
                <div>총 {data?.episode_count}화</div>

                <div className="flex items-center gap-2">
                  <div
                    className={`text-sm cursor-pointer ${
                      sortDirection === 'desc'
                        ? 'font-medium text-[#3f3f3f]'
                        : 'font-normal text-[#888]'
                    }`}
                    onClick={() => setSortDirection('desc')}
                  >
                    최신화부터
                  </div>
                  <div className="text-[#888]">·</div>
                  <div
                    className={`text-sm cursor-pointer ${
                      sortDirection === 'asc'
                        ? 'font-medium text-[#3f3f3f]'
                        : 'font-normal text-[#888]'
                    }`}
                    onClick={() => setSortDirection('asc')}
                  >
                    1화부터
                  </div>
                </div>
              </div>
              <div className="min-h-20 mb-[50px]">
                {data?.episodes?.map((item, index) => (
                  <EpisodeListItem
                    items={item}
                    key={index}
                    webtoonId={Number(id)}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>

          <div className="flex flex-col w-[282px] ml-[24px] gap-1">
            <RankingWebtoons genre={data?.genreName} />
          </div>
        </div>
      </div>
    </div>
  );
}
