'use client';

import Image from 'next/image';
import ThumbnailContainer from '@/app/(default)/main/_component/ThumbnailContainer';
import DetailThumbnailContainer from '@/app/(default)/main/_component/DetailThumbnailContainer';
import Pagination from '@/app/_component/Pagination';
import { useState } from 'react';

export default function Finish() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col w-[894px] border-r border-r-line pt-[50px] pr-3 pb-32 pr-[24px]">
      <ThumbnailContainer type={'finish'} title={'베스트 완결 웹툰'} />
      <div className="flex gap-[10px] mt-10">
        <Image
          src="/assets/images/promotion-1.png"
          alt="Site promotion image"
          width={430}
          height={90}
          layout="intrinsic"
        />
        <Image
          src="/assets/images/promotion-2.png"
          alt="Site promotion image"
          width={430}
          height={90}
          layout="intrinsic"
        />
      </div>
      <DetailThumbnailContainer title={'전체 완결 웹툰'} />
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
