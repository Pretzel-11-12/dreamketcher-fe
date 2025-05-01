import React, { useState } from 'react';
import Modal from '@/app/_component/Modal';
import Input from '@/app/_component/Input';
import Image from 'next/image';

const BookShelfAddModal: React.FC<{ isOpen: boolean; onClose: () => void; onAddShelf: (shelfTitle: string, isPrivate: boolean) => void }> = ({ isOpen, onClose, onAddShelf }) => {
  const [title, setTitle] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const maxLength = 10;

  const handleTitleChange = (value: string) => {
    if (value.length <= maxLength) {
      setTitle(value);
    }
  };

  const handleSubmit = () => {
    onAddShelf(title, isPrivate);
    onClose();
  };

  const handleToggle = () => {
    setIsPrivate(!isPrivate);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[384px] h-[314px] px-[15px] py-[30px] bg-white rounded-lg shadow-lg">
        <p className="text-xl text-center font-medium mb-4">책장 만들기</p>
        <Input
          text={title}
          placeholder="기본책장"
          maxLength={10}
          currentTextLength={title.length}
          onChange={handleTitleChange}
          height="44px"
        />
        <div className="flex items-center h-[37px] mt-4 mb-4">
          <Image
            src={isPrivate ? "/assets/icon/tick-circle-checked.svg" : "/assets/icon/tick-circle.svg"}
            alt={"체크 아이콘"}
            width={24}
            height={24}
            className={'cursor-pointer'}
            onClick={handleToggle}
          />
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={handleToggle}
            className="hidden"
          />
          <div className="ml-[6.5px]">
            <p className="text-titleBlack text-[15px]/[20px] font-medium">비밀 책장으로 만들기</p>
            <p className="text-[#888888] text-sm/[17px]">본인 외에 다른 유저는 해당 책장을 볼 수 없습니다.</p>
          </div>
        </div>
        <div className="flex flex-col mt-[20px] gap-2 text-lg font-medium">
          <button
            className="bg-brand-yellow text-white w-[354px] h-[50px] rounded"
            onClick={handleSubmit}
          >
            완료
          </button>
          <button
            className="bg-[#F2F2F2] text-[#545454] w-[354px] h-[50px] rounded"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BookShelfAddModal;
