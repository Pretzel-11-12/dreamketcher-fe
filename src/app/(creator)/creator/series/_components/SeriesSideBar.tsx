'use client';

import useAuthStore from '@/app/store/authStore';
import Image from 'next/image';

import { useState } from 'react';

const SeriesSideBar: React.FC<{}> = () => {
  const { nickname, businessEmail, imageUrl, shortIntroduction } =
    useAuthStore();
  const [status, setStatus] = useState('work');

  return (
    <div className="flex flex-col gap-[10px] w-[245px] border-r h-full items-center bg-white flex-1 border-[#F2F2F2] py-5 px-[22px] text-[16px]">
      <img
        className="w-[90px] h-[90px] rounded-full border border-[#F2F2F2]"
        src={imageUrl || '/assets/images/profile-default.png'}
        alt="프로필"
      />
      <p className="font-medium text-[#282828] pt-[5px] pb-[15px]">
        {nickname}
      </p>
      <button
        className={`bg-[rgba(251,162,80,0.2)] w-[200px] h-[40px] px-[15px] flex rounded-md items-center gap-[5px]`}
        onClick={() => setStatus('work')}
      >
        <Image
          src="/assets/icon/copy.png"
          alt="내 작품"
          width={20}
          height={20}
        />
        <p className="text-brand-yellow text-[16px] font-medium">내 작품</p>
      </button>

      <button
        disabled
        className={`w-[200px] h-[40px] px-4 flex rounded-md items-center gap-[5px]`}
        onClick={() => setStatus('alert')}
      >
        {' '}
        <Image
          src="/assets/icon/notification.png"
          alt="내 작품"
          width={20}
          height={20}
        />
        <p className="text-contentBlack">알림</p>
      </button>

      <button
        disabled
        className={`w-[200px] h-[40px] px-4 flex rounded-md items-center gap-[5px]`}
        onClick={() => setStatus('work')}
      >
        {' '}
        <Image
          src="/assets/icon/info-circle.png"
          alt="도움말"
          width={20}
          height={20}
        />
        <p className="text-contentBlack">도움말</p>
      </button>
    </div>
  );
};

export default SeriesSideBar;
