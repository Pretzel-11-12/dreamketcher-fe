'use client';

import { useRouter } from 'next/navigation';
import OptionButton from '../../_component/OptionButton';
import DeleteModal from '../../_component/DeleteModal';
import { useState } from 'react';

const SeriesItem: React.FC<{}> = () => {
  const router = useRouter();

  const [isModalOpen, handleOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="grid grid-cols-[120px_repeat(6,1fr)_80px] gap-5 items-center border-b p-4 w-full text-gray-600 text-sm border-gray-400/20">
        <div className="flex flex-col gap-1 items-center">
          <div className="bg-[#DEE5EA] w-[100px] h-[150px]" />
          <span className="flex justify-center w-full">별종의 세계</span>
        </div>

        <span className="flex justify-center w-full">245</span>
        <span className="flex justify-center w-full">2024.12.26</span>
        <span className="flex justify-center w-full">2024.10.26</span>
        <span className="flex justify-center w-full">1,356</span>
        <span className="flex justify-center w-full">663</span>
        <span className="flex justify-center w-full">663</span>
        <div className="flex w-full justify-center">
          <OptionButton
            items={[
              {
                text: '회차 보기',
                onClick: () => router.push(`/creator/episode?episodeId=${245}`),
              },
              {
                text: '작품 삭제',
                onClick: () => handleOpenModal(true),
              },
              {
                text: '작품 수정',
                onClick: () =>
                  router.push(`/creator/series/new?seriesId=${245}`),
              },
            ]}
          />
        </div>
      </div>

      <DeleteModal
        text={`<재벌 서자의 회귀사건을..> 해당 작품을 삭제하시겠습니까?`}
        isOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
};

export default SeriesItem;
