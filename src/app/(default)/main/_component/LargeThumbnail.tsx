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
      style={{ width: `${w}px`, height: `${h}px` }}
      onClick={tempClickHandler}
    >
      <div className="relative w-full h-[225px] rounded-[5px] overflow-hidden">
        <Image
          src={webtoon.thumbnail}
          alt="Webtoon thumbnail image"
          fill
          className="object-cover"
          sizes="150px"
        />
      </div>
      <div className="flex flex-col text-[12px] mt-[3px]">
        <p className="text-[14px] break-words text-titleBlack">
          {webtoon.title}
        </p>
        <p className="text-[#888888]">
          {webtoon.member} · {webtoon.genre}
        </p>
        <div className="flex items-center gap-1 text-[13px]">
          <Image
            src="/assets/icon/star-1.svg"
            alt="Star svg"
            width={13}
            height={13}
          />
          <p className="text-brand-yellow">{webtoon.averageStar}</p>
          <p className="text-[#888888]">({webtoon.numOfStars})</p>
        </div>
      </div>
    </div>
  );
};

export default LargeThumbnail;
