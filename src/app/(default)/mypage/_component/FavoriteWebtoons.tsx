import React, { useState } from 'react';
import Pagination from '../../../_component/Pagination';
import FavoriteWebtoonItem from './FavoriteWebtoonItem';
import { useQuery } from '@tanstack/react-query';
import { getFavoriteWebtoons } from '@/app/api/getFavoriteWebtoons';
import { FavoriteWebtoon } from '@/model/Webtoon';

export default function FavoriteWebtoons() {
  const itemsPerPage = 10; // 한 페이지당 항목 수
  const [currentPage, setCurrentPage] = useState(1);

  const { data = [] } = useQuery<FavoriteWebtoon[]>({
    queryKey: ['myFavorite'],
    queryFn: async () => getFavoriteWebtoons(),
  });

  if (!data || data.length === 0) {
    return (
      <p className="text-center text-[#C9C9C9] mt-[50px]">
        관심 웹툰이 없습니다.
      </p>
    );
  }

  // 총 페이지 계산
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터 슬라이싱
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 mt-10 gap-5">
        {currentItems.map((webtoon: FavoriteWebtoon) => (
          <FavoriteWebtoonItem key={webtoon.interestedWebtoonId} {...webtoon} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
