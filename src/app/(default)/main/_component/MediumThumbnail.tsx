'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Webtoon as IWebtoon } from '@/model/Webtoon';
import TagList from '../../search/_component/TagList';

type MediumThumbnailProps = {
  webtoon: IWebtoon;
  w: number;
  h: number;
};

const MediumThumbnail: React.FC<MediumThumbnailProps> = ({ webtoon, w, h }) => {
  const temporalTags = ['무협/사극', '사이다', '세계관', '성장'];
  const router = useRouter();
  function tempClickHandler() {
    router.push(`/webtoon/list?id=${webtoon.id}`);
  }
  return (
    <div
      className="flex flex-col cursor-pointer gap-[7px]"
      style={{ width: `${w}px`, height: `${h}px` }}
      onClick={tempClickHandler}
    >
      <div className="relative w-full h-[249px] rounded-[5px] overflow-hidden">
        <Image
          src={webtoon.thumbnail}
          alt="Webtoon thumbnail image"
          fill
          className="object-cover"
          sizes={`${w}px`}
        />
      </div>
      <div className="flex flex-col text-[12px] gap-[3px]">
        <TagList tags={temporalTags} maxDisplay={2} keyword={''} />
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
  );
};

export default MediumThumbnail;
