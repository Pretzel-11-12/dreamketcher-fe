'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAdminComments } from '@/app/api/fetchBackofficeData/getAdminComments';
import { Comment as IComment } from '@/model/Comments';
export default function Comment() {
  const {
    data: commentData,
    isLoading: commentLoading,
    isError: commentError,
  } = useQuery<IComment[]>({
    queryKey: ['comments', 'admin'],
    queryFn: () => getAdminComments(),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col w-[1200px] pb-10">nn</div>
    </div>
  );
}
