'use client';

import Image from 'next/image';
import ThumbnailContainer from '@/app/(default)/main/_component/ThumbnailContainer';
import DetailThumbnailContainer from '@/app/(default)/main/_component/DetailThumbnailContainer';
import Pagination from '@/app/_component/Pagination';
import { useState } from 'react';

export default function New() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col w-[870px] border-r border-r-line pt-8 pr-3 pb-32">
      <ThumbnailContainer type={'new'} title={'베스트 신작 웹툰'} />{' '}
      <div className="flex gap-1 mt-10">
        <Image
          src="/assets/images/promotion-3.png"
          alt="Site promotion image"
          width={430}
          height={90}
          layout="intrinsic"
        />
        <Image
          src="/assets/images/promotion-4.png"
          alt="Site promotion image"
          width={430}
          height={90}
          layout="intrinsic"
        />
      </div>
      <DetailThumbnailContainer title={'전체 신작 웹툰'} />
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
