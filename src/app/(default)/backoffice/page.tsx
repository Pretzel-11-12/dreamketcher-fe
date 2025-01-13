'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { getAdminWebtoons } from '@/app/api/fetchBackofficeData/getAdminWebtoons';
import BackofficeMainSection from './_component/BackofficeMainSection';
import thumbnailData from '@/app/mocks/webtoonThumbnails';

export default function Backoffice() {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<IWebtoon[]>({
    queryKey: ['webtoons', 'admin'],
    queryFn: () => getAdminWebtoons(),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const mockData = thumbnailData;

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-[1024px] pb-10">
        <BackofficeMainSection webtoons={data || []} />
      </div>
    </div>
  );
}
