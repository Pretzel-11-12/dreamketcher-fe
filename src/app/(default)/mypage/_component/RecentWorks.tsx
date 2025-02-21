import { useEffect, useState } from 'react';
import RecentWorkItem from './RecentWorkItem';
import { getRecentWebtoons, RecentWebtoon } from '@/app/_lib/recentWebtoons';

export default function RecentWorks() {
  const [recentWebtoons, setRecentWebtoons] = useState<RecentWebtoon[]>([]);

  useEffect(() => {
    setRecentWebtoons(getRecentWebtoons());
  }, []);

  if (recentWebtoons.length === 0) {
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
    <div className="grid grid-cols-1 mt-5">
      {recentWebtoons.map((work) => (
        <RecentWorkItem genre={''} ratingCount={0} key={work.id} {...work} />
      ))}
    </div>
  );
}
