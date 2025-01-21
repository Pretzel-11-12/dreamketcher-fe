'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import WorkItem from './WorkItem';
import { Tag } from '../../webtoon/list/_component/WebtoonInfo';
import Link from 'next/link';

// works 객체의 타입 정의
interface Work {
  id: number;
  image: string;
  title: string;
  writer: string;
  genre: string;
  episodes: number;
  rating: number;
  comments: number;
  description: string;
  interest: number;
  tags: Tag[];
}

const works: Record<'ongoing' | 'completed', Work[]> = {
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
  const router = useRouter();
  const searchParams = useSearchParams();

  // Query 파라미터에서 label 값 가져오기
  const selectedLabel = searchParams.get('label') ?? 'in_series';
  const selectedWorkType: 'ongoing' | 'completed' =
    selectedLabel === 'finish' ? 'completed' : 'ongoing';

  // 현재 선택된 작업 목록
  const currentWorks = works[selectedWorkType];
  const workCount = currentWorks.length;

  // 탭 클릭 시 URL 변경
  const handleTabClick = (type: 'ongoing' | 'completed') => {
    const query = type === 'ongoing' ? 'in_series' : 'finish';
    router.push(`/mypage?label=${query}`);
  };

  return (
    <div className="w-full">
      <div className="flex justify-start mt-10 mb-6 border-b border-b-line">
        {[
          { label: '내 연재 웹툰', type: 'ongoing' as const },
          { label: '내 완결 웹툰', type: 'completed' as const },
        ].map((tab) => (
          <button
            key={tab.type}
            className={`w-[130px] h-[48px] text-center border-b-2 transition duration-300 ${
              selectedWorkType === tab.type
                ? 'text-brand-yellow border-b-brand-yellow'
                : 'text-gray-500 border-b-transparent'
            }`}
            onClick={() => handleTabClick(tab.type)}
          >
            {tab.label}({works[tab.type].length})
          </button>
        ))}
      </div>

      {workCount === 0 ? (
        <div className="flex flex-col items-center h-[300px]">
          <p className="text-gray-700 font-semibold text-lg mt-6 mb-1">
            아직 웹툰이 없습니다.
          </p>
          <p className="text-[#888888] text-sm mb-8">
            새로운 웹툰을 시작해보세요!
          </p>
          <Link href={'/creator/series/new'}>
            <button className="w-[320px] h-[61px] px-6 py-2 border border-[#FBA250] text-white bg-brand-yellow rounded-md text-base">
              새 웹툰 등록하기
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentWorks.map((work, index) => (
            <WorkItem key={index} {...work} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWork;
