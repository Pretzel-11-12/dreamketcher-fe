'use client';
import React, { useState, useEffect } from 'react';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchMainSectionHeader from './SearchMainSectionHeader';
import SearchResultThumbnail from './SearchResultThumbnail';
import thumbnailData from '@/app/mocks/webtoonThumbnails';
import Dropdown from '@/app/_component/Dropdown';
import Pagination from '@/app/_component/Pagination';

interface SearchMainSectionProps {
  webtoons: IWebtoon[];
}
const dropdownOptions = [
  { label: '최근순', value: 'recent' },
  { label: '오래된순', value: 'oldest' },
];

const mockWebtoons = thumbnailData;

const SearchMainSection: React.FC<SearchMainSectionProps> = ({ webtoons }) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const keyword = searchParams.get('keyword') || '';
  return (
    <div className="flex flex-col w-[894px] border-r border-r-line pt-[40px] pr-[24px] gap-[20px]">
      <div className="flex items-end">
        <p className="text-md">'{keyword}'에 대한 검색 결과</p>
        <p className="ml-2 text-sm text-gray-500">총 {webtoons.length}개</p>
      </div>
      <SearchMainSectionHeader />
      <div className="mt-[20px]">
        <Dropdown options={dropdownOptions} defaultOption="recent" />
      </div>
      <div className="flex flex-col gap-5 mb-[30px]">
        {webtoons.length > 0 ? (
          webtoons.map((webtoon) => (
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
        totalPages={10}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SearchMainSection;
