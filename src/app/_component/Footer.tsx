'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Footer: React.FC = () => {
  const pathname = usePathname();
  const isDetail = pathname.includes('detail');

  if (isDetail) return null;

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-[160px] bg-[#f9f9f9] mt-auto mx-auto pt-[25px]">
        <p className="text-[#888888] text-[15px] font-medium leading-[120%]">
          서비스 소개 <span className="m-1">|</span> 개인정보처리방침{' '}
          <span className="m-1">|</span>
          서비스이용약관
        </p>
        <p className="text-[#c9c9c9] text-[14px] font-medium leading-[120%] mt-[9px]">
          주소 : 서울특별시 마포구 아산대로길 192 22길{' '}
          <span className="m-1">|</span> 고객센터 1600-1234{' '}
          <span className="m-1">|</span>
          고유번호 : 324-82-005800
        </p>
        <div className="flex flex-row items-center justify-center gap-[15px] mt-[35px]">
          <img
            src="/assets/icon/X.png"
            alt="X Logo"
            className="w-[25px] h-[25px]"
          />
          <img
            src="/assets/icon/YouTube.png"
            alt="Youtube Logo"
            className="w-[25px] h-[25px]"
          />
          <img
            src="/assets/icon/Facebook.png"
            alt="Facebook Logo"
            className="w-[25px] h-[25px]"
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
