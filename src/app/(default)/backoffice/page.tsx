'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { getAdminWebtoons } from '@/app/api/fetchBackofficeData/getAdminWebtoons';
import BackofficeMainSection from './_component/BackofficeMainSection';
import BackofficeUserSection from './_component/BackofficeUserSection';
import { User } from '@/model/User';
import { getAdminUsers } from '@/app/api/fetchBackofficeData/getAdminUsers';
export default function Backoffice() {
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery<User[]>({
    queryKey: ['users', 'admin'],
    queryFn: () => getAdminUsers(),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

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
        <BackofficeUserSection users={userData || []} />
        <BackofficeMainSection webtoons={webtoonData || []} />
      </div>
    </div>
  );
}
