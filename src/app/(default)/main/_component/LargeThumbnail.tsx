'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Webtoon as IWebtoon } from '@/model/Webtoon';

type LargeThumbnailProps = {
  webtoon: IWebtoon;
  w: number;
  h: number;
};

const LargeThumbnail: React.FC<LargeThumbnailProps> = ({ webtoon, w, h }) => {
  const router = useRouter();
  function tempClickHandler() {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  }
  return (
    <div
      className="flex flex-col cursor-pointer"
      style={{ width: `${w}px`, height: '308px' }}
      onClick={tempClickHandler}
    >
      <Image
        src={webtoon.thumbnail}
        alt="Webtoon thumbnail image"
        width={w - 9}
        height={h}
      />
      <div className="flex flex-col text-[12px]">
        <p className="text-[16px] break-words">{webtoon.title}</p>
        <p className="text-[#888888]">
          {webtoon.member} · {webtoon.genre}
        </p>
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

export default LargeThumbnail;
