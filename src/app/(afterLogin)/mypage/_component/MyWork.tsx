'use client';

import { useState } from 'react';
import WorkItem from './WorkItem';
import { Tag } from '@/app/webtoon/list/_component/WebtoonInfo';

const works = {
  ongoing: [
    {
      id: 1,
      image: '/assets/images/webtoonthumbnail-1.jpg',
      title: '괴담 출근',
      writer: '바크베',
      genre: '판타지',
      episodes: 36,
      rating: 4.6,
      comments: 305,
      description: `Wait a minute, 이게 뭐지? (뭐지?)
      내 심장이 lub-dub, 자꾸만 뛰어 (뛰어)
      저 멀리서도, oh (oh), my (my) gosh (gosh)
      끌어당겨, you're my crush, 초능력처럼`,
      interest: 6741,
      tags: [Tag.HORROR, Tag.ROMANCE, Tag.SCARED],
    },
  ],
  completed: [],
};

const MyWork: React.FC = () => {
  const [selectedWorkType, setSelectedWorkType] = useState<
    'ongoing' | 'completed'
  >('ongoing');

  const currentWorks = works[selectedWorkType];
  const workCount = currentWorks.length;

  return (
    <div className='w-full'>
      <div className='flex justify-start mt-10 mb-6 border-b border-b-line'>
        {[
          { label: '연재 작품', type: 'ongoing' },
          { label: '완결 작품', type: 'completed' },
        ].map((tab) => (
          <button
            key={tab.type}
            className={`w-[100px] h-[48px] text-[16px] text-center border-b-2 transition duration-300 ${
              selectedWorkType === tab.type
                ? 'text-brand-yellow border-b-brand-yellow'
                : 'text-gray-500 border-b-transparent'
            }`}
            onClick={() =>
              setSelectedWorkType(tab.type as 'ongoing' | 'completed')
            }
          >
            {tab.label}({works[tab.type as 'ongoing' | 'completed'].length})
          </button>
        ))}
      </div>

      {workCount === 0 ? (
        <div className='flex flex-col items-center h-[300px]'>
          <p className='text-gray-700 font-semibold text-lg mt-6 mb-1'>
            아직 작품이 없습니다.
          </p>
          <p className='text-[#888888] text-sm mb-8'>
            새로운 작품을 시작해보세요!
          </p>
          <button className='w-[320px] h-[61px] px-6 py-2 border border-[#FBA250] text-white bg-brand-yellow rounded-md text-base'>
            새 작품 등록하기
          </button>
        </div>
      ) : (
        <div className='space-y-4'>
          {currentWorks.map((work, index) => (
            <WorkItem key={index} {...work} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWork;
