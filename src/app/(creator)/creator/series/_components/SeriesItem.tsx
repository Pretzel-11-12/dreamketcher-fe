'use client';

import { useRouter } from 'next/navigation';
import OptionButton from '../../_component/OptionButton';
import DeleteModal from '../../_component/DeleteModal';
import { useState } from 'react';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';
import DefaultImage from '@/app/_component/DefaultImage';

const SeriesItem: React.FC<fetchCreatorWebtoon.Model.CreatorWebtoonUnit> = (
  item
) => {
  const router = useRouter();

  const [isModalOpen, handleOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="grid grid-cols-[120px_repeat(6,1fr)_80px] gap-5 items-center border-b p-4 w-full text-gray-600 text-sm border-gray-400/20">
        <div className="flex flex-col gap-1 items-center">
          <DefaultImage
            src={item.thumbnail}
            height={150}
            width={100}
            alt={`${item.id}`}
          />
          <span className="flex justify-center w-full">{item.title}</span>
        </div>

        <span className="flex justify-center w-full">회차수</span>
        <span className="flex justify-center w-full">{item.updatedAt}</span>
        <span className="flex justify-center w-full">{item.startedAt}</span>
        <span className="flex justify-center w-full">{item.viewCount}</span>
        <span className="flex justify-center w-full">{item.commentCount}</span>
        <span className="flex justify-center w-full">
          {item.interestedCount}
        </span>
        <div className="flex w-full justify-center">
          <OptionButton
            items={[
              {
                text: '회차 보기',
                onClick: () =>
                  router.push(`/creator/episode?episodeId=${item.id}`),
              },
              {
                text: '작품 삭제',
                onClick: () => handleOpenModal(true),
              },
              {
                text: '작품 수정',
                onClick: () =>
                  router.push(`/creator/series/new?seriesId=${item.id}`),
              },
            ]}
          />
        </div>
      </div>

      <DeleteModal
        webtoonId={String(item.id)}
        text={`<재벌 서자의 회귀사건을..> 해당 작품을 삭제하시겠습니까?`}
        isOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
};

export default SeriesItem;
