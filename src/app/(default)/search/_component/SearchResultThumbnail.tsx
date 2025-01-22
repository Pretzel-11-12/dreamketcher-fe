'use client';
import React from 'react';
import Image from 'next/image';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useRouter } from 'next/navigation';
import DefaultImage from '@/app/_component/DefaultImage';

type SearchResultThumbnailProps = {
  webtoon: IWebtoon;
  keyword: string; // 검색 키워드 추가
};

const SearchResultThumbnail: React.FC<SearchResultThumbnailProps> = ({
  webtoon,
  keyword,
}) => {
  const router = useRouter();
  const temporalTags = ['무협/사극', '사이다', '세계관', '성장'];

  const tempClickHandler = () => {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  };

  // 텍스트 강조 함수
  const highlightKeyword = (text: string, keyword: string) => {
    if (!text) return ''; // text가 undefined일 경우 빈 문자열 반환
    if (!keyword) return text; // 키워드가 없으면 원본 텍스트 반환

    const parts = text.split(new RegExp(`(${keyword})`, 'gi')); // 키워드로 분리
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className="font-bold">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        className="flex w-full h-[150px] cursor-pointer gap-5"
        onClick={tempClickHandler}
      >
        <DefaultImage
          alt={'Search webtoon thumbnail'}
          src={webtoon.thumbnail}
          height={150}
          width={120}
        />
        <div className="flex flex-col text-xs gap-2 justify-center">
          <p className="text-lg">{highlightKeyword(webtoon.title, keyword)}</p>
          <p className="text-[#888888]">
            {highlightKeyword(webtoon.member, keyword)} ·{' '}
            {highlightKeyword(webtoon.genres[0], keyword)} ·{' '}
            {webtoon.lastEpisode}화
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
          <p className="text-sm">
            {highlightKeyword(webtoon.description, keyword)}
          </p>
          <div className="flex flex-wrap">
            {temporalTags.slice(0, 3).map((tag, index) => (
              <div className="bg-gray-100 m-1 p-1 rounded-[4px]" key={index}>
                {highlightKeyword(tag, keyword)}
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
      <hr className=""></hr>
    </div>
  );
};

export default SearchResultThumbnail;
