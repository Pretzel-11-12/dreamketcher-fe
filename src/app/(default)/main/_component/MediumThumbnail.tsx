'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Webtoon as IWebtoon } from '@/model/Webtoon';

type MediumThumbnailProps = {
  webtoon: IWebtoon;
  w: number;
  h: number;
};

const MediumThumbnail: React.FC<MediumThumbnailProps> = ({ webtoon, w, h }) => {
  const router = useRouter();
  function tempClickHandler() {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  }
  return (
    <div
      className="flex flex-col cursor-pointer gap-[7px]"
      style={{ width: `${w}px`, height: `${h}px` }}
      onClick={tempClickHandler}
    >
      <Image
        src={webtoon.thumbnail}
        alt="Webtoon thumbnail image"
        width={w}
        height={249}
      />
      <div className="flex flex-col text-[12px] gap-[3px]">
        <p className="text-[14px] break-words text-[#282828] font-semibold">
          {webtoon.title}
        </p>
        <p className="text-[#888888]">
          {webtoon.member} · {webtoon.genre}
        </p>
        <p className="text-[#888888]">판타지 헌터물 외 3개</p>
        <div className="flex items-center gap-1">
          <Image
            src="/assets/images/star-1.png"
            alt="Star PNG"
            width={13}
            height={13}
            style={{ height: '13px' }} // CSS로 높이 강제
          />
          <p className="text-brand-yellow">{webtoon.averageStar}</p>
          <p className="text-[#888888]">({webtoon.numOfStars})</p>
        </div>
      </div>
    </div>
  );
};

export default MediumThumbnail;
