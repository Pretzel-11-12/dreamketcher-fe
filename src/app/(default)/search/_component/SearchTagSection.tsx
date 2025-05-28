'use client';
import React, { useState, useEffect } from 'react';
import SearchMainSectionHeader from './SearchMainSectionHeader';
import SearchTagResultThumbnail from './SearchTagResultThumbnail';
import { useQuery } from '@tanstack/react-query';
import { getSearchWebtoonsByTag } from '@/app/api/fetchWebtoons/getSearchResult';
import { _Model as __Model } from '@/app/api/fetchWebtoons/model';
export import Model = __Model;

interface SearchTagSectionProps {
  tagId: number;
}

export default function SearchTagSection({ tagId }: SearchTagSectionProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['webtoons', 'search', 'tag', tagId],
    queryFn: () =>
      getSearchWebtoonsByTag({
        param: { tagId: tagId },
      }),
    enabled: !!tagId,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const searchData = data || { content: '', webtoons: [] };

  return (
    <div className="flex flex-col w-[894px] min-h-[calc(100vh-255px)] border-r border-r-line pt-[30px] pr-[24px] gap-[50px] pb-[80px]">
      <div className="flex flex-col gap-[15px]">
        {isError && (
          <div className="p-4 text-red-500 bg-red-50 rounded">
            검색 결과를 불러오는 중 오류가 발생했습니다. 잠시 후 다시
            시도해주세요.
          </div>
        )}
        <div className="flex items-end">
          <p className="text-[18px] font-medium leading-[21px] text-titleBlack">
            작품
          </p>
          <p className="ml-2 text-sm text-gray-500">
            총 {searchData.webtoons.length}개
          </p>
        </div>
        <div className="mb-[12px] flex justify-between items-center">
          <SearchMainSectionHeader count={searchData.webtoons.length} />
        </div>
        <div className="flex flex-col gap-5 mb-[30px] min-h-[calc(100vh-560px)]">
          {searchData.content &&
            (searchData.webtoons.length > 0 ? (
              searchData.webtoons.map((webtoon) => (
                <SearchTagResultThumbnail
                  key={webtoon.webtoonId}
                  webtoon={webtoon}
                  tag={{
                    id: tagId,
                    content: searchData.content,
                  }}
                />
              ))
            ) : (
              <div className="flex flex-col items-center text-gray-500 text-sm mt-10 gap-2">
                <div>
                  <p className="text-black text-base mb-3">
                    태그 '{searchData.content}'에 대한 검색 결과가 없습니다.
                  </p>
                  <div className="flex flex-col mx-1">
                    <p>· 띄어쓰기나 철자를 확인해보세요</p>
                    <p>· 다른 검색어로 검색해보세요</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
