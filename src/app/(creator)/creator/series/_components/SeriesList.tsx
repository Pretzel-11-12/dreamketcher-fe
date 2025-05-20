'use client';

import _ from 'lodash';
import SeriesCardItem from './SeriesCardItem';
import Link from 'next/link';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Pagination from '@/app/_component/Pagination';
import { useState } from 'react';

const headers = [
  '작품',
  '회차 수',
  '업데이트',
  '연재 시작일',
  '좋아요 수',
  '총 댓글',
  '관심웹툰',
  '옵션',
];

const SeriesList = () => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const status = searchParams.get('status')! as
    | 'IN_SERIES'
    | 'FINISH'
    | 'NEW'
    | 'REST'
    | 'PRE_SERIES';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['creator-webtoon', status, currentPage],
    queryFn: () =>
      fetchCreatorWebtoon.getCreatorsWebtoons({
        query: { status: status, page: currentPage - 1, size: 10 },
      }),
  });

  if (isLoading) {
    return <p className="text-gray-500 text-center">로딩 중...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">데이터를 불러오지 못했습니다.</p>
    );
  }

  const result = data?.content.result || [];

  return (
    <div className="flex flex-col gap-4 w-[540px] xl:w-[1040px] justify-center items-center">
      <div className="flex flex-wrap gap-[20px] px-[30px] py-4 pt-5 w-fit">
        <Link
          className="p-[20px] bg-white w-[480px] h-[242px] rounded-[10px] border-brand-gray border border-dashed"
          href="/creator/series/new"
        >
          <div className="flex flex-col w-full h-full items-center justify-center">
            <Image
              src="/assets/icon/plus-gray.png"
              alt="plus"
              width={40}
              height={40}
            />
            <div className="pt-[10px] text-titleBlack font-medium text-[16px]">
              새 작품 등록
            </div>
            <div className="text-[#888] font-normal text-[14px]">
              새로운 작품을 등록해주세요
            </div>
          </div>
        </Link>
        {result.map((item) => (
          <SeriesCardItem {...item} key={item.id} />
        ))}
      </div>
      {data?.content.totalElements && data?.content.totalElements > 10 && (
        <Pagination
          totalPages={Math.ceil(data?.content.totalElements / 10)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default SeriesList;
