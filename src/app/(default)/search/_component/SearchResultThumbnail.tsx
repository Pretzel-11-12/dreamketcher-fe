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
  const temporalTags = ['무협/사극', '사이다', '세계관', '성장'];

  function tempClickHandler() {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  }
  return (
    <div
      className="flex w-full h-[190px] cursor-pointer gap-4"
      onClick={tempClickHandler}
    >
      <Image
        // src={webtoon.thumbnail}
        src={'/assets/images/thumbnail-4.jpg'}
        alt="Webtoon thumbnail image"
        width={100}
        height={150}
      />
      <div className="flex flex-col text-xs gap-2 justify-center">
        <p className="text-lg">{webtoon.title}</p>
        <p className="text-[#888888]">
          {webtoon.member} · {webtoon.genres[0]} · {webtoon.lastEpisode}화
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
        <p className="text-sm">{webtoon.description}</p>
        <div className="flex flex-wrap">
          {temporalTags.slice(0, 3).map((tag, index) => (
            <div className="bg-gray-100 m-1 p-1 rounded-[4px]" key={index}>
              {tag}
            </div>
          ))}
          {temporalTags.length > 3 && (
            <div className="m-1 p-1" key="extra">
              외 {temporalTags.length - 3}개
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultThumbnail;
