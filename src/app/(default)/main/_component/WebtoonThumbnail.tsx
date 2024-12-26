'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useRouter } from 'next/navigation';

type WebtoonThumbnailProps = {
  webtoon: IWebtoon;
  ranking: number;
};

const WebtoonThumbnail: React.FC<WebtoonThumbnailProps> = ({
  webtoon,
  ranking,
}) => {
  const router = useRouter();
  function tempClickHandler() {
    router.push(`/webtoon/list`);
  }
  return (
    <div
      className="flex w-[256px] h-[150px] cursor-pointer"
      onClick={tempClickHandler}
    >
      <Image
        // src={webtoon.thumbnail}
        src={'/assets/images/thumbnail-2.jpg'}
        alt="Webtoon thumbnail image"
        width={100}
        height={150}
      />
      <div className="flex items-center">
        <p className="flex justify-center m-3">{ranking}</p>
        <div className="flex flex-col text-[12px]">
          <p className="text-[16px]">{webtoon.title}</p>
          <p className="text-[#888888]">
            {webtoon.lastEpisode} · {webtoon.lastEpisode}화
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
    </div>
  );
};

export default WebtoonThumbnail;
