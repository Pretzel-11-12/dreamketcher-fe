'use client';

import React, { useState } from 'react';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useQuery } from '@tanstack/react-query';
import WebtoonSlider from './WebtoonSlider';
import FilterComponent from './FilterComponent';
import { getWebtoonRanking } from '../../../api/fetchWebtoons/getWebtoonRanking';
import { useSearchParams } from 'next/navigation';
import SliderDropdown from './SliderDropdown';

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
  const genre = searchParams.get('genre') || 'RECOMMENDED';
  const [selectedFilter, setSelectedFilter] = useState<string>('실시간');
  const orderMapping: { [key: string]: string } = {
    실시간: 'latest',
    별점순: 'stars',
    좋아요순: 'likes',
  };

  const order = orderMapping[selectedFilter] || 'latest';

  const { data, isLoading, isError } = useQuery<IWebtoon[]>({
    queryKey: ['webtoons', 'ranking', type, genre, order],
    queryFn: () => getWebtoonRanking(type, genre, order),
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
        <p className="text-[18px] leading-[18px] font-medium text-titleblack">
          {title}
        </p>
        <SliderDropdown options={dropdownOptions} defaultOption="latest" />
      </div>
      <WebtoonSlider webtoons={data || []} />
    </div>
  );
};

export default ThumbnailContainer;
