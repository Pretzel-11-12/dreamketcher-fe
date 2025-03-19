'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RecentWatchedWebtoon } from '@/model/Webtoon';

type RecentThumbnailProps = {
  webtoon: RecentWatchedWebtoon;
};

const RecentThumbnail: React.FC<RecentThumbnailProps> = ({ webtoon }) => {
  const router = useRouter();

  const handleGenreClick = (e: React.MouseEvent) => {
    router.push(`/main/default?genre=${webtoon.genre}`);
  };

  const handleWriterClick = (e: React.MouseEvent) => {
    router.push(`/member/${webtoon.writer}`);
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  };

  return (
    <div className="flex flex-col w-[138px] h-[304px] gap-[6px]">
      <div
        className="relative w-[138px] h-[207px] rounded-[5px] overflow-hidden cursor-pointer bg-[#000000]"
        onClick={handleTitleClick}
      >
        <Image
          src={webtoon.image}
          alt="Webtoon thumbnail image"
          fill
          className="object-cover"
          sizes="138px"
        />
      </div>
      <div className="flex flex-col text-[12px] text-titleBlack">
        <p
          className="text-[14px] hover:font-medium cursor-pointer truncate max-w-[138px]"
          onClick={handleTitleClick}
          title={webtoon.title}
        >
          {webtoon.title}
        </p>
        <p className="text-[#888888]">
          <span
            className="hover:font-medium cursor-pointer"
            onClick={handleWriterClick}
          >
            {webtoon.writer}
          </span>
          {' · '}
          <span
            className="hover:font-medium cursor-pointer"
            onClick={handleGenreClick}
          >
            {webtoon.genre}
          </span>
        </p>
      </div>
      <Link
        className="w-[138px] h-[43px] mt-[6px] flex items-center justify-center bg-brand-yellow text-white text-[14px] rounded-[5px]"
        href={`/webtoon/detail?titleId=${webtoon.id}&no=${webtoon.episodeCount}`}
      >
        {webtoon.episodeCount}화 이어읽기
      </Link>
    </div>
  );
};

export default RecentThumbnail;
