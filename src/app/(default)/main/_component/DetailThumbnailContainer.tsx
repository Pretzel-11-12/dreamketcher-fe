'use client';

import React, { useState, useEffect, useRef } from 'react';
import thumbnailData from '@/app/mocks/webtoonThumbnails';
import MediumThumbnail from './MediumThumbnail';

interface DetailThumbnailContainerProps {
  title: string;
}

const DetailThumbnailContainer: React.FC<DetailThumbnailContainerProps> = ({
  title,
}) => {
  return (
    <div className="flex flex-col text-black gap-[16px]">
      <div className="flex text-[18px] items-center gap-[10px] font-medium">
        <p>{title}</p>
        <div className="flex text-[#888888] text-[14px] gap-[6px]">
          <p className="text-brand-yellow">최신순</p>
          <p>·</p>
          <p>좋아요순</p>
          <p>·</p>
          <p>별점순</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-y-[15px]">
        {thumbnailData.length > 0 ? (
          thumbnailData.map((webtoon) => (
            <div key={webtoon.id}>
              <MediumThumbnail webtoon={webtoon} w={160} h={336} />
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            <div className="w-[187px] h-[171px]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailThumbnailContainer;
