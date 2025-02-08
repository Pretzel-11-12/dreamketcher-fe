'use client';

import { useEffect, useState } from 'react';
import RecentThumbnail from './RecentThumbnail';
import { RecentWebtoon, getRecentWebtoons } from '@/app/_lib/recentWebtoons';

interface Props {
  announcements: {
    id: number;
    title: string;
    link: string;
  }[];
}

export default function SideSection({ announcements }: Props) {
  const [recentWebtoons, setRecentWebtoons] = useState<RecentWebtoon[]>([]);

  useEffect(() => {
    setRecentWebtoons(getRecentWebtoons());
  }, []);

  return (
    <div className="flex flex-col gap-[15px] w-[282px] pt-[50px] ml-[24px]">
      <div className="h-[37px] flex items-center">
        <p className="text-[16px]">최근 본 웹툰</p>
      </div>
      <div className="flex mb-14">
        {recentWebtoons.length > 0 ? (
          recentWebtoons.map((webtoon) => (
            <div key={webtoon.id}>
              <RecentThumbnail webtoon={webtoon} />
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">최근 본 웹툰이 없습니다.</p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <p>공지사항</p>
        <hr className="-ml-2"></hr>
        <div className="flex flex-col gap-1">
          {announcements.map((announcement) => (
            <div className="flex" key={announcement.id}>
              <p className="text-[#3F3F3F] text-[12px]">
                · {announcement.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
