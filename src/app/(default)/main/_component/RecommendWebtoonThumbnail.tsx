'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import WhiteBrandButton from './WhiteBrandButton';

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
      className="flex flex-col w-[138px] h-[304px] gap-[6px]"
      onClick={handleThumbnailClick}
    >
      <div className="relative w-[138px] h-[207px] rounded-[5px] overflow-hidden">
        <img
          src="/assets/images/monthly-dreamketcher.png"
          alt="Webtoon thumbnail image"
          className="w-[138px] h-[207px] object-cover"
        />
      </div>

      <div className="flex flex-col text-[12px] items-center">
        <p className="text-[14px] text-[#3f3f3f]">드림케쳐 추천작 리스트</p>
        <p className="text-[#3f3f3f]">⁺. ⊹˚₊ ₊·(੭· ˕ · )੭‧*</p>
      </div>
      <WhiteBrandButton width={138} height={43} href="/main">
        추천작 보러가기
      </WhiteBrandButton>
    </div>
  );
};

export default RecommendWebtoonThumbnail;
