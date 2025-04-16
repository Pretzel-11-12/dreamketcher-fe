'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OngoingWork from './OngoingWork';
import CompletedWork from './CompletedWork';
import FavoriteWebtoons from './FavoriteWebtoons';
import { useQuery } from '@tanstack/react-query';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';
import { UserWebtoon } from '@/model/Webtoon';

interface ProfileWorksProps {
  userId: number;
}

const ProfileWork = ({ userId }: ProfileWorksProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromQuery = searchParams.get('tab') || 'ongoing';
  const [selectedTab, setSelectedTab] = useState(tabFromQuery);

  useEffect(() => {
    if (tabFromQuery !== selectedTab) {
      setSelectedTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  const handleTabClick = (key: string) => {
    setSelectedTab(key);
    router.push(`/userpage/${userId}?tab=${key}`);
  };

  // 연재작 (NEW)
  const { data: ongoingWorks = [] } = useQuery({
    queryKey: ['creatorsWebtoon', userId, 'new'],
    queryFn: async () => {
      const res = await fetchCreatorWebtoon.getCreatorsWebtoons({
        query: { status: 'NEW' },
      });
      return res.content.result as UserWebtoon[];
    },
  });

  // 완결작 (FINISH)
  const { data: completedWorks = [] } = useQuery({
    queryKey: ['creatorsWebtoon', 'new'],
    queryFn: async () => {
      const res = await fetchCreatorWebtoon.getCreatorsWebtoons({
        query: { status: 'NEW' },
      });
      return res.content.result as UserWebtoon[];
    },
  });

  // 관심웹툰
  const { data: favoriteWorks = [] } = useQuery({
    queryKey: ['creatorsWebtoon','new'],
    queryFn: async () => {
      const res = await fetchCreatorWebtoon.getCreatorsWebtoons({
        query: { status: 'NEW' },
      });
      return res.content.result as UserWebtoon[];
    },
  });

  const tabs = [
    { label: `연재 작품 (${ongoingWorks.length})`, key: 'ongoing' },
    { label: `완결 작품 (${completedWorks.length})`, key: 'completed' },
    { label: `관심웹툰 서재 (${favoriteWorks.length})`, key: 'favorite' },
  ];

  return (
    <div className="mt-[20px] min-h-screen">
      <div className="flex border-b border-b-line -ml-6 -mr-[23px] pl-6 pr-[23px]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`w-[135px] h-[48px] ${
              selectedTab === tab.key
                ? 'text-brand-yellow border-b-brand-yellow text-[15px] font-medium border-b-2'
                : 'text-[#888888] text-[15px]'
            }`}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {selectedTab === 'ongoing' && <OngoingWork works={ongoingWorks} />}
        {selectedTab === 'completed' && <CompletedWork works={completedWorks} />}
        {selectedTab === 'favorite' && <FavoriteWebtoons works={favoriteWorks} />}
      </div>
    </div>
  );
};

export default ProfileWork;
