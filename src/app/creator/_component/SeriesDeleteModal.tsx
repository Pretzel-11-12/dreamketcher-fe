'use client';
import Button from '@/app/_component/Button';
import Modal from '@/app/_component/Modal';
import { useState } from 'react';

interface SeriesDeleteModalProps {
  isOpen: boolean;
  handleOpenModal: (isOpen: boolean) => void;
}

const SeriesDeleteModal: React.FC<SeriesDeleteModalProps> = ({
  isOpen,
  handleOpenModal,
}) => {
  const closeModal = () => handleOpenModal(false);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="bg-white rounded-lg p-5 flex gap-2 flex-col w-[384px]">
        <div className="flex flex-col gap-2 p-5">
          <span className="text-lg font-semibold">{`<재벌 서자의 회귀사건을..> 해당 작품을 삭제하시겠습니까?`}</span>
          <span className="text-xs text-gray-600">
            삭제 시 최대 30일 동안 휴지통에 보관된 후 영구 삭제됩니다.
          </span>
        </div>
        <Button
          props={{
            size: 'L',
            variant: 'brand-yellow',
            handleClick: closeModal,
          }}
        >
          작품 삭제
        </Button>
        <Button
          props={{ size: 'L', variant: 'brand-gray', handleClick: closeModal }}
        >
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default SeriesDeleteModal;
