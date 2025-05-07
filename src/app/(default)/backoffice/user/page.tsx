'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import BackofficeUserSection from '../_component/BackofficeUserSection';
import { User as IUser } from '@/model/User';
import { getAdminUsers } from '@/app/api/fetchBackofficeData/getAdminUsers';

export default function User() {
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery<IUser[]>({
    queryKey: ['users', 'admin'],
    queryFn: () => getAdminUsers(),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col w-[1200px] pb-10">
        <BackofficeUserSection users={userData || []} />
      </div>
    </div>
  );
}
