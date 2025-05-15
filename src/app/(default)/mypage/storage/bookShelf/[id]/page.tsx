'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import WebtoonList from '@/app/(default)/mypage/storage/bookShelf/[id]/_component/WebtoonList'; // 하위 컴포넌트 경로 확인
import { FavoriteWebtoon } from '@/model/Webtoon'; // FavoriteWebtoon 인터페이스
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const BookShelfDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabFromQuery = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState(tabFromQuery || 'favorite');

  const tabs = [
    { label: '최근 본 웹툰', key: 'recent' },
    { label: '관심웹툰', key: 'favorite' },
    { label: '댓글', key: 'comments' },
  ];

  const handleTabClick = (tabKey: string) => {
    setSelectedTab(tabKey);
    router.push(`/mypage/storage?tab=${tabKey}`);
  };

  const handleArrowClick = () => {
    router.push(`/mypage/storage?tab=favorite`);
  };

  // 쿼리스트링 변경 시 탭 상태 갱신
  useEffect(() => {
    if (tabFromQuery && tabFromQuery !== selectedTab) {
      setSelectedTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  const favoriteWebtoons: FavoriteWebtoon[] = [
    {
      interestedWebtoonId: 1,
      webtoonId: 101,
      title: "그림자 사냥꾼",
      thumbnail: "/assets/images/thumbnail-4.jpg",
      authorNickname: "작가1",
      updatedAt: "2023-07-01",
      episodeCount: 30,
      story: "어두운 그림자 속에서 사라진 이들을 찾기 위한 사냥꾼의 이야기",
      genre: "액션"
    },
    {
      interestedWebtoonId: 2,
      webtoonId: 102,
      title: "별빛의 전사",
      thumbnail: "/assets/images/thumbnail-3.jpg",
      authorNickname: "작가2",
      updatedAt: "2023-06-15",
      episodeCount: 25,
      story: "별빛을 따라 세계를 구하는 전사들의 전투 이야기",
      genre: "모험"
    },
    {
      interestedWebtoonId: 3,
      webtoonId: 103,
      title: "지구의 끝에서",
      thumbnail: "/assets/images/thumbnail-4.jpg",
      authorNickname: "작가3",
      updatedAt: "2023-05-20",
      episodeCount: 15,
      story: "지구의 멸망을 막기 위한 여정, 그 끝에서 마주친 진실",
      genre: "SF"
    },
    {
      interestedWebtoonId: 4,
      webtoonId: 104,
      title: "심연의 바다",
      thumbnail: "/assets/images/thumbnail-3.jpg",
      authorNickname: "작가4",
      updatedAt: "2023-06-10",
      episodeCount: 10,
      story: "깊은 바다 속에서 벌어지는 신비로운 사건들과 그것을 추적하는 이야기",
      genre: "미스터리"
    },
    {
      interestedWebtoonId: 5,
      webtoonId: 105,
      title: "날개를 달다",
      thumbnail: "/assets/images/thumbnail-2.jpg",
      authorNickname: "작가5",
      updatedAt: "2023-06-10",
      episodeCount: 22,
      story: "날개를 가진 소녀가 펼치는 자유와 모험의 이야기",
      genre: "로맨스"
    }
  ];

  return (
    <div className="mt-[70px] h-full min-h-screen">
      <h1 className="text-xl font-semibold pt-[21px] mb-4">보관함</h1>
      <div className="flex -ml-6 -mr-[23px] pl-6 pr-[23px] border-b border-b-line">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`w-[100px] h-[48px] ${
              selectedTab === tab.key
                ? 'text-brand-yellow border-b-brand-yellow text-[15px] border-b-2'
                : 'text-[#888888] text-[15px]'
            }`}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        <div className="flex mt-5 mb-2.5">
          <Image
            src="/assets/icon/arrow-down.svg"
            alt="leftArrow icon"
            width={20}
            height={20}
            className="cursor-pointer mr-[3px]"
            onClick={handleArrowClick}
          />
          <p className="text-lg text-titleBlack font-medium mr-[5px]">책장명</p>
          <p className="text-[#888888] font-medium mt-0.5">총 {favoriteWebtoons.length}권</p>
        </div>
        <WebtoonList favoriteWebtoons={favoriteWebtoons} />
      </div>
    </div>
  );
};

export default BookShelfDetail;
