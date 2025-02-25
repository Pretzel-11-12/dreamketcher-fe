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

  const handleThumbnailClick = () => {
    router.push(
      `/webtoon/detail?titleId=${webtoon.id}&no=${webtoon.episodeCount}`
    );
  };

  return (
    <div
      className="flex flex-col w-[138px] h-[304px] cursor-pointer"
      onClick={handleThumbnailClick}
    >
      <div className="relative w-[138px] h-[207px] rounded-[5px] overflow-hidden">
        <Image
          src={webtoon.image}
          alt="Webtoon thumbnail image"
          fill
          className="object-cover"
          sizes="138px"
        />
      </div>
      <div className="flex flex-col text-[12px]">
        <p className="text-[14px] text-[#3f3f3f]">{webtoon.title}</p>
        <p className="text-[#888888] mb-2">
          {webtoon.writer} · {webtoon.episodeCount}화
        </p>
      </div>
      <Link
        className="w-[138px] h-[43px] flex items-center justify-center bg-brand-yellow text-white text-[14px] rounded-[5px]"
        href={`/webtoon/detail?titleId=${webtoon.id}&no=${webtoon.lastViewedAt}`}
      >
        {webtoon.episodeCount}화 이어읽기
      </Link>
    </div>
  );
};

export default RecentThumbnail;
