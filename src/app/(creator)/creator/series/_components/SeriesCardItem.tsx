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
import {
  FavoriteModal,
  ViewModal,
  CommentModal,
} from '@/app/modal/_component/detail-modal';

const SeriesCardItem: React.FC<fetchCreatorWebtoon.Model.CreatorWebtoonUnit> = (
  item
) => {
  const router = useRouter();
  const [isModalOpen, handleOpenModal] = useState<boolean>(false);
  const startedAt = moment(item.startedAt).format('YYYY.MM.DD');
  const genre = GenreEnum[item.genre as keyof typeof GenreEnum];
  const [isFavoriteModalOpen, handleFavoriteModalOpen] =
    useState<boolean>(false);
  const [isViewModalOpen, handleViewModalOpen] = useState<boolean>(false);
  const [isCommentModalOpen, handleCommentModalOpen] = useState<boolean>(false);
  const [isThumbnailModalOpen, handleThumbnailModalOpen] =
    useState<boolean>(false);
  return (
    <>
      <div className="grid grid-cols-[auto_1fr] p-[20px] bg-white w-[480px] h-[242px] rounded-[10px] border-brand-gray border gap-[15px]">
        <div>
          <div
            className="relative"
            onMouseEnter={() => handleThumbnailModalOpen(true)}
            onMouseLeave={() => handleThumbnailModalOpen(false)}
          >
            <DefaultImage
              src={item.thumbnail}
              height={202}
              width={135}
              alt={item.title}
            />
            {isThumbnailModalOpen && (
              <div className="absolute bottom-[8.5px] w-full px-[9px]">
                <div
                  className="flex justify-center gap-[5px] px-[10px] py-[7px] bg-[#282828]/50 border-1 border-[#ffffff]/80 rounded-[5px] text-[#ffffff]/80 mx-auto cursor-pointer"
                  onClick={() => router.push(`/webtoon/list?id=${item.id}`)}
                >
                  <span className="text-[14px] font-normal">웹툰에서 보기</span>
                  <Image
                    src="/assets/icon/send.svg"
                    alt="send"
                    width={15}
                    height={15}
                  />
                </div>
              </div>
            )}
          </div>
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
            <div className="relative text-[16px] text-[#888]">
              <div
                className="flex items-center gap-1 w-fit"
                onMouseEnter={() => handleFavoriteModalOpen(true)}
                onMouseLeave={() => handleFavoriteModalOpen(false)}
              >
                <Image
                  src="/assets/icon/user.png"
                  alt="user"
                  width={17}
                  height={17}
                />
                <span>{item.likeCount}</span>
                {isFavoriteModalOpen && <FavoriteModal />}
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative w-full text-[16px] text-[#888]">
                <div
                  className="flex items-center gap-1 w-fit"
                  onMouseEnter={() => handleViewModalOpen(true)}
                  onMouseLeave={() => handleViewModalOpen(false)}
                >
                  <Image
                    src="/assets/icon/eye.png"
                    alt="eye"
                    width={17}
                    height={17}
                  />
                  <span>{item.numOfStars}</span>
                  {isViewModalOpen && <ViewModal />}
                </div>
              </div>

              <div className="relative w-full text-[16px] text-[#888]">
                <div
                  className="flex items-center gap-1 w-fit"
                  onMouseEnter={() => handleCommentModalOpen(true)}
                  onMouseLeave={() => handleCommentModalOpen(false)}
                >
                  <Image
                    src="/assets/icon/message.png"
                    alt="message"
                    width={17}
                    height={17}
                  />
                  <span>{item.commentCount}</span>
                  {isCommentModalOpen && <CommentModal />}
                </div>
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
