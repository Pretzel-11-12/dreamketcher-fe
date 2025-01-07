'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchUserInfo } from '@/app/api/auth';
import useAuthStore from '@/app/store/authStore';
import ProfileModal from '@/app/modal/_component/ProfileModal';

const DEFAULT_USER_INFO = {
  id: 0,
  name: 'Guest',
  email: '',
  imageUri: '',
};

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [isAlarmModalOpen, setAlarmModalOpen] = useState(false);
  const { id, name, email, imageUri, setUserInfo } = useAuthStore();
  const profileImage: any = null;

  useEffect(() => {
    const handleFetchUserInfo = async () => {
      const accessToken = localStorage.getItem('accessToken');

      // 액세스 토큰이 없으면 비로그인 상태로 처리
      if (!accessToken) {
        console.log('No access token found. User is not logged in.');
        setUserInfo(DEFAULT_USER_INFO);
        return;
      }

      try {
        const userInfo = await fetchUserInfo(accessToken);
        setUserInfo({
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          imageUri: userInfo.imageUri,
        });
      } catch (err) {
        console.error('Failed to fetch user info:', err);

        // 서버 요청 실패 시 비로그인 상태로 처리
        setUserInfo(DEFAULT_USER_INFO);
      }
    };

    handleFetchUserInfo();
  }, [setUserInfo]);

  return (
    <header className="fixed w-full bg-white z-50">
      <div className="flex items-center justify-between w-full max-w-[1024px] h-[80px] mx-auto px-4 md:px-0 relative">
        <hr className="fixed left-0 w-[100vw] mt-[70px] border-line" />
        <div className="flex items-center space-x-10">
          <Link
            href="/"
            className="flex items-center text-lg md:text-xl font-bold"
          >
            <span className="text-brand-yellow">Dream</span>
            <span className="text-brand-blue">ketcher</span>
          </Link>
          <div className="flex text-[#888888]">
            <button className="border-r border-r-line w-[65px] h-[36px] text-black">
              홈
            </button>
            <button className="w-[65px] h-[36px]">구독</button>
          </div>
        </div>

        <div className="flex justify-end w-full max-w-[600px]">
          <div className="flex items-center w-fit gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-[263px] h-[34px] p-2 bg-line rounded-[100px]"
            />
            <div className="relative flex text-black gap-3 items-center">
              {id ? (
                <>
                  <Image
                    src="/assets/images/bell.png"
                    alt="noti button"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                  <Image
                    src={imageUri || '/assets/images/profile-default.png'}
                    alt="profile button"
                    width={30}
                    height={30}
                    onClick={handleOpenModal}
                    className="cursor-pointer rounded-full"
                  />
                </>
              ) : (
                <Link href="/login" className="px-2 py-2 text-sm">
                  로그인
                </Link>
              )}
            </div>
            {isModalOpen && (
              <ProfileModal isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
