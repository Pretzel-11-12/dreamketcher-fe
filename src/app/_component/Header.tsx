'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlarmModalOpen, setAlarmModalOpen] = useState(false);
  const userId: Number = 1;
  const profileImage: any = null;

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleAlarmModal = () => {
    setAlarmModalOpen(!isAlarmModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeAlarmModal = () => {
    setAlarmModalOpen(false);
  };

  return (
    <header className='fixed w-full bg-white z-50'>
      <div className='flex items-center justify-between w-full max-w-[1024px] h-[80px] mx-auto px-4 md:px-0 relative'>
        <div className='flex items-center space-x-4 md:space-x-20'>
          <Link href='/' className='flex items-center space-x-2'>
            <img
              src={`/assets/images/logo.png`}
              alt='Logo'
              className='h-8 w-8'
            />
            <span className='text-lg md:text-xl font-bold text-[#6D81D5]'>
              Dreamketcher
            </span>
          </Link>
        </div>

        <div className='flex justify-end w-full max-w-[670px]'>
          <div className='flex flex-row w-[380px]'>
            <input
              type='text'
              placeholder='Search...'
              className='w-full h-[44px] p-2 border-b border-black'
            />
            <button className=''>
              <img
                src={`/assets/images/magnifier.png`}
                alt='Search'
                className='w-[15px] cursor-pointer object-scale-down'
              />
            </button>
          </div>
        </div>
        <div className='relative flex text-black'>
          {userId !== 0 ? (
            <>
              <Link href='/mypage' className='px-2 py-2 text-sm'>
                마이페이지
              </Link>
              {/* 알림 아이콘 숨김 처리 */}
              <Link href='/login' className='px-2 py-2 text-sm'>
                로그인
              </Link>
              <button className='text-sm' onClick={() => signOut()}>
                로그아웃
              </button>
            </>
          ) : (
            <Link href='/login' className='px-4 py-2'>
              로그아웃
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
