'use client';
import React from 'react';
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
    router.push(`/webtoon/list?id=${webtoon.id}`);
  }
  return (
    <div
      className="flex flex-col w-[150px] h-[311px] cursor-pointer gap-2"
      onClick={tempClickHandler}
    >
      <Image
        // src={webtoon.thumbnail}
        src={'/assets/images/thumbnail-4.jpg'}
        alt="Webtoon thumbnail image"
        width={150}
        height={240}
      />
      <div className="flex items-center">
        <div className="flex flex-col text-[12px]">
          <p className="text-[14px]">{webtoon.title}</p>
          <p className="text-[#888888]">
            {webtoon.member} · {webtoon.genres[0]}
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
