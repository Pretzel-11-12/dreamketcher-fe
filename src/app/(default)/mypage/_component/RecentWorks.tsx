import { useEffect, useState } from 'react';
import RecentWorkItem from './RecentWorkItem';
import {
  getRecentWebtoons,
  RecentWebtoon,
  removeRecentWebtoon,
} from '@/app/_lib/recentWebtoons';
import Link from 'next/link';

export default function RecentWorks() {
  const [recentWebtoons, setRecentWebtoons] = useState<RecentWebtoon[]>([]);

  useEffect(() => {
    setRecentWebtoons(getRecentWebtoons());
  }, []);

  const handleDelete = (id: number) => {
    setRecentWebtoons(removeRecentWebtoon(id));
  };

  if (recentWebtoons.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-center text-[#C9C9C9] mt-[70px]">
          아직 최근 본 작품이 없습니다.
        </p>
        <Link
          className="w-[320px] h-[61px] mt-8 flex items-center justify-center px-6 py-2 border border-[#FBA250] text-white bg-brand-yellow rounded-md text-lg"
          href={'/'}
        >
          드림케쳐 홈에서 작품 즐기기
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 mt-5">
      {recentWebtoons.map((work) => (
        <RecentWorkItem
          ratingCount={0}
          key={work.id}
          {...work}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
