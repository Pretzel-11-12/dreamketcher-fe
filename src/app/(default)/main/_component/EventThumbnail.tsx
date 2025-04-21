'use client';
import React from 'react';
import Image from 'next/image';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import { useRouter } from 'next/navigation';
import TagList from '@/app/(default)/search/_component/TagList';
import CoverImage from '@/app/_component/CoverImage';

type EventThumbnailProps = {
  webtoon: IWebtoon;
};

const EventThumbnail: React.FC<EventThumbnailProps> = ({ webtoon }) => {
  const router = useRouter();

  const tempClickHandler = () => {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        className="flex w-full h-[150px] gap-[18px] pr-5"
        onClick={tempClickHandler}
      >
        <div className="w-[100px] h-[150px] relative">
          <Image src={webtoon.thumbnail} alt="romance icon" fill />
        </div>
        <div className="flex flex-col text-xs gap-[7px] pt-[6px] max-w-[277px] leading-[120%]">
          <p className="text-[16px] leading-[120%]">{webtoon.title}</p>
          <p className="text-[#888888]">
            {webtoon.member} · {webtoon.genre} · {webtoon.lastEpisode}화
          </p>
          <TagList tags={webtoon.tags || []} />
          <p className="text-[13px] leading-[120%] text-[#3f3f3f] mb-[4px] whitespace-normal line-clamp-4">
            {webtoon.story}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventThumbnail;
