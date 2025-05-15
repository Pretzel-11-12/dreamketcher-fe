'use client';

import React, { useState, useEffect, useRef } from 'react';
import useAuthStore from '@/app/store/authStore';
import LargeThumbnail from './LargeThumbnail';
import TagSelector from './TagSelector';
import { Webtoon as IWebtoon } from '@/model/Webtoon';

interface LargeThumbnailContainerProps {
  title: string;
  webtoonThumbnails: IWebtoon[];
}

const handleTagClick = () => {
  return null;
};

const LargeThumbnailContainer: React.FC<LargeThumbnailContainerProps> = ({
  title,
  webtoonThumbnails,
}) => {
  const [tag, setTag] = useState('로맨스');
  const { nickname } = useAuthStore();

  return (
    <div className="flex flex-col text-black gap-[14px]">
      <div className="flex justify-between items-center h-[21px]">
        {nickname ? (
          <p className="text-[18px] font-medium text-titleBlack">
            {nickname}님을 위한 {title}
          </p>
        ) : (
          <p className="text-[18px]">{title}</p>
        )}
        <p className="text-[14px] text-[#888888] cursor-pointer">더보기</p>
      </div>
      <TagSelector
        selectedTag={tag}
        tags={[
          { name: '로맨스' },
          { name: '스릴러' },
          { name: '공포' },
          { name: '액션' },
          { name: '스포츠' },
          { name: '개그' },
          { name: '소년' },
        ]}
        handleTagClick={setTag}
      />
      <div className="flex overflow-x-auto gap-[8px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {webtoonThumbnails.length > 0 ? (
          webtoonThumbnails.map((webtoon) => (
            <div key={webtoon.id}>
              <LargeThumbnail webtoon={webtoon} />
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

export default LargeThumbnailContainer;
