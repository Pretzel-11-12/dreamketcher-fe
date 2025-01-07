'use client';
import React from 'react';
import Image from 'next/image';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useRouter } from 'next/navigation';

type SearchResultThumbnailProps = {
  webtoon: IWebtoon;
};

const SearchResultThumbnail: React.FC<SearchResultThumbnailProps> = ({
  webtoon,
}) => {
  const router = useRouter();

  function tempClickHandler() {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  }
  return (
    <div
      className="flex w-full h-[190px] cursor-pointer gap-4"
      onClick={tempClickHandler}
    >
      <Image
        src={webtoon.thumbnail}
        // src={'/assets/images/thumbnail-2.jpg'}
        alt="Webtoon thumbnail image"
        width={100}
        height={150}
      />
      <div className="flex">
        <div className="flex flex-col text-[12px] gap-2">
          <p className="text-lg">{webtoon.title}</p>
          <p className="text-[#888888]">
            {webtoon.member} · {webtoon.lastEpisode} · {webtoon.lastEpisode}화
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
          <p className="">{webtoon.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResultThumbnail;
