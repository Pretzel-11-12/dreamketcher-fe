'use client';
import React from 'react';
import { Webtoon as IWebtoon } from '@/model/Webtoon';

type WebtoonManagementProps = {
  webtoon: IWebtoon;
};

const WebtoonManagement: React.FC<WebtoonManagementProps> = ({ webtoon }) => {
  return (
    <div className="flex w-full h-[60px] cursor-pointer items-center border p-4">
      <p className="w-[50px]">{webtoon.id}</p>
      <p className="w-[200px]">{webtoon.title}</p>
      <p className="w-[200px]">
        {webtoon.genres.map((genre) => `#${genre}`).join(', ')}
      </p>
      <p className="w-[200px]">{webtoon.member}</p>
      <p className="w-[200px]">웹툰 상태(임시)</p>
      <button className="bg-brand-yellow w-[100px] h-[40px] rounded-[10px] border-4">
        상태 변경
      </button>
    </div>
  );
};

export default WebtoonManagement;
