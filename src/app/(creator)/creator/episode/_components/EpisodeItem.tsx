'use client';

import { useState } from 'react';
import DeleteModal from '../../_component/DeleteModal';
import OptionButton from '../../_component/OptionButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import DefaultImage from '@/app/_component/DefaultImage';

type EpisodeItemProps = {
  index: number;
  item: fetchWebtoonDetail.Model.EpisodeUnit;
  webtoonInfo: { title: string; id: string };
};

const EpisodeItem: React.FC<EpisodeItemProps> = ({
  index,
  item,
  webtoonInfo,
}) => {
  const searchParams = useSearchParams();
  const webtoonId = searchParams.get('webtoonId')!;

  const router = useRouter();

  const [isModalOpen, handleOpenModal] = useState<boolean>(false);
  return (
    <>
      <div className="grid grid-cols-[auto_repeat(4,1fr)_80px] gap-5 items-center border-b p-4 w-full text-gray-600 text-sm border-gray-400/20">
        <div
          className="cursor-pointer grid grid-cols-[90px_140px_180px] items-center gap-2"
          onClick={() => {
            router.push(
              `/creator/episode/new?episodeId=${item.episodeId}&no=${webtoonInfo.id}`
            );
          }}
        >
          <span className="flex justify-center">{index}</span>
          <div className="rounded-md overflow-hidden">
            <DefaultImage
              src={item.thumbnail}
              width={120}
              height={100}
              alt={item.title}
            />
          </div>

          <span className="flex justify-center w-full">{item.title}</span>
        </div>
        <span className="flex justify-center w-full">{item.publishedAt}</span>
        <span className="flex justify-center w-full">{item.viewCount}</span>
        <span className="flex justify-center w-full">{item.averageStar}</span>
        <span className="flex justify-center w-full">{item.likeCount}</span>

        <div className="flex w-full justify-center">
          <OptionButton
            items={[
              { text: '회차 삭제', onClick: () => handleOpenModal(true) },
              {
                text: '회차 수정',
                onClick: () => {
                  router.push(
                    `/creator/episode/new?episodeId=${item.episodeId}&no=${webtoonInfo.id}`
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
        text={`해당 회차를 삭제하시겠습니까?`}
        isOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
};

export default EpisodeItem;
