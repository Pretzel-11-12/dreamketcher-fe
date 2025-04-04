'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSearchResult } from '@/app/api/fetchWebtoons/getSearchResult';
import SearchSideSection from './_component/SearchSideSection';
import SearchMainSection from './_component/SearchMainSection';
import thumbnailData from '@/app/mocks/webtoonThumbnails';

export default function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');

  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['webtoons', 'search', keyword, currentPage - 1],
    queryFn: () =>
      getSearchResult({
        param: { keyword },
        query: {
          fromFirst: sortDirection === 'asc',
          page: currentPage - 1,
          size: 30,
        },
      }),
    enabled: !!keyword,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const mockdata = thumbnailData;
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
        <SearchMainSection
          data={
            data || {
              results: [],
              totalElements: 0,
              currentPage: 0,
              totalPages: 0,
            }
          }
          setCurrentPage={setCurrentPage}
        />
        <SearchSideSection
          searchKeywords={mockKeyword || []}
          recommendTags={mockKeyword || []}
        />
      </div>
    </div>
  );
}
