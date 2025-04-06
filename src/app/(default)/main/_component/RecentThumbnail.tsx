'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { RecentWatchedWebtoon } from '@/model/Webtoon';
import BrandButton from '@/app/(default)/main/_component/BrandButton';
import { genres } from '@/constants/genres';

type RecentThumbnailProps = {
  webtoon: RecentWatchedWebtoon;
};

const RecentThumbnail: React.FC<RecentThumbnailProps> = ({ webtoon }) => {
  const router = useRouter();
  const currentGenre = genres.find((g) => g.param === webtoon.genre);

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
        <img
          src={webtoon.image}
          alt="Webtoon thumbnail image"
          className="w-[138px] h-[207px] object-cover"
        />
      </div>
      <div className="flex flex-col text-[12px] text-titleBlack">
        <p
          className="text-[14px] font-medium hover:underline cursor-pointer truncate max-w-[138px]"
          onClick={handleTitleClick}
          title={webtoon.title}
        >
          {webtoon.title}
        </p>
        <p className="text-[#888888]">
          <span
            className="hover:underline cursor-pointer"
            onClick={handleWriterClick}
          >
            {webtoon.writer}
          </span>
          {' · '}
          <span
            className="hover:underline cursor-pointer"
            onClick={handleGenreClick}
          >
            {currentGenre?.name || '장르 없음'}
          </span>
        </p>
      </div>
      <BrandButton
        width={138}
        height={43}
        href={`/webtoon/detail?titleId=${webtoon.id}&no=${webtoon.episodeCount}`}
      >
        {webtoon.episodeCount}화 이어읽기
      </BrandButton>
    </div>
  );
};

export default RecentThumbnail;
