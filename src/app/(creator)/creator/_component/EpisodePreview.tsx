import Button from '@/app/_component/Button';
import Modal from '@/app/_component/Modal';
import React, { useState } from 'react';

export interface EpisodeUploaderProps {
  images: string[];
  selected?: string;
}

const EpisodePreview: React.FC<EpisodeUploaderProps> = ({
  images,
  selected,
}) => {
  const [isOpenModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="w-full h-full flex flex-col gap-1">
        <span className="text-sm">미리보기</span>
        <div className="border rounded-sm flex flex-col p-3 w-full h-[421px]">
          {selected && (
            <img
              src={selected}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <div className="w-full flex justify-end">
          <div className="w-[100px] pt-1">
            <Button
              props={{
                size: 'XS',
                variant: 'brand-yellow',
                handleClick: () => setOpenModal(true),
              }}
            >
              전체 미리보기
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpenModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <div className="bg-white rounded-lg flex gap-2 flex-col w-[800px] h-[1000px] py-5 px-4">
          <div className="flex justify-between">
            <span className="text-[18px] font-medium">전체 미리보기</span>
            <span
              className="mdi mdi-close text-lg cursor-pointer"
              onClick={() => setOpenModal(false)}
            />
          </div>

          <div className="flex flex-col w-full overflow-y-scroll h-full gap-2 px-5">
            {images.map((v) => (
              <img
                src={v}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EpisodePreview;
