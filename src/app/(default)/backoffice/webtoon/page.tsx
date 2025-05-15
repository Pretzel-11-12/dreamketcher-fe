'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import BackofficeWebtoonSection from '../_component/BackofficeWebtoonSection';
import { getAdminWebtoons } from '@/app/api/fetchBackofficeData/getAdminWebtoons';
import { Webtoon as IWebtoon } from '@/model/Webtoon';

export default function Webtoon() {
  const {
    data: webtoonData,
    isLoading: webtoonLoading,
    isError: webtoonError,
  } = useQuery<IWebtoon[]>({
    queryKey: ['webtoons', 'admin'],
    queryFn: () => getAdminWebtoons(),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col w-[1200px] pb-10">
        <BackofficeWebtoonSection webtoons={webtoonData || []} />
      </div>
    </div>
  );
}
