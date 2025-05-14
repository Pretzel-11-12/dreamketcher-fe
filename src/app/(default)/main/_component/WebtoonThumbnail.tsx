'use client';
import React from 'react';
import Image from 'next/image';
import { RankingWebtoon } from '@/model/Webtoon';
import { useRouter } from 'next/navigation';
import RankingBadge from './RankingBadge';
import NewBadge from './NewBadge';
import { genres } from '@/constants/genres';
import CoverImage from '@/app/_component/CoverImage';
type WebtoonThumbnailProps = {
  webtoon: Omit<RankingWebtoon, 'genre'> & {
    genre: (typeof genres)[number]['param'];
  };
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

  const handleAuthorClick = (e: React.MouseEvent) => {
    router.push(`/member/${webtoon.member}`);
  };

  const handleGenreClick = (e: React.MouseEvent) => {
    const genreParam = genres.find((g) => g.param === webtoon.genre)?.param;
    router.push(`/main/default?genre=${genreParam}`);
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
        <CoverImage
          src={webtoon.thumbnail}
          alt={webtoon.title}
          width={166}
          height={249}
        />
        <div className="absolute top-[6px] left-[6px] flex gap-[2px]">
          {isNew && <NewBadge />}
          {ranking && <RankingBadge rank={ranking} />}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col text-[14px] text-titleBlack">
          <p
            className="text-[18px] font-medium hover:underline cursor-pointer"
            onClick={handleTitleClick}
          >
            {webtoon.title}
          </p>
          <p className="text-inActive">
            <span
              className="hover:underline cursor-pointer"
              onClick={handleAuthorClick}
            >
              {webtoon.member}
            </span>
            {' · '}
            <span
              className="hover:underline cursor-pointer"
              onClick={handleGenreClick}
            >
              {genres.find((g) => g.param === webtoon.genre)?.name}
            </span>
          </p>
          <div className="flex items-center gap-1 text-[12px] leading-[12px]">
            <Image
              src="/assets/icon/star-1.svg"
              alt="Star svg"
              width={13}
              height={13}
            />
            <p className="text-brand-yellow">{webtoon.averageStar}</p>
            <p className="text-lightGray">({webtoon.numOfStars})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonThumbnail;
