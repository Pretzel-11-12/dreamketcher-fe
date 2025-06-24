import React from 'react';
import Modal from '@/app/_component/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookShelfFolder } from '@/app/api/fetchFolder';

const BookShelfDeleteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  folderId: string;
}> = ({ isOpen, onClose, folderId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, string>({
    mutationFn: deleteBookShelfFolder,
    onSuccess: () => {
      console.log('책장 폴더 삭제 성공');
      queryClient.invalidateQueries({
        queryKey: ['bookShelves'],
      });
      onClose();
    },
    onError: (error) => {
      console.error('책장 폴더 삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleDeleteFolder = () => {
    if (folderId) {
      mutation.mutate(folderId);
    } else {
      console.error('폴더 ID가 존재하지 않습니다');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[384px] h-fit px-[15px] pt-[30px] pb-[15px] bg-white rounded-lg shadow-lg">
        <div className="w-[354px] text-center text-xl text-titleBlack font-medium">
          <p>책장을 삭제하시겠습니까?</p>
        </div>

        <div className="flex flex-col mt-[30px] text-lg font-medium gap-2">
            <button
              className="bg-brand-yellow text-white w-[354px] h-[50px] rounded"
              onClick={handleDeleteFolder}
            >
              삭제
            </button>
            <button
              className="bg-[#F2F2F2] text-[#545454] w-[354px] h-[50px] rounded"
              onClick={onClose}
            >
              닫기
            </button>
        </div>
      </div>
    </Modal>
  );
};

export default BookShelfDeleteModal;
