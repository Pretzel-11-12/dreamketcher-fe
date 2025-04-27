'use client';

import React, { useEffect, useState } from 'react';
import RecentWorks from '../_component/RecentWorks';
import FavoriteWebtoons from '../_component/FavoriteWebtoons';
import Comments from '../_component/Comments';
import { useRouter, useSearchParams } from 'next/navigation';

export default function StoragePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabFromQuery = searchParams.get('tab');
  const [selectedTab, setSelectedTab] = useState(tabFromQuery || 'recent');

  const tabs = [
    { label: '최근 본 웹툰', key: 'recent' },
    { label: '관심웹툰', key: 'favorite' },
    { label: '댓글', key: 'comments' },
  ];

  const handleTabClick = (tabKey: string) => {
    setSelectedTab(tabKey);
    router.push(`/mypage/storage?tab=${tabKey}`);
  };

  // 쿼리스트링 변경 시 탭 상태 갱신
  useEffect(() => {
    if (tabFromQuery && tabFromQuery !== selectedTab) {
      setSelectedTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  return (
    <div className="mt-[70px] min-h-screen">
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
        {selectedTab === 'recent' && <RecentWorks />}
        {selectedTab === 'favorite' && <FavoriteWebtoons />}
        {selectedTab === 'comments' && <Comments />}
      </div>
    </div>
  );
}
