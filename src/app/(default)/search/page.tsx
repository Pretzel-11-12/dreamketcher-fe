'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import SearchSideSection from './_component/SearchSideSection';
import SearchMainSection from './_component/SearchMainSection';

export default function Search() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const mockKeyword = [
    '던전',
    '헌터물',
    '서양풍판타지',
    '나폴리탄',
    '오피스레이드',
  ];

  const mockRecommendTags = ['로맨스', '스릴러', '공포', '액션', '스포츠'];

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-[1200px]">
        <SearchMainSection keyword={keyword} />
        <SearchSideSection
          searchKeywords={mockKeyword || []}
          recommendTags={mockRecommendTags || []}
        />
      </div>
    </div>
  );
}
