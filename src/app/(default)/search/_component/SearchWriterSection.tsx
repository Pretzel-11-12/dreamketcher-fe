'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import WriterComponent from './WriterComponent';
import { getSearchWebtoonsByAuthor } from '@/app/api/fetchWebtoons/getSearchResult';
interface SearchWriterSectionProps {
  keyword: string;
}

interface Writer {
  name: string;
  profileImage: string;
  authorNickname: string;
  representativeWorkTitle: string;
  workCount: number;
}

export default function SearchWriterSection({
  keyword,
}: SearchWriterSectionProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['writer', 'search', keyword],
    queryFn: () =>
      getSearchWebtoonsByAuthor({
        param: { keyword },
      }),
    enabled: !!keyword,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const searchData = data || {
    results: [],
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-end">
        <p className="text-[18px] font-medium leading-[21px] text-titleBlack">
          작가
        </p>
        <p className="ml-2 text-sm text-gray-500">총 {searchData.length}개</p>
      </div>
      <div className="flex flex-col">
        {data.map((writer: Writer, index: number) => (
          <WriterComponent key={index} writer={writer} keyword={keyword} />
        ))}
      </div>
    </div>
  );
}
