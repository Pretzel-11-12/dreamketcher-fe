'use client';
import React from 'react';
import Image from 'next/image';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useRouter } from 'next/navigation';
import DefaultImage from '@/app/_component/DefaultImage';
import RankingBadge from './RankingBadge';
import NewBadge from './NewBadge';

type WebtoonThumbnailProps = {
  webtoon: IWebtoon;
  ranking: number;
  isNew?: boolean;
};

const WebtoonThumbnail: React.FC<WebtoonThumbnailProps> = ({
  webtoon,
  ranking,
  isNew = true,
}) => {
  const router = useRouter();

  function tempClickHandler() {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  }
  return (
    <div
      className="flex flex-col w-[166px] h-[311px] cursor-pointer gap-2"
      onClick={tempClickHandler}
    >
      <div className="relative w-[166px] h-[249px] rounded-[5px] overflow-hidden">
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
        <div className="flex flex-col text-[12px]">
          <p className="text-[14px]">{webtoon.title}</p>
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
    </div>
  );
};

export default WebtoonThumbnail;
