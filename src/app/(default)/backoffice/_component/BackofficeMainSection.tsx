'use client';
import React, { useState, useEffect } from 'react';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useRouter, useSearchParams } from 'next/navigation';
import WebtoonManagement from './WebtoonManagement';

interface BackofficeMainSectionProps {
  webtoons: IWebtoon[];
}

const BackofficeMainSection: React.FC<BackofficeMainSectionProps> = ({
  webtoons,
}) => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  return (
    <div className="flex flex-col w-[1200px] pt-8">
      <div className="flex items-center justify-center mb-10">
        <p className="text-lg">작품 관리</p>
        <p className="ml-2 text-sm text-gray-500">총 {webtoons.length}개</p>
      </div>
      <div className="flex flex-col gap-5">
        {Array.isArray(webtoons) ? (
          webtoons.map((webtoon) => (
            <WebtoonManagement key={webtoon.id} webtoon={webtoon} />
          ))
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default BackofficeMainSection;
