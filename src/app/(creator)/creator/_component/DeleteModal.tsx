'use client';
import Button from '@/app/_component/Button';
import Modal from '@/app/_component/Modal';
import {
  fetchCreatorEpisode,
  fetchCreatorWebtoon,
} from '@/app/api/fetchCreator';

interface DeleteModalProps {
  webtoonId: string;
  episodeId?: string;
  text: string;
  isOpen: boolean;
  handleOpenModal: (isOpen: boolean) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  webtoonId,
  episodeId,
  text,
  isOpen,
  handleOpenModal,
}) => {
  const closeModal = () => handleOpenModal(false);
  const handleClickDelete = async () => {
    try {
      if (episodeId) {
        const response = await fetchCreatorEpisode.deleteEpisode({
          webtoonId,
          episodeId,
        });
        if (response.code === 'INTERNAL_SERVER_ERROR') {
          throw Error(response.message);
        }
      } else {
        const response = await fetchCreatorWebtoon.deleteWebtoon({ webtoonId });
      }

      alert('삭제 성공');
      closeModal();
    } catch (e) {
      alert(`삭제 실패 ${e}`);
      console.log(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="bg-white rounded-lg p-5 flex gap-2 flex-col w-[384px]">
        <div className="flex flex-col gap-2 p-5">
          <span className="text-lg font-semibold">{text}</span>
          <span className="text-xs text-gray-600">
            삭제 시 최대 30일 동안 휴지통에 보관된 후 영구 삭제됩니다.
          </span>
        </div>
        <Button
          props={{
            size: 'L',
            variant: 'brand-yellow',
            handleClick: handleClickDelete,
          }}
        >
          삭제
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

export default DeleteModal;
