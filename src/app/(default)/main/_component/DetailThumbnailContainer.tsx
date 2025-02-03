'use client';

import React, { useState, useEffect, useRef } from 'react';
import LargeThumbnail from './LargeThumbnail';
import thumbnailData from '@/app/mocks/webtoonThumbnails';

interface DetailThumbnailContainerProps {
  title: string;
}

const DetailThumbnailContainer: React.FC<DetailThumbnailContainerProps> = ({
  title,
}) => {
  return (
    <div className="flex flex-col text-black mt-3 gap-1">
      <div className="flex text-[17px] items-center gap-2">
        <p>{title}</p>
        <div className="flex text-[#888888] text-[14px]">
          <p className="text-brand-yellow mr-1">최신순</p>
          <p> · 좋아요순 · 별점순</p>
        </div>
      </div>
      <div className="flex flex-wrap mt-3 gap-1">
        {thumbnailData.length > 0 ? (
          thumbnailData.map((webtoon) => (
            <div key={webtoon.id}>
              <LargeThumbnail webtoon={webtoon} w={130} h={252} />
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
