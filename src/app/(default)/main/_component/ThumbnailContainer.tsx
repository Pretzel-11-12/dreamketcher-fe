'use client';

import React from 'react';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useQuery } from '@tanstack/react-query';
import WebtoonSlider from './WebtoonSlider';
import FilterComponent from './FilterComponent';
import { getWebtoonRanking } from '../_lib/getWebtoonRanking';
import { useSearchParams } from 'next/navigation';

interface ThumbnailContainerProps {
  title: string;
}

const ThumbnailContainer: React.FC<ThumbnailContainerProps> = ({ title }) => {
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre') || 'recommend';

  const { data, isLoading, isError } = useQuery<IWebtoon[]>({
    queryKey: ['webtoons', 'ranking', genre],
    queryFn: () => getWebtoonRanking(genre),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <p className="text-gray-500 text-center">로딩 중...</p>; // 로딩 표시
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center">데이터를 불러오지 못했습니다.</p>
    ); // 에러 처리
  }
  return (
    <div className="flex flex-col text-black">
      <div className="flex text-[17px] items-center gap-2 justify-between p-3">
        <div className="flex items-center gap-2">
          <p>{title}</p>
          <FilterComponent />
        </div>
        {/* <p className="text-[14px] text-[#888888]">더보기</p> */}
      </div>
      <WebtoonSlider webtoons={data || []} />
    </div>
  );
};

export default ThumbnailContainer;
