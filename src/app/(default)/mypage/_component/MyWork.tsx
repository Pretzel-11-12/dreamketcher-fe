'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import WorkItem from './WorkItem';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';
import { MyWebtoon } from '@/model/Webtoon';

const MyWork: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Query 파라미터에서 label 값 가져오기
  const selectedLabel = searchParams.get('label') ?? 'in_series';
  const isOngoing = selectedLabel === 'in_series';

  // 연재 웹툰(IN_SERIES + NEW) 가져오기
  const {
    data: ongoingData,
    isLoading: isOngoingLoading,
    isError: isOngoingError,
  } = useQuery({
    queryKey: ['creatorsWebtoon', 'ongoing'],
    queryFn: async () => {
      const [inSeriesData, newData] = await Promise.all([
        fetchCreatorWebtoon.getCreatorsWebtoons({
          query: { status: 'IN_SERIES' },
        }),
        fetchCreatorWebtoon.getCreatorsWebtoons({ query: { status: 'NEW' } }),
      ]);

      return {
        content: {
          result: [...inSeriesData.content.result, ...newData.content.result],
        },
      };
    },
  });

  // 연재 웹툰(IN_SERIES + NEW) 가져오기
  const {
    data: allData,
    isLoading: isAllLoading,
    isError: isAllError,
  } = useQuery({
    queryKey: ['creatorsWebtoon', 'all'],
    queryFn: async () => {
      const data = await fetchCreatorWebtoon.getCreatorsWebtoons({
        query: { status: '' as 'IN_SERIES' },
      });

      return {
        content: {
          result: data.content.result,
        },
      };
    },
  });

  // 완결 웹툰(FINISH) 가져오기
  const { data: completedData } = useQuery({
    queryKey: ['creatorsWebtoon', 'completed'],
    queryFn: () =>
      fetchCreatorWebtoon.getCreatorsWebtoons({ query: { status: 'FINISH' } }),
  });

  // 연재 웹툰과 완결 웹툰 개수
  const ongoingWorkCount = ongoingData?.content.result.length || 0;
  const allWorkCount = allData?.content.result.length || 0;
  const completedWorkCount = completedData?.content.result.length || 0;

  // 현재 선택된 탭의 데이터
  const works = isOngoing
    ? allData?.content.result || []
    : completedData?.content.result || [];

  // 탭 클릭 시 URL 변경
  const handleTabClick = (type: 'ongoing' | 'completed') => {
    const query = type === 'ongoing' ? 'in_series' : 'finish';
    router.push(`/mypage?label=${query}`);
  };

  return (
    <div className="w-full">
      <div className="flex justify-start mt-10 mb-6 -ml-6 -mr-[23px] pl-6 pr-[23px] border-b border-b-line">
        {[
          {
            label: '내 연재 웹툰',
            type: 'ongoing' as const,
            count: allWorkCount,
          },
          {
            label: '내 완결 웹툰',
            type: 'completed' as const,
            count: completedWorkCount,
          },
        ].map((tab) => (
          <button
            key={tab.type}
            className={`w-[135px] h-[48px] text-center border-b-2 transition duration-300 ${
              (isOngoing && tab.type === 'ongoing') ||
              (!isOngoing && tab.type === 'completed')
                ? 'text-brand-yellow border-b-brand-yellow'
                : 'text-gray-500 border-b-transparent'
            }`}
            onClick={() => handleTabClick(tab.type)}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {works.length === 0 ? (
        isOngoing ? (
          <div className="flex flex-col items-center h-[300px]">
            <p className="text-gray-700 font-semibold text-lg mt-[70px] mb-1">
              아직 작품이 없습니다.
            </p>
            <p className="text-[#888888] text-sm mb-[35px]">
              새로운 웹툰을 시작해보세요!
            </p>
            <Link
              className="w-[320px] h-[61px] flex items-center justify-center px-6 py-2 border border-[#FBA250] text-white bg-brand-yellow rounded-md text-lg"
              href={'/creator/series/new'}
            >
              새 웹툰 등록하기
            </Link>
          </div>
        ) : (
          <div className="flex justify-center">
            <p className="text-[#C9C9C9] text-lg mt-[100px] mb-1">
              아직 완결 작품이 없습니다.
            </p>
          </div>
        )
      ) : (
        <div className="space-y-4">
          {works.map((work: MyWebtoon) => (
            <WorkItem key={work.id} {...work} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWork;
