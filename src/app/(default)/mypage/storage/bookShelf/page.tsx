'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import WebtoonList from '@/app/(default)/mypage/storage/bookShelf/_component/WebtoonList'; // 하위 컴포넌트 경로 확인
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getBookShelfContent } from '@/app/api/fetchFolder';

const BookShelfDetail = () => {
  const folderId = useSearchParams().get('folderId');
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

  const { data: data, isLoading, isError } = useQuery({
    queryKey: ['favoriteWebtoons', folderId],
    queryFn: () => getBookShelfContent(folderId),
  });

  const favoriteWebtoons = data?.content;
  const totalWebtoonCount = data?.total || 0;

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
          <p className="text-[#888888] font-medium mt-0.5">총 {totalWebtoonCount}권</p>
        </div>
        <WebtoonList favoriteWebtoons={favoriteWebtoons || []} />
      </div>
    </div>
  );
};

export default BookShelfDetail;
