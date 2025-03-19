'use client';
import React from 'react';
import Image from 'next/image';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useRouter } from 'next/navigation';
import RankingBadge from './RankingBadge';
import NewBadge from './NewBadge';

type WebtoonThumbnailProps = {
  webtoon: IWebtoon;
  ranking: number;
  isNew?: boolean;
};

const WebtoonThumbnail: React.FC<WebtoonThumbnailProps> = ({
  webtoon,
  ranking = 0,
  isNew = false,
}) => {
  const router = useRouter();

  const handleThumbnailClick = () => {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  };

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
    <div className="flex flex-col w-[166px] h-[311px] gap-[7px]">
      <div
        className="relative w-[166px] h-[249px] rounded-[5px] overflow-hidden cursor-pointer"
        onClick={handleThumbnailClick}
      >
        <Image
          src={webtoon.thumbnail}
          alt="Webtoon thumbnail image"
          fill
          className="object-cover"
          sizes="166px"
        />
        <div className="absolute top-[3px] left-[3px] flex gap-[2px]">
          {isNew && <NewBadge />}
          {ranking && <RankingBadge rank={ranking} />}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col text-[12px] text-titleBlack">
          <p
            className="text-[14px] font-medium hover:underline cursor-pointer"
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
    </div>
  );
};

export default WebtoonThumbnail;
