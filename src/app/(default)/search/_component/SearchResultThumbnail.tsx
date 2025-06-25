'use client';
import React from 'react';
import Image from 'next/image';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useRouter } from 'next/navigation';
import { highlightKeyword } from '@/app/util/highlightKeyword';
import TagList from './TagList';
import CoverImage from '@/app/_component/CoverImage';

type SearchResultThumbnailProps = {
  webtoon: IWebtoon;
  keyword: string; // 검색 키워드 추가
};

const SearchResultThumbnail: React.FC<SearchResultThumbnailProps> = ({
  webtoon,
  keyword,
}) => {
  const router = useRouter();
  const temporalTags = [
    { id: 1, content: '무협/사극' },
    { id: 2, content: '사이다' },
    { id: 3, content: '세계관' },
    { id: 4, content: '성장' },
  ];

  const tempClickHandler = () => {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full h-[150px] cursor-pointer gap-[18px]">
        <div className="w-[100px] h-[150px]" onClick={tempClickHandler}>
          <CoverImage
            alt={'Search webtoon thumbnail'}
            src={webtoon.thumbnail}
            height={150}
            width={100}
          />
        </div>
        <div className="flex flex-col text-xs gap-[3px] mt-[1px] max-w-[752px]">
          <p className="text-[18px] mb-[3px] leading-[normal]">
            {highlightKeyword(webtoon.title, keyword)}
          </p>
          <p className="text-[#888888]">
            {highlightKeyword(webtoon.authorNickname, keyword)} ·{' '}
            {highlightKeyword(webtoon.genre, keyword)} · {webtoon.lastEpisode}화
          </p>
          <div className="flex items-center gap-1 text-[13px] mb-[7px]">
            <Image
              src="/assets/icon/star-1.svg"
              alt="Star svg"
              width={13}
              height={13}
            />
            <p className="text-brand-yellow">{webtoon.averageStar}</p>
            <p className="text-[#888888]">({webtoon.numOfStars})</p>
          </div>
          <p className="text-[14px] text-[#3f3f3f] mb-[4px] whitespace-normal line-clamp-1">
            {highlightKeyword(webtoon.story, keyword)}
          </p>
          <TagList tags={webtoon.tags} keyword={keyword} />
        </div>
      </div>
    </div>
  );
};

export default SearchResultThumbnail;
