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
    <div className="flex flex-col w-[700px] border-r border-r-line pt-8 pr-4">
      <div className="flex items-end">
        <p className="text-md">'{keyword}'에 대한 검색 결과</p>
        <p className="ml-2 text-sm text-gray-500">총 {webtoons.length}개</p>
      </div>
      <SearchMainSectionHeader />
      <div className="flex flex-col gap-5">
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
    </div>
  );
};

export default SearchMainSection;
