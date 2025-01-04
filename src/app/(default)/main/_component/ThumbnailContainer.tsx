'use client';

import React, { useState } from 'react';
import { Webtoon as IWebtoon, Webtoon } from '@/model/Webtoon';
import { useQuery } from '@tanstack/react-query';
import WebtoonSlider from './WebtoonSlider';
import FilterComponent from './FilterComponent';
import { getWebtoonRanking } from '../../../hooks/getWebtoonRanking';
import { useSearchParams } from 'next/navigation';

interface ThumbnailContainerProps {
  type: string;
  title: string;
}

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

  const datas: IWebtoon[] = [
    {
      thumbnail: '/assets/images/webtoonthumbnail-1.jpg',
      title: '이런 영웅은 싫어',
      // writer: '삼촌',
      lastEpisode: 294,
      averageStar: 4.9,
      numOfStars: 200,
      genres: '일상',
    },
    {
      thumbnail: '/assets/images/thumbnail-2.jpg',
      title: '사변괴담',
      // writer: '강태진',
      lastEpisode: 4,
      averageStar: 4.1,
      numOfStars: 200,
      genres: '일상',
    },
    {
      thumbnail: '/assets/images/thumbnail-3.jpg',
      title: '귀곡의 문',
      // writer: 'Alice Lee',
      lastEpisode: 189,
      averageStar: 4.1,
      numOfStars: 200,
      genres: '스릴러',
    },
    {
      thumbnail: '/assets/images/thumbnail-4.jpg',
      title: '유부감자',
      // writer: '감자',
      lastEpisode: 294,
      averageStar: 4.1,
      numOfStars: 200,
      genres: '개그',
    },
  ];

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
          {selectedFilter && (
            <FilterComponent
              selectedFilter={selectedFilter}
              setFilter={setSelectedFilter}
            />
          )}
        </div>
        {/* <p className="text-[14px] text-[#888888]">더보기</p> */}
      </div>
      <WebtoonSlider webtoons={data || []} />
    </div>
  );
};

export default ThumbnailContainer;
