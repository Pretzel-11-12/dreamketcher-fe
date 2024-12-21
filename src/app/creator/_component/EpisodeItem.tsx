'use client';

import OptionButton from './OptionButton';
import { useRouter } from 'next/navigation';

const EpisodeItem: React.FC<{}> = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-[repeat(8,1fr)_80px] gap-5 items-center border-b p-4 w-full text-gray-600 text-sm border-gray-400/20">
      <span className="flex justify-center w-full">1</span>
      <div className="flex flex-col gap-1 items-center">
        <div className="bg-[#DEE5EA] w-[120px] h-[100px]" />
      </div>

      <span className="flex justify-center w-full">별종의 세계</span>
      <span className="flex justify-center w-full">전체</span>
      <span className="flex justify-center w-full">2024.12.26</span>
      <span className="flex justify-center w-full">1,356</span>
      <span className="flex justify-center w-full">663</span>
      <span className="flex justify-center w-full">663</span>

      <div className="flex w-full justify-center">
        <OptionButton
          items={[
            { text: '비공개 전환', onClick: () => {} },
            { text: '회차 삭제', onClick: () => {} },
            {
              text: '수정하기',
              onClick: () => {
                router.push(`/creator/episode/new?episodeId=${245}`);
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default EpisodeItem;
