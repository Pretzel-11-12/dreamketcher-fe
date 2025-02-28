'use client';

import React, { useState, useEffect, useRef } from 'react';
import useAuthStore from '@/app/store/authStore';
import LargeThumbnail from './LargeThumbnail';
import TagSelector from './TagSelector';
import { Webtoon as IWebtoon } from '@/model/Webtoon';

const webtoonThumbnails: IWebtoon[] = [
  {
    id: 1,
    thumbnail: '/assets/images/thumbnail-large-3.jpg',
    title: 'D등급 학생',
    member: 'Jane Doe',
    genre: '일상',
    lastEpisode: 294,
    averageStar: 4.1,
    numOfStars: 200,
    story: 'asdf',
  },
  {
    id: 2,
    thumbnail: '/assets/images/thumbnail-large-4.jpg',
    title: 'Mystic Adventures',
    member: 'John Smith',
    genre: '일상',
    lastEpisode: 294,
    averageStar: 4.1,
    numOfStars: 200,
    story: 'asdf',
  },
  {
    id: 3,
    thumbnail: '/assets/images/thumbnail-large-5.jpg',
    title: 'Mystic Adventures',
    member: 'John Smith',
    genre: '일상',
    lastEpisode: 294,
    averageStar: 4.1,
    numOfStars: 200,
    story: 'asdf',
  },
  {
    id: 4,
    thumbnail: '/assets/images/thumbnail-large-6.jpg',
    title: 'Mystic Adventures',
    member: 'John Smith',
    genre: '일상',
    lastEpisode: 294,
    averageStar: 4.1,
    numOfStars: 200,
    story: 'asdf',
  },
  {
    id: 5,
    thumbnail: '/assets/images/thumbnail-large-7.jpg',
    title: 'Mystic Adventures',
    member: 'John Smith',
    genre: '일상',
    lastEpisode: 294,
    averageStar: 4.1,
    numOfStars: 200,
    story: 'asdf',
  },
];

interface LargeThumbnailContainerProps {
  title: string;
}

const handleTagClick = () => {
  return null;
};

const LargeThumbnailContainer: React.FC<LargeThumbnailContainerProps> = ({
  title,
}) => {
  const [tag, setTag] = useState('로맨스');
  const { nickname } = useAuthStore();

  return (
    <div className="flex flex-col text-black gap-[14px]">
      <div className="flex justify-between h-[21px]">
        {nickname ? (
          <p className="text-[18px] font-semibold text-titleblack">
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
      <div className="flex overflow-hidden gap-[8px]">
        {webtoonThumbnails.length > 0 ? (
          webtoonThumbnails.map((webtoon) => (
            <div key={webtoon.id}>
              <LargeThumbnail webtoon={webtoon} w={150} h={287} />
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
