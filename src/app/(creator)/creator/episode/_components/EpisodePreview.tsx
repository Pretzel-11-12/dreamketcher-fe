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
  const openNewWindow = () => {
    const width = 1000;
    const height = 800;
    const newWindow = window.open(
      '',
      '_blank',
      `width=${width},height=${height},left=100,top=100`
    );

    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
  
            <style>
              body { overflow-x: hidden;  }
              img { width: 100vw; height: auto;}
            </style>
          </head>
          <body>
          
            ${images.map((img) => `<img src="${img}" alt="이미지" />`).join('')}
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-[10px]">
        <span className="text-sm leading-[17px] text-[#545454]">미리보기</span>
        <div className="border rounded-[5px] flex flex-col p-3 w-full h-[421px] overflow-y-scroll">
          {selected && (
            <img src={selected} alt="Preview" className="w-full object-cover" />
          )}
        </div>
        <div className="w-full flex justify-end">
          <div className="w-[100px] pt-1">
            <Button
              props={{
                size: 'XS',
                variant: 'brand-yellow',
                handleClick: openNewWindow,
              }}
            >
              전체 미리보기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EpisodePreview;
