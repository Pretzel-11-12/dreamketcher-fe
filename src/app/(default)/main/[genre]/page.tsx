'use client';

import Image from 'next/image';
import RecentThumbnail from '@/app/(default)/main/_component/RecentThumbnail';
import LargeThumbnailContainer from '@/app/(default)/main/_component/LargeThumbnailContainer';
import ThumbnailContainer from '@/app/(default)/main/_component/ThumbnailContainer';
import { useEffect } from 'react';

interface WebtoonThumbnailData {
  id: number;
  image: string;
  title: string;
  writer: string;
  episodeCount: number;
  averageRating: number;
  stars: number;
}

interface Props {
  params: Promise<{ params: string }>;
}

const webtoonThumbnails: WebtoonThumbnailData[] = [
  {
    id: 1,
    image: '/assets/images/thumbnail-large.jpg',
    title: '수염&멜빵',
    writer: 'PIPO',
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
  {
    id: 2,
    image: '/assets/images/thumbnail-large-2.jpg',
    title: '고의적 스캔들',
    writer: '탁본',
    episodeCount: 294,
    averageRating: 4.1,
    stars: 200,
  },
];

const announcements = [
  {
    id: 1,
    title: '드림케쳐 서비스 오픈 안내',
    link: '/announcements/dreamcatcher-launch', // 연결될 링크
  },
  {
    id: 2,
    title: '개인정보처리 방침에 대한 안내사항',
    link: '/announcements/privacy-policy', // 연결될 링크
  },
  {
    id: 3,
    title: '2025년 설 연 서비스 운영 안내사항',
    link: '/announcements/2025-new-year', // 연결될 링크
  },
  {
    id: 4,
    title: '01/03(금) 23:00 ~ 24:00 서버 점검 안내',
    link: '/announcements/server-maintenance-0103', // 연결될 링크
  },
];

export default function Main({ params }: Props) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex w-[1024px]">
        <div className="flex flex-col w-[700px] border-r border-r-line pt-6">
          <ThumbnailContainer type={'default'} title={'전체 웹툰 랭킹'} />
          <div className="flex gap-1 mt-10">
            <Image
              src="/assets/images/promotion-1.png"
              alt="Site promotion image"
              width={340}
              height={60}
              layout="intrinsic"
            />
            <Image
              src="/assets/images/promotion-2.png"
              alt="Site promotion image"
              width={340}
              height={60}
              layout="intrinsic"
            />
          </div>
          <LargeThumbnailContainer title={'키워드 별 추천 작품'} />
          <LargeThumbnailContainer title={'장르별 신작 작품'} />
        </div>
        <div className="flex flex-col w-[346px] pt-8 gap-1 ml-[24px]">
          <p>최근 본 작품</p>
          <div className="flex mt-3 mb-14">
            {webtoonThumbnails &&
              webtoonThumbnails.map((webtoon) => (
                <div key={webtoon.id}>
                  <RecentThumbnail webtoon={webtoon} />
                </div>
              ))}
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
      </div>
    </div>
  );
}
