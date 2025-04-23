'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import SearchSideSection from '../_component/SearchSideSection';
import SearchTagSection from '../_component/SearchTagSection';

export default function Search() {
  const searchParams = useSearchParams();
  const tagId = Number(searchParams.get('tagId')) || 0;

  const mockKeyword = [
    '로맨스',
    '스릴러',
    '공포',
    '액션',
    '스포츠',
    '판타지',
    '개그',
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-[1200px]">
        <SearchTagSection tagId={tagId} />
        <SearchSideSection
          searchKeywords={mockKeyword || []}
          recommendTags={mockKeyword || []}
        />
      </div>
    </div>
  );
}
