import React from 'react';
import RecentWorkItem from './RecentWorkItem';

const recentWorks = [
  {
    id: 1,
    image: '/assets/images/webtoonthumbnail-1.jpg',
    title: '별종의 세계',
    writer: '바크베',
    genre: '로맨스',
    episodes: 50,
    rating: 4.5,
    ratingCount: 1.278,
    comments: 120,
  },
  {
    id: 2,
    image: '/assets/images/webtoonthumbnail-1.jpg',
    title: '별종의 세계',
    writer: '바크베',
    genre: '로맨스',
    episodes: 30,
    rating: 4.8,
    ratingCount: 375,
    comments: 85,
  },
];

export default function RecentWorks() {
  if (recentWorks.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-gray-500">아직 최근 본 작품이 없습니다.</p>
        <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded">
          드림케쳐 홈에서 작품 즐기기
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 pt-4 gap-4">
      {recentWorks.map((work) => (
        <RecentWorkItem key={work.id} {...work} />
      ))}
    </div>
  );
}
