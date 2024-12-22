'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const userId: Number = 1;
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // 이전 페이지로 이동
  };

  return (
    <header className="fixed w-full bg-white z-50">
      <div className="flex items-center justify-between w-full max-w-[1200px] h-[80px] mx-auto px-4 md:px-0 relative">
        <div className="flex items-center gap-3">
          <span
            className="mdi mdi-chevron-left text-2xl text-gray-600 cursor-pointer"
            onClick={handleGoBack}
          />

          <Link href="/creator/series">
            <Image
              src="/assets/images/studio.png"
              alt="profile button"
              width={120}
              height={30}
            />
          </Link>
        </div>

        <div className="flex justify-end w-full">
          <div className="flex items-center gap-3">
            <div className="flex text-black gap-3 items-center">
              {userId !== 0 ? (
                <>
                  <Image
                    src="/assets/images/profile-default.png"
                    alt="profile button"
                    width={30}
                    height={30}
                  />
                  <Link href="/login" className="px-2 py-2 text-sm">
                    로그아웃
                  </Link>
                </>
              ) : (
                <Link href="/login" className="px-4 py-2 text-sm">
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
