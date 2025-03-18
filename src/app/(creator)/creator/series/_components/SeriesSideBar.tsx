'use client';

import useAuthStore from '@/app/store/authStore';

import { useState } from 'react';

const SeriesSideBar: React.FC<{}> = () => {
  const { nickname, businessEmail, imageUrl, shortIntroduction } =
    useAuthStore();
  const [status, setStatus] = useState('work');

  return (
    <div className="flex flex-col gap-1 w-[240px] border-r h-full items-center bg-white min-h-[1200px] border-[#F2F2F2] p-6 text-[16px]">
      <img
        className="w-[90px] h-[90px] rounded-full border border-[#F2F2F2]"
        src={imageUrl || '/assets/images/profile-default.png'}
        alt="프로필"
      />
      <p className="font-medium text-[#282828] pt-2 pb-6">{nickname}</p>
      <button
        className={`bg-[rgba(251,162,80,0.2)] w-full h-[40px] px-4 flex rounded-md items-center`}
        onClick={() => setStatus('work')}
      >
        <div className="text-brand-yellow text-[16px] font-medium">내 작품</div>
      </button>

      <button
        disabled
        className={`w-full h-[40px] px-4 flex rounded-md items-center`}
        onClick={() => setStatus('alert')}
      >
        <div className="text-contentBlack">알림</div>
      </button>

      <button
        disabled
        className={`w-full h-[40px] px-4 flex rounded-md items-center`}
        onClick={() => setStatus('work')}
      >
        <div className="text-contentBlack">도움말</div>
      </button>
    </div>
  );
};

export default SeriesSideBar;
