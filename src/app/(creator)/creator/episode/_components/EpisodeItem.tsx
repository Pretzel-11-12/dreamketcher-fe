'use client';

import { useState } from 'react';
import DeleteModal from '../../_component/DeleteModal';
import OptionButton from '../../_component/OptionButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import DefaultImage from '@/app/_component/DefaultImage';

type EpisodeItemProps = {
  item: fetchWebtoonDetail.Model.EpisodeUnit;
  webtoonInfo: { title: string; id: string };
};

const EpisodeItem: React.FC<EpisodeItemProps> = ({ item, webtoonInfo }) => {
  const searchParams = useSearchParams();
  const webtoonId = searchParams.get('webtoonId')!;

  const router = useRouter();

  const [isModalOpen, handleOpenModal] = useState<boolean>(false);
  return (
    <>
      <div className="grid grid-cols-[repeat(7,1fr)_80px] gap-5 items-center border-b p-4 w-full text-gray-600 text-sm border-gray-400/20">
        <span className="flex justify-center w-full">{item.episodeId}</span>
        <div className="rounded-md overflow-hidden">
          <DefaultImage
            src={item.thumbnail}
            width={120}
            height={100}
            alt={item.title}
          />
        </div>

        <span className="flex justify-center w-full">{item.title}</span>
        <span className="flex justify-center w-full">{item.publishedAt}</span>
        <span className="flex justify-center w-full">{item.viewCount}</span>
        <span className="flex justify-center w-full">{item.averageStar}</span>
        <span className="flex justify-center w-full">{item.likeCount}</span>

        <div className="flex w-full justify-center">
          <OptionButton
            items={[
              { text: '비공개 전환', onClick: () => {} },
              { text: '회차 삭제', onClick: () => handleOpenModal(true) },
              {
                text: '수정하기',
                onClick: () => {
                  router.push(
                    `/creator/episode/new?episodeId=${item.episodeId}&webtoonId=${webtoonInfo.id}`
                  );
                },
              },
            ]}
          />
        </div>
      </div>

      <DeleteModal
        episodeId={String(item.episodeId)}
        webtoonId={webtoonId}
        text={`<${item.episodeId}화 - ${webtoonInfo.title}> 해당 회차를 삭제하시겠습니까?`}
        isOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
};

export default EpisodeItem;
