import React, { useEffect, useState } from 'react';
import Modal from '@/app/_component/Modal';
import Input from '@/app/_component/Input';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBookShelfFolder } from '@/app/api/fetchFolder';

const BookShelfAddModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [folderName, setFolderName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const maxLength = 10;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (folderName: string) => postBookShelfFolder(folderName),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookShelves'],
      });
      onClose();
    },
    onError: (error) => {
      console.error(error);
      alert('책장 추가에 실패했습니다.');
    },
  });

  useEffect(() => {
    if (isOpen) {
      setFolderName('');
      setIsPrivate(false);
    }
  }, [isOpen]); // isOpen 값이 변경될 때마다 초기화

  const handleFolderNameChange = (value: string) => {
    if (value.length <= maxLength) {
      setFolderName(value);
    }
  };

  const handleSubmit = () => {
    const isSubmitDisabled = folderName.trim() === '';
    if (isSubmitDisabled) {
      alert('제목을 입력해주세요.');
      return;
    }

    mutate(folderName);
    onClose();
  };

  const handleToggle = () => {
    setIsPrivate(!isPrivate);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[384px] h-[314px] px-[15px] py-[30px] bg-white rounded-lg shadow-sm">
        <p className="text-xl text-[#282828] text-center font-medium mb-4">
          책장 만들기
        </p>
        <Input
          text={folderName}
          placeholder="기본책장"
          maxLength={10}
          currentTextLength={folderName.length}
          onChange={handleFolderNameChange}
          height="44px"
          textColor="#282828"
          fontSize="15px"
        />
        <div className="flex items-center h-[37px] mt-4 mb-4">
          <Image
            src={
              isPrivate
                ? '/assets/icon/tick-circle-checked.svg'
                : '/assets/icon/tick-circle.svg'
            }
            alt={'체크 아이콘'}
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
            <p className="text-titleBlack text-[15px]/[20px] font-medium">
              비밀 책장으로 만들기
            </p>
            <p className="text-[#888888] text-sm/[17px]">
              본인 외에 다른 유저는 해당 책장을 볼 수 없습니다.
            </p>
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
