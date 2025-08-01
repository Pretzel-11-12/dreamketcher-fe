'use client';

import Image from 'next/image';
import Button from '@/app/_component/Button';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CoverImage from '@/app/_component/CoverImage';
import Toast from '@/app/_component/Toast';
import AddToBookShelfModal from '@/app/(default)/webtoon/list/_component/AddToBookShelfModal';
import WebtoonTagList from './WebtoonTagList';

type webtoonDataProps = {
  webtoon: fetchWebtoonDetail.Model.WebtoonDetail;
};

const WebtoonInfo: React.FC<webtoonDataProps> = ({ webtoon }) => {
  const {
    webtoonId,
    webtoonTitle,
    webtoonThumbnail,
    interestCount,
    webtoonStory,
    genreName,
    authorNickname,
    tags,
  } = webtoon;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interest, setInterest] = useState<{
    active: boolean;
    count: number;
  }>({
    active: false,
    count: interestCount,
  });

  const { data: isFavorite } = useQuery<{ webtoonId: number }[]>({
    queryKey: [webtoonId],
    queryFn: () =>
      fetchWebtoonDetail.favoriteWebtoon({ param: { id: String(webtoonId) } }),
  });

  useEffect(() => {
    setInterest((i) => ({ active: !!isFavorite, count: i.count }));
  }, [isFavorite]);

  const [toastState, setToastState] = useState({
    isVisible: false,
    message: '',
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLikeToggle = async () => {
    setIsModalOpen(true);
    try {
      if (interest.active) {
        await fetchWebtoonDetail.deleteFavoriteWebtoon({
          param: { id: String(webtoonId) },
        });

        setInterest((i) => ({
          active: false,
          count: Math.max(i.count - 1, 0),
        }));
        setToastState({
          isVisible: true,
          message: '관심웹툰이 해제되었습니다.',
        });
      } else {
        await fetchWebtoonDetail.postFavoriteWebtoon({
          param: { id: String(webtoonId) },
        });
        setInterest((i) => ({
          active: true,
          count: i.count + 1,
        }));
        setToastState({
          isVisible: true,
          message:
            '관심웹툰이 추가 되었습니다.\n알림을 통해 업데이트 현황을 받아 보세요!',
        });
      }
    } catch (error) {
      console.error('요청 중 에러 발생:', error);
      setToastState({
        isVisible: true,
        message: '오류가 발생했습니다. 다시 시도해주세요.',
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-[auto_1fr] gap-[14px]">
        <CoverImage
          src={webtoonThumbnail}
          alt={webtoonTitle}
          width={200}
          height={300}
          rounded={'rounded-[10px]'}
        />
        <div className="flex flex-col gap-[10px] relative leading-[1.2]">
          <div className="text-[22px] font-medium text-titleBlack">
            {webtoonTitle}
          </div>
          <div className="flex gap-[5px] items-center text-[16px] text-[#888]">
            <div className="text-[#3f3f3f]">{authorNickname}</div>
            <div className="text-[#888] mr-[7px]">글 / 그림</div>
            <div className="mr-[7px] text-baseLine">|</div>
            <div> {genreName}</div>
          </div>
          <div className="text-sm text-[#3f3f3f]">{webtoonStory}</div>
          <WebtoonTagList tags={tags} />
          <div className="grid grid-cols-[1fr_1fr] gap-[7px] absolute w-full bottom-0">
            <Button
              props={{
                size: 'C',
                variant: interest.active ? 'transparent' : 'brand-yellow',
                containerStyles: 'border border-brand-yellow text-brand-yellow',
                handleClick: handleLikeToggle,
              }}
            >
              <div className="flex gap-[2px] items-center justify-center text-[18px]">
                <Image
                  src={
                    interest.active
                      ? '/assets/icon/inspector-filled.svg'
                      : '/assets/icon/inspector.svg'
                  }
                  alt={interest.active ? '관심 등록됨' : '관심 추가 이미지'}
                  width={30}
                  height={30}
                />
                관심 {interest.count}
              </div>
            </Button>

            <Button props={{ size: 'C', variant: 'brand-gray-light' }}>
              <Link
                href={{
                  pathname: '/webtoon/detail',
                  query: { titleId: webtoonId, no: '1' },
                }}
              >
                <div className="flex gap-2 items-center justify-center text-[18px]">
                  첫 화 보기
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Toast
        message={toastState.message}
        isVisible={toastState.isVisible}
        onClose={() => setToastState({ isVisible: false, message: '' })}
      />
      <AddToBookShelfModal
        isOpen={isModalOpen}
        onClose={closeModal}
        webtoonId={webtoonId}
        setToastState={setToastState}
      />
    </>
  );
};

export default WebtoonInfo;
