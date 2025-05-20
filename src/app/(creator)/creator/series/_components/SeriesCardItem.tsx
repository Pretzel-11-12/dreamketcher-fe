'use client';

import { useRouter } from 'next/navigation';
import OptionButton from '../../_component/OptionButton';
import DeleteModal from '../../_component/DeleteModal';
import { useState } from 'react';
import { fetchCreatorWebtoon } from '@/app/api/fetchCreator';
import DefaultImage from '@/app/_component/DefaultImage';
import moment from 'moment';
import { GenreEnum } from '@/app/util/index';
import Image from 'next/image';
import CardButton from './CardButton';

const SeriesCardItem: React.FC<fetchCreatorWebtoon.Model.CreatorWebtoonUnit> = (
  item
) => {
  const router = useRouter();
  const [isModalOpen, handleOpenModal] = useState<boolean>(false);
  const startedAt = moment(item.startedAt).format('YYYY.MM.DD');
  const genre = GenreEnum[item.genre as keyof typeof GenreEnum];
  return (
    <>
      <div className="grid grid-cols-[auto_1fr] p-[20px] bg-white w-[480px] h-[242px] rounded-[10px] border-brand-gray border gap-[15px]">
        <div
          onClick={() => router.push(`/webtoon/list?id=${item.id}`)}
          className="cursor-pointer"
        >
          <DefaultImage
            src={item.thumbnail}
            height={202}
            width={135}
            alt={item.title}
          />
        </div>

        <div className="flex flex-col w-full h-full justify-between">
          <div className="flex flex-col">
            <div className="flex w-full justify-between items-center">
              <span className="flex w-full text-[18px] font-[500] text-titleBlack">
                {item.title}
              </span>

              <OptionButton
                items={[
                  {
                    text: '작품 삭제',
                    onClick: () => handleOpenModal(true),
                  },
                ]}
              />
            </div>

            <div className="flex w-full items-center text-[16px] text-[#888] gap-2">
              <span>{genre}</span>
              <div className="h-[10px] bg-brand-gray w-[1px]" />
              <span>{startedAt || '-'} ~</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex w-full items-center text-[16px] text-[#888] gap-1">
              <Image
                src="/assets/icon/user.png"
                alt="user"
                width={17}
                height={17}
              />
              <span>{item.likeCount}</span>
            </div>

            <div className="flex w-full items-center">
              <div className="flex w-full items-center text-[16px] text-[#888] gap-1">
                <Image
                  src="/assets/icon/eye.png"
                  alt="eye"
                  width={17}
                  height={17}
                />
                <span>{item.numOfStars}</span>
              </div>

              <div className="flex w-full items-center text-[16px] text-[#888] gap-1">
                <Image
                  src="/assets/icon/message.png"
                  alt="message"
                  width={17}
                  height={17}
                />
                <span>{item.commentCount}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center gap-1">
            <CardButton
              text="작품 수정"
              onClick={() =>
                router.push(`/creator/series/new?webtoonId=${item.id}`)
              }
            />

            <CardButton
              text="회차 관리"
              onClick={() =>
                router.push(`/creator/episode?webtoonId=${item.id}`)
              }
            />
          </div>
        </div>
      </div>

      <DeleteModal
        webtoonId={String(item.id)}
        text={`<${item.title}> 해당 작품을 삭제하시겠습니까?`}
        isOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
};

export default SeriesCardItem;
