'use client';

import _ from 'lodash';
import SeriesItem from './SeriesItem';
import Button from '@/app/_component/Button';
import Link from 'next/link';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import SeriesCategorySelector from './SeriesCategorySelector';

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
  const isEmpty = _.isEmpty(result);

  const count = {
    finishCount: data?.finishCount || 0,
    inSeriesCount: data?.inSeriesCount || 0,
    newCount: data?.newCount || 0,
    preSeriesCount: data?.preSeriesCount || 0,
    restCount: data?.restCount || 0,
  };

  console.log(data);

  return (
    <>
      <div className="pl-[24px]">
        <SeriesCategorySelector {...count} />
      </div>
      <div className="grid grid-cols-[150px_repeat(6,1fr)_80px] items-center text-sm border-y py-2 text-[#C9C9C9] border-gray-400/10 bg-brand-gray/40 border-t-[#E0E0E0]">
        {headers.map((item, index) => (
          <div
            key={item}
            className={`flex justify-center w-full border-r ${
              index === headers.length - 1
                ? 'border-transparent'
                : 'border-[#c9c9c93e]'
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      {!isEmpty ? (
        result.map((item) => <SeriesItem {...item} key={item.id} />)
      ) : (
        <div className="flex flex-col items-center py-[140px]">
          <span className="text-[18px] font-medium">아직 작품이 없습니다.</span>
          <span className="text-[14px] pb-8 text-[#888888]">
            새로운 작품을 시작해보세요!
          </span>
          <Link href={'/creator/series/new'} className="w-[320px] h-[60px]">
            <Button
              props={{
                size: 'M',
                variant: 'brand-yellow',
                containerStyles: 'h-full',
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
