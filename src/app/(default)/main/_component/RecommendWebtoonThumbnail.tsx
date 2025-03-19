'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type RecommendWebtoonThumbnailProps = {};

const RecommendWebtoonThumbnail: React.FC<
  RecommendWebtoonThumbnailProps
> = ({}) => {
  const router = useRouter();

  const handleThumbnailClick = () => {
    router.push(`/main`);
  };

  return (
    <div
      className="flex flex-col w-[138px] h-[304px]"
      onClick={handleThumbnailClick}
    >
      <div className="relative w-[138px] h-[199px] rounded-[5px] overflow-hidden">
        <Image
          src="/assets/images/monthly-dreamketcher.png"
          alt="Webtoon thumbnail image"
          fill
          className="object-cover"
          sizes="138px"
        />
      </div>
      <div className="flex flex-col text-[12px] items-center mt-[6px]">
        <p className="text-[14px] text-[#3f3f3f]">드림케쳐 추천작 리스트</p>
        <p className="text-[#3f3f3f]">⁺. ⊹˚₊ ₊·(੭· ˕ · )੭‧*</p>
      </div>
      <Link
        className="w-[138px] h-[43px] mt-[6px] flex items-center justify-center bg-brand-yellow text-white text-[14px] rounded-[5px]"
        href={`/main`}
      >
        추천작 보러가기
      </Link>
    </div>
  );
};

export default RecommendWebtoonThumbnail;
