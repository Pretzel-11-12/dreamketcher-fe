'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { getSearchResult } from '@/app/hooks/getSearchResult';
import SearchSideSection from './_component/SearchSideSection';
import SearchMainSection from './_component/SearchMainSection';

export default function Search() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const { data, isLoading, isError } = useQuery<IWebtoon[]>({
    queryKey: ['webtoons', 'search', keyword],
    queryFn: () => getSearchResult(keyword),
    enabled: !!keyword,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error fetching search results</p>;

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-[1024px] pb-10">
        <SearchMainSection webtoons={data || []} />
        <SearchSideSection />
      </div>
    </div>
  );
}
