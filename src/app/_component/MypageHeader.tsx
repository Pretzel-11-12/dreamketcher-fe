'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

const MypageHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isMypageActive = pathname === '/mypage';
  const isStorageActive = pathname === '/mypage/storage';

  return (
    <aside className='w-[277px] h-full flex flex-col items-start pr-[20px] border-r border-r-line mt-24'>
      <div
        className={`flex items-center w-full h-[50px] rounded-md px-4 py-2 ${
          isMypageActive ? 'bg-[#E4EBFF]' : ''
        }`}
      >
        <Image
          src={
            isMypageActive
              ? '/assets/images/activeTaskSquare.svg'
              : '/assets/images/inactiveTaskSquare.svg'
          }
          alt='Task Icon'
          width={20}
          height={20}
          className='mr-2'
        />
        <button
          className={`text-[16px] font-medium ${
            isMypageActive
              ? 'text-[#2E4072]'
              : 'text-gray-800 hover:text-blue-600'
          }`}
          onClick={() => router.push('/mypage')}
        >
          마이 페이지
        </button>
      </div>

      <div
        className={`flex items-center w-full h-[50px] rounded-md px-4 py-2 ${
          isStorageActive ? 'bg-[#E4EBFF]' : ''
        }`}
      >
        <Image
          src={
            isStorageActive
              ? '/assets/images/activeArchive.svg'
              : '/assets/images/inactiveArchive.svg'
          }
          alt='Archive Icon'
          width={20}
          height={20}
          className='mr-2'
        />
        <button
          className={`text-[16px] font-medium ${
            isStorageActive
              ? 'text-[#2E4072]'
              : 'text-gray-800 hover:text-blue-600'
          }`}
          onClick={() => router.push('/mypage/storage')}
        >
          보관함
        </button>
      </div>
    </aside>
  );
};

export default MypageHeader;
