'use client';

import React, { useState } from 'react';
import RecentWorks from '../_component/RecentWorks';
import FavoriteWebtoons from '../_component/FavoriteWebtoons';
import Comments from '../_component/Comments';

export default function StoragePage() {
  const [selectedTab, setSelectedTab] = useState('recent');

  const tabs = [
    { label: '최근 본 웹툰', key: 'recent' },
    { label: '관심웹툰', key: 'favorite' },
    { label: '댓글', key: 'comments' },
  ];

  return (
    <div className="mt-[70px]">
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
            onClick={() => setSelectedTab(tab.key)}
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
