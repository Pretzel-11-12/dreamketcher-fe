import React from 'react';
import FavoriteWebtoonItem from './FavoriteWebtoonItem';

const favoriteWebtoons = [
  {
    id: 1,
    image: '/assets/images/webtoonthumbnail-1.jpg',
    title: '별종의 세계',
    writer: '바크베',
    genre: '로맨스',
    episodes: 120,
    updatedAt: '2025.01.22',
  },
  {
    id: 2,
    image: '/assets/images/webtoonthumbnail-1.jpg',
    title: '별종의 세계',
    writer: '바크베',
    genre: '로맨스',
    episodes: 75,
    updatedAt: '2025.01.22',
  },
];

export default function FavoriteWebtoons() {
  if (favoriteWebtoons.length === 0) {
    return <p className='text-gray-500'>관심웹툰이 없습니다.</p>;
  }

  return (
    <div className='grid grid-cols-1 pt-4 gap-4'>
      {favoriteWebtoons.map((webtoon) => (
        <FavoriteWebtoonItem key={webtoon.id} {...webtoon} />
      ))}
    </div>
  );
}
