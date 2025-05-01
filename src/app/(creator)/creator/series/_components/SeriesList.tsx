'use client';

import _ from 'lodash';
import SeriesCardItem from './SeriesCardItem';
import Button from '@/app/_component/Button';
import Link from 'next/link';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import SeriesCategorySelector from './SeriesCategorySelector';
import Image from 'next/image';

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
  const status = searchParams.get('status')! as
    | 'IN_SERIES'
    | 'FINISH'
    | 'NEW'
    | 'REST'
    | 'PRE_SERIES';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['creator-webtoon', status],
    queryFn: () =>
      fetchCreatorWebtoon.getCreatorsWebtoons({
        query: { status: status },
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
    <>
      <div className="flex flex-wrap gap-[20px] px-[30px] py-4 pt-5">
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
    </>
  );
};

export default SeriesList;
