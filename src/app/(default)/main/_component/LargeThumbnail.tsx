'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Webtoon as IWebtoon } from '@/model/Webtoon';

type LargeThumbnailProps = {
  webtoon: IWebtoon;
};

const LargeThumbnail: React.FC<LargeThumbnailProps> = ({ webtoon }) => {
  const router = useRouter();

  const handleMemberClick = (e: React.MouseEvent) => {
    router.push(`/member/${webtoon.member}`);
  };

  const handleGenreClick = (e: React.MouseEvent) => {
    router.push(`/main/default?genre=${webtoon.genre}`);
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  };

  return (
    <div className="w-[150px] flex flex-col cursor-pointer gap-[7px]">
      <div
        className="relative w-full h-[225px] rounded-[5px] overflow-hidden"
        onClick={handleTitleClick}
      >
        <Image
          src={webtoon.thumbnail}
          alt="Webtoon thumbnail image"
          fill
          className="object-cover"
          sizes="150px"
        />
      </div>
      <div className="flex flex-col text-[14px] text-titleBlack">
        <p
          className="text-[16px] font-medium hover:underline cursor-pointer"
          onClick={handleTitleClick}
        >
          {webtoon.title}
        </p>
        <p className="text-[#888888]">
          <span
            className="hover:underline cursor-pointer"
            onClick={handleMemberClick}
          >
            {webtoon.member}
          </span>
          {' · '}
          <span
            className="hover:underline cursor-pointer"
            onClick={handleGenreClick}
          >
            {webtoon.genre}
          </span>
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
