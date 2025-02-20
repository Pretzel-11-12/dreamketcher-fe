'use client';

import Image from 'next/image';
import LargeThumbnailContainer from '../_component/LargeThumbnailContainer';
import ThumbnailContainer from '../_component/ThumbnailContainer';

interface Props {
  params: Promise<{ params: string }>;
}

export default function Main({ params }: Props) {
  return (
    <div className="flex flex-col w-[894px] border-r border-r-line pt-[50px] pr-3 pb-32 pr-[24px] gap-[50px]">
      <ThumbnailContainer type={'default'} title={'전체 웹툰 랭킹'} />
      <div className="flex gap-[10px]">
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
      <LargeThumbnailContainer title={'키워드 별 추천 작품'} />
      <LargeThumbnailContainer title={'장르별 신작 작품'} />
    </div>
  );
}
