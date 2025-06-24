import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Folder } from '@/app/api/fetchFolder/model';
import OptionButton from '@/app/(creator)/creator/_component/OptionButton';
import BookShelfDeleteModal from '@/app/(default)/mypage/_component/BookShelf/BookShelfDeleteModal';

const BookShelfItem: React.FC<{ shelf: Folder }> = ({ shelf }) => {
  const { folderName, isPrivate, items, folderId } = shelf;
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const menuRef = useRef<HTMLDivElement>(null);

  function navigateToDetail() {
    router.push(`/mypage/storage/bookShelf?folderId=${folderId}`);
  }

  return (
    <div
      className="flex flex-col items-start relative w-[210px] h-[220px] mb-4 rounded-lg">
      <div
        className="flex w-[210px] h-[165px] rounded cursor-pointer"
        onClick={navigateToDetail}>
        <div className="w-[110px] h-[165px] relative overflow-hidden">
          {items?.length > 0 && items[0]?.thumbnail ? (
            <img
              src={items[0].thumbnail}
              alt=""
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full bg-[#F9F9F9]" />
          )}
        </div>
        <div className="flex flex-col w-[100px] h-[165px] gap-[2px] pl-[2px]">
          {items?.length > 1 && items[1]?.thumbnail ? (
            <div className="w-[100px] h-[81px] overflow-hidden">
              <img
                src={items[1].thumbnail}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-[#F9F9F9]" />
            )}
          {items?.length > 2 && items[2]?.thumbnail ? (
            <div className="w-[100px] h-[81px] overflow-hidden">
              <img
                src={items[2].thumbnail}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-[#F9F9F9]" />
          )}
        </div>
      </div>
      <div className="flex mt-2.5">
        <div className="flex flex-col w-[185px] h-[45px]">
          <div className="flex">
            <p className="text-lg font-medium text-titleBlack">{folderName}</p>
            {isPrivate && (
              <Image
                src={'/assets/icon/lock.svg'}
                alt="lock Icon"
                width={18}
                height={18}
                className="ml-[1px]"
              />
            )}
          </div>
          <p className="text-[#888888]">총 {items?.length}권</p>
        </div>
      </div>
      <div
        className="absolute right-0 bottom-[15px]"
        ref={menuRef}>
        <OptionButton
          items={[
            {
              text: '책장 삭제',
              onClick: () => setIsModalOpen(true),
            },
            {
              text: '책장 비공개',
              onClick: () => {},
            },
          ]}
        />
      </div>
      <BookShelfDeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        folderId={folderId}/>
    </div>
  );
};

export default BookShelfItem;
