'use client';

import React, { useState } from 'react';
import { RankingWebtoon } from '@/model/Webtoon';
import { useQuery } from '@tanstack/react-query';
import { getWebtoonRanking } from '../../../api/fetchWebtoons/getWebtoonRanking';
import { useSearchParams, useRouter } from 'next/navigation';
import SliderDropdown from './SliderDropdown';
import CustomWebtoonSlider from './CustomWebtoonSlider';
interface ThumbnailContainerProps {
  type: string;
  title: string;
}

const dropdownOptions = [
  { label: '실시간', value: 'latest' },
  { label: '오늘', value: 'today' },
  { label: '이번주', value: 'thisWeek' },
];

const ThumbnailContainer: React.FC<ThumbnailContainerProps> = ({
  type,
  title,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const genre = searchParams.get('genre') || 'RECOMMENDED';
  const currentOrder = searchParams.get('order') || 'latest';

  const handleOrderChange = (newOrder: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('order', newOrder);
    router.push(`?${params.toString()}`);
  };

  const { data, isLoading, isError } = useQuery<RankingWebtoon[]>({
    queryKey: ['webtoons', 'ranking', type, genre, currentOrder],
    queryFn: () => getWebtoonRanking(type, genre, currentOrder),
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
    <div className="flex flex-col gap-[15px] text-black">
      <div className="flex items-end gap-[7px] h-[20px]">
        <p className="text-[18px] leading-[18px] font-medium text-titleBlack">
          {title}
        </p>
        <SliderDropdown
          options={dropdownOptions}
          defaultOption={currentOrder}
          onClickOption={handleOrderChange}
        />
      </div>
      <CustomWebtoonSlider webtoons={data || []} />
    </div>
  );
};

export default ThumbnailContainer;
