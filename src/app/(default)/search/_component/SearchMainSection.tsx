'use client';
import React from 'react';
import SearchWebtoonSection from './SearchWebtoonSection';
import SearchWriterSection from './SearchWriterSection';

interface SearchMainSectionProps {
  keyword: string;
}

export default function SearchMainSection({ keyword }: SearchMainSectionProps) {
  return (
    <div className="flex flex-col w-[894px] min-h-[calc(100vh-255px)] border-r border-r-line pt-[30px] pr-[24px] gap-[50px] pb-[80px]">
      <SearchWriterSection keyword={keyword} />
      <SearchWebtoonSection keyword={keyword} />
    </div>
  );
}
