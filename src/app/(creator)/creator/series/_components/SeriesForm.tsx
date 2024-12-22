'use client';

import Button from '@/app/_component/Button';
import Input from '@/app/_component/Input';
import RadioButton from '@/app/_component/RadioButton';
import Textarea from '@/app/_component/Textarea';
import ThumbnailUploader from '../../_component/ThumbnailUploader';
import { useState } from 'react';

export interface SeriesFormInfo {
  title: string;
  genre: string;
  image: string;
  description: string;
  summary: string;
}
const options = [
  { label: '로맨스', id: '1' },
  { label: '판타지', id: '2' },
  { label: '무협', id: '3' },
  { label: '일상', id: '4' },
  { label: '스릴러', id: '5' },
  { label: '공포', id: '6' },
  { label: '액션', id: '7' },
  { label: '스포츠', id: '8' },
  { label: '개그', id: '9' },
  { label: '소년', id: '10' },
];

const SeriesForm = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setUploadedFile(file);
  };

  return (
    <div className="flex flex-col w-full gap-12 pb-20">
      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작품제목</div>
        <Input placeholder="제목을 입력해주세요." subText="0/30" />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>장르</div>
        <RadioButton options={options} />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>이용가</div>
        <RadioButton
          options={[
            { id: 'all', label: '전체 이용가' },
            { id: 'adult', label: '성인' },
          ]}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작품 표지</div>

        <ThumbnailUploader
          onFileSelect={handleFileSelect}
          imageFormat={{ width: 300, height: 300 }}
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-baseline">
        <div>작품 설명</div>
        <Textarea
          placeholder="작품 설명에 필요한 내용을 작성해주세요."
          subText="0/30"
        />
      </div>

      <div className="grid grid-cols-[10rem_1fr] items-start">
        <div>작품 한줄 설명</div>
        <Input
          placeholder="작품에 대한 설명을 한줄로 적어주세요."
          subText="0/400"
        />
      </div>
      <div className="pb-24">
        <div className="grid grid-cols-[10rem_1fr] items-start pb-4">
          <div>작품 태그</div>
          <Input />
        </div>
        <div className="flex rounded-md bg-brand-gray py-2 px-3 text-sm text-gray-500 w-full gap-2 items-center">
          <span className="mdi mdi-alert-circle-outline text-lg"></span>
          <div className="w-full text-[13px]">
            태그는 쉼표를 통해 구분되며, 최대 10개까지 등록될 수 있습니다.
            하나의 태그는 최대 6자 이상을 넘기지 못합니다.
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <Button
          props={{
            size: 'L',
            variant: 'brand-yellow',
            containerStyles: 'w-[300px]',
          }}
        >
          작품 등록하기
        </Button>
      </div>
    </div>
  );
};

export default SeriesForm;
