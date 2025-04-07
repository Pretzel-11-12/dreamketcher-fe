'use client';

import Modal from '@/app/_component/Modal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
isOpen,
onConfirm,
onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="bg-white rounded-lg w-[384px] h-[232px] p-[15px] flex flex-col items-center shadow-lg p-6">
        <p className="text-xl/[28px] text-titleBlack font-medium mt-[15px]">
          댓글을 삭제하시겠습니까?
        </p>
        <p className="text-[13px] text-[#888888] mt-[5px]">
          삭제한 댓글은 복구할 수 없습니다.
        </p>
        <div className="flex flex-col mt-[30px] gap-2 text-lg font-medium">
          <button
            className="bg-brand-yellow text-white w-[354px] h-[50px] rounded"
            onClick={onConfirm}
          >
            댓글 삭제
          </button>
          <button
            className="bg-[#F2F2F2] text-[#545454] w-[354px] h-[50px] rounded"
            onClick={onCancel}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
