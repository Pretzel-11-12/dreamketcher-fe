'use client';

import React from 'react';
import Modal from '@/app/_component/Modal';
import Image from 'next/image';

interface ProfileImageEditModalProps {
  isOpen: boolean;
  onUpload: () => void;
  handleOpenModal: (isOpen: boolean) => void;
}

const ProfileImageEditModal: React.FC<ProfileImageEditModalProps> = ({
isOpen,
onUpload,
handleOpenModal
}) => {
  if (!isOpen) return null;

  const closeModal = () => handleOpenModal(false);

  const onDelete = () => {}; // 삭제 로직은 미구현 상태

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="bg-white rounded-lg w-[384px] h-[196px] flex flex-col items-center shadow-lg">
        <div className="flex flex-col gap-[15px] p-[30px] w-full">
          <button className="flex items-center w-full text-left" onClick={onUpload}>
            <Image
              src={'/assets/icon/gallery-export.svg'}
              alt="gallery-export"
              width={20}
              height={20}
              className="mr-[10px]"
            />
            <p className="text-xl/7">이미지 파일 업로드</p>
          </button>

          <button className="flex items-center w-full text-left" onClick={onDelete}>
            <Image
              src={'/assets/icon/trash-orange.svg'}
              alt="trash"
              width={20}
              height={20}
              className="mr-[10px]"
            />
            <p className="text-xl/7 text-[#FF6831]">프로필 이미지 삭제</p>
          </button>
        </div>

        <button
          onClick={closeModal}
          className="bg-[#C9C9C9] text-white text-lg w-[354px] h-[50px] rounded-md"
        >
          닫기
        </button>
      </div>
    </Modal>
  );
};

export default ProfileImageEditModal;
