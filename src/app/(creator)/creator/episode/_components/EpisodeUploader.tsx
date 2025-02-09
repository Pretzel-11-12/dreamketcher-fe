import React, { useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import EpisodePreview from './EpisodePreview';
import _ from 'lodash';
import Button from '@/app/_component/Button';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface EpisodeUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  getContentURL: (file: File | null) => Promise<string>;
}

const ItemType = {
  IMAGE: 'image',
};

const DraggableImage = ({
  image,
  index,
  moveImage,
  setSelected,
  selected,
}: any) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.IMAGE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType.IMAGE,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      onClick={() => setSelected(image)}
      className={`text-sm p-1 hover:bg-brand-gray transition ${
        image === selected ? 'text-brand-yellow' : 'text-[#888888]'
      } ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {_.last(image?.split('/'))}
    </div>
  );
};

const EpisodeUploader: React.FC<EpisodeUploaderProps> = ({
  images,
  onChange,
  getContentURL,
}) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  const onDrop = async (acceptedFiles: File[]) => {
    let error = false;
    await Promise.all(
      acceptedFiles.map(async (file) => {
        if (!validTypes.includes(file.type)) {
          error = true;
          setError('.png, .jpg, .jpeg 파일을 등록해주세요.');
          return;
        }

        if (file.size > 1000 * 1024) {
          error = true;
          setError('1MB 미만의 파일을 등록해주세요.');
          return;
        }

        const image = await loadImage(file);

        if (image.width !== 690) {
          error = true;
          setError('이미지 너비는 690px이어야 합니다.');
        }
      })
    );

    if (error) return;
    const newImages = await Promise.all(
      acceptedFiles.map(async (file) => getContentURL(file))
    );

    setError(null);
    onChange([...images, ...newImages]);
  };

  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    onChange(updatedImages);
  };

  const removeImage = (id: string) => {
    onChange(images.filter((image) => image !== id));
  };

  useEffect(() => {
    setSelected(images.find((image) => image === selected));
  }, [images]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    multiple: true,
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="flex gap-5 w-full">
          <div className="w-full h-full flex flex-col gap-1">
            <span className="text-sm">파일 등록</span>
            <div className="border rounded-sm flex flex-col p-3 w-full h-[421px]">
              <div className="flex-1">
                <div className="flex flex-col">
                  {images.map((image, index) => (
                    <DraggableImage
                      key={image}
                      image={image}
                      index={index}
                      moveImage={moveImage}
                      setSelected={setSelected}
                      selected={selected}
                    />
                  ))}
                </div>
              </div>

              <div {...getRootProps()} className="h-full">
                <input {...getInputProps()} ref={fileInputRef} />
              </div>
            </div>

            <div className="flex justify-between pt-1">
              <div className="w-[100px]">
                <Button
                  props={{
                    size: 'XS',
                    variant: 'brand-gray',
                    handleClick: () => selected && removeImage(selected),
                  }}
                >
                  삭제
                </Button>
              </div>

              <div className="w-[100px]">
                <Button
                  props={{
                    size: 'XS',
                    variant: 'brand-yellow',
                    handleClick: handleUploadClick,
                  }}
                >
                  원고 업로드
                </Button>
              </div>
            </div>
          </div>

          <EpisodePreview images={images} selected={selected} />
        </div>

        <div className="text-xs">
          <p className="text-[#C9C9C9] mt-2">
            가로 사이즈는 690px만 가능합니다.
          </p>
          <p className="text-[#C9C9C9]">
            파일 1개 용량 5MB, 총 용량 50MB이하로 제한 / jpg, gif 파일만 업로드
            가능
          </p>

          {error && <p className="text-red-500 mt-1">{error}</p>}
        </div>
      </div>
    </DndProvider>
  );
};

export default EpisodeUploader;
