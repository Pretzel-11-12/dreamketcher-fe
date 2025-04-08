'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import WriterComponent from './WriterComponent';
interface SearchWriterSectionProps {
  keyword: string;
}

interface Writer {
  id: number;
  name: string;
  profileImage: string;
  webtoons: string[];
}

const dropdownOptions = [
  { label: '최근순', value: 'desc' },
  { label: '오래된순', value: 'asc' },
];

export default function SearchWriterSection({
  keyword,
}: SearchWriterSectionProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['member', 'search', keyword],
    queryFn: () => {
      // TODO: API 구현 후 실제 작가 검색 API 호출로 대체
      return Promise.resolve({
        results: [
          {
            id: 1,
            name: '작가1',
            profileImage: '/assets/images/profile-default.png',
            webtoons: ['웹툰1', '웹툰2'],
          },
          {
            id: 2,
            name: '작가2',
            profileImage: '/assets/images/profile-default.png',
            webtoons: ['웹툰3', '웹툰4'],
          },
        ],
      });
    },
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
    searchData.results.length > 0 && (
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-end">
          <p className="text-[18px] font-medium leading-[21px] text-titleBlack">
            작가
          </p>
          <p className="ml-2 text-sm text-gray-500">
            총 {searchData.results.length}개
          </p>
        </div>
        <div className="flex flex-col">
          {searchData.results.map((writer: Writer) => (
            <WriterComponent
              key={writer.id}
              writer={writer}
              keyword={keyword}
            />
          ))}
        </div>
      </div>
    )
  );
}
