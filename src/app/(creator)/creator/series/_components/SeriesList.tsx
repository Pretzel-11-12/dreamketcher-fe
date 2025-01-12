'use client';

import _ from 'lodash';
import SeriesItem from './SeriesItem';
import Button from '@/app/_component/Button';
import Link from 'next/link';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

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
  const status = searchParams.get('status')! as 'IN_SERIES' | 'FINISH' | 'NEW';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['creator-webtoon', status],
    queryFn: () =>
      fetchCreatorWebtoon.getCreatorsWebtoon({
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

  const result = data?.result || [];
  const isEmpty = _.isEmpty(result);

  return (
    <>
      <div className="grid grid-cols-[120px_repeat(6,1fr)_80px] items-center px-4 text-sm gap-5 border-y py-2 text-gray-500 border-gray-400/10 bg-brand-gray/40">
        {headers.map((item) => (
          <div key={item} className="flex justify-center w-full">
            {item}
          </div>
        ))}
      </div>

      {!isEmpty ? (
        result.map((item) => <SeriesItem {...item} key={item.id} />)
      ) : (
        <div className="flex flex-col items-center py-[140px]">
          <span className="text-md font-semibold">아직 작품이 없습니다.</span>
          <span className="text-md pb-8 text-gray-500">
            새로운 작품을 시작해보세요!
          </span>
          <Link href={'/creator/series/new'}>
            <Button
              props={{
                size: 'M',
                variant: 'brand-yellow',
                containerStyles: 'px-20 py-[10px]',
              }}
            >
              새 작품 등록하기
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default SeriesList;
