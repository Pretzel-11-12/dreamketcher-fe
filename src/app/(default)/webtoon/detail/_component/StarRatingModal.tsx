'use client';
import React, { useState } from 'react';
import Button from '@/app/_component/Button';
import Modal from '@/app/_component/Modal';
import { fetchWebtoonDetail } from '@/app/api/fetchWebtoonDetail';

interface StarRatingModalProps {
  webtoonId: string;
  episodeId: string;
  isOpen: boolean;
  handleOpenModal: (isOpen: boolean) => void;
}

const StarRatingModal: React.FC<StarRatingModalProps> = ({
  webtoonId,
  episodeId,
  isOpen,
  handleOpenModal,
}) => {
  const [rating, setRating] = useState<number>(5);
  const closeModal = () => handleOpenModal(false);

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="bg-white rounded-lg pt-[30px] pb-[15px] px-[15px] flex gap-[5px] flex-col w-[384px] h-[284px] items-center">
        <span className="font-semibold h-9 text-[30px] text-brand-yellow">
          {rating}
        </span>
        <div className="flex justify-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              className={`text-4xl ${
                star <= rating ? 'text-brand-yellow' : 'text-brand-gray'
              } hover:text-brand-yellow`}
            >
              ★
            </button>
          ))}
        </div>

        <span className="text-sm h-[17px] text-[#888888] mb-[25px]">별을 클릭하세요</span>

        <Button
          props={{
            size: 'L',
            variant: 'brand-yellow',
            containerStyles: 'w-[354px] h-[50px] !p-0 mb-[3px]',
            handleClick: async () => {
              const response = await fetchWebtoonDetail.putStars({
                webtoonId,
                episodeId,
                star: rating,
              });

              alert('별점주기 성공');
              closeModal();
            },
          }}
        >
          확인
        </Button>

        <Button
          props={{
            size: 'L',
            variant: 'brand-gray',
            containerStyles: 'w-[354px] h-[50px] !p-0',
            handleClick: closeModal,
          }}
        >
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default StarRatingModal;
