'use client';
import React from 'react';
import Image from 'next/image';
import { _Model as __Model } from '@/app/api/fetchWebtoons/model';
export import Model = __Model;
import { useRouter } from 'next/navigation';
import { highlightKeyword } from '@/app/util/highlightKeyword';
import TagList from './TagList';
import CoverImage from '@/app/_component/CoverImage';

type SearchTagResultThumbnailProps = {
  webtoon: Model.WebtoonDetailUnit;
  tag: Model.Tag;
};

const SearchTagResultThumbnail: React.FC<SearchTagResultThumbnailProps> = ({
  webtoon,
  tag,
}) => {
  const router = useRouter();

  const tempClickHandler = () => {
    router.push(`/webtoon/list?id=${webtoon.webtoonId}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full h-[150px] cursor-pointer gap-[18px]">
        <div className="w-[100px] h-[150px]" onClick={tempClickHandler}>
          <CoverImage
            alt={'Search webtoon thumbnail'}
            src={webtoon.webtoonThumbnail}
            height={150}
            width={100}
          />
        </div>
        <div className="flex flex-col text-xs gap-[3px] mt-[1px] max-w-[752px]">
          <p
            className="text-[18px] mb-[3px] leading-[normal] cursor-pointer hover:underline"
            onClick={tempClickHandler}
          >
            {highlightKeyword(webtoon.webtoonTitle, tag.content)}
          </p>
          <p className="text-[#888888]">
            {highlightKeyword(webtoon.authorNickname, tag.content)} ·{' '}
            {highlightKeyword(webtoon.genreName, tag.content)} ·{' '}
            {webtoon.episode_count}화
          </p>
          <div className="flex items-center gap-1 text-[13px] mb-[7px]">
            <Image
              src="/assets/icon/star-1.svg"
              alt="Star svg"
              width={13}
              height={13}
            />
          </div>
          <p className="text-[14px] text-[#3f3f3f] mb-[4px] whitespace-normal line-clamp-1">
            {highlightKeyword(webtoon.webtoonStory, tag.content)}
          </p>
          <TagList tags={webtoon.tags} keyword={tag.content} />
        </div>
      </div>
    </div>
  );
};

export default SearchTagResultThumbnail;
