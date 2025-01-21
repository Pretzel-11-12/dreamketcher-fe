'use client';

import React, { useState, useEffect, useRef } from 'react';
import WebtoonThumbnail from '@/app/(default)/main/_component/WebtoonThumbnail';
import LargeThumbnail from './LargeThumbnail';
import TagSelector from './TagSelector';
import { Webtoon as IWebtoon } from '@/model/Webtoon';

const webtoonThumbnails: IWebtoon[] = [
  {
    id: 1,
    thumbnail: '/assets/images/thumbnail-large-3.jpg',
    title: 'D등급 학생',
    member: 'Jane Doe',
    genres: ['일상'],
    lastEpisode: 294,
    averageStar: 4.1,
    numOfStars: 200,
    description: 'asdf',
  },
  {
    id: 2,
    thumbnail: '/assets/images/thumbnail-large-4.jpg',
    title: 'Mystic Adventures',
    member: 'John Smith',
    genres: ['일상'],
    lastEpisode: 294,
    averageStar: 4.1,
    numOfStars: 200,
    description: 'asdf',
  },
  {
    id: 3,
    thumbnail: '/assets/images/thumbnail-large-5.jpg',
    title: 'Mystic Adventures',
    member: 'John Smith',
    genres: ['일상'],
    lastEpisode: 294,
    averageStar: 4.1,
    numOfStars: 200,
    description: 'asdf',
  },
  {
    id: 4,
    thumbnail: '/assets/images/thumbnail-large-6.jpg',
    title: 'Mystic Adventures',
    member: 'John Smith',
    genres: ['일상'],
    lastEpisode: 294,
    averageStar: 4.1,
    numOfStars: 200,
    description: 'asdf',
  },
  {
    id: 5,
    thumbnail: '/assets/images/thumbnail-large-7.jpg',
    title: 'Mystic Adventures',
    member: 'John Smith',
    genres: ['일상'],
    lastEpisode: 294,
    averageStar: 4.1,
    numOfStars: 200,
    description: 'asdf',
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

  return (
    <div className="flex flex-col text-black mt-3 gap-1">
      <p className="text-[17px]">{title}</p>
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
      <div className="flex mt-3 overflow-hidden">
        {webtoonThumbnails.length > 0 ? (
          webtoonThumbnails.map((webtoon) => (
            <div key={webtoon.id}>
              <LargeThumbnail webtoon={webtoon} w={140} h={210} />
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
