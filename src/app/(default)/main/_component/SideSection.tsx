'use client';

import { useEffect, useState } from 'react';
import RecentThumbnail from './RecentThumbnail';
import { RecentWebtoon, getRecentWebtoons } from '@/app/_lib/recentWebtoons';
import EmptyRecentWebtoon from './EmptyRecentWebtoon';
import RecommendWebtoonThumbnail from './RecommendWebtoonThumbnail';
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
      {recentWebtoons.length > 0 && (
        <div className="flex items-center">
          <p className="text-[16px] text-titleblack font-medium h-[20px]">
            최근 본 웹툰
          </p>
        </div>
      )}
      <div className="flex mb-14 gap-[6px]">
        {recentWebtoons.length === 0 ? (
          <EmptyRecentWebtoon />
        ) : recentWebtoons.length === 1 ? (
          <>
            <RecentThumbnail webtoon={recentWebtoons[0]} />
            <RecommendWebtoonThumbnail />
          </>
        ) : (
          recentWebtoons.map((webtoon) => (
            <div key={webtoon.id}>
              <RecentThumbnail webtoon={webtoon} />
            </div>
          ))
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="font-medium text-titleblack text-[16px]">공지사항</p>
          <p className="text-[#888888] text-[14px]">더보기</p>
        </div>
        <hr className=""></hr>
        <div className="flex flex-col gap-1">
          {announcements.map((announcement) => (
            <div className="flex" key={announcement.id}>
              <p className="flex items-center text-[#3F3F3F] text-[12px]">
                <span className="inline-block w-[2px] h-[2px] bg-[#c9c9c9] rounded-full mr-[10px]" />
                {announcement.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
