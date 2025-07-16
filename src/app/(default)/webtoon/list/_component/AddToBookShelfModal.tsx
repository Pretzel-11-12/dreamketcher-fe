import React, { useEffect, useState } from 'react';
import Modal from '@/app/_component/Modal';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getBookShelfFolder,
  postWebtoonToBookShelf,
} from '@/app/api/fetchFolder';
import BookShelfAddModal from '@/app/(default)/mypage/_component/BookShelf/BookShelfAddModal';

const AddToBookShelfModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  webtoonId: number;
  setToastState: (state: { isVisible: boolean; message: string }) => void;
}> = ({ isOpen, onClose, webtoonId, setToastState }) => {
  const [selectedBookShelf, setSelectedBookShelf] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: folderData } = useQuery({
    queryKey: ['bookShelves'],
    queryFn: getBookShelfFolder,
  });

  const { mutate } = useMutation({
    mutationFn: (folderId: string) =>
      postWebtoonToBookShelf(folderId, webtoonId),
    onSuccess: () => {
      setToastState({
        isVisible: true,
        message: '웹툰이 책장에 추가되었습니다.',
      });
      onClose();
    },
    onError: (error) => {
      console.error(error);
      alert('웹툰 추가에 실패했습니다.');
    },
  });

  const handleAddBookShelf = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedBookShelf(null);
    }
  }, [isOpen]);

  const handleFolderSelect = (folderId: string) => {
    setSelectedBookShelf(selectedBookShelf === folderId ? null : folderId);
  };

  const handleSubmit = () => {
    if (selectedBookShelf) {
      mutate(selectedBookShelf);
      onClose();
    } else {
      alert('책장을 선택해주세요.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[384px] h-fit px-[15px] pt-[30px] pb-[15px] bg-white rounded-lg shadow-lg">
        <div className="w-[354px] text-center">
          <p className="text-[22px]/[28px] font-medium mb-[5px]">
            내 서재에 담기
          </p>
          <p className="text-lg/[28px] text-[#888888] mb-5">
            책장을 선택하여 작품을 담아보세요
          </p>

          <button
            className="flex w-full h-[55px] border border-[#C9C9C9] rounded-[5px] items-center justify-center text-lg text-titleBlack"
            onClick={handleAddBookShelf}
          >
            <Image
              src={'/assets/icon/add.svg'}
              alt={'추가 아이콘'}
              width={20}
              height={20}
            />
            책장 만들기
          </button>
        </div>

        {/* 책장 목록 */}
        <div className="mt-[29px]">
          <ul>
            {folderData?.folders.map((folder) => (
              <li
                key={folder.folderId}
                className="relative text-sm text-[#333333] mb-4"
              >
                <div className="w-full text-left flex items-center">
                  <Image
                    src={'/assets/icon/book.svg'}
                    alt="book icon"
                    width={19}
                    height={19}
                    className="mr-[5px]"
                  />
                  <p
                    className="text-[17px] text-contentBlack cursor-pointer"
                    onClick={() => handleFolderSelect(folder.folderId)}
                  >
                    {folder.folderName}
                  </p>
                  <Image
                    src={
                      selectedBookShelf === folder.folderId
                        ? '/assets/icon/toggle-on.svg'
                        : '/assets/icon/toggle-off.svg'
                    }
                    alt="toggle icon"
                    width={16}
                    height={16}
                    className="absolute right-0 cursor-pointer"
                    onClick={() => handleFolderSelect(folder.folderId)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col mt-9 text-lg font-medium">
          {selectedBookShelf ? (
            <button
              className="bg-brand-yellow text-white w-[354px] h-[50px] rounded"
              onClick={handleSubmit}
            >
              담기
            </button>
          ) : (
            <button
              className="bg-[#F2F2F2] text-[#545454] w-[354px] h-[50px] rounded"
              onClick={onClose}
            >
              취소
            </button>
          )}
        </div>
      </div>
      <BookShelfAddModal isOpen={isModalOpen} onClose={closeModal} />
    </Modal>
  );
};

export default AddToBookShelfModal;
