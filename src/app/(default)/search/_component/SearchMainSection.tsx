'use client';
import React, { useState } from 'react';
import SearchMainSectionHeader from './SearchMainSectionHeader';
import SearchResultThumbnail from './SearchResultThumbnail';
import thumbnailData from '@/app/mocks/webtoonThumbnails';
import SearchDropdown from './SearchDropdown';
import Pagination from '@/app/_component/Pagination';
import { _Model as __Model } from '@/app/api/fetchWebtoons/model';
import { useQuery } from '@tanstack/react-query';
import { getSearchResult } from '@/app/api/fetchWebtoons/getSearchResult';

interface SearchMainSectionProps {
  keyword: string;
}

const dropdownOptions = [
  { label: '최근순', value: 'desc' },
  { label: '오래된순', value: 'asc' },
];

const mockWebtoons = thumbnailData;

export default function SearchMainSection({ keyword }: SearchMainSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['webtoons', 'search', keyword, currentPage - 1, sortDirection],
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

  const searchData = data || {
    results: [],
    totalElements: 0,
    currentPage: 0,
    totalPages: 0,
  };

  return (
    <div className="flex flex-col w-[894px] min-h-[calc(100vh-255px)] border-r border-r-line pt-[30px] pr-[24px] gap-[20px] pb-[80px]">
      <div className="flex items-end">
        <p className="text-[18px] font-medium leading-[21px] text-titleBlack">
          '{keyword}'에 대한 검색 결과
        </p>
        <p className="ml-2 text-sm text-gray-500">
          총 {searchData.results.length}개
        </p>
      </div>
      <div className="mb-[7px] flex justify-between items-center">
        <SearchMainSectionHeader />
        <SearchDropdown
          options={dropdownOptions}
          selected={sortDirection}
          onSelect={(value) => setSortDirection(value as 'desc' | 'asc')}
        />
      </div>
      <div className="flex flex-col gap-5 mb-[30px] min-h-[calc(100vh-560px)]">
        {searchData.results.length > 0 ? (
          searchData.results.map((webtoon) => (
            <SearchResultThumbnail
              key={webtoon.id}
              webtoon={webtoon}
              keyword={keyword}
            />
          ))
        ) : (
          <div className="flex flex-col items-center text-gray-500 text-sm mt-10 gap-2">
            <div>
              <p className="text-black text-base mb-3">
                '{keyword}'에 대한 검색 결과가 없습니다.
              </p>
              <div className="flex flex-col mx-1">
                <p>· 띄어쓰기나 철자를 확인해보세요</p>
                <p>· 다른 검색어로 검색해보세요</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Pagination
        totalPages={searchData.totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
