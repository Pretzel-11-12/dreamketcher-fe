'use client';
import React, { useState, useEffect } from 'react';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchMainSectionHeader from './SearchMainSectionHeader';
import SearchResultThumbnail from './SearchResultThumbnail';
import thumbnailData from '@/app/mocks/webtoonThumbnails';

interface SearchMainSectionProps {
  webtoons: IWebtoon[];
}

const mockWebtoons = thumbnailData;

const SearchMainSection: React.FC<SearchMainSectionProps> = ({ webtoons }) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  return (
    <div className="flex flex-col w-[700px] border-r border-r-line pt-8">
      <div className="flex items-end">
        <p className="text-md">'{keyword}'에 대한 검색 결과</p>
        <p className="ml-2 text-sm text-gray-500">총 {webtoons.length}개</p>
      </div>
      <SearchMainSectionHeader />
      <div className="flex flex-col gap-5">
        {webtoons?.map((webtoon) => (
          <SearchResultThumbnail key={webtoon.id} webtoon={webtoon} />
        ))}
      </div>
    </div>
  );
};

export default SearchMainSection;
